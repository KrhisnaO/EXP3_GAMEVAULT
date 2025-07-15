import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  sesion: any = {};
  exito = false;
  error = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const sesionLocal = this.auth.getSesion();
    if (sesionLocal) {
      this.sesion = { ...sesionLocal };
    }
  }

  guardarCambios(): void {
    const actualizado = this.auth.actualizarSesion(this.sesion);
    this.error = '';
    this.exito = false;

    if (actualizado) {
      this.exito = true;
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        this.exito = false;
      }, 4000);
    } else {
      this.error = 'No se pudieron guardar los cambios.';
    }
  }
}
