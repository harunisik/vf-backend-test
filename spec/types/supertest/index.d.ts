import { IBasket } from "@src/repos/models/Basket";
import { IProduct } from "@src/repos/models/Product";
import "supertest";

declare module "supertest" {
  export interface Response {
    headers: Record<string, string[]>;
    body: {
      error: string;
      products: IProduct[];
      basket: IBasket;
    };
  }
}
