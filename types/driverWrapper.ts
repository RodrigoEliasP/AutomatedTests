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
  select: <T, K extends Partial<Record<keyof T, boolean>> = Partial<Record<keyof T, boolean>>>(
    table: string, 
    where?: string[], 
    fields?: K
  ) => Promise<
    Array<Pick<T, GetKeysToPick<typeof fields, T>>>
  >;
};

type GetKeysToPick<
T extends Partial<Record<keyof T, boolean>> | undefined, X> = Equals<T, undefined> extends false ?
  keyof T
  :
  keyof X;
    

export type Equals<T, S> =
[T] extends [S] ? (
  [S] extends [T] ? true : false
) : false
;
// type Filter<T, K extends Array<keyof T>> = Pick<T, {
//   [P in keyof T]: InArray<K, P> extends true ? P : never
// }[keyof T]>;