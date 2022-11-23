import { InArray, UniqueArray } from "../utils/helpers";

export interface DriverWrapper {
  insert: (
    table: string, 
    fields: string[], 
    values: (string | number | Date)[]
  ) => Promise<void>;
  update: (
    table: string, 
    where: string[], 
    fields: string[],
    values: (string | number | Date)[]
  ) => Promise<void>;
  delete: (
    table: string, 
    where: string[],
  ) => Promise<void>;
  select: <T>(
    table: string,  
    fields: 'all' | Array<keyof T>,
    where?: string[]
  ) => Promise<
    Array<T>
  >;
};