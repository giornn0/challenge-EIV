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
import { Router } from '@angular/router';
import { LocationsApiService } from '@app-features/locations';
import {
  getFormFromSeller,
  Seller,
  SellerForm,
} from '@app-features/sellers/seller.model';
import { SellersApiService } from '@app-features/sellers/services';
import {
  addYears,
  Color,
  ContainerComponent,
  DateRangeValidator,
  ImgPickerComponent,
  MessagesService,
  TypedForm,
} from '@shared';
import { PartialObserver } from 'rxjs';

const MINIMUM_SELLER_AGE = -18;
const MAXIMUM_SELLER_AGE = -65;

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
  router = inject(Router);
  messages = inject(MessagesService);
  $localidades = inject(LocationsApiService).getAll();

  service = inject(SellersApiService);
  photoControl = new FormControl();
  photoFile?: File;
  alreadyChargedPhotoSrc?: string;

  today = new Date();

  sellerForm = new FormGroup<TypedForm<SellerForm>>({
    id: new FormControl(null),
    nombre: new FormControl(null, [Validators.required]),
    usuarioLogin: new FormControl(null, [Validators.required]),
    fechaNacimiento: new FormControl(null, [
      Validators.required,
      DateRangeValidator(
        addYears(this.today, MAXIMUM_SELLER_AGE),
        addYears(this.today, MINIMUM_SELLER_AGE),
      ),
    ]),
    habilitado: new FormControl(false, [Validators.required]),
    observaciones: new FormControl(null, []),
    localidadId: new FormControl(null, [Validators.required]),
  });
  constructor(@Inject(DestroyRef) private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.setupEdition();
  }
  setupEdition() {
    const sellerInfo = this.service.sellerForEdit;
    if (!this.id || !sellerInfo) {
      return;
    }
    this.sellerForm.setValue(getFormFromSeller(sellerInfo));
    this.service
      .getPhoto(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handlerGetPhoto);
  }

  submit() {
    if (!this.sellerForm.valid) {
      return;
    }
    if (!this.id) {
      this.service
        .create(this.sellerForm.getRawValue())
        .subscribe(this.handlerSubmit);
    } else {
      this.service
        .update(this.sellerForm.getRawValue(), this.id)
        .subscribe(this.handlerSubmit);
    }
  }

  postSellerPhoto(seller: Seller) {
    if (!this.photoFile) {
      this.exit(true);
      return;
    }
    this.service
      .updatePhoto(seller.id, this.photoFile)
      .subscribe(this.handlerSubmitPhoto);
  }
  handlerSubmit: PartialObserver<Seller> = {
    next: (seller) => this.postSellerPhoto(seller),
  };
  handlerSubmitPhoto: PartialObserver<boolean> = {
    next: (successful) => {
      this.exit(successful);
    },
  };
  handlerGetPhoto: PartialObserver<File | null> = {
    next: (photoFile) => {
      if (photoFile) {
        this.alreadyChargedPhotoSrc = URL.createObjectURL(photoFile);
      }
    },
  };

  exit(withSuccess = false) {
    if (withSuccess) {
      this.showSuccessMessage();
    }
    this.service.clearEdition();
    this.location.back();
  }

  get successMessage() {
    return `¡Vendedor/a ${this.sellerForm.getRawValue().nombre} ${this.id ? 'editado' : 'creado'}/a con éxito!`;
  }

  showSuccessMessage() {
    this.messages.push({
      message: this.successMessage,
      color: Color.Success,
    });
  }
}
