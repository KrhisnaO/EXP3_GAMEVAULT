import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Componente para mostrar los detalles de un juego específico.
 * Permite a los usuarios ver la información del juego y agregarlo al carrito de compras.
 * Los datos del juego se obtienen del almacenamiento local del navegador.
 */

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {
  juego: any = null;
  sesion: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener sesión
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;


    const nombreJuego = this.route.snapshot.paramMap.get('nombre');
    const juegos = JSON.parse(localStorage.getItem('juegos') || '[]');

    this.juego = juegos.find((j: any) =>
      j.nombre.toLowerCase().replace(/\s/g, '-') === nombreJuego?.toLowerCase()
    );
  }

  agregarAlCarrito(juego: any): void {
    if (!this.sesion || this.sesion.tipo !== 'usuario') {
      alert('Debes iniciar sesión como usuario.');
      return;
    }

    const claveCarrito = 'carrito_' + this.sesion.email;
    const carrito = JSON.parse(localStorage.getItem(claveCarrito) || '[]');

    const index = carrito.findIndex((j: any) => j.nombre === juego.nombre);

    if (index !== -1) {
      carrito[index].cantidad++;
    } else {
      carrito.push({ ...juego, cantidad: 1 });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert('¡Agregado al carrito!');
  }
}
