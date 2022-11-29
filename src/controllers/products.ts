import { Router, Request } from "express";
import { product, ProductEntity } from "../model/entities/product";
import { DB } from "../types/database";

export const createProductsController = (router: Router, database: DB<ProductEntity>) => {
  router.get('/product', async (req, res, next) => {
    try{
      const products = await database.list();
      res.status(200).send(products)
    } catch (e) {
      next(e);
    }
  });
  router.get('/product/:id', async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const product = await database.get(id); 
      res.status(200).send(product);
    } catch (e) {
      next(e)
    }
  });
  router.put('/product/:id', async (
    req: Request<{ id: string }, any, Omit<product, 'id'>>, 
    res,
    next
  ) => {
    try {
      const product = req.body;
      const productId = parseInt(req.params.id, 10);

      const newProduct = {...product, updated_at: new Date()};

      await database.update(productId, newProduct);

      res.status(200).send({
        message: 'Product updated successfully'
      });
    } catch (e) {
      next(e);
    }
    
  });
  router.post('/product', async (
    req: Request<{ id: string }, any, Omit<product, 'id'>>, 
    res,
    next
  ) => {
    try {
      const product = req.body;
      await database.insert(product);

      res.status(200).send({
        message: 'Product inserted successfully'
      })
    } catch (e) {
      next(e);
    }
  });
  router.delete('/product/:id', async (req, res, next) => {
    try{
      const productId = parseInt(req.params.id, 10);
  
      await database.delete(productId);
  
      res.status(200).send({
        message: 'Product deleted successfully'
      })
    } catch(e) {
      next(e);
    }
  });
  return router;
}
