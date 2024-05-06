import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListaPageComponent,
    PrestamoPageComponent,
    LayoutPageComponent,
    UpsertPrestamoPageComponent,
    ConfirmDialogComponent,
    TipoUsuarioPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
