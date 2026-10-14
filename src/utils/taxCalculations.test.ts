import { describe, expect, it } from 'vitest';
import type { TaxFormData } from '../types';
import { calculateTax, formatNaira } from './taxCalculations';

function form(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    basicSalary: 0,
    employmentAllowances: 0,
    otherEmploymentAllowances: 0,
    benefitsInKind: 0,
    gratuityReceived: 0,
    lossOfJobCompensation: 0,
    salaryArrears: 0,
    bonusCommission: 0,
    noticePay: 0,
    netTradingIncome: 0,
    grossRentalIncome: 0,
    grossDividendReceived: 0,
    grossInterestReceived: 0,
    virtualDigitalEarnings: 0,
    grossForeignIncome: 0,
    otherIncome: 0,
    initialCostOfShares: 0,
    sharesDisposedProceeds: 0,
    rentPaid: 0,
    pensionPaid: 0,
    nhfPaid: 0,
    nhisPaid: 0,
    mortgageInterest: 0,
    lifeInsurancePaid: 0,
    payeWithheld: 0,
    whtDividend: 0,
    whtInterest: 0,
    whtRent: 0,
    otherPrepaidTax: 0,
    foreignTaxPrepaid: 0,
    ...overrides,
  };
}

describe('formatNaira', () => {
  it('formats amounts with two decimal places', () => {
    expect(formatNaira(1234.5)).toContain('1,234.50');
  });
});

describe('calculateTax', () => {
  it('returns zeros when every input is zero', () => {
    const results = calculateTax(form());

    expect(results.grossWorldwideIncome).toBe(0);
    expect(results.totalDeductions).toBe(0);
    expect(results.taxableIncome).toBe(0);
    expect(results.taxDue).toBe(0);
    expect(results.taxLiability).toBe(0);
    expect(results.monthlyTax).toBe(0);
    expect(results.brackets).toEqual([]);
  });

  it('charges nothing on the first ₦800,000', () => {
    const results = calculateTax(form({ basicSalary: 800_000 }));

    expect(results.taxDue).toBe(0);
    expect(results.brackets).toEqual([
      { label: '₦0 - ₦800,000', amount: 800_000, rate: 0, tax: 0 },
    ]);
  });

  it('applies 15% to the band from ₦800,000 to ₦3,000,000', () => {
    const results = calculateTax(form({ basicSalary: 3_000_000 }));

    expect(results.taxDue).toBe(330_000);
    expect(results.monthlyTax).toBe(330_000 / 12);
    expect(results.brackets.map((bracket) => bracket.rate)).toEqual([0, 0.15]);
  });

  it('applies 18% to the band from ₦3,000,000 to ₦12,000,000', () => {
    const results = calculateTax(form({ basicSalary: 12_000_000 }));

    expect(results.taxDue).toBe(1_950_000);
  });

  it('applies the top 25% rate only above ₦50,000,000', () => {
    const atCeiling = calculateTax(form({ basicSalary: 50_000_000 }));
    const aboveCeiling = calculateTax(form({ basicSalary: 50_000_100 }));

    expect(atCeiling.taxDue).toBe(10_430_000);
    expect(aboveCeiling.taxDue).toBe(10_430_000 + 25);
  });

  it('caps rent relief at the lower of 20% of rent and ₦500,000', () => {
    const partial = calculateTax(form({ basicSalary: 5_000_000, rentPaid: 1_000_000 }));
    const capped = calculateTax(form({ basicSalary: 5_000_000, rentPaid: 4_000_000 }));

    expect(partial.totalDeductions).toBe(200_000);
    expect(capped.totalDeductions).toBe(500_000);
  });

  it('caps pension at 8% of basic salary plus employment allowances', () => {
    const results = calculateTax(
      form({
        basicSalary: 1_000_000,
        employmentAllowances: 500_000,
        otherEmploymentAllowances: 500_000,
        pensionPaid: 1_000_000,
      }),
    );

    expect(results.grossWorldwideIncome).toBe(2_000_000);
    expect(results.totalDeductions).toBe(120_000);
  });

  it('caps NHF at 2.5% of basic salary', () => {
    const results = calculateTax(form({ basicSalary: 2_000_000, nhfPaid: 1_000_000 }));

    expect(results.totalDeductions).toBe(50_000);
  });

  it('subtracts prepaid taxes from tax due', () => {
    const results = calculateTax(
      form({
        basicSalary: 3_000_000,
        payeWithheld: 100_000,
        whtDividend: 50_000,
      }),
    );

    expect(results.taxDue).toBe(330_000);
    expect(results.totalPrepaidTaxes).toBe(150_000);
    expect(results.taxLiability).toBe(180_000);
    expect(results.monthlyTax).toBe(180_000 / 12);
  });

  it('does not let deductions push taxable income below zero', () => {
    const results = calculateTax(form({ basicSalary: 100_000, rentPaid: 10_000_000 }));

    expect(results.taxableIncome).toBe(0);
    expect(results.taxDue).toBe(0);
  });
});
