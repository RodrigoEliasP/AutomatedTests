import { dbEntity, Representation } from "./dbEntity";

type Rep<K extends dbEntity<Representation>> = K['representation'];
type PK<K extends dbEntity<Representation>> = K['primaryKey'];
type PKType<K extends dbEntity<Representation>> = Rep<K>[PK<K>];

export interface DB<T extends dbEntity<Representation>> {
  insert: (value: Omit<Rep<T>, PK<T>>) => Promise<void>;
  update: (id: PKType<T>, value: Partial<Rep<T>>) => Promise<void>;
  delete: (id: PKType<T>) => Promise<void>;
  list: () => Promise<Rep<T>[]>;
  get: (id: PKType<T>) => Promise<Rep<T>>;
}
