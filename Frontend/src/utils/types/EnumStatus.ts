import { ReactNode } from "react";

export enum StatusType {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const printStatus = (status: StatusType): string => {
  switch (status) {
    case StatusType.APPROVED:
      return "Aprovado";
    case StatusType.REJECTED:
      return "Rejeitado";
    default:
      return "Análise";
  }
};
