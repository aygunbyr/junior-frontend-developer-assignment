export type ColumnProps<T> = {
  key: keyof T;
  label: string;
}

export type DatatableProps<T> = {
  data: T[];
  columns: ColumnProps<T>[];
}