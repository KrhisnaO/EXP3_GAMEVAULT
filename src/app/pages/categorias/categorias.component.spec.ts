import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; // <-- Import importante
import { of } from 'rxjs';

import { CategoriasComponent } from './categorias.component';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;

  beforeEach(() => {
    const mockActivatedRoute = {
      paramMap: of({
        get: (param: string) => 'estrategia'  // simulamos /categorias/estrategia
      })
    };

    const mockJuegos = [
      { nombre: 'Catan', categoria: 'estrategia', precio: 29990 },
      { nombre: 'Uno', categoria: 'cartas', precio: 9990 }
    ];

    const mockSesion = {
      email: 'test@test.com',
      tipo: 'usuario'
    };

    localStorage.setItem('juegos', JSON.stringify(mockJuegos));
    localStorage.setItem('sesion', JSON.stringify(mockSesion));

    TestBed.configureTestingModule({
      declarations: [CategoriasComponent],
      imports: [RouterTestingModule],  // <-- Agregado para routerLink
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    });

    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar solo juegos de la categoría estrategia', () => {
    expect(component.juegos.length).toBe(1);
    expect(component.juegos[0].nombre).toBe('Catan');
  });

  it('debería agregar un juego al carrito si la sesión es tipo usuario', () => {
    spyOn(window, 'alert'); 

    const juego = { nombre: 'Catan', categoria: 'estrategia', precio: 29990 };
    component.agregarAlCarrito(juego);

    const carrito = JSON.parse(localStorage.getItem('carrito_test@test.com') || '[]');
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Catan');
    expect(carrito[0].cantidad).toBe(1);
  });

  it('debería convertir un nombre a ruta amigable', () => {
    const ruta = component.formatearRuta('Terraforming Mars');
    expect(ruta).toBe('terraforming-mars');
  });
});
