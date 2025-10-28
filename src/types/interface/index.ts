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
  salesPrice: number;
  purchasePrice: number;
  discount: number;
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
  sold?: number;
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
  sold: number;
  rating: number;
  quantity: number;
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
  stock: boolean;
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

export interface IEyeInfo {
  sphere: string;
  cylinder: string;
  axis: string;
}

export interface ISales {
  _id?: string;
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
  pd: string;
  prescriptionImg: string[];
  submitType: string;
  leftEye: IEyeInfo;
  rightEye: IEyeInfo;
}

export interface IFrameSaleInfo {
  _id: string;
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
  subtotal: number;
}

export interface IFrameWithLensInfo {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  productName: string; // e.g., "FrameName+LensName"
  productSalesPrice: string; // e.g., "200+150"
  productPurchasePrice: string; // e.g., "100+80"
  productQty: number;
  frameId: string; // productId?._id
  lensId: string; // lensId?._id (was mistakenly productId?._id in your object)
  invoiceNo: string;
  status: string;
  pd: string;
  prescriptionImg: string[];
  submitType: string;
  leftEye: IEyeInfo;
  rightEye: IEyeInfo;
  subtotal: number;
}

export interface ILensSaleInfo {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  lensName: string;
  lensSalesPrice: number;
  lensPurchasePrice: number;
  lensQty: number;
  lensId: string;
  invoiceNo: string;
  status: string;
  subtotal: number;
  pd: string;
  prescriptionImg: string[];
  submitType: string;
  leftEye: IEyeInfo;
  rightEye: IEyeInfo;
}

export interface IContactLensSaleInfo {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  contactLensName: string;
  contactLensSalesPrice: number;
  contactLensPurchasePrice: number;
  contactLensQty: number;
  contactLensId: string;
  invoiceNo: string;
  status: string;
  subtotal: number; // subtotal * quantity
  pd: string;
  prescriptionImg: string[];
  submitType: string;
  leftEye: IEyeInfo;
  rightEye: IEyeInfo;
}

export interface IAccessorySaleInfo {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  accessoryName: string;
  accessorySalesPrice: number;
  accessoryPurchasePrice: number;
  accessoryQty: number;
  accessoryId: string;
  invoiceNo: string;
  status: string;
  subtotal: number;
}

export interface IContactLensAccessorySaleInfo {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  productName: string; // e.g., "Biofinity + (Lens Case)"
  productSalesPrice: string; // formatted as "1200 + (300)"
  productPurchasePrice: string; // formatted as "900 + (200)"
  productQty: number;
  contactLensId: any; // ObjectId of contact lens
  accessoryId: any; // ObjectId of accessory
  invoiceNo: string;
  status: string;
  subtotal: number; // subtotal * quantity
  submitType: string;
  pd: string;
  prescriptionImg: string[];
  leftEye: IEyeInfo;
  rightEye: IEyeInfo;
}

export interface IAccessoryItems {
  _id: string;
  name: string;
  barcode: string;
  brand: string;
  discount: number;
  category: string;
  quantity: number;
  stock: boolean;
  purchasePrice: number;
  salesPrice: number;
  sold: number;
  description: string;
  measurement: string;
}

export interface IAccessory {
  _id?: string;
  images?: string[];
  type:
    | "With Solution"
    | "With Bag"
    | "With Kit"
    | "With Solution + Kit"
    | "With Solution + Bag"
    | "With Kit + Bag"
    | "With Solution + Bag + Kit"
    | "others";
  items?: IAccessoryItems[];
}

export interface IModifiedAccessory {
  type: string;
  images?: File[] | string[];
  name: string;
  brand: string;
  salesPrice: string;
  purchasePrice: string;
  category: string;
  quantity: string;
}
