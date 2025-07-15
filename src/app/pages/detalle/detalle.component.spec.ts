import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetalleComponent } from './detalle.component';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;

  beforeEach(() => {
    // Juego simulado y sesión simulada
    const mockJuego = {
      nombre: 'Catan',
      categoria: 'estrategia',
      precio: 28990,
      descripcion: 'Juego clásico'
    };
    const mockSesion = {
      tipo: 'usuario',
      email: 'user@test.com'
    };

    localStorage.setItem('juegos', JSON.stringify([mockJuego]));
    localStorage.setItem('sesion', JSON.stringify(mockSesion));

    // Ruta simulada: el nombre llega como en la URL (con guiones)
    const mockRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'catan'
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [DetalleComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }]
    });

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit se ejecuta aquí
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ✅ Test 1: componente creado correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: debería cargar el juego correcto desde localStorage
  it('debería cargar el juego desde localStorage según el nombre en la URL', () => {
    expect(component.juego).toBeTruthy();
    expect(component.juego.nombre).toBe('Catan');
  });

  // ✅ Test 3: debería agregar el juego al carrito si el usuario está logueado
  it('debería agregar al carrito si el usuario es válido', () => {
    spyOn(window, 'alert'); // Prevenir alert real

    component.agregarAlCarrito(component.juego);

    const carrito = JSON.parse(localStorage.getItem('carrito_user@test.com') || '[]');
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Catan');
    expect(carrito[0].cantidad).toBe(1);
  });
});
