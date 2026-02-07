
import type { TaxFormData, TaxResults, BracketBreakdown } from '../types';

export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateTax = (data: TaxFormData): TaxResults => {
  // 1. Gross Worldwide Income
  const totalGainsShares = Math.max(0, data.sharesDisposedProceeds - data.initialCostOfShares);
  const taxableGains = totalGainsShares < 10000000 ? 0 : totalGainsShares;

  const employmentIncome = 
    data.basicSalary + 
    data.employmentAllowances + 
    data.otherEmploymentAllowances + 
    data.benefitsInKind + 
    data.gratuityReceived + 
    data.lossOfJobCompensation + 
    data.salaryArrears + 
    data.bonusCommission + 
    data.noticePay;

  const investmentIncome = 
    data.netTradingIncome + 
    data.grossRentalIncome + 
    data.grossDividendReceived + 
    data.grossInterestReceived + 
    data.virtualDigitalEarnings + 
    data.grossForeignIncome + 
    data.otherIncome;

  const grossWorldwideIncome = employmentIncome + investmentIncome + taxableGains;

  // 2. Deductions
  const rentDeduction = Math.min(data.rentPaid * 0.2, 500000);
  
  const pensionMax = (data.basicSalary + data.employmentAllowances) * 0.08;
  const pensionDeduction = Math.min(data.pensionPaid, pensionMax);
  
  const nhfMax = data.basicSalary * 0.025;
  const nhfDeduction = Math.min(data.nhfPaid, nhfMax);
  
  const jobCompDeduction = data.lossOfJobCompensation >= 50000000 
    ? data.lossOfJobCompensation - 50000000 
    : 0;

  const totalDeductions = 
    rentDeduction + 
    pensionDeduction + 
    nhfDeduction + 
    data.nhisPaid + 
    data.mortgageInterest + 
    data.lifeInsurancePaid + 
    data.gratuityReceived + 
    jobCompDeduction;

  // 3. Taxable Income
  const taxableIncome = Math.max(0, grossWorldwideIncome - totalDeductions);

  // 4. Tax Due (2026 Progressive Brackets)
  let taxDue = 0;
  const brackets: BracketBreakdown[] = [];

  const remaining = taxableIncome;

  // Bracket logic
  const bracketSpecs = [
    { limit: 800000, rate: 0, label: "₦0 - ₦800,000" },
    { limit: 2200000, rate: 0.15, label: "₦800,001 - ₦3,000,000" },
    { limit: 9000000, rate: 0.18, label: "₦3,000,001 - ₦12,000,000" },
    { limit: 13000000, rate: 0.21, label: "₦12,000,001 - ₦25,000,000" },
    { limit: 25000000, rate: 0.23, label: "₦25,000,001 - ₦50,000,000" },
    { limit: Infinity, rate: 0.25, label: "Above ₦50,000,000" },
  ];

  let cumulativeLimit = 0;
  bracketSpecs.forEach((spec) => {
    const rangeSize = spec.limit;
    const amountInBracket = Math.min(Math.max(0, taxableIncome - cumulativeLimit), rangeSize);
    
    if (amountInBracket > 0) {
      const bracketTax = amountInBracket * spec.rate;
      taxDue += bracketTax;
      brackets.push({
        label: spec.label,
        amount: amountInBracket,
        rate: spec.rate,
        tax: bracketTax
      });
    }
    cumulativeLimit += rangeSize;
  });

  // 5. Prepaid Taxes
  const totalPrepaidTaxes = 
    data.payeWithheld + 
    data.whtDividend + 
    data.whtInterest + 
    data.whtRent + 
    data.otherPrepaidTax + 
    data.foreignTaxPrepaid;

  // 6. Final Liability
  const taxLiability = taxDue - totalPrepaidTaxes;
  const monthlyTax = taxLiability / 12;

  return {
    grossWorldwideIncome,
    totalDeductions,
    taxableIncome,
    taxDue,
    totalPrepaidTaxes,
    taxLiability,
    monthlyTax,
    brackets
  };
};
