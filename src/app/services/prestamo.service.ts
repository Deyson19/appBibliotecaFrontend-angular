import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import {
  CrearPrestamo,
  ListadoPrestamos,
  PrestamoPorId,
  PrestamoCreado,
  ActualizarPrestamo,
  Prestamo,
} from '../interfaces/';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private _http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private idIncorrecto = 'El id ingresado no es correcto';

  constructor() {}

  getPrestamos(): Observable<ListadoPrestamos> {
    const baseUrl = environment.apiUrl;
    return this._http.get<ListadoPrestamos>(`${baseUrl}/Prestamo`);
  }
  getPrestamo(idPrestamo: number): Observable<PrestamoPorId> {
    if (!idPrestamo) {
      throw new Error(this.idIncorrecto);
    }
    return this._http.get<PrestamoPorId>(
      `${this.baseUrl}/Prestamo/${idPrestamo}`
    );
  }
  postPrestamo(nuevoPrestamo: CrearPrestamo): Observable<PrestamoCreado> {
    if (!nuevoPrestamo) {
      throw new Error('No se ha ingresado un modelo valido');
    }
    return this._http.post<PrestamoCreado>(
      `${this.baseUrl}/Prestamo`,
      nuevoPrestamo
    );
  }
  deletePrestamo(idPrestamo: number) {
    if (!idPrestamo) {
      throw new Error(this.idIncorrecto);
    }
    return this._http.delete<boolean>(`${this.baseUrl}/Prestamo/${idPrestamo}`);
  }
  putPrestamo(actualizar: ActualizarPrestamo): Observable<Prestamo> {
    if (!actualizar) {
      throw new Error('No se posible realizar la solicitud');
    }
    return this._http.put<Prestamo>(
      `${this.baseUrl}/Prestamo/${actualizar.id}`,
      actualizar
    );
  }
}
