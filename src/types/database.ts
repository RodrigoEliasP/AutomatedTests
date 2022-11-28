import { WithOptional } from "../utils/helpers";
import { dbEntity, Representation, RepresentationInTS } from "./dbEntity";

type Rep<K extends dbEntity> = RepresentationInTS<K['representation']>;
type OptionalFields<K extends dbEntity> = K['optionalFields'][number];
type PK<K extends dbEntity> = K['primaryKey'];
type PKType<K extends dbEntity> = Rep<K>[PK<K>];

type InsertValues<T extends dbEntity> = T['autoIncrement'] extends true 
? 
  Omit<WithOptional<Rep<T>, OptionalFields<T>>, PK<T>>
  : 
  WithOptional<Rep<T>, OptionalFields<T>>

export interface DB<T extends dbEntity> {
  insert: (value: InsertValues<T>) => Promise<void>;
  update: (id: PKType<T>, value: Partial<Rep<T>>) => Promise<void>;
  delete: (id: PKType<T>) => Promise<void>;
  list: () => Promise<Rep<T>[]>;
  get: (id: PKType<T>) => Promise<Rep<T>>;
}
