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
};

export type ApiDataType<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: T;
    meta: {
      limit: number;
      page: number;
      total: number;
      totalPage: number;
    };
  };
};
