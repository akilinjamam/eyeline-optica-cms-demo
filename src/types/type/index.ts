export type THandler = (id: number) => void;
export type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
};
