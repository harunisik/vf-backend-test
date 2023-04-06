import { MULTIPLE_SORTING_PARAM_ERROR } from "@src/constants/Erorrs";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { RouteError } from "@src/util/RouteError";
import ProductRepo from "@src/repos/ProductRepo";
import { IProduct } from "@src/repos/models/Product";
import { compareString, compareNumber } from "@src/util/SortUtil";

// **** Types **** //

export interface ISortingOptions {
  orderByTitle?: string;
  orderByPrice?: string;
}

// **** Functions **** //

/**
 * Get all products.
 */
async function getAll(params?: ISortingOptions): Promise<IProduct[]> {
  const products = await ProductRepo.getAll();

  const orderByTitle = params?.orderByTitle;
  const orderByPrice = params?.orderByPrice;

  if (orderByTitle && orderByPrice) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      MULTIPLE_SORTING_PARAM_ERROR
    );
  }

  if (orderByTitle) {
    return products.sort((a, b) =>
      compareString(a.title, b.title, orderByTitle)
    );
  }

  if (orderByPrice) {
    return products
      .map((product) => {
        const sortedVariants = product.variants.sort((a, b) =>
          compareNumber(Number(a.price), Number(b.price), orderByPrice)
        );
        return { ...product, price: Number(sortedVariants[0].price) };
      })
      .sort((a, b) => compareNumber(a.price, b.price, orderByPrice));
  }

  return products;
}

// **** Export default **** //

export default {
  getAll,
} as const;
