import { InsuranceType } from "./insurance-type";

export type DetailsType = {
  id: string;
  name: string;
  path: string;
  contractor: string;
  contractorCNPJ: string;
  hired: string;
  hiredCNPJ: string;
  contractValue: number;
  baseDate: Date;
  warranty: string;
  contractTerm: string;
  types_of_insurances: InsuranceType[];
  pdf64: string;
};
