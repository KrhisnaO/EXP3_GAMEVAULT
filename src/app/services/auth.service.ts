import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionSubject = new BehaviorSubject<any>(this.getSesion());
  sesion$ = this.sesionSubject.asObservable();

  constructor() {
    // Crear un admin por defecto si no existen usuarios
    const usuariosStr = localStorage.getItem('usuarios');
    if (!usuariosStr) {
      const admin = {
        nombre: 'Admin',
        usuario: 'admin',
        email: 'admin@gamevault.com',
        password: 'AdminVault987',
        tipo: 'admin',
        fechaNacimiento: '1990-01-01'
      };
      localStorage.setItem('usuarios', JSON.stringify([admin]));
      console.log("🛠 Admin creado: admin@gamevault.com / AdminVault987");
    }
  }
  /**
   * Obtiene la sesión actual desde localStorage
   */
  getSesion(): any {
    const sesion = localStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  /**
   * Verifica si el usuario está logueado
   */
  estaLogueado(): boolean {
    const sesion = this.getSesion();
    return sesion?.logueado || false;
  }

  /**
   * Verifica si el usuario actual es administrador
   */
  esAdmin(): boolean {
    const sesion = this.getSesion();
    return sesion?.tipo === 'admin';
  }

  /**
   * Inicia sesión con correo o nombre de usuario y contraseña
   */
  iniciarSesion(entrada: string, password: string): boolean {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const user = usuarios.find((u: any) =>
      (u.email === entrada || u.usuario === entrada) &&
      u.password === password
    );

    if (!user) return false;

    const sesionData = {
      logueado: true,
      nombre: user.nombre || user.usuario || user.email,
      usuario: user.usuario,
      email: user.email,
      tipo: user.tipo || 'normal',
      fechaNacimiento: user.fechaNacimiento || null
    };

    localStorage.setItem('sesion', JSON.stringify(sesionData));
    this.sesionSubject.next(sesionData);
    return true;
  }

  /**
   * Cierra sesión del usuario actual
   */
  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.sesionSubject.next(null);
  }

  /**
   * Registra un nuevo usuario si el correo o el nombre de usuario no están repetidos
   */
  registrarUsuario(user: any): boolean {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existe = usuarios.some((u: any) =>
      u.email === user.email || u.usuario === user.usuario
    );

    if (existe) return false;

    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return true;
  }

  /**
   * Actualiza los datos del usuario en sesión y en localStorage
   */
  actualizarSesion(datoActualizado: Partial<any>): boolean {
    const sesion = this.getSesion();
    if (!sesion) return false;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.email === sesion.email);
    if (index === -1) return false;

    // Actualizamos los datos del usuario
    usuarios[index] = { ...usuarios[index], ...datoActualizado };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Actualizamos también la sesión activa
    const nuevaSesion = { ...sesion, ...datoActualizado };
    localStorage.setItem('sesion', JSON.stringify(nuevaSesion));
    this.sesionSubject.next(nuevaSesion);

    return true;
  }
}
