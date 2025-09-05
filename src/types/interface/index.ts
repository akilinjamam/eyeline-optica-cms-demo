import type { TableColumn, THandler } from "../type";

export interface Frame {
  id: number;
  name: string;
  type: string;
  material: string;
  shape: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface ITableInfo {
  paginatedData: Frame[];
  handleEdit: THandler;
  handleDelete: THandler;
  column: TableColumn[];
}
