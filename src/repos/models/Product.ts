// **** Types **** //

export interface IProduct {
  id: number;
  title: string;
  variants: IVariant[];
}

export interface IVariant {
  id: number;
  title: string;
  price: string;
}
