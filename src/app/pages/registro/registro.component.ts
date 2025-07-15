import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Componente de registro de usuario.
 * Permite a los usuarios registrarse proporcionando información personal y los guarda en localStorage.
 */ 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  /**
   * Formulario de registro que contiene los campos necesarios para crear un nuevo usuario.
   */
  registroForm!: FormGroup;

  /**
   * Mensaje de error mostrado al usuario si ocurre un problema durante el registro.
   */
  error: string = '';

  /**
   * Mensaje de exito mostrado al usuario cuando el registro se completa exitosamente.
   */
  exito: boolean = false;

  /**
   * Constructor del componente RegistroComponent.
   * @param fb FormBuilder para construir formularios.
   * @param router Router de enrutamiento para navegar entre rutas de la aplicación.
   * @param auth AuthService de autenticación para manejar el registro de usuarios.
   */

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  /**
   * Inicializa el formulario con validaciones y validadores personalizados
   */
  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.validarEdadMinima]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      confirmarPassword: ['', Validators.required],
      tipo: ['usuario']
    }, { validators: this.coincidePassword });
  }

  get f() {
    return this.registroForm.controls;
  }
/**
 * Validador personalizado, verifica que el usuario tenga al menos 13 años de edad. 
 * @param control Control del formulario que contiene la fecha de nacimiento del usuario.
 * @returns Objeto de error si la edad es menor a 13 años.
 */
  validarEdadMinima(control: AbstractControl) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    return edad >= 13 ? null : { edadMinima: true };
  }

  /**
   * 
   * @param group Grupo de controles del formulario que contiene los campos de contraseña y confirmación de contraseña.
   * @returns Objeto con error si no se cumplen las validaciones.
   */

  coincidePassword(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { noCoinciden: true };
  }

/**
 * Registra al usuario si el formulario es valido
 * Guarda los datos en localStorage y redirige al usuario a la página de inicio de sesión.
 */
  registrar() {
    this.error = '';
    this.exito = false;

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const { nombre, usuario, email, password, fechaNacimiento, tipo } = this.registroForm.value;

    const nuevoUsuario = { nombre, usuario, email, password, fechaNacimiento, tipo };

    const registrado = this.auth.registrarUsuario(nuevoUsuario);
    if (!registrado) {
      this.error = 'Ya existe un usuario con ese correo o nombre.';
      return;
    }

    this.exito = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
