import { DateFormat, Nullable } from '../../shared/models/utils.types';
import { Location } from '../locations/location.model';

export type SellerForm = {
  id?: number;
  usuarioLogin: string;
  nombre: string;
  habilitado: string;
  fechaNacimiento: DateFormat;
  observaciones: Nullable<string>;
  localidadId: number;
};

export type Seller = {
  id: number;
  localidad: Location;
} & SellerForm;
