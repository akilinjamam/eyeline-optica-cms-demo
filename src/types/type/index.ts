import type { TOtherImages } from "../interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type THandler = (id: number) => void;
export type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
};

export type ActionColumn = {
  key?: any;
  logo: any;
  type: string;
  render: (value: any) => void;
  renderId?: (value: any) => void;
};

export type ApiDataType<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: T;
    meta?: {
      limit: number;
      page: number;
      total: number;
      totalPage: number;
    };
  };
};

export type FrameFormData = {
  _id: string;
  name: string;
  images: File[] | string[]; // string[] if editing with existing image URLs
  otherImages: TOtherImages[];
  newImages?: File[];
  type:
    | "sunglasses"
    | "eye glasses"
    | "special glasses"
    | "power sunglasses"
    | "progressive lense";
  materialsCategory:
    | "metal"
    | "plastic"
    | "acetate"
    | "titanium"
    | "wood"
    | "texture";
  frameCategory: "full-rim" | "half rim" | "rimless";
  sizeCategory: "small" | "medium" | "large";
  shapeCategory:
    | "oval"
    | "round"
    | "square"
    | "cats eye"
    | "rectangle"
    | "avietor"
    | "browline"
    | "horn";
  biologyCategory: "men" | "women" | "kids";
  color: string;
  purchase: number;
  salesPrice: number;
  discount: number;
  quantity: number;
  features: string[];
  brand: "raybon" | "Alex Perry" | "Oakley";
  badge?:
    | "popular"
    | "new"
    | "premium"
    | "luxury"
    | "best"
    | "trending"
    | "budget";
  description?: string;
  weeklyDeals: boolean;
  frameMeasurements?: string;
  frameDetails?: string;
  prescriptionDetails?: string;
  frameWidth: string;
  bridge: string;
  lensWidth: string;
  lensHeight: string;
  templeLength: string;
  size: string;
  weight: string;
  pdRange: string;
  prescriptionRange: string;
  availableAsProBi: boolean;
  availableAsReader: boolean;
};

export type TRegistration = {
  _id: string;
  id?: number;
  name: string;
  email: string;
  access: boolean;
  role: string;
};

export type TOrderStatus = {
  id?: string;
  paymentHistoryId?: string;
  status: string;
};

export type TCustomer = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};
