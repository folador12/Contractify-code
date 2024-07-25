import { StatusType } from "./EnumStatus";

export type DataType = {
  id: string,
  baseDate: Date;
  name: string;
  contractValue: number;
  status: StatusType;
};
