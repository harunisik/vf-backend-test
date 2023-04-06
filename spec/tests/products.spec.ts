import supertest, { SuperTest, Test, Response } from "supertest";
import { defaultErrMsg as ValidatorErr } from "jet-validator";
import insertUrlParams from "inserturlparams";

import app from "@src/index";

import ProductRepo from "@src/repos/ProductRepo";
import products from "@src/repos/data/products.json";
import baskets from "@src/repos/data/baskets.json";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import FullPaths from "@src/constants/FullPaths";

import { TReqBody } from "spec/support/types";
import { IProduct } from "@src/repos/models/Product";
import { IBasket } from "@src/repos/models/Basket";
import BasketRepo from "@src/repos/BasketRepo";

// **** Variables **** //

// Paths
const { Get: ProductGet } = FullPaths.Products;
const { Get: BasketGet } = FullPaths.Basket;

// StatusCodes
const { OK, CREATED, NOT_FOUND, BAD_REQUEST } = HttpStatusCodes;
const dummyProducts = products as unknown as IProduct[];
const dummyBaskets = baskets as unknown as IBasket[];

// **** Tests **** //

describe("ProductRouter", () => {
  let agent: SuperTest<Test>;

  // Run before all tests
  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  // ** Get all products ** //
  describe(`"GET:${ProductGet}"`, () => {
    const callApi = () => agent.get(ProductGet);

    // Success
    it("should return a JSON object with all the products", (done) => {
      // Add spy
      spyOn(ProductRepo, "getAll").and.resolveTo(dummyProducts);
      // Call API
      callApi().end((_: Error, res: Response) => {
        expect(res.status).toBe(OK);
        for (let i = 0; i < res.body.products.length; i++) {
          const product = res.body.products[i];
          expect(product).toEqual(dummyProducts[i]);
        }
        done();
      });
    });
  });
});
