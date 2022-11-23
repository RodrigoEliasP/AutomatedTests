import mssql from 'mssql';
import { createMssqlDriverWrapper } from "../db/driverWrapper";
import { product } from '../types/product';
import { sleep } from '../utils/sleep';

const dbConfig: mssql.config = {
  server: 'localhost',
  port: 1433,
  user: 'sa',
  password: 'root',
  database: 'master',
  options: {
    trustServerCertificate: true,
  }
}
afterAll(async () => {
  await sleep(1000);
  (await mssql.connect(dbConfig)).query(
    'TRUNCATE TABLE products'
  )
});
describe('Insert method', () => {
  test('insert with db default autofill', async () => {
    const connection = await mssql.connect(dbConfig);
    const driverWrapper = createMssqlDriverWrapper(connection);
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
    const connection = await mssql.connect(dbConfig);
    const driverWrapper = createMssqlDriverWrapper(connection);
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
    const connection = await mssql.connect(dbConfig);
    const driverWrapper = createMssqlDriverWrapper(connection);
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
  test('select all fields working', async () => {
    const connection = await mssql.connect(dbConfig);
    const driverWrapper = createMssqlDriverWrapper(connection);
  
    const selection = await driverWrapper.select<product>(
      'products',
      undefined,
      
    );
    const['id']
    selection[0].
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

