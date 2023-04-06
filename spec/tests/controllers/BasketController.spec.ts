import supertest, { SuperTest, Test, Response } from "supertest";
import app from "@src/index";
import BasketRepo from "@src/repos/BasketRepo";
import { baskets } from "@src/repos/data/baskets.json";
import { products } from "@src/repos/data/products.json";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import FullPaths from "@src/constants/FullPaths";
import { IBasket } from "@src/repos/models/Basket";
import { TReqBody } from "spec/support/types";
import ProductRepo from "@src/repos/ProductRepo";

// **** Variables **** //

// Paths
const { Get, Post, Delete } = FullPaths.Basket;

// StatusCodes
const { OK } = HttpStatusCodes;
const dummyBaskets = baskets as unknown as IBasket[];
const dummyBasketItem = {
  productId: 7596624904422,
  variantId: 42397295673574,
  count: 2,
};

// **** Tests **** //

describe("BasketRouter", () => {
  let agent: SuperTest<Test>;

  // Run before all tests
  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  // ** Get basket content ** //
  describe(`"GET:${Get}"`, () => {
    const callApi = (id: string) => agent.get(Get.replace(":id", id));

    // Success
    it("should return a JSON object with the basket content", (done) => {
      // Add spy
      spyOn(BasketRepo, "getOne").withArgs(1).and.resolveTo(dummyBaskets[0]);

      // Call API
      callApi("1").end((_: Error, res: Response) => {
        expect(res.status).toBe(OK);
        for (let i = 0; i < res.body.basket.items.length; i++) {
          const product = res.body.basket.items[i];
          expect(product).toEqual(dummyBaskets[0].items[i]);
        }
        done();
      });
    });
  });

  // ** Add product to the basket ** //
  describe(`"POST:${Post}"`, () => {
    const callApi = (id: string, reqBody: TReqBody) =>
      agent.post(Post.replace(":id", id)).type("form").send(reqBody);

    // Success
    it("should return a JSON object with updated basket content", (done) => {
      // Add spy
      spyOn(BasketRepo, "getOne").withArgs(2).and.resolveTo(dummyBaskets[0]);
      spyOn(ProductRepo, "getVariant").and.resolveTo(products[0].variants[0]);

      // Call API
      callApi("2", dummyBasketItem).end(
        (_: Error, { status, body: { basket } }: Response) => {
          expect(status).toBe(OK);
          for (let i = 0; i < basket.items.length; i++) {
            const product = basket.items[i];
            expect(product).toEqual(dummyBaskets[0].items[i]);
          }
          done();
        }
      );
    });
  });

  // ** Delete product from the basket ** //
  describe(`"DELETE:${Delete}"`, () => {
    const callApi = (id: string, reqBody: TReqBody) =>
      agent.delete(Delete.replace(":id", id)).type("form").send(reqBody);

    // Success
    it("should return a JSON object with updated basket content", (done) => {
      // Add spy
      spyOn(BasketRepo, "getOne").withArgs(2).and.resolveTo(dummyBaskets[0]);
      spyOn(ProductRepo, "getVariant").and.resolveTo(products[0].variants[0]);

      // Call API
      callApi("2", dummyBasketItem).end(
        (_: Error, { status, body: { basket } }: Response) => {
          expect(status).toBe(OK);
          for (let i = 0; i < basket.items.length; i++) {
            const product = basket.items[i];
            expect(product).toEqual(dummyBaskets[0].items[i]);
          }
          done();
        }
      );
    });
  });
});
