import mssql from 'mssql';
import { createDatabase } from '../db';
import { createMssqlDriverWrapper } from "../db/driverWrapper";
import { productModel } from '../model/entities/product';
import { sleep } from '../utils/sleep';
import { testDBConfig } from './testDBConfig';

beforeAll(async () => {
  await sleep(1000);
  (await mssql.connect(testDBConfig)).query(
    'TRUNCATE TABLE products'
  )
});

const getDbProduct = async () => {
  const cp = await mssql.connect(testDBConfig);
  const driver = createMssqlDriverWrapper(cp);
  
  return createDatabase(driver, productModel);
}

describe('Database tests', () => {
  test('insertion working', async () => {
    const dbProduct = await getDbProduct();
    dbProduct.insert({
      
    });
  })
})