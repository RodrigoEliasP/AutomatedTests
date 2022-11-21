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
  select: <T = any>(table: string) => Promise<Array<T>>;
}