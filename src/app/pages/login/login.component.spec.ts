import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { LoginComponent } from './login.component'; 

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: El formulario debe ser inválido si los campos están vacíos
  it('debería marcar el formulario como inválido si los campos están vacíos', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  // Test 3: Email debe tener formato válido
  it('debería marcar el campo email como inválido si el formato no es correcto', () => {
    component.loginForm.setValue({ email: 'correo_malo', password: '123456' });
    expect(component.loginForm.get('email')?.valid).toBeFalse();
  });

  // Test 4: Formulario válido si los datos son correctos
  it('debería marcar el formulario como válido si los campos están completos y bien escritos', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: '123456' });
    expect(component.loginForm.valid).toBeTrue();
  });
});
