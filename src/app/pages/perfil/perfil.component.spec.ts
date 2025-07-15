import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getSesion', 'actualizarSesion']);

    TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar la sesión en ngOnInit', () => {
    const sesionMock = { nombre: 'Test User', email: 'test@correo.com' };
    authServiceSpy.getSesion.and.returnValue(sesionMock);

    component.ngOnInit();

    expect(component.sesion).toEqual(sesionMock);
    expect(authServiceSpy.getSesion).toHaveBeenCalled();
  });

  it('debería manejar guardarCambios correctamente', fakeAsync(() => {
    authServiceSpy.actualizarSesion.and.returnValue(true);

    component.sesion = { nombre: 'Test', email: 'test@correo.com' };
    component.guardarCambios();

    expect(authServiceSpy.actualizarSesion).toHaveBeenCalledWith(component.sesion);
    expect(component.exito).toBeTrue();
    expect(component.error).toBe('');

    tick(4000); // Esperar 4 segundos para que desaparezca el mensaje
    expect(component.exito).toBeFalse();

    // Caso error
    authServiceSpy.actualizarSesion.and.returnValue(false);
    component.guardarCambios();
    expect(component.error).toBe('No se pudieron guardar los cambios.');
  }));
});
