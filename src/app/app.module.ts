import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//MyApp
import { AppComponent } from './app.component';
import {
  ListaPageComponent,
  PrestamoPageComponent,
  LayoutPageComponent,
  UpsertPrestamoPageComponent,
} from './pages/';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ListaPageComponent,
    PrestamoPageComponent,
    LayoutPageComponent,
    UpsertPrestamoPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
