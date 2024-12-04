export type ICustomer = {
  id: string;
  email: string;
}

export interface IVariant {
  id: string;
  title: string;
  taxCode: string;
  price: string;
  image: string | null;
}

export interface IFeaturedMedia {
  id: string;
  alt: string;
  mediaContentType: string;
  preview: {
    image: {
      url: string;
    };
  };
}

export interface IPriceRange {
  maxVariantPrice: {
    amount: string;
    currencyCode: string;
  };
  minVariantPrice: {
    amount: string;
    currencyCode: string;
  };
}

export interface IProduct {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  variants: IVariant[];
  tags: string[];
  productType: string;
  totalInventory: number | null | undefined;
  description: string;
  featuredMedia: IFeaturedMedia;
  priceRangeV2: IPriceRange;
}

export interface IConfig {
  number_of_items: number;
  background_color: string;
  text_color: string;
  layout: '' | 'Layout1' | 'layout2' | 'Layout3';
  id: string;
}