import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})


export class CategoriasComponent implements OnInit {
  tipo: string = '';
  juegos: any[] = [];
  sesion: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener sesión
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    // Suscribirse a cambios de parámetros en la URL
    this.route.paramMap.subscribe(params => {
      const tipoParam = params.get('tipo');
      this.tipo = tipoParam ?? '';

      // Obtener todos los juegos
      const juegosGuardados = JSON.parse(localStorage.getItem('juegos') || '[]');

      // Filtrar por categoría
      this.juegos = juegosGuardados.filter((j: any) =>
        j?.categoria?.toLowerCase() === this.tipo.toLowerCase()
      );
    });
  }

  editar(juego: any): void {
    if (!this.sesion || this.sesion.tipo !== 'admin') return;

    const nuevoNombre = prompt('Nuevo nombre:', juego.nombre);
    const nuevaDescripcion = prompt('Nueva descripción:', juego.descripcion);
    const nuevoPrecio = prompt('Nuevo precio:', juego.precio);
    const enOferta = confirm('¿Está en oferta?');

    const juegos = JSON.parse(localStorage.getItem('juegos') || '[]');
    const index = juegos.findIndex((j: any) =>
      j.nombre === juego.nombre && j.categoria.toLowerCase() === this.tipo.toLowerCase()
    );

    if (index !== -1) {
      juegos[index] = {
        ...juegos[index],
        nombre: nuevoNombre?.trim() || juego.nombre,
        descripcion: nuevaDescripcion?.trim() || juego.descripcion,
        precio: parseFloat(nuevoPrecio || juego.precio),
        oferta: enOferta
      };
      localStorage.setItem('juegos', JSON.stringify(juegos));
      this.juegos = juegos.filter((j: any) =>
        j.categoria.toLowerCase() === this.tipo.toLowerCase()
      );
    }
  }

  agregarAlCarrito(juego: any): void {
    if (!this.sesion || this.sesion.tipo !== 'usuario') {
      alert('Debes iniciar sesión como usuario.');
      return;
    }

    const cCarrito = 'carrito_' + this.sesion.email;
    const carrito = JSON.parse(localStorage.getItem(cCarrito) || '[]');

    const index = carrito.findIndex((j: any) => j.nombre === juego.nombre);

    if (index !== -1) {
      carrito[index].cantidad++;
    } else {
      carrito.push({ ...juego, cantidad: 1 });
    }

    localStorage.setItem(cCarrito, JSON.stringify(carrito));
    alert('¡Agregado al carrito!');
  }

  formatearRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '-');
  }
}
