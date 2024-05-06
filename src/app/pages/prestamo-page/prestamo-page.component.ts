import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { PrestamoPorId } from 'src/app/interfaces';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-prestamo-page',
  templateUrl: './prestamo-page.component.html',
})
export class PrestamoPageComponent implements OnInit {
  private _activeRouter = inject(ActivatedRoute);
  private _prestamoService = inject(PrestamoService);

  private _router = inject(Router);
  public prestamo?: PrestamoPorId;
  public imagenLibro =
    'https://4.bp.blogspot.com/-hAxcL3vlNHM/WIDfY_0bFBI/AAAAAAAAAIU/OWBvFQzya1UJHSKK_GMTRfQ1PpqOuIsMQCLcB/s1600/libros.jpg';
  ngOnInit(): void {
    this._activeRouter.params
      .pipe(
        delay(1500),
        switchMap(({ id }) => {
          if (isNaN(id)) {
            this.regresar();
            return [];
          }
          return this._prestamoService.getPrestamo(id);
        })
      )
      .subscribe((prestamo) => {
        if (!prestamo) {
          return this._router.navigate(['./']);
        }
        this.prestamo = prestamo;
        return;
      });
  }
  regresar() {
    this._router.navigate(['./']);
  }
}
