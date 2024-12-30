export type ICustomer = {
  id: string;
  email: string;
}

export interface IVariantJson {
  id: number;
  title: string;
  price: string;
  position: number;
  price_currency: string;
  hehe: number;
}

export interface IImageJson {
  id: number;
  alt: string;
  src: string;
}

export interface IProductJson {
  id: number;
  title: string;
  vendor: string;
  product_type: string;
  handle: string;
  tags: string;
  variants: IVariantJson[];
  images: IImageJson[];
  image: IImageJson;
}

export interface IVariantJs {
  available: boolean;
}

export interface IProductJs {
  id: number;
  variants: IVariantJs[];
}
export interface IVariant {
  variants_json: IVariantJson[];
  variants_js: IVariantJs[];
}
export interface IProduct {

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
