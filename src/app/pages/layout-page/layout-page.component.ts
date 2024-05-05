import { Component } from '@angular/core';
import { SidebarItems } from 'src/app/interfaces/sidebaritems';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {
  //*sidebar items para el menu
  public sidebaritems: SidebarItems[] = [
    {
      icon: 'home',
      name: 'Inicio',
      path: './',
    },
    {
      icon: 'add',
      name: 'Agregar',
      path: './nuevo',
    },
  ];
}
