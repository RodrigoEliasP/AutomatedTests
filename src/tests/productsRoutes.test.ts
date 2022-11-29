import { setupApp, app } from "../app";
import request from 'supertest';
import { getDbProduct, shutupConsole, truncateProducts } from "./helpers";
import { product } from "../model/entities/product";

beforeAll(async () => {
  shutupConsole();
  await truncateProducts();
  await setupApp();
});

describe('Testing all the routes relatede to products entity', () => {
  test('It should create a new product in db', async () => {
    const [_driver, dbProduct] = await getDbProduct();

    const before = await dbProduct.list();
    const res = await request(app).post('/product').send({
      name: "Picanha",
      quantity: 20,
      value: 10
    });
    const after = await dbProduct.list();

    const diff = after.length - before.length

    expect(res.body.message).toBe('Product inserted successfully');
    expect(res.statusCode).toBe(200);
    expect(diff).toBe(1);
    expect(after[0].name).toBe('Picanha')
    expect(after[0].quantity).toBe(20)
    expect(after[0].value).toBe(10)
  })

  test('It should update the created product in db', async () => {
    const [_driver, dbProduct] = await getDbProduct();

    const before = await dbProduct.get(0);
    const res = await request(app).put(`/product/0`).send({
      name: "Almeirão",
      quantity: 30,
      value: 15
    });
    const after = await dbProduct.get(0);

    expect(res.body.message).toBe('Product updated successfully');
    expect(res.statusCode).toBe(200);
    expect(after).not.toEqual(before);
    expect(after.name).toBe('Almeirão')
    expect(after.quantity).toBe(30)
    expect(after.value).toBe(15)
  })

  test('It shoud delete the product in db', async () => {
    const [_driver, dbProduct] = await getDbProduct();

    const before = await dbProduct.list();
    const res = await request(app).delete(`/product/0`).send({
      name: "Picanha",
      quantity: 20,
      value: 10
    });
    const after = await dbProduct.list();

    const diff = after.length - before.length

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted successfully');
    expect(diff).toBe(-1);
    expect(after[0]).toBeUndefined()
  })
  describe('Testing routes related to selection', () => {
    beforeAll(async () => {
      const [_driver, dbProduct] = await getDbProduct();
      await Promise.all([
        dbProduct.insert({
          name: 'Mamão',
          quantity: 30,
          value: 12,
        }),
        dbProduct.insert({
          name: 'Melancia',
          quantity: 70,
          value: 11,
        }),
        dbProduct.insert({
          name: 'Amendoim 200g',
          quantity: 39,
          value: 16,
        }),
      ])
    })
    test('It should list three items', async () => {
      const res = await request(app).get('/product');

      const productsNames = res.body.map((p: product) => p.name);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3);
      expect(productsNames).toContain('Amendoim 200g');
      expect(productsNames).toContain('Melancia');
      expect(productsNames).toContain('Mamão');
    })
    test('It should get only one item', async () => {
      const res = await request(app).get('/product/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(1);
    })
    test('It should return error', async () => {
      const res = await request(app).get('/product/200');

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({
        codeStatus: 500,
        status: 'error',
        message: 'No entity was found with this id'
      })
    })
  })
});