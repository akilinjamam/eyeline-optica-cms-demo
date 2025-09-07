import type { ActionColumn, TableColumn } from "../type";

export interface Frame {
  id?: number;
  name: string;
  type: string;
  material: string;
  shape: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface ITableInfo<T> {
  paginatedData: T[];
  column: TableColumn[];
  actionColumn: ActionColumn[];
}

export type Lens = {
  id?: number;
  name: string;
  description: string;
  purchasePrice: number;
  salesPrice: number;
  stock: number;
  category: string;
  brand: string;
  images: string[];
  lensType: string;
  material: string;
  coatings: string[];
  prescriptionRange: string;
  index: number;
  thickness: string;
  color: string;
  diameter: number;
  warranty: string;
  deliveryTime: string;
  offer: number;
  rating: number;
  quantity?: number;
};

export type ContactLens = {
  id?: string;
  name: string;
  brand: string;
  color: string;
  type: "daily disposable" | "monthly" | "monthly (colored)" | string; // extendable
  material: string;
  waterContent: string; // e.g. "38%" (kept as string for flexibility)
  diameter: number; // mm
  baseCurve: number; // mm
  powerRange: string; // e.g. "-12.00 to +8.00"
  uvProtection: boolean;
  purchasePrice: number;
  salesPrice: number;
  stock: number;
  offer: number; // percentage (0-100)
  rating: number; // 1-5
  description: string;
  images: string[];
};
