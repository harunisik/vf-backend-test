import { IProduct, IVariant } from "@src/repos/models/Product";
import RepoUtil from "./RepoUtil";

// **** Variables **** //

const DB_FILE_NAME = "data/products.json";

// **** Types **** //

interface IDb {
  products: IProduct[];
}

// **** Functions **** //

/**
 * Get all products.
 */
async function getAll(): Promise<IProduct[]> {
  const db = await openDb();
  return db.products;
}

/**
 * Get one product.
 */
async function getOne(id: number): Promise<IProduct | undefined> {
  const db = await openDb();
  return db.products.find((product) => product.id === id);
}

/**
 * Get one product variant.
 */
async function getVariant(
  productId: number,
  variantId: number
): Promise<IVariant | undefined> {
  const product = await getOne(productId);
  return product?.variants.find(({ id }) => id === variantId);
}

function openDb() {
  return RepoUtil.openDb<IDb>(DB_FILE_NAME);
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  getVariant,
} as const;
