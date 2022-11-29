import mssql from 'mssql';
import { createDatabase } from '../db';
import { createMssqlDriverWrapper } from '../db/driverWrapper';
import { productModel } from '../model/entities/product';
import { testDBConfig } from './testDBConfig';

export const shutupConsole = () => {
  jest.spyOn(console, 'log').mockImplementation(jest.fn());
  jest.spyOn(console, 'debug').mockImplementation(jest.fn());
}

export const truncateProducts = async () => {
  const cp = await mssql.connect(testDBConfig)
  await cp.query(
    'TRUNCATE TABLE products'
  );
}

export const getDriverWrapper =  async () => {
  const connection = await mssql.connect(testDBConfig);
  const driverWrapper = createMssqlDriverWrapper(connection);
  return driverWrapper;
}

export const getDbProduct = async () => {
  const cp = await mssql.connect(testDBConfig);
  const driver = createMssqlDriverWrapper(cp);
  
  return [driver, createDatabase(driver, productModel)] as const;
}