import React, { useState } from 'react';
import { CurrencyInput } from './CurrencyInput';
import { calculateTax } from '../utils/taxCalculations';
import type { IncomeData, DeductionData } from '../utils/taxCalculations';

export const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<IncomeData>({
    basicSalary: 0,
    employmentAllowances: 0,
    otherAllowances: 0,
    benefitsInKind: 0,
    gratuity: 0,
    lossOfJobCompensation: 0,
    salaryArrears: 0,
    bonusCommission: 0,
    noticePay: 0,
    netTradingIncome: 0,
    rentalIncome: 0,
    dividendReceived: 0,
    interestReceived: 0,
    digitalEarnings: 0,
    foreignIncome: 0,
    otherIncome: 0,
    initialCostShares: 0,
    sharesDisposedProceeds: 0,
  });

  const [deductions, setDeductions] = useState<DeductionData>({
    rentPaid: 0,
    pensionPaid: 0,
    nhfPaid: 0,
    nhisPaid: 0,
    mortgageInterest: 0,
    lifeInsurance: 0,
  });

  const updateIncome = (field: keyof IncomeData, value: number) => {
    setIncome((prev) => ({ ...prev, [field]: value }));
  };

  const updateDeduction = (field: keyof DeductionData, value: number) => {
    setDeductions((prev) => ({ ...prev, [field]: value }));
  };

  const results = calculateTax(income, deductions);

  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleClearAll = () => {
    setIncome({
      basicSalary: 0,
      employmentAllowances: 0,
      otherAllowances: 0,
      benefitsInKind: 0,
      gratuity: 0,
      lossOfJobCompensation: 0,
      salaryArrears: 0,
      bonusCommission: 0,
      noticePay: 0,
      netTradingIncome: 0,
      rentalIncome: 0,
      dividendReceived: 0,
      interestReceived: 0,
      digitalEarnings: 0,
      foreignIncome: 0,
      otherIncome: 0,
      initialCostShares: 0,
      sharesDisposedProceeds: 0,
    });
    setDeductions({
      rentPaid: 0,
      pensionPaid: 0,
      nhfPaid: 0,
      nhisPaid: 0,
      mortgageInterest: 0,
      lifeInsurance: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AJETAX</h1>
              <p className="text-sm text-gray-600 mt-1">Nigerian Personal Income Tax Calculator</p>
            </div>
            <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">₦</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Employment Income */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Employment Income
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Annual Basic Salary"
                  value={income.basicSalary}
                  onChange={(v) => updateIncome('basicSalary', v)}
                />
                <CurrencyInput
                  label="Employment Income Allowances"
                  value={income.employmentAllowances}
                  onChange={(v) => updateIncome('employmentAllowances', v)}
                />
                <CurrencyInput
                  label="Other Employment Allowances"
                  value={income.otherAllowances}
                  onChange={(v) => updateIncome('otherAllowances', v)}
                />
                <CurrencyInput
                  label="Benefits in Kind"
                  value={income.benefitsInKind}
                  onChange={(v) => updateIncome('benefitsInKind', v)}
                />
                <CurrencyInput
                  label="Gratuity Received"
                  value={income.gratuity}
                  onChange={(v) => updateIncome('gratuity', v)}
                />
                <CurrencyInput
                  label="Loss of Job Compensation"
                  value={income.lossOfJobCompensation}
                  onChange={(v) => updateIncome('lossOfJobCompensation', v)}
                />
                <CurrencyInput
                  label="Salary Arrears"
                  value={income.salaryArrears}
                  onChange={(v) => updateIncome('salaryArrears', v)}
                />
                <CurrencyInput
                  label="Annual Bonus/Commission"
                  value={income.bonusCommission}
                  onChange={(v) => updateIncome('bonusCommission', v)}
                />
                <CurrencyInput
                  label="Notice Pay"
                  value={income.noticePay}
                  onChange={(v) => updateIncome('noticePay', v)}
                />
              </div>
            </div>

            {/* Investment Income */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Investment Income
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Annual Net Trading Income"
                  value={income.netTradingIncome}
                  onChange={(v) => updateIncome('netTradingIncome', v)}
                />
                <CurrencyInput
                  label="Annual Rental Income"
                  value={income.rentalIncome}
                  onChange={(v) => updateIncome('rentalIncome', v)}
                />
                <CurrencyInput
                  label="Dividend Received"
                  value={income.dividendReceived}
                  onChange={(v) => updateIncome('dividendReceived', v)}
                />
                <CurrencyInput
                  label="Interest Received on Deposits"
                  value={income.interestReceived}
                  onChange={(v) => updateIncome('interestReceived', v)}
                />
                <CurrencyInput
                  label="Digital Earnings (NFTs, Crypto)"
                  value={income.digitalEarnings}
                  onChange={(v) => updateIncome('digitalEarnings', v)}
                />
                <CurrencyInput
                  label="Gross Foreign Income"
                  value={income.foreignIncome}
                  onChange={(v) => updateIncome('foreignIncome', v)}
                />
                <CurrencyInput
                  label="Other Income"
                  value={income.otherIncome}
                  onChange={(v) => updateIncome('otherIncome', v)}
                />
              </div>
            </div>

            {/* Capital Gains */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Capital Gains
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Initial Cost of Shares Disposed"
                  value={income.initialCostShares}
                  onChange={(v) => updateIncome('initialCostShares', v)}
                />
                <CurrencyInput
                  label="Total Shares Disposed Proceeds (≤ ₦150m)"
                  value={income.sharesDisposedProceeds}
                  onChange={(v) => updateIncome('sharesDisposedProceeds', v)}
                />
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Deductions & Reliefs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CurrencyInput
                  label="Rent Paid"
                  value={deductions.rentPaid}
                  onChange={(v) => updateDeduction('rentPaid', v)}
                />
                <CurrencyInput
                  label="Contributory Pension Paid"
                  value={deductions.pensionPaid}
                  onChange={(v) => updateDeduction('pensionPaid', v)}
                />
                <CurrencyInput
                  label="NHF Paid"
                  value={deductions.nhfPaid}
                  onChange={(v) => updateDeduction('nhfPaid', v)}
                />
                <CurrencyInput
                  label="NHIS Paid"
                  value={deductions.nhisPaid}
                  onChange={(v) => updateDeduction('nhisPaid', v)}
                />
                <CurrencyInput
                  label="Interest on Mortgage"
                  value={deductions.mortgageInterest}
                  onChange={(v) => updateDeduction('mortgageInterest', v)}
                />
                <CurrencyInput
                  label="Life Insurance Paid"
                  value={deductions.lifeInsurance}
                  onChange={(v) => updateDeduction('lifeInsurance', v)}
                />
              </div>
            </div>

            {/* Clear Button */}
            <div className="flex justify-end">
              <button
                onClick={handleClearAll}
                className="px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border-2 border-green-600 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-green-600">
                Tax Computation
              </h2>

              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Income</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalIncome)}
                  </p>
                </div>

                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Deductions</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalDeductions)}
                  </p>
                </div>

                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Taxable Income</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.taxableIncome)}
                  </p>
                </div>

                <div className="bg-green-50 border-2 border-green-600 p-4 rounded-lg">
                  <p className="text-sm text-green-900 font-medium mb-2">
                    Annual Tax Due
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {formatCurrency(results.annualTax)}
                  </p>
                </div>

                <div className="bg-green-600 p-4 rounded-lg">
                  <p className="text-sm text-white font-medium mb-2">
                    Monthly Tax
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(results.monthlyTax)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>AJETAX 2026 - Nigerian Personal Income Tax Calculator</p>
        </div>
      </div>
    </div>
  );
};