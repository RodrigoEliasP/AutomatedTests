import { model } from "./dbEntity";

export interface product {
  id: number;
  name: string;
  quantity: number;
  value: number;
  created_at: Date;
  updated_at: Date;
}

export type entityProduct = model<product>;