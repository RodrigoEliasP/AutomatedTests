import { model } from "./dbEntity";

export interface product {
  id: number;
  name: string;
  quantity: number;
  value: number;
  created_at: string;
  updated_at: string;
}

export type entityProduct = model<product>;