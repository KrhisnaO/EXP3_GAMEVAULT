import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PreventasComponent } from './pages/preventas/preventas.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'categorias/:tipo', component: CategoriasComponent },
  { path: 'juego/:nombre', component: DetalleComponent },
  { path: 'carrito', component: CarritoComponent },
  { path : 'preventas', component: PreventasComponent },
  { path: '**', redirectTo: '' } // Redirige cualquier ruta desconocida a la página de inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
