import { ImageCart } from './image.interface';
import { PriceInterface } from './price.interface';

export interface ProductCart {
  id: string;
  productId: string;
  name: {
    'en-US': string;
    ru: string;
  };
  productType: {
    typeId: string;
    id: string;
    version: string;
  };
  productSlug: {
    'en-US': string;
    ru: string;
  };
  variant: {
    id: number;
    sku: string;
    key: string;
    prices: [
      {
        id: string;
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
        discounted: {
          value: {
            type: string;
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
          };
          discount: {
            typeId: string;
            id: string;
          };
        };
      },
    ];
    images: ImageCart[];
    attributes: [];
    assets: [];
  };
  price: {
    id: string;
    value: PriceInterface;
    discounted?: {
      value: PriceInterface;
      discount: {
        typeId: string;
        id: string;
      };
    };
  };
  quantity: number;
  discountedPricePerQuantity: [];
  perMethodTaxRate: [];
  addedAt: string;
  lastModifiedAt: string;
  state: [
    {
      quantity: number;
      state: {
        typeId: string;
        id: string;
      };
    },
  ];
  priceMode: string;
  lineItemMode: string;
  totalPrice: PriceInterface;
  taxedPrice: {
    totalNet: PriceInterface;
    totalGross: PriceInterface;
    totalTax: PriceInterface;
  };
  taxedPricePortions: [];
}
