// Tax calculation utilities for Nigerian PIT 2026

export interface IncomeData {
  basicSalary: number;
  employmentAllowances: number;
  otherAllowances: number;
  benefitsInKind: number;
  gratuity: number;
  lossOfJobCompensation: number;
  salaryArrears: number;
  bonusCommission: number;
  noticePay: number;
  netTradingIncome: number;
  rentalIncome: number;
  dividendReceived: number;
  interestReceived: number;
  digitalEarnings: number;
  foreignIncome: number;
  otherIncome: number;
  initialCostShares: number;
  sharesDisposedProceeds: number;
}

export interface DeductionData {
  rentPaid: number;
  pensionPaid: number;
  nhfPaid: number;
  nhisPaid: number;
  mortgageInterest: number;
  lifeInsurance: number;
}

export interface TaxResult {
  totalIncome: number;
  capitalGains: number;
  totalDeductions: number;
  taxableIncome: number;
  annualTax: number;
  monthlyTax: number;
}

// Calculate capital gains from share disposal
export const calculateCapitalGains = (
  initialCost: number,
  proceeds: number
): number => {
  const gains = proceeds - initialCost;
  // Only taxable if gains exceed ₦10,000,000
  return gains < 10000000 ? 0 : gains;
};

// Calculate rent relief (20% of rent, max ₦500,000)
export const calculateRentRelief = (rentPaid: number): number => {
  const relief = rentPaid * 0.2;
  return Math.min(relief, 500000);
};

// Calculate pension relief (max 8% of basic + allowances)
export const calculatePensionRelief = (
  pensionPaid: number,
  basicSalary: number,
  allowances: number
): number => {
  const maxRelief = (basicSalary + allowances) * 0.08;
  return Math.min(pensionPaid, maxRelief);
};

// Calculate NHF relief (max 2.5% of basic salary)
export const calculateNHFRelief = (
  nhfPaid: number,
  basicSalary: number
): number => {
  const maxRelief = basicSalary * 0.025;
  return Math.min(nhfPaid, maxRelief);
};

// Calculate loss of job compensation relief (amount exceeding ₦50,000,000)
export const calculateLossOfJobRelief = (compensation: number): number => {
  return compensation < 50000000 ? 0 : compensation - 50000000;
};

// Calculate progressive tax based on Nigerian tax brackets
export const calculateProgressiveTax = (taxableIncome: number): number => {
  if (taxableIncome <= 800000) {
    return 0;
  } else if (taxableIncome <= 3000000) {
    return (taxableIncome - 800000) * 0.15;
  } else if (taxableIncome <= 12000000) {
    return 330000 + (taxableIncome - 3000000) * 0.18;
  } else if (taxableIncome <= 25000000) {
    return 1950000 + (taxableIncome - 12000000) * 0.21;
  } else if (taxableIncome <= 50000000) {
    return 4680000 + (taxableIncome - 25000000) * 0.23;
  } else {
    return 10430000 + (taxableIncome - 50000000) * 0.25;
  }
};

// Main tax calculation function
export const calculateTax = (
  income: IncomeData,
  deductions: DeductionData
): TaxResult => {
  // Calculate capital gains
  const capitalGains = calculateCapitalGains(
    income.initialCostShares,
    income.sharesDisposedProceeds
  );

  // Calculate total income (excluding capital gains calculation fields)
  const totalIncome =
    income.basicSalary +
    income.employmentAllowances +
    income.otherAllowances +
    income.benefitsInKind +
    income.gratuity +
    income.lossOfJobCompensation +
    income.salaryArrears +
    income.bonusCommission +
    income.noticePay +
    income.netTradingIncome +
    income.rentalIncome +
    income.dividendReceived +
    income.interestReceived +
    income.digitalEarnings +
    income.foreignIncome +
    income.otherIncome +
    capitalGains;

  // Calculate deductions/reliefs
  const rentRelief = calculateRentRelief(deductions.rentPaid);
  const pensionRelief = calculatePensionRelief(
    deductions.pensionPaid,
    income.basicSalary,
    income.employmentAllowances
  );
  const nhfRelief = calculateNHFRelief(deductions.nhfPaid, income.basicSalary);
  const lossOfJobRelief = calculateLossOfJobRelief(income.lossOfJobCompensation);

  const totalDeductions =
    rentRelief +
    pensionRelief +
    nhfRelief +
    deductions.nhisPaid +
    deductions.mortgageInterest +
    deductions.lifeInsurance +
    income.noticePay + // Gratuity relief (same as notice pay in Excel)
    lossOfJobRelief;

  // Calculate taxable income
  const taxableIncome = totalIncome - totalDeductions;

  // Calculate annual tax
  const annualTax = calculateProgressiveTax(taxableIncome);

  // Calculate monthly tax
  const monthlyTax = annualTax / 12;

  return {
    totalIncome,
    capitalGains,
    totalDeductions,
    taxableIncome,
    annualTax,
    monthlyTax,
  };
};