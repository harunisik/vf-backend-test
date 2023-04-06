import supertest, { SuperTest, Test, Response } from "supertest";
import app from "@src/index";
import ProductRepo from "@src/repos/ProductRepo";
import products from "@src/repos/data/products.json";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import FullPaths from "@src/constants/FullPaths";
import { IProduct } from "@src/repos/models/Product";

// **** Variables **** //

// Paths
const { Get } = FullPaths.Products;

// StatusCodes
const { OK } = HttpStatusCodes;
const dummyProducts = products as unknown as IProduct[];

// **** Tests **** //

describe("ProductRouter", () => {
  let agent: SuperTest<Test>;

  // Run before all tests
  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  // ** Get all products ** //
  describe(`"GET:${Get}"`, () => {
    const callApi = () => agent.get(Get);

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
