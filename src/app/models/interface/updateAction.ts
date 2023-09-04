import { IAddress } from './address.interface';

export interface UpdateAction {
  action: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  addressId?: string;
  address?: IAddress;
}
