import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  recuperarForm!: FormGroup;
  cambioForm!: FormGroup;
  error: string = '';
  mensaje: string = '';
  usuarioEncontrado: any = null;

  constructor(private fb: FormBuilder, private router: Router) {}

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

  get f() {
    return this.recuperarForm.controls;
  }

  get c() {
    return this.cambioForm.controls;
  }

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
