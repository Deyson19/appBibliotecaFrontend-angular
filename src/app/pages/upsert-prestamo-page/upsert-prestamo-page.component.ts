import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CrearPrestamo, TipoUsuario } from 'src/app/interfaces';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-upsert-prestamo-page',
  templateUrl: './upsert-prestamo-page.component.html',
})
export class UpsertPrestamoPageComponent implements OnInit {
  private prestamo!: CrearPrestamo;
  private _prestamoService = inject(PrestamoService);
  private _router = inject(Router);

  private _snackbar = inject(MatSnackBar);
  public errorMessage = 'El campo no es correcto';
  private fb = inject(FormBuilder);
  public form!: FormGroup;
  public tiposUsuario: TipoUsuario[] = [
    { id: 1, nombre: 'Usuario Afiliado' },
    { id: 2, nombre: 'Usuario empleado' },
    { id: 3, nombre: 'usuario Invitado' },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      isbn: ['', [Validators.required, Validators.maxLength(6)]],
      identificacionUsuario: [
        '',
        [Validators.required, Validators.maxLength(10)],
      ],
      tipoUsuarioId: [1, [Validators.required, Validators.maxLength(1)]],
    });
  }

  errorAlCrear(estado: boolean) {
    if (estado) {
      this._snackbar.open('No se pudo crear el registro', 'Aceptar', {
        duration: 5000,
      });
      this._router.navigate(['./']);
    }
  }
  crearPrestamo() {
    if (this.form.valid) {
      this.prestamo = this.form.value;
      this._prestamoService.postPrestamo(this.prestamo).subscribe(
        (result) => {
          if (result.id) {
            this._snackbar.open('Registro creado', 'Aceptar', {
              duration: 5000,
            });
            setTimeout(() => {
              this._router.navigate(['./']);
            }, 1800);
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          this._snackbar.open(error.error.mensaje, 'OK', {
            duration: 3500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          setTimeout(() => {
            this.errorAlCrear(true);
          }, 3800);
        }
      );
    }
  }
}
