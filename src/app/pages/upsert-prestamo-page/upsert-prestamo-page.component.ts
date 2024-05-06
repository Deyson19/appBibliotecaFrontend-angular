import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ActualizarPrestamo,
  CrearPrestamo,
  TipoUsuario,
} from 'src/app/interfaces';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-upsert-prestamo-page',
  templateUrl: './upsert-prestamo-page.component.html',
})
export class UpsertPrestamoPageComponent implements OnInit {
  //*Inyectar servicios
  private _prestamoService = inject(PrestamoService);
  private _router = inject(Router);
  private _activedRouter = inject(ActivatedRoute);
  private _snackbar = inject(MatSnackBar);

  //*Propiedades
  public errorMessage = 'El campo no es correcto';
  private prestamo!: CrearPrestamo;
  private actualizar!: ActualizarPrestamo;

  public tituloFormulario = '';
  public tituloBotonFormulario = '';
  private fb = inject(FormBuilder);
  public form!: FormGroup;
  public tiposUsuario: TipoUsuario[] = [
    { id: 1, nombre: 'Usuario Afiliado' },
    { id: 2, nombre: 'Usuario empleado' },
    { id: 3, nombre: 'usuario Invitado' },
  ];

  constructor() {
    //*Inicializar formulario
    this.form = this.fb.group({
      isbn: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(6),
        ],
      ],
      identificacionUsuario: [
        '',
        [Validators.required, Validators.maxLength(10)],
      ],
      tipoUsuarioId: [1, [Validators.required, Validators.maxLength(1)]],
    });
    this.tituloFormulario = 'Crear Prestamo';
    this.tituloBotonFormulario = 'Crear';
    this.actualizar = {
      id: 0,
      isbn: '',
      identificacionUsuario: '',
      tipoUsuarioId: 0,
    };
  }

  ngOnInit(): void {
    //*Obtener parametros de la url y cargar el prestamo correspondiente para actualizar
    this._activedRouter.params
      .pipe(
        switchMap(({ id }) => {
          if (isNaN(id)) {
            return [];
          }
          return this._prestamoService.getPrestamo(id);
        })
      )
      .subscribe((prestamo) => {
        if (!prestamo) {
          return this._router.navigate(['./']);
        }
        this.actualizar.id = prestamo.id;
        this.actualizar.isbn = prestamo.isbn;
        this.actualizar.identificacionUsuario = prestamo.identificacionUsuario;
        this.actualizar.tipoUsuarioId = prestamo.tipoUsuario;
        this.form.reset(this.actualizar);
        this.tituloFormulario = 'Actualizar Prestamo';
        this.tituloBotonFormulario = 'Actualizar';
        return;
      });
  }

  errorAlEnviar(estado: boolean) {
    if (estado) {
      this._snackbar.open('No se pudo realizar la solicitud', 'Aceptar', {
        duration: 5000,
      });
      this._router.navigate(['./']);
    }
  }
  onSubmit() {
    if (this.form.valid && this.tituloBotonFormulario === 'Actualizar') {
      this.actualizarPrestamo();
    } else {
      this.crearPrestamo();
    }
  }
  private crearPrestamo() {
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
          this._snackbar.open(error.error.mensaje, 'OK', {
            duration: 3500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          setTimeout(() => {
            this.errorAlEnviar(true);
          }, 3800);
        }
      );
    }
  }

  private actualizarPrestamo() {
    if (this.form.valid) {
      const prestamoActualizado: ActualizarPrestamo = Object.assign(
        this.form.value,
        this.actualizar
      );
      this._prestamoService.putPrestamo(prestamoActualizado).subscribe(
        (result) => {
          this._snackbar.open('Registro actualizado', 'Aceptar', {
            duration: 3000,
          });
          setTimeout(() => {
            this._router.navigateByUrl('/');
          }, 2500);
        },
        (error: HttpErrorResponse) => {
          // Mostrar mensajes de error si es el caso
          this._snackbar.open(
            `No se pudo actualizar\n ${error.error.title}`,
            'Salir',
            {
              duration: 5000,
            }
          );
          setTimeout(() => {
            this.errorAlEnviar(true);
          }, 5400);
        }
      );
    }
  }
}
