/* eslint-disable @typescript-eslint/no-explicit-any */
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
  showCheck?: boolean;
}

// src/types/lens.type.ts

export interface ILens {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  images: string[];
  lensType: string;
  material: string;
  coatings?: string[];
  prescriptionRange?: string;
  index?: number;
  thickness?: string;
  color?: string;
  diameter?: number;
  warranty?: string;
  deliveryTime?: string;
  offer?: number;
  rating?: number;
}

export type ContactLens = {
  _id?: string;
  id?: string;
  name: string;
  type: string;
  brand: string;
  color: string;
  replacementSchedule:
    | "daily disposable"
    | "monthly"
    | "monthly (colored)"
    | string; // extendable
  material: string;
  uvProtection: boolean;
  waterContent: string; // e.g. "38%" (kept as string for flexibility)
  diameter: number; // mm
  baseCurve: number; // mm
  powerRange: string; // e.g. "-12.00 to +8.00"
  purchasePrice: number;
  salesPrice: number;
  stock: number;
  offer: number; // percentage (0-100)
  description: string;
  images: string[];
  newImages?: string[];
  features: string[];
};

export type ProductType =
  | "sunglasses"
  | "eye glasses"
  | "special glasses"
  | "power sunglasses"
  | "progressive lense";

export type MaterialCategory =
  | "metal"
  | "plastic"
  | "acetate"
  | "titanium"
  | "wood"
  | "texture";

export type FrameCategory = "full-rim" | "half rim" | "rimless";

export type SizeCategory = "small" | "medium" | "large";

export type ShapeCategory =
  | "oval"
  | "round"
  | "square"
  | "cats eye"
  | "rectangle"
  | "avietor"
  | "browline"
  | "horn";

export type BiologyCategory = "men" | "women" | "kids";

export type Badge =
  | "popular"
  | "new"
  | "premium"
  | "luxury"
  | "best"
  | "trending"
  | "budget";

export type Brand = "raybon" | "Alex Perry" | "Oakley";

export interface IFrame {
  _id?: string;
  id?: number;
  name: string;
  images: string[];
  type: ProductType;
  materialsCategory: MaterialCategory;
  frameCategory: FrameCategory;
  sizeCategory: SizeCategory;
  shapeCategory: ShapeCategory;
  biologyCategory: BiologyCategory;
  color: string;
  date: Date;
  purchase: number;
  salesPrice: number;
  discount: number;
  quantity: number;
  sold: number;
  features: string[];
  brand: Brand;
  barcode: string;
  badge: Badge;
  description: string;
  weeklyDeals: boolean;
  reviews: string[];
  frameMeasurements: string;
  frameDetails: string;
  prescriptionDetails: string;
}

export interface IFrameWithId extends IFrame {
  id: number;
}

export interface LensFormData {
  _id?: string;
  name: string;
  images: string[];
  newImages: string[];
  lensType: string;
  material: string;
  coatings: string[];
  prescriptionRange: string;
  index: number;
  thickness: string;
  color: string;
  diameter: number;
  purchasePrice: string;
  salesPrice: string;
  stock: number;
  brand: string;
  offer: number;
  rating: number;
  warranty: string;
  deliveryTime: string;
  description: string;
  featured: boolean;
}

// Doctor type
export interface IDoctor {
  _id?: string;
  name: string;
  email: string;
  specialities: any;
  studies: any;
  totalExperience: number;
  bmdcNumber: string;
  currentlyWorking?: string;
  description?: string;
  experienceDetail?: string;
  newImages?: any;
  images?: any;
}

export interface ISales {
  saleType:
    | "Only Frame"
    | "Only Lens"
    | "Only Contact-Lens"
    | "Only Accessory"
    | "Frame and Lens"
    | "Contact-Lens and Accessory";
  quantity: number;
  invoiceNo: string;
  tran_id: string;
  customerId: any;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_email: string;
  payableAmount: number;
  dueAmount: number;
  productId: any;
  lensId: any;
  contactLensId: any;
  accessoryId: any;
  paymentHistoryId: any;
  deliveryFee: number;
  subtotal: number;
  status:
    | "pending"
    | "receieved"
    | "processsing"
    | "packaging"
    | "on the way"
    | "delivered";
}

export interface IFrameSaleInfo {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  frameName: string;
  frameSalesPrice: number;
  framePurchasePrice: number;
  frameSold: number;
  frameQty: number;
  frameStock: boolean;
  frameId: string;
  invoiceNo: string;
  status: string;
}
