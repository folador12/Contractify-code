export enum InsuranceType {
  EXECUTION_CONTRACTS = 1,
  BIDS = 2,
  SUBDIVISIONS = 3,
  PAYMENT_HOLD = 4,
  COURT_LAWSUITS = 5,
  IN_GROUP = 6,
  ENGINEERING_RISKS = 7,
  CIVIL_RESPONSIBILITY = 8,
}

export const printInsurance = (insurance: InsuranceType): string => {
  switch (insurance) {
    case InsuranceType.EXECUTION_CONTRACTS:
      return "Execução de contratos";
    case InsuranceType.BIDS:
      return "Licitações";
    case InsuranceType.SUBDIVISIONS:
      return "Loteamentos";
    case InsuranceType.PAYMENT_HOLD:
      return "Retenção de Pagamento";
    case InsuranceType.COURT_LAWSUITS:
      return "Processos Judiciais";
    case InsuranceType.IN_GROUP:
      return "em Grupo";
    case InsuranceType.ENGINEERING_RISKS:
      return "Riscos de Engenharia";
    case InsuranceType.CIVIL_RESPONSIBILITY:
      return "Responsabilidade Civil";
    default:
      return "";
  }
};
