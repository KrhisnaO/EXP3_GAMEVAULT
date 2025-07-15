import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Componente de inicio de sesión.
 * Permite a los usuarios iniciar sesión proporcionando su correo electrónico y contraseña.
 * Redirige a la página de perfil o admin según el tipo de usuario.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Formulario de inicio de sesión que contiene los campos necesarios para autenticar al usuario.
   */
  loginForm!: FormGroup;
  error = false;

  /**
   * 
   * @param fb FormBuilder para construir formularios de manera más sencilla.
   * @param router Router para navegar entre rutas de la aplicación.
   * @param auth AuthService para manejar la autenticación de usuarios. 
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  /**
   * Inicializa el formulario de inicio de sesión con validaciones.
   * El formulario contiene campos para el correo electrónico y la contraseña.
   */

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }
/**
 * 
 * @returns Inicia sesión con las credenciales proporcionadas en el formulario.
 * Si las credenciales son válidas, redirige al usuario a su perfil o al panel de administración.
 * Si las credenciales son incorrectas, muestra un mensaje de error.
 */
  login() {
    this.error = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const exito = this.auth.iniciarSesion(email, password);

    if (exito) {
      const tipo = this.auth.getSesion()?.tipo;
      this.router.navigate([tipo === 'admin' ? '/admin' : '/perfil']);
    } else {
      this.error = true;
    }
  }
}
