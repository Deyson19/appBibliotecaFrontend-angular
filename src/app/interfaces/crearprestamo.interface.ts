export interface CrearPrestamo {
  // 6
  isbn: string;
  // 10
  identificacionUsuario: string;
  // 1
  tipoUsuarioId: number;
}
export interface ActualizarPrestamo {
  id: number;

  // 6
  isbn: string;
  // 10
  identificacionUsuario: string;
  // 1
  tipoUsuarioId: number;
}
export interface TipoUsuario {
  id: number;
  nombre: string;
}
