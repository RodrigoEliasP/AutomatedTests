import mssql from 'mssql';
import { DB } from '../types/database';
import { dbEntity, Representation, RepresentationInTS } from '../types/dbEntity';
import { DriverWrapper } from '../types/driverWrapper';

export type CreateDatabaseFN =
<Type extends dbEntity = dbEntity>(driver: DriverWrapper, target: Type) => DB<Type>;

const createDatabase: CreateDatabaseFN = (driver, target) => {
  type entity = typeof target['representation'];
  const { source, primaryKey } = target;

  return {
    async delete(id) {
      await driver.delete(source, [`${primaryKey.toString()} = ${id}`])
    },
    async get(id) {
      const result = await driver.select<entity>(
        source, 
        'all', 
        [`${primaryKey.toString()} = ${id}`]
      );
      if(!result.length){
        throw new Error(`No entity was found with this ${primaryKey.toString()}`);
      }
      return result[0];
    },
    async insert(insertion) {
      return await driver.insert(
        source, 
        Object.keys(insertion), 
        Object.values(insertion)
      );
    },
    async list() {
      return await driver.select<entity>(
        source, 
        'all'
      );
    },
    async update(id, insertion) {
      const valuesToInsert = Object.values(insertion).filter(Boolean) as Array<string | number | Date>;
      return await driver.update(
        source, 
        [`${primaryKey.toString()} = ${id}`],
        Object.keys(insertion), 
        valuesToInsert
      );
    },
  }
}

export { createDatabase };
