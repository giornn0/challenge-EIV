import { AsyncPipe, Location } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocationsApiService } from '@app-features/locations';
import { SellerForm } from '@app-features/sellers/seller.model';
import { SellersApiService } from '@app-features/sellers/services';
import {
  ContainerComponent,
  ImgPickerComponent,
  log,
  TypedForm,
} from '@shared';

@Component({
  selector: 'app-sellers-form',
  standalone: true,
  imports: [
    ContainerComponent,
    ReactiveFormsModule,
    ImgPickerComponent,
    AsyncPipe,
  ],
  templateUrl: './sellers-form.component.html',
  styleUrl: './sellers-form.component.scss',
})
export class SellersFormComponent implements OnInit {
  @Input() id?: number;
  location = inject(Location);
  $localidades = inject(LocationsApiService).getAll();
  constructor(@Inject(DestroyRef) private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.photoControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(log);
  }
  service = inject(SellersApiService);
  photoControl = new FormControl();

  sellerForm = new FormGroup<TypedForm<SellerForm>>({
    nombre: new FormControl(null, [Validators.required]),
    usuarioLogin: new FormControl(null, [Validators.required]),
    fechaNacimiento: new FormControl(null, [Validators.required]),
    habilitado: new FormControl(null, [Validators.required]),
    observaciones: new FormControl(null, []),
    localidadId: new FormControl(null, [Validators.required]),
  });

  back() {
    this.location.back();
  }
  submit() {
    if (!this.sellerForm.valid) {
      return;
    }
    this.service.create(this.sellerForm.getRawValue()).subscribe(console.log);
  }
}
