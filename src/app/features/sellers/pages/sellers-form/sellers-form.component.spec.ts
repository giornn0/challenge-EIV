import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersFormComponent } from './sellers-form.component';
import { By } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { addYears } from '@shared';
import { Location, LocationsApiService } from '@app-features/locations';
import { of } from 'rxjs';
import { formatDate } from '@angular/common';

describe('SellersFormComponent', () => {
  let component: SellersFormComponent;
  let fixture: ComponentFixture<SellersFormComponent>;
  let mockedLocationService!: { getAll: jest.Mock };
  beforeEach(async () => {
    const mockListLocations = jest.fn();
    mockListLocations.mockReturnValue(
      of([
        {
          id: 1,
          codigoPostal: '123',
          localidad: 'Mock Localidad',
        },
        {
          id: 3,
          codigoPostal: '152',
          localidad: 'Mock Localidad 2',
        },
        {
          id: 2,
          codigoPostal: '2313',
          localidad: 'Mock Localidad 3',
        },
        {
          id: 4,
          codigoPostal: '321',
          localidad: 'Mock Localidad 4',
        },
      ] as Location[]),
    );
    mockedLocationService = {
      getAll: mockListLocations,
    };
    TestBed.configureTestingModule({
      imports: [SellersFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: LocationsApiService,
          useValue: mockedLocationService,
        },
      ],
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

    nombreInput.value = 'Mock Vendedor';
    nombreInput.dispatchEvent(new Event('input'));
    const usuarioLoginInput = fixture.debugElement.query(
      By.css('input[formControlName="usuarioLogin"]'),
    ).nativeElement;

    usuarioLoginInput.value = 'usuario@prueba.com';
    usuarioLoginInput.dispatchEvent(new Event('input'));
    const fechaNacimientoInput = fixture.debugElement.query(
      By.css('input[formControlName="fechaNacimiento"]'),
    ).nativeElement;

    const today = new Date();

    fechaNacimientoInput.value = formatDate(
      addYears(today, -20),
      'yyyy-MM-dd',
      'en',
    );
    fechaNacimientoInput.dispatchEvent(new Event('input'));
    const localidadIdInput = fixture.debugElement.query(
      By.css('select[formControlName="localidadId"]'),
    ).nativeElement as HTMLSelectElement;

    localidadIdInput.selectedIndex = 2;
    localidadIdInput.dispatchEvent(new Event('change'));
    const habilitadoInput = fixture.debugElement.query(
      By.css('input[formControlName="habilitado"]'),
    ).nativeElement;

    habilitadoInput.value = true;
    habilitadoInput.dispatchEvent(new Event('input'));
    const observacionesInput = fixture.debugElement.query(
      By.css('textarea[formControlName="observaciones"]'),
    ).nativeElement;

    observacionesInput.value = 'testuser';
    observacionesInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.sellerForm.valid).toBeTruthy();
  });
});
