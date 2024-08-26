import { DateFormat, Nullable } from '../../shared/models/utils.types';
import { Location } from '../locations/location.model';

export type SellerForm = {
  id?: number;
  usuarioLogin: string;
  nombre: string;
  habilitado: boolean;
  fechaNacimiento: DateFormat;
  observaciones: Nullable<string>;
  localidadId: number;
};

export type Seller = {
  id: number;
  localidad: Location;
} & Omit<SellerForm, 'localidadId'>;

export const getFormFromSeller = (seller: Seller): SellerForm => ({
  id: seller.id,
  usuarioLogin: seller.usuarioLogin,
  nombre: seller.nombre,
  habilitado: seller.habilitado,
  fechaNacimiento: seller.fechaNacimiento,
  observaciones: seller.observaciones,
  localidadId: seller.localidad.id,
});
