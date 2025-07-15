import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Componente para la administración de juegos y usuarios.
 * Permite a los administradores agregar, eliminar y listar juegos y usuarios.
 * Los datos se almacenan en el localStorage del navegador.
 * También permite crear juegos con datos como nombre, categoría, precio, etc.
 * Y registrar nuevos usuarios con nombre, usuario, email y tipo.
 */

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  tipo: string = '';
  /** Lista de juegos almacenados */
  juegos: any[] = [];
  /** Lista de usuarios almacenados */
  usuarios: any[] = [];
   /** Objeto con los datos de sesión del usuario actual */
  sesion: any = null;

/** Objeto que representa un nuevo juego a agregar */
    nuevoJuego = {
    nombre: '',
    categoria: '',
    precio: 0,
    descripcion: '',
    edad: '',
    jugadores: '',
    duracion: '',
    mecanicas: '',
  };


/** Objeto que representa un nuevo usuario a registrar */
    nuevoUsuario = {
    nombre: '',
    usuario: '',
    email: '',
    password: '',
    tipo: 'usuario'
  };

  /**
   * Constructor con inyección de dependencias.
   * @param route ActivatedRoute para capturar parámetros de ruta si se necesitan.
   */

  constructor(private route: ActivatedRoute) {}

  /**
   * Inicializa el componente cargando datos desde localStorage:
   * - Datos de sesión.
   * - Juegos existentes.
   * - Usuarios registrados.
   */

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const juegosGuardados = JSON.parse(localStorage.getItem('juegos') || '[]');
    this.juegos = juegosGuardados;

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    this.usuarios = usuariosGuardados;
  }

  /**
   * Agrega un nuevo juego a la lista y lo guarda en localStorage.
   * No se agregará si faltan campos obligatorios (nombre, categoría o precio válido).
   */

  agregarJuego(): void {
    if (!this.nuevoJuego.nombre || !this.nuevoJuego.categoria || this.nuevoJuego.precio <= 0) return;

    this.juegos.push({ ...this.nuevoJuego });
    localStorage.setItem('juegos', JSON.stringify(this.juegos));
    this.nuevoJuego = { nombre: '', categoria: '', precio: 0, descripcion: '', edad: '', jugadores: '', duracion: '', mecanicas: ''  };
  }

  /**
   * Elimina un juego de la lista en la posición indicada.
   * También actualiza el localStorage.
   * @param index Índice del juego a eliminar
   */

  eliminarJuego(index: number): void {
    this.juegos.splice(index, 1);
    localStorage.setItem('juegos', JSON.stringify(this.juegos));
  }

  /**
   * Agrega un nuevo usuario a la lista y lo guarda en localStorage.
   * No se agregará si faltan campos obligatorios (nombre, usuario, email, password).
   */
    agregarUsuario(): void {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.usuario || !this.nuevoUsuario.email || !this.nuevoUsuario.password) return;

    this.usuarios.push({ ...this.nuevoUsuario });
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    this.nuevoUsuario = { nombre: '', usuario: '', email: '', password: '', tipo: 'usuario' };
  }

  /**
   * Elimina un usuario de la lista en la posición indicada.
   * También actualiza el localStorage.
   * @param index Índice del usuario a eliminar
   */

  eliminarUsuario(index: number): void {
    this.usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

}
