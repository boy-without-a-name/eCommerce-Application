export interface Category {
  id: string;
  typeId: string;
}

export interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

export interface PriceValue {
  type: string;
  fractionDigits: number;
  centAmount: number;
  currencyCode: string;
}

export interface Price {
  value: PriceValue;
  id: string;
}

export interface Name {
  'en-US': string;
}

export interface Description {
  'en-US': string;
}

export interface Slug {
  'en-US': string;
}

export interface MasterVariant {
  attributes: string[];
  id: number;
  images: Image[];
  prices: Price[];
  sku: string;
}

export interface Current {
  categories: Category[];
  description: Description;
  masterVariant: MasterVariant;
  name: Name;
  slug: Slug;
  variants: MasterVariant[];
  searchKeywords: Record<string, string>;
}

export interface ProductData {
  current: Current;
  hasStagedChanges: boolean;
  published: boolean;
  staged: Current;
}

export interface ProductType {
  id: string;
  typeId: string;
}

export interface TaxCategory {
  id: string;
  typeId: string;
}

export interface IProduct {
  id: string;
  version: number;
  masterData: ProductData;
  productType: ProductType;
  taxCategory: TaxCategory;
  createdAt: string;
  lastModifiedAt: string;
}

export interface ITransfer {
  img: Image[];
  index: number;
}
