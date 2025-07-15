import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { AuthService } from '../../services/auth.service';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['registrarUsuario']);
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegistroComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: rSpy }
      ]
    });

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario inválido si campos requeridos están vacíos', () => {
    component.registroForm.setValue({
      nombre: '',
      usuario: '',
      email: '',
      fechaNacimiento: '',
      password: '',
      confirmarPassword: '',
      tipo: 'usuario'
    });
    expect(component.registroForm.valid).toBeFalse();
  });

  it('debería registrar usuario y navegar a login si el registro es exitoso', fakeAsync(() => {
    // Preparar formulario válido
    component.registroForm.setValue({
      nombre: 'Test',
      usuario: 'testuser',
      email: 'test@correo.com',
      fechaNacimiento: '2000-01-01',
      password: 'Abcdef1!',
      confirmarPassword: 'Abcdef1!',
      tipo: 'usuario'
    });

    authServiceSpy.registrarUsuario.and.returnValue(true);

    component.registrar();
    expect(authServiceSpy.registrarUsuario).toHaveBeenCalled();

    tick(2000); // Simular retraso de 2s para redirección
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.exito).toBeTrue();
  }));
});
