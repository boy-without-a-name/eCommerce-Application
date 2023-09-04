export interface AccessTokenResponse {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
}

export interface IRegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  date: string;
  address: IAddress;
}

export interface IAddress {
  id: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  type?: string[];

  key?: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  additionalStreetInfo?: string;
  region?: string;
  state?: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
}
