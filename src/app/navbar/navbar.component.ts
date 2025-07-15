import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente NavbarComponent
 * 
 * Muestra una barra de navegación dinámica que adapta su contenido según
 * el estado de sesión del usuario (logueado o no).
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  /**
   * Objeto que contiene la información de la sesión actual del usuario.
   * Se obtiene desde el servicio de autenticación.
   */
  sesion: any = null;

  /**
   * Constructor del componente.
   * 
   * @param auth Servicio de autenticación para manejar sesión del usuario.
   * @param router Servicio de enrutamiento para redirigir al cerrar sesión.
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Método del ciclo de vida `ngOnInit`.
   * Se suscribe al observable `sesion$` para mantener actualizada la información de sesión.
   */
  ngOnInit(): void {
    this.auth.sesion$.subscribe(sesion => {
      this.sesion = sesion;
    });
  }
  /**
   * Cierra la sesión del usuario utilizando el servicio de autenticación
   * y redirige al inicio de la aplicación.
   */
  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }

}
