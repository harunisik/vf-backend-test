import { IBasket } from "./models/Basket";
import { RouteError } from "@src/util/RouteError";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { BASKET_NOT_FOUND_ERROR } from "@src/constants/Erorrs";
import RepoUtil from "./RepoUtil";

// **** Variables **** //

const DB_FILE_NAME = "data/baskets.json";

// **** Types **** //

interface IDb {
  baskets: IBasket[];
}

// **** Functions **** //

/**
 * Get one basket.
 */
async function getOne(id: number): Promise<IBasket | undefined> {
  const db = await openDb();
  return db.baskets.find((basket) => basket.id === id);
}

/**
 * Update a basket.
 */
async function update(basket: IBasket): Promise<IBasket> {
  const db = await openDb();
  for (let i = 0; i < db.baskets.length; i++) {
    if (db.baskets[i].id === basket.id) {
      db.baskets[i] = basket;
      saveDb(db);
      return basket;
    }
  }

  throw new RouteError(HttpStatusCodes.NOT_FOUND, BASKET_NOT_FOUND_ERROR);
}

function openDb() {
  return RepoUtil.openDb<IDb>(DB_FILE_NAME);
}

function saveDb(db: IDb) {
  RepoUtil.saveDb<IDb>(DB_FILE_NAME, db);
}

// **** Export default **** //

export default {
  getOne,
  update,
} as const;
