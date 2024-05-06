import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Prestamo } from 'src/app/interfaces/listado-prestamos.interface';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-lista-page',
  templateUrl: './lista-page.component.html',
})
export class ListaPageComponent implements OnInit {
  private _prestamoService = inject(PrestamoService);
  private _snackBar = inject(MatSnackBar);
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
        console.log({ error });
        this.displaySnackbar('No se pudo realizar la petición', 5000);
      }
    );
  }

  hacerLog(data: string) {
    console.log(data);
  }
}
