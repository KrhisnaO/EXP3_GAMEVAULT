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
   * Carga el carrito de compras desde el almacenamiento local.
   * Calcula el total de los productos en el carrito.
   */

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.cCarrito) || '[]');
    this.total = this.carrito.reduce((suma, juego) => suma + juego.precio * juego.cantidad, 0);
  }

  /**
   * 
   * @param index Índice del producto a eliminar del carrito.
   * Elimina el producto del carrito y actualiza el almacenamiento local.
   * Si el carrito queda vacío, se elimina del almacenamiento local.
   * Si el carrito no está vacío, se actualiza el almacenamiento local con los productos restantes.
   */
  eliminar(index: number): void {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.cCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  /**
   * Vacía el carrito de compras.
   * Elimina todos los productos del carrito y actualiza el almacenamiento local.
   * Si el carrito estaba vacío, se elimina del almacenamiento local.
   * Si el carrito no estaba vacío, se actualiza el almacenamiento local para reflejar que está vacío.
   */

  vaciarCarrito(): void {
    localStorage.removeItem(this.cCarrito);
    this.cargarCarrito();
  }

  /**
   * Verifica si el carrito de compras está vacío. 
   * Devuelve true si el carrito está vacío, false en caso contrario.
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
   * 
   * @param index Índice del producto en el carrito.
   * @param cantidad Nueva cantidad del producto.
   * Actualiza la cantidad de un producto en el carrito.
   * Si la cantidad es menor que 1, no se actualiza.
   * Actualiza el almacenamiento local con la nueva cantidad.
   */

  actualizarCantidad(index: number, cantidad: number): void {
    if (cantidad < 1) return;

    this.carrito[index].cantidad = cantidad;
    localStorage.setItem(this.cCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }
}
