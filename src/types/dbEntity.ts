export type Representation = Record<string, FieldTypes>

export enum FieldTypes {
  string = 'string',
  number = 'number',
  date = 'date'
}

export type FieldTypeToType<K extends FieldTypes> = K extends FieldTypes.number ?
  number :
  K extends FieldTypes.string ?
  string :
  Date;

type RepresentationObject<T> = T extends Representation ? T : never

export interface dbEntity<
  Model = any,
> {
  readonly primaryKey: keyof Model;
  readonly autoIncrement: boolean;
  readonly source: string;
  readonly representation: RepresentationObject<Model>;
  readonly optionalFields: readonly (keyof Model)[];
}

export type RepresentationInTS<K extends Representation> = 
{[X in keyof K]: FieldTypeToType<K[X]>}