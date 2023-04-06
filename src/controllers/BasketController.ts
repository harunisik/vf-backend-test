import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import BasketService from "@src/services/BasketService";
import { Response as IRes } from "express";
import { IBasketItem } from "@src/repos/models/Basket";
import { IReq } from "@src/util/types";

// **** Functions **** //

/**
 * Get one basket content
 */
async function get(req: IReq, res: IRes) {
  const id = +req.params.id;
  const basket = await BasketService.get(id);
  return res.status(HttpStatusCodes.OK).json({ basket });
}

/**
 * Add a product to the given basket
 */
async function addProduct(req: IReq<IBasketItem>, res: IRes) {
  const id = +req.params.id;
  const basketItem = req.body;
  const basket = await BasketService.addProduct(id, basketItem);
  return res.status(HttpStatusCodes.OK).json({ basket });
}

/**
 * Remove a product from the given basket
 */
async function removeProduct(req: IReq<IBasketItem>, res: IRes) {
  const id = +req.params.id;
  const basketItem = req.body;
  const basket = await BasketService.removeProduct(id, basketItem);
  return res.status(HttpStatusCodes.OK).json({ basket });
}

// **** Export default **** //

export default {
  get,
  addProduct,
  removeProduct,
} as const;
