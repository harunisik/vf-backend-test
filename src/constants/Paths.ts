/**
 * Express router paths go here.
 */

import { Immutable } from "@src/util/types";

const Paths = {
  Base: "/api",
  Products: {
    Base: "/products",
    Get: "/",
  },
  Basket: {
    Base: "/baskets",
    Get: "/:id",
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
