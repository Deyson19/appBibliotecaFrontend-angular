import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { PrestamoPorId, Prestamo } from 'src/app/interfaces';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-lista-page',
  templateUrl: './lista-page.component.html',
})
export class ListaPageComponent implements OnInit {
  private _prestamoService = inject(PrestamoService);
  private _snackBar = inject(MatSnackBar);
  private _prestamoActual?: PrestamoPorId;
  private dialog = inject(MatDialog);

  //*Listado de la data
  public listadoPrestamos: Prestamo[] = [];
  ngOnInit() {
    this.cargarPrestamos();
  }
  displaySnackbar(mensaje: string, duracion: number) {
    this._snackBar.open(mensaje, 'Close', {
      duration: duracion,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  cargarPrestamos() {
    this._prestamoService.getPrestamos().subscribe(
      (data) => {
        if (data.isSuccess) {
          this.displaySnackbar(data.message, 3500);
          this.listadoPrestamos = data.result;
        }
      },
      (error: HttpErrorResponse) => {
        this.displaySnackbar('No se pudo realizar la petición', 5000);
      }
    );
  }

  eliminar(id: number) {
    if (!id) {
      throw new Error('No se ha enviado id');
    }
    this._prestamoService.getPrestamo(id).subscribe((data) => {
      if (data.id) {
        this._prestamoActual = data;
      }
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this._prestamoActual,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((confirm: boolean) => confirm),
        switchMap(() =>
          this._prestamoService.deletePrestamo(this._prestamoActual!.id)
        ),
        filter((wasDelete: boolean) => wasDelete)
      )
      .subscribe((x) => {
        this._snackBar.open('Se ha eliminado el registro', 'Ok', {
          duration: 2750,
        });
        setTimeout(() => {
          this.cargarPrestamos();
        }, 3000);
      });
  }
  hacerLog(data: string) {
    console.log(data);
  }
}
