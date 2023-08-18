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
  date?: string;
  address?: {
    streetName: string;
    streetNumber: string;
    postalCode: number;
    city: string;
    country: string;
  };
}
