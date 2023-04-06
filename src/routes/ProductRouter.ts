import { Router } from "express";
import Paths from "../constants/Paths";
import ProductController from "../controllers/ProductController";

// **** Variables **** //

const productRouter = Router();

// Get all products
productRouter.get(Paths.Products.Get, ProductController.getAll);

// **** Export default **** //

export default productRouter;
