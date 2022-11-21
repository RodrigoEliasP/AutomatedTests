import { model } from "./dbEntity";

export interface DB<T extends model> {
  insert: (value: T['representation']) => Promise<void>;
  update: (id: T['primaryKey'], value: Partial<T['representation']>) => Promise<void>;
  delete: (id: T['primaryKey']) => Promise<void>;
  list: () => T['representation'][];
  get: (id: T['primaryKey']) => T['representation'];
}
