import mssql from 'mssql';
import { createDatabase } from '../db';
import { createMssqlDriverWrapper } from "../db/driverWrapper";
import { product, productModel } from '../model/entities/product';
import { sleep } from '../utils/sleep';
import { testDBConfig } from './testDBConfig';

afterAll(async () => {
  await sleep(1000);
  (await mssql.connect(testDBConfig)).query(
    'TRUNCATE TABLE products'
  )
});

const getDbProduct = async () => {
  const cp = await mssql.connect(testDBConfig);
  const driver = createMssqlDriverWrapper(cp);
  
  return [driver, createDatabase(driver, productModel)] as const;
}

describe('Database tests', () => {
  test('Basic insertion', async () => {
    const [driver, dbProduct] = await getDbProduct();
    dbProduct.insert({
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