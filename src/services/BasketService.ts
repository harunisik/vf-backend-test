import {
  BASKET_NOT_FOUND_ERROR,
  PRODUCT_COUNT_IS_GREATER_ERROR,
  PRODUCT_NOT_FOUND_IN_BASKET_ERROR,
  VARIANT_NOT_FOUND_ERROR,
} from "@src/constants/Erorrs";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { RouteError } from "@src/util/RouteError";
import BasketRepo from "@src/repos/BasketRepo";
import ProductRepo from "@src/repos/ProductRepo";
import { IBasket, IBasketItem } from "@src/repos/models/Basket";
import { IVariant } from "@src/repos/models/Product";

// **** Functions **** //

/**
 * Get one basket content.
 */
async function getOne(id: number): Promise<IBasket> {
  const basket = await BasketRepo.getOne(id);
  if (!basket) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, BASKET_NOT_FOUND_ERROR);
  }

  return basket;
}

/**
 * Add a product to the given basket.
 */
async function addProduct(
  basketId: number,
  basketItem: IBasketItem
): Promise<IBasket> {
  const basket = await getOne(basketId);

  const item = findBasketItem(
    basketItem.productId,
    basketItem.variantId,
    basket
  );

  if (item) {
    item.count += basketItem.count;
  } else {
    basket.items.push(basketItem);
  }

  // update total price
  const variant = await getVariant(basketItem.productId, basketItem.variantId);
  basket.totalPrice += Number(variant.price) * basketItem.count;

  return BasketRepo.update(basket);
}

/**
 * Add a product to the given basket.
 */
async function removeProduct(
  basketId: number,
  basketItem: IBasketItem
): Promise<IBasket> {
  const basket = await getOne(basketId);

  const item = findBasketItem(
    basketItem.productId,
    basketItem.variantId,
    basket
  );

  if (!item) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PRODUCT_NOT_FOUND_IN_BASKET_ERROR
    );
  }

  if (item.count < basketItem.count) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PRODUCT_COUNT_IS_GREATER_ERROR
    );
  } else if (item.count === basketItem.count) {
    basket.items = removeBasketItem(
      basketItem.productId,
      basketItem.variantId,
      basket
    );
  } else {
    item.count -= basketItem.count;
  }

  // update total price
  const variant = await getVariant(basketItem.productId, basketItem.variantId);
  basket.totalPrice -= Number(variant.price) * basketItem.count;

  return BasketRepo.update(basket);
}

/**
 * Get one product variant.
 */
async function getVariant(
  productId: number,
  variantId: number
): Promise<IVariant> {
  const variant = await ProductRepo.getVariant(productId, variantId);
  if (!variant) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VARIANT_NOT_FOUND_ERROR);
  }

  return variant;
}

/**
 * Find one basket item.
 */
function findBasketItem(
  productId: number,
  variantId: number,
  basket: IBasket
): IBasketItem | undefined {
  return basket.items.find(
    (item) => productId === item.productId && variantId === item.variantId
  );
}

/**
 * Remove one basket item.
 */
function removeBasketItem(
  productId: number,
  variantId: number,
  basket: IBasket
): IBasketItem[] {
  return basket.items.filter(
    (item) => productId !== item.productId && variantId !== item.variantId
  );
}

// **** Export default **** //

export default {
  getOne,
  addProduct,
  removeProduct,
} as const;
