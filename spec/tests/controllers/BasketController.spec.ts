import supertest, { SuperTest, Test, Response } from "supertest";
import app from "@src/index";
import BasketRepo from "@src/repos/BasketRepo";
import baskets from "@src/repos/data/baskets.json";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import FullPaths from "@src/constants/FullPaths";
import { IBasket } from "@src/repos/models/Basket";

// **** Variables **** //

// Paths
const { Get, Post } = FullPaths.Basket;

// StatusCodes
const { OK } = HttpStatusCodes;
const dummyBaskets = baskets as unknown as IBasket[];

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
        // expect(res.status).toBe(OK);
        // for (let i = 0; i < res.body.basket.items.length; i++) {
        //   const product = res.body.basket.items[i];
        // expect(product).toEqual(dummyBaskets[0].items[i]);
        // }
        done();
      });
    });
  });
});
