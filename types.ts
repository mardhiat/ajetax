
export interface TaxFormData {
  // Employment Income
  basicSalary: number;
  employmentAllowances: number;
  otherEmploymentAllowances: number;
  benefitsInKind: number;
  gratuityReceived: number;
  lossOfJobCompensation: number;
  salaryArrears: number;
  bonusCommission: number;
  noticePay: number;

  // Investment Income
  netTradingIncome: number;
  grossRentalIncome: number;
  grossDividendReceived: number;
  grossInterestReceived: number;
  virtualDigitalEarnings: number;
  grossForeignIncome: number;
  otherIncome: number;

  // Capital Gains
  initialCostOfShares: number;
  sharesDisposedProceeds: number;

  // Deductions
  rentPaid: number;
  pensionPaid: number;
  nhfPaid: number;
  nhisPaid: number;
  mortgageInterest: number;
  lifeInsurancePaid: number;

  // Prepaid Taxes
  payeWithheld: number;
  whtDividend: number;
  whtInterest: number;
  whtRent: number;
  otherPrepaidTax: number;
  foreignTaxPrepaid: number;
}

export interface BracketBreakdown {
  label: string;
  amount: number;
  rate: number;
  tax: number;
}

export interface TaxResults {
  grossWorldwideIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxDue: number;
  totalPrepaidTaxes: number;
  taxLiability: number;
  monthlyTax: number;
  brackets: BracketBreakdown[];
}
