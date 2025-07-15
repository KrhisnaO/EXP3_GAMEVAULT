import { Component, OnInit } from '@angular/core';

/**
 * Componente CarritoComponent
 * 
 * Gestiona el carrito de compras del usuario.
 * Permite visualizar los productos agregados, actualizar cantidades, eliminarlos y finalizar la compra.
 */
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  /**
   * Lista de productos en el carrito.
   * Cada producto contiene propiedades como nombre, precio y cantidad.
   */
  carrito: any[] = [];
  /**
   * Total del precio de todos los productos en el carrito.
   * Se calcula multiplicando el precio de cada producto por su cantidad.
   */
  total = 0;
  /**
   * Clave del carrito en el almacenamiento local.
   * Se construye a partir del email del usuario logueado.
   */
  cCarrito = '';
  /**
   * Objeto que contiene la información de la sesión del usuario.
   * Se obtiene desde el almacenamiento local al cargar el componente.
   */ 
  sesion: any = null;

  /**
   * Inicializa el componente y carga la sesión del usuario.
   * Si el usuario está logueado, se carga el carrito asociado a su email.
   */
  ngOnInit(): void {
    // Obtener sesión
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (this.sesion?.logueado && this.sesion?.tipo === 'usuario') {
      this.cCarrito = 'carrito_' + this.sesion.email;
      this.cargarCarrito();
    }
  }

  /**
   * Carga los productos del carrito desde localStorage.
   * Calcula el total actual del carrito.
   */

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.cCarrito) || '[]');
    this.total = this.carrito.reduce((suma, juego) => suma + juego.precio * juego.cantidad, 0);
  }

  /**
   * Elimina un producto del carrito por su índice.
   * @param index Índice del producto en el array del carrito.
   */

  eliminar(index: number): void {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.cCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  /**
   * Vacía completamente el carrito del usuario.
   * Elimina el carrito del localStorage y actualiza la vista.
   */

  vaciarCarrito(): void {
    localStorage.removeItem(this.cCarrito);
    this.cargarCarrito();
  }

  /**
   * Simula la acción de compra del usuario.
   * Si el carrito no está vacío, muestra un mensaje de agradecimiento y lo vacía.
   */
  comprar(): void {
    if (this.carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('¡Gracias por tu compra!');
    this.vaciarCarrito();
  }

   /**
   * Actualiza la cantidad de un producto específico en el carrito.
   * @param index Índice del producto en el array del carrito.
   * @param cantidad Nueva cantidad a asignar al producto.
   */

  actualizarCantidad(index: number, cantidad: number): void {
    if (cantidad < 1) return;

    this.carrito[index].cantidad = cantidad;
    localStorage.setItem(this.cCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }
}
