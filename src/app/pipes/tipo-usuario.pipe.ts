import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoUsuario',
})
export class TipoUsuarioPipe implements PipeTransform {
  private tipoUsuario!: string;
  transform(value: number): string {
    switch (value) {
      case 1:
        this.tipoUsuario = 'Usuario Afiliado';
        break;
      case 2:
        this.tipoUsuario = 'Usuario Empleado';
        break;
      case 3:
        this.tipoUsuario = 'Usuario Incitado';
        break;
    }
    return this.tipoUsuario;
  }
}
