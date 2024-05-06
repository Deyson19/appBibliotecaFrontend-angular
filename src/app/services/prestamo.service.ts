import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { CrearPrestamo, ListadoPrestamos, PrestamoPorId } from '../interfaces/';

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
  postPrestamo(nuevoPrestamo: CrearPrestamo) {
    if (!nuevoPrestamo) {
      throw new Error('No se ha ingresado un modelo valido');
    }
    return this._http.post<ListadoPrestamos>(
      `${this.baseUrl}/api/Prestamo`,
      nuevoPrestamo
    );
  }
  deletePrestamo(idPrestamo: number) {
    //!Actualmente no existe un metodo delete en el api, pero se hace la semejanza
    if (!idPrestamo) {
      throw new Error(this.idIncorrecto);
    }
    return this._http.delete<boolean>(`${this.baseUrl}/Prestamo/${idPrestamo}`);
  }
}
