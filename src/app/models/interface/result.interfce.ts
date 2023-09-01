export interface ResultInterface {
  createdAt: string;
  createdBy: {
    isPlatformClient?: boolean;
    user?: {
      id?: string;
      typeId?: string;
    };
  };
  id?: string;
  lastMessageSequenceNumber?: number;
  lastModifiedAt: string;
  lastModifiedBy?: {
    isPlatformClient: boolean;
    user?: {
      id?: string;
      typeId?: string;
    };
  };
  lastVariantId: number;
  masterData: {
    current: {
      categories?: [];
      categoryOrderHints?: { string: string };
      description?: {
        'en-US'?: string;
      };
      assets: [];
      attributes: [];
      id: number;
      images: [];
      prices: [
        {
          value?: {
            type?: string;
            fractionDigits?: number;
            centAmount?: number;
            currencyCode?: string;
          };
          id?: string;
        },
      ];
      metaDescription?: {
        'en-US'?: string;
        ru?: string;
      };
      metaTitle: {
        'en-US'?: string;
        ru?: string;
      };
      name: {
        'en-US'?: string;
        ru?: string;
      };
      searchKeywords: {
        'en-US'?: string;
        ru?: string;
      };
      slug: {
        'en-US'?: string;
        ru?: string;
      };
      variants: [];
    };
    hasStagedChanges: boolean;
    published: boolean;
    staged: {
      categories?: [];
      categoryOrderHints?: { string?: string };
      description: {
        'en-US'?: string;
      };
      masterVariant: {
        assets: [];
        attributes: [];
        id: number;
        images: [
          {
            url?: string;
          },
        ];
        prices: [
          {
            value: {
              type?: string;
              fractionDigits?: number;
              centAmount?: number;
              currencyCode?: string;
            };
            id?: string;
          },
        ];
      };
      metaDescription?: {
        'en-US'?: string;
        ru?: string;
      };
      metaTitle?: {
        'en-US'?: string;
        ru?: string;
      };
      name: {
        'en-US'?: string;
        ru?: string;
      };
      searchKeywords?: {
        'en-US'?: string;
        ru?: string;
      };
      slug?: {
        'en-US'?: string;
        ru?: string;
      };
      variants?: [];
    };
  };
  priceMode: string;
  productType: {
    id: string;
    typeId: string;
  };
  version?: string;
  versionModifiedAt?: string;
}
