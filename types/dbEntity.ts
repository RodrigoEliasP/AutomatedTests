export interface model<Model = Object, PrimaryKey =  'id'> {
  primaryKey: PrimaryKey;
  source: string;
  representation: Model
}