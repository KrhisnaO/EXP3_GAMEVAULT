import { NgModule, LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

import { HttpClientModule } from '@angular/common/http';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PreventasComponent } from './pages/preventas/preventas.component';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarComponent,
    PerfilComponent,
    AdminComponent,
    CategoriasComponent,
    DetalleComponent,
    CarritoComponent,
    PreventasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
