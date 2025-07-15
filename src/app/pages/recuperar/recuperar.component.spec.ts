import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RecuperarComponent } from './recuperar.component';

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let fixture: ComponentFixture<RecuperarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RecuperarComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    });

    fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar error si email es inválido al recuperar', () => {
    component.recuperarForm.controls['email'].setValue('no-email');
    component.recuperar();
    expect(component.error).toBe('Por favor, ingresa un correo válido.');
    expect(component.usuarioEncontrado).toBeNull();
  });

  it('debería recuperar usuario y cambiar contraseña correctamente', fakeAsync(() => {
    // Prepara usuarios en localStorage
    const usuarios = [
      { nombre: 'Test User', email: 'test@correo.com', password: 'Pass123!' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Recuperar usuario
    component.recuperarForm.controls['email'].setValue('test@correo.com');
    component.recuperar();
    expect(component.usuarioEncontrado).toBeTruthy();
    expect(component.mensaje).toContain('tu contraseña actual es');

    // Cambiar contraseña
    component.cambioForm.controls['nuevaPassword'].setValue('NewPass1!');
    component.cambiarPassword();

    const usuariosActualizados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    expect(usuariosActualizados[0].password).toBe('NewPass1!');
    expect(component.mensaje).toBe('Contraseña actualizada correctamente. Redirigiendo al login...');
    expect(component.error).toBe('');
    expect(component.usuarioEncontrado).toBeNull();

    tick(2500);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
