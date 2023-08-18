export interface DataUser {
  id?: string;
  version?: number;
  versionModifiedAt?: string;
  lastMessageSequenceNumber?: number;
  createdAt?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: {
    clientId?: string;
    isPlatformClient?: boolean;
  };
  createdBy?: {
    clientId?: string;
    isPlatformClient?: boolean;
  };
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  addresses?: [];
  shippingAddressIds?: [];
  billingAddressIds?: [];
  isEmailVerified?: boolean;
  stores?: [];
  authenticationMode?: string;
}
