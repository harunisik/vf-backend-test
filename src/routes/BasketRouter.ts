import { Router } from "express";
import Paths from "../constants/Paths";
import BasketController from "../controllers/BasketController";

// **** Variables **** //

const basketRouter = Router();

// Get one basket content
basketRouter.get(Paths.Basket.Get, BasketController.get);

// Add one product to the given basket
basketRouter.post(Paths.Basket.Post, BasketController.addProduct);

// Remove one product from the given basket
basketRouter.delete(Paths.Basket.Delete, BasketController.removeProduct);

// **** Export default **** //

export default basketRouter;
