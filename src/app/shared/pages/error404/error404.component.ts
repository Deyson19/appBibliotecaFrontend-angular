import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css'],
})
export class Error404Component implements OnInit {
  private _router = inject(Router);
  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['./']);
    }, 4800);
  }
}
