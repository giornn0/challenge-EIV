import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersFormComponent } from './sellers-form.component';
import { By } from '@angular/platform-browser';

describe('SellersFormComponent', () => {
  let component: SellersFormComponent;
  let fixture: ComponentFixture<SellersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellersFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a form with controls for Seller form', () => {
    expect(component.sellerForm.contains('id')).toBeTruthy();
    expect(component.sellerForm.contains('nombre')).toBeTruthy();
    expect(component.sellerForm.contains('usuarioLogin')).toBeTruthy();
    expect(component.sellerForm.contains('fechaNacimiento')).toBeTruthy();
    expect(component.sellerForm.contains('localidadId')).toBeTruthy();
    expect(component.sellerForm.contains('habilitado')).toBeTruthy();
    expect(component.sellerForm.contains('observaciones')).toBeTruthy();
  });

  it('should validate the form when filled correctly', () => {
    const nombreInput = fixture.debugElement.query(
      By.css('input[formControlName="nombre"]'),
    ).nativeElement;

    nombreInput.value = 'testuser';
    nombreInput.dispatchEvent(new Event('input'));
    const usuarioLoginInput = fixture.debugElement.query(
      By.css('input[formControlName="usuarioLogin"]'),
    ).nativeElement;

    usuarioLoginInput.value = 'testuser';
    usuarioLoginInput.dispatchEvent(new Event('input'));
    const fechaNacimientoInput = fixture.debugElement.query(
      By.css('input[formControlName="fechaNacimiento"]'),
    ).nativeElement;

    fechaNacimientoInput.value = 'testuser';
    fechaNacimientoInput.dispatchEvent(new Event('input'));
    const localidadIdInput = fixture.debugElement.query(
      By.css('input[formControlName="localidadId"]'),
    ).nativeElement;

    localidadIdInput.value = 'testuser';
    localidadIdInput.dispatchEvent(new Event('input'));
    const habilitadoInput = fixture.debugElement.query(
      By.css('input[formControlName="habilitado"]'),
    ).nativeElement;

    habilitadoInput.value = 'testuser';
    habilitadoInput.dispatchEvent(new Event('input'));
    const observacionesInput = fixture.debugElement.query(
      By.css('input[formControlName="observaciones"]'),
    ).nativeElement;

    observacionesInput.value = 'testuser';
    observacionesInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.sellerForm.valid).toBeTruthy();
  });
});
