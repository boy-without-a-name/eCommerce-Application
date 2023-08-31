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
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
}
