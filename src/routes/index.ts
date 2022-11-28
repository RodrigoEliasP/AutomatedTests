import { Router } from "express";
import { setupControllers } from "../controllers";
import { DriverWrapper } from "../types/driverWrapper";

const router = Router();

router.get('/', (req, res) => {
  console.log('got request');
  res.send({ message: 'Welcome newcomer, nice to meet you' })
});

const setupRoutes = (driverWrapper: DriverWrapper) => {
  setupControllers(router, driverWrapper);
  return router;
}

export { setupRoutes };
