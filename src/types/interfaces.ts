export type ICustomer = {
  id: string;
  email: string;
}

export interface IVariant {
  id: number;
  title: string;
  price: string;
  position: number;
  price_currency: string;
}

export interface IImage {
  id: number;
  alt: string;
  src: string;
}

export interface IProduct {
  id: number;
  title: string;
  vendor: string;
  product_type: string;
  handle: string;
  tags: string;
  variants: IVariant[];
  images: IImage[];
  image: IImage;
}

export interface IConfig {
  number_of_items: number;
  background_color: string;
  text_color: string;
  layout: '' | 'Layout1' | 'layout2' | 'Layout3';
  id: string;
}

export interface IEntry {
  id: number;
  handle: string;
}