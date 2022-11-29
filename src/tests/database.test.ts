
import { product, productModel } from '../model/entities/product';
import { getDbProduct, truncateProducts } from './helpers';

beforeAll(async () => {
  await truncateProducts();
});

describe('Database tests', () => {
  describe('Insert', () => {
    test('Basic insertion', async () => {
      const [driver, dbProduct] = await getDbProduct();
      await dbProduct.insert({
        name: 'Picanha',
        quantity: 20,
        value: 10,
      })
  
      const [product] = await driver.select<product>(productModel.source, 'all', ['name = \'Picanha\''])
  
      expect(product.id).not.toBeUndefined();
      expect(product.created_at).not.toBeUndefined();
      expect(product.updated_at).not.toBeUndefined();
      expect(product.name).toEqual('Picanha');
      expect(product.quantity).toEqual(20);
      expect(product.value).toEqual(10);
    })
  })
  describe('Update', () => {
    test('Basic update', async () => {
      const [driver, dbProduct] = await getDbProduct();
      await dbProduct.update(0 ,{
        name: 'Maria Mole',
        quantity: 50,
        value: 2.5,
      })
  
      const [res] = await driver.select<product>(productModel.source, 'all', ['name = \'Maria Mole\''])
  
      expect(res.id).toBeDefined();
      expect(res.created_at).toBeDefined();
      expect(res.updated_at).toBeDefined();
      expect(res.name).toEqual('Maria Mole');
      expect(res.quantity).toEqual(50);
      expect(res.value).toEqual(2.5);
    })
  })
  describe('Get', () => {
    test('Basic get', async () => {
      const [driver, dbProduct] = await getDbProduct();
      const product = await dbProduct.get(0);
  
  
      expect(product.id).toBeDefined();
      expect(product.created_at).toBeDefined();
      expect(product.updated_at).toBeDefined();
      expect(product.name).toEqual('Maria Mole');
      expect(product.quantity).toEqual(50);
      expect(product.value).toEqual(2.5);
    })
    test('Get unexistend id must reject with error', async () => {
      const [driver, dbProduct] = await getDbProduct();
      const promise = dbProduct.get(12223);
      expect(promise).rejects.toThrow(`No entity was found with this id`)
  
    })
  })
  describe('List', () => {
    test('Basic list', async () => {
      const [driver, dbProduct] = await getDbProduct();
      const list = await dbProduct.list();
      const [product] = list;
  
      expect(list.length).toBe(1);
  
      expect(product.id).not.toBeUndefined();
      expect(product.created_at).not.toBeUndefined();
      expect(product.updated_at).not.toBeUndefined();
      expect(product.name).toEqual('Maria Mole');
      expect(product.quantity).toEqual(50);
      expect(product.value).toEqual(2.5);
    })
  })
  describe('Delete', () => {
    test('Basic delete', async () => {
      const [driver, dbProduct] = await getDbProduct();

      const before = await dbProduct.list();
      await dbProduct.delete(0);
      const after = await dbProduct.list();
      const diff = before.length - after.length;
      expect(before.length).toBeGreaterThan(0);
      expect(diff).toBe(1);
    });
  })
})