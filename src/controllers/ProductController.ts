import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import ProductService from "@src/services/ProductService";
import { IReqQuery } from "@src/util/types";
import { Response as IRes } from "express";
import { Query } from "express-serve-static-core";

// **** Functions **** //

/**
 * Get all products.
 */
async function getAll({ query }: IReqQuery<Query>, res: IRes) {
  const orderByTitle = query.orderByTitle as string;
  const orderByPrice = query.orderByPrice as string;

  const products = await ProductService.getAll({
    orderByTitle,
    orderByPrice,
  });
  return res.status(HttpStatusCodes.OK).json({ products });
}

// **** Export default **** //

export default {
  getAll,
} as const;
