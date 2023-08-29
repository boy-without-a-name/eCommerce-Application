interface Category {
  id: string;
  typeId: string;
}

interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

interface PriceValue {
  type: string;
  fractionDigits: number;
  centAmount: number;
  currencyCode: string;
}

interface Price {
  value: PriceValue;
  id: string;
}

interface Name {
  en: string;
}

interface Description {
  en: string;
}

interface Slug {
  en: string;
}

interface MasterVariant {
  attributes: string[];
  id: number;
  images: Image[];
  prices: Price[];
  sku: string;
}

interface Current {
  categories: Category[];
  description: Description;
  masterVariant: MasterVariant;
  name: Name;
  slug: Slug;
  variants: MasterVariant[];
  searchKeywords: Record<string, string>;
}

interface ProductData {
  current: Current;
  hasStagedChanges: boolean;
  published: boolean;
  staged: Current;
}

interface ProductType {
  id: string;
  typeId: string;
}

interface TaxCategory {
  id: string;
  typeId: string;
}

interface IProduct {
  id: string;
  version: number;
  masterData: ProductData;
  productType: ProductType;
  taxCategory: TaxCategory;
  createdAt: string;
  lastModifiedAt: string;
}
