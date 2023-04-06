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
    Base: "/basket",
    Get: "/:id",
    Post: "/add/:id",
    Delete: "/remove/:id",
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
