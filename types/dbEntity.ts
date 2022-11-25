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
  Date


export interface dbEntity<
  Model extends Representation = Representation
> {
  readonly primaryKey: keyof Model;
  readonly source: string;
  readonly representation: Model;
}

export type RepresentationInTS<K extends Representation> = 
{[X in keyof K]: FieldTypeToType<K[X]>}