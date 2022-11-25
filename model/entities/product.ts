import { CreateDatabaseFN } from "../../db";
import { dbEntity, FieldTypes, RepresentationInTS, Representation } from "../../types/dbEntity";


const representation = {
  id: FieldTypes.number,
  name: FieldTypes.string,
  quantity: FieldTypes.number,
  value: FieldTypes.number,
  created_at: FieldTypes.date,
  updated_at: FieldTypes.date,
}

export const productModel: dbEntity<typeof representation> = {
  primaryKey: 'id',
  source: 'products',
  representation
}


export type product = RepresentationInTS<typeof representation>;