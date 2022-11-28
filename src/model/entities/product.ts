import { CreateDatabaseFN } from "../../db";
import { dbEntity, FieldTypes, RepresentationInTS, Representation } from "../../types/dbEntity";

const representation = {
  id: FieldTypes.number,
  name: FieldTypes.string,
  quantity: FieldTypes.number,
  value: FieldTypes.number,
  created_at: FieldTypes.date,
  updated_at: FieldTypes.date,
} as const;



export const productModel = {
  primaryKey: 'id',
  autoIncrement: true,
  source: 'products',
  representation,
  optionalFields: ['created_at', 'updated_at'],
} satisfies dbEntity<typeof representation>;

export type ProductEntity = typeof productModel;


type obj = { foo: string, bar: true | false }
const bar = true as const;
const ob = {
  foo: "s",
  bar
}

type tp = typeof ob;

export type product = RepresentationInTS<typeof representation>;