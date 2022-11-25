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

export const productModel: dbEntity<typeof representation, 'id'> = {
  primaryKey: 'id',
  source: 'products',
  representation
} as const;

export type product = RepresentationInTS<typeof representation>;