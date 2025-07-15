import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Componente RecuperarComponent
 * Permite a los usuarios recuperar y cambiar su contraseña
 */
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html'
})
export class RecuperarComponent implements OnInit {
  /**
   * Formulario para recuperar contraseña
   */
  recuperarForm!: FormGroup;
  /**
   * Formulario para cambiar contraseña
   */
  cambioForm!: FormGroup;
  /**
   * Mensaje de error que se muestra al usuario
   */
  error: string = '';
  /**
   * Mensaje de éxito o información que se muestra al usuario
   */
  mensaje: string = '';
  /**
   * Objeto que almacena el usuario encontrado al recuperar la contraseña
   */
  usuarioEncontrado: any = null;

  /**
   * Constructor del componente
   * @param fb FormBuilder para construir formularios reactivos
   * @param router Router para navegar entre rutas
   */

  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * Inicializa los formularios de recuperación y cambio de contraseña con validaciones.
   */
  ngOnInit(): void {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.cambioForm = this.fb.group({
      nuevaPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]]
    });
  }

  /**
   * Acceso a los controles del formulario de recuperación
   */
  get f() {
    return this.recuperarForm.controls;
  }
/**
 * Acceso a los controles del formulario de cambio de contraseña
 */
  get c() {
    return this.cambioForm.controls;
  }

  /**
   * Busca al usuario por email ingresado y muestra su contraseña actual si se encuentra.
   * Si no se encuentra, muestra un mensaje de error.
   */
  recuperar(): void {
    this.error = '';
    this.mensaje = '';
    this.usuarioEncontrado = null;

    if (this.recuperarForm.invalid) {
      this.error = 'Por favor, ingresa un correo válido.';
      this.recuperarForm.markAllAsTouched();
      return;
    }

    const email = this.recuperarForm.value.email;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email);

    if (!usuario) {
      this.error = 'Usuario no encontrado con ese correo.';
    } else {
      this.usuarioEncontrado = usuario;
      this.mensaje = `Hola ${usuario.nombre}, tu contraseña actual es: ${usuario.password}`;
      setTimeout(() => this.mensaje = '', 5000);
    }
  }

  /**
   * Cambia la contraseña del usuario encontrado si el formulario es válido.
   * Actualiza los datos en localStorage y redirige al login tras unos segundos.
   */

  cambiarPassword(): void {
    if (this.cambioForm.invalid || !this.usuarioEncontrado) {
      this.cambioForm.markAllAsTouched();
      return;
    }

    const nueva = this.cambioForm.value.nuevaPassword;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.email === this.usuarioEncontrado.email);

    if (index !== -1) {
      usuarios[index].password = nueva;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      this.mensaje = 'Contraseña actualizada correctamente. Redirigiendo al login...';
      this.error = '';
      this.usuarioEncontrado = null;
      this.cambioForm.reset();
      this.recuperarForm.reset();

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2500);
    }
  }
}
