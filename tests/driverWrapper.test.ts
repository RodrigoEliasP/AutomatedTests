import mssql from 'mssql';
import { createMssqlDriverWrapper } from "../db/driverWrapper";
import { product } from '../model/entities/product';
import { sleep } from '../utils/sleep';
import { testDBConfig } from './testDBConfig';

const truncateProducts = async () => {
  const cp = await mssql.connect(testDBConfig)
  await cp.query(
    'TRUNCATE TABLE products'
  );
}

beforeAll(async () => {
  await truncateProducts();
});
afterAll(async () => {
  await truncateProducts();
});

async function getDriverWrapper() {
  const connection = await mssql.connect(testDBConfig);
  const driverWrapper = createMssqlDriverWrapper(connection);
  return driverWrapper;
}

describe('Driver Wrapper', () => {
  describe('Insert method', () => {
    test('insert with db default autofill', async () => {
      const driverWrapper = await getDriverWrapper();
      const testProduct = {
        name: 'Picanha',
        quantity: 1000,
        value: 50
      }
    
      await driverWrapper.insert(
        'products', 
        Object.keys(testProduct), 
        Object.values(testProduct),
      )
      const { recordset } = await mssql.query<product>('SELECT * FROM products;');
      const insertedProduct = recordset[0];
      expect(insertedProduct.id).not.toBeUndefined();
      expect(insertedProduct.name).toBe('Picanha');
      expect(insertedProduct.value).toBe(50);
      expect(insertedProduct.quantity).toBe(1000);
      expect(insertedProduct.created_at).toBeTruthy();
      expect(insertedProduct.updated_at).toBeTruthy();
      expect(insertedProduct.id).not.toBeNull();
    })
  
    test('insert with all fields filled', async () => {
      const driverWrapper = await getDriverWrapper();
      const testProduct = {
        name: 'Picanha',
        quantity: 1000,
        value: 50,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    
      await driverWrapper.insert(
        'products', 
        Object.keys(testProduct), 
        Object.values(testProduct),
      )
      const { recordset } = await mssql.query<product>('SELECT * FROM products;');
      const insertedProduct = recordset[0];
      expect(insertedProduct.id).not.toBeUndefined();
      expect(insertedProduct.name).toBe('Picanha');
      expect(insertedProduct.value).toBe(50);
      expect(insertedProduct.quantity).toBe(1000);
      expect(insertedProduct.created_at).toBeTruthy();
      expect(insertedProduct.updated_at).toBeTruthy();
      expect(insertedProduct.id).not.toBeNull();
    })
  })
  describe('Update method', () => {
    test('update working', async () => {
      const driverWrapper = await getDriverWrapper();
      const testProduct = {
        name: 'Ovos',
        quantity: 1000,
        value: 7.50,
        updated_at: new Date().toISOString()
      }
    
      await driverWrapper.update(
        'products', 
        [`id = ${0}`],
        Object.keys(testProduct), 
        Object.values(testProduct),
      )
      const { recordset } = await mssql.query<product>('SELECT * FROM products;');
      const insertedProduct = recordset[0];
      expect(insertedProduct.id).not.toBeUndefined();
      expect(insertedProduct.name).toBe('Ovos');
      expect(insertedProduct.value).toBe(7.50);
      expect(insertedProduct.quantity).toBe(1000);
      expect(insertedProduct.created_at).toBeTruthy();
      expect(insertedProduct.updated_at).toBeTruthy();
      expect(insertedProduct.id).not.toBeNull();
    })
  }) 
  describe('Select method', () => {
    beforeAll(async () => {
      const driverWrapper = await getDriverWrapper();
  
      await driverWrapper.insert(
        'products', 
        ['name', 'quantity', 'value', 'updated_at'], 
        ['Paçoca', 30, 0.50, new Date().toISOString()],
      )
      await driverWrapper.insert(
        'products', 
        ['name', 'quantity', 'value', 'updated_at'], 
        ['Cachorro quente', 0, 7, new Date().toISOString()],
      )
      await driverWrapper.insert(
        'products', 
        ['name', 'quantity', 'value', 'updated_at'], 
        ['Pirulito', 100, 0.70, new Date().toISOString()],
      )
      await driverWrapper.insert(
        'products', 
        ['name', 'quantity', 'value', 'updated_at'], 
        ['Notebook', 150, 3799, new Date().toISOString()],
      )
    })
    test('select all fields working', async () => {
      const driverWrapper = await getDriverWrapper();
  
      const selection = await driverWrapper.select<product>(
        'products',
        'all',
      );
      
      expect(selection.length).toEqual(6)
    })
    test('select specifics fields working', async () => {
      const driverWrapper = await getDriverWrapper();
  
      const selection = await driverWrapper.select<Pick<product, 'name' | 'quantity'>>(
        'products',
        ['name', 'quantity'],
      );
  
      const returnedOnlyCorrectFields = selection.every(select => {
        return Object.keys(select).every(key => {
          return ['name', 'quantity'].includes(key);
        })
      })
  
      expect(returnedOnlyCorrectFields).toEqual(true);
    })
  })
  describe('Delete method', () => {
    beforeAll(async () => {
      const driverWrapper = await getDriverWrapper();
      await truncateProducts();
      await driverWrapper.insert(
        'products', 
        ['name', 'quantity', 'value', 'updated_at'], 
        ['Paçoca', 30, 0.50, new Date().toISOString()],
      )
    })
    test('Basic delete', async () => {
      const driverWrapper = await getDriverWrapper();

      const before = await driverWrapper.select('products', 'all');
      await driverWrapper.delete('products', ['id = 0']);
      const after = await driverWrapper.select('products', 'all');

      const diff = before.length - after.length;
      expect(before.length).toBeGreaterThan(0);
      expect(diff).toBe(1);
    })
  })
})

