import { Router } from "express";
import { createDatabase } from "../db";
import { productModel } from "../model/entities/product";
import { DriverWrapper } from "../types/driverWrapper";
import { createProductsController } from "./products";

export const setupControllers = async (router: Router, driverWrapper: DriverWrapper) => {

  const productDb = createDatabase(driverWrapper, productModel);

  const productRouter = createProductsController(router, productDb);

  return productRouter
}