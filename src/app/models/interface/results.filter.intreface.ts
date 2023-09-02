export interface CardFilterInterface {
  id: string;
  version: number;
  productType: {
    typeId: string;
    id: string;
  };
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  categories: [];
  categoryOrderHints: { strung?: string };
  slug: {
    'en-US': string;
  };
  metaTitle: {
    'en-US': string;
    ru: string;
  };
  metaDescription: {
    'en-US': string;
  };
  variants: [
    {
      attributes: string[];
      assets: [];
      images: [
        {
          url: string;
          dimensions: {
            w: number;
            h: number;
          };
        },
      ];
      prices: [];
      key: string;
      sku: string;
      id: number;
    },
  ];
  masterVariant: {
    attributes: [];
    assets: [];
    images: [
      {
        url: string;
        dimensions: {
          w: number;
          h: number;
        };
      },
      {
        url: string;
        dimensions: {
          w: number;
          h: number;
        };
      },
    ];
    prices: [
      {
        id: string;
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
      },
    ];
    key: string;
    sku: string;
    id: number;
  };
  searchKeywords: { strung?: string };
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}
