/* eslint-disable @typescript-eslint/no-explicit-any */
export type THandler = (id: number) => void;
export type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
};

export type ActionColumn = {
  logo: any;
  type: string;
  render: (value: any) => void;
};
