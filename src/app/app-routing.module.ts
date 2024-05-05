import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LayoutPageComponent,
  ListaPageComponent,
  PrestamoPageComponent,
  UpsertPrestamoPageComponent,
} from './pages';
import { Error404Component } from './shared/pages/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: ListaPageComponent,
      },
      {
        path: 'nuevo',
        component: UpsertPrestamoPageComponent,
      },
      {
        path: 'detalle/:id',
        component: PrestamoPageComponent,
      },
      {
        path: '**',
        component: Error404Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
