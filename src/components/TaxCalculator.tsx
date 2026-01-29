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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-xl shadow-md">
                <span className="text-white text-2xl font-bold">₦</span>
              </div>
              <div>
                <h1 className="text-3xl font-serif font-semibold text-gray-900">AJETAX</h1>
                <p className="text-sm text-gray-500 font-light mt-1">Nigerian Personal Income Tax Calculator 2026</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-xs font-medium tracking-wide">LIVE CALCULATOR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Employment Income */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
                <h2 className="text-xl font-serif font-semibold text-gray-900">Employment Income</h2>
                <p className="text-sm text-gray-500 mt-1">Enter your employment-related earnings</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Investment Income */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
                <h2 className="text-xl font-serif font-semibold text-gray-900">Investment Income</h2>
                <p className="text-sm text-gray-500 mt-1">Trading, rental, dividends, and other investments</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Capital Gains */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
                <h2 className="text-xl font-serif font-semibold text-gray-900">Capital Gains</h2>
                <p className="text-sm text-gray-500 mt-1">Shares disposal and capital transactions</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Deductions */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
                <h2 className="text-xl font-serif font-semibold text-gray-900">Deductions & Reliefs</h2>
                <p className="text-sm text-gray-500 mt-1">Tax-deductible expenses and contributions</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Clear Button */}
            <div className="flex justify-end">
              <button
                onClick={handleClearAll}
                className="px-6 py-3 bg-white text-gray-700 rounded-xl font-medium text-sm shadow-sm hover:shadow-md border border-gray-200 hover:border-red-300 hover:text-red-600 transition-all"
              >
                Clear All Fields
              </button>
            </div>
          </div>

          {/* Right Column - Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 sticky top-28">
              <div className="bg-gradient-to-br from-green-600 to-green-700 px-8 py-8 text-white">
                <h2 className="text-2xl font-serif font-semibold mb-2">Tax Computation</h2>
                <p className="text-green-100 text-sm font-light">Your complete tax breakdown</p>
              </div>

              <div className="p-8 space-y-4">
                {/* Total Income */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Total Income</p>
                  <p className="text-2xl font-serif font-semibold text-gray-900">
                    {formatCurrency(results.totalIncome)}
                  </p>
                </div>

                {/* Total Deductions */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Total Deductions</p>
                  <p className="text-2xl font-serif font-semibold text-gray-900">
                    {formatCurrency(results.totalDeductions)}
                  </p>
                </div>

                {/* Taxable Income */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Taxable Income</p>
                  <p className="text-2xl font-serif font-semibold text-gray-900">
                    {formatCurrency(results.taxableIncome)}
                  </p>
                </div>

                {/* Annual Tax */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
                  <p className="text-xs text-green-100 uppercase tracking-wider font-semibold mb-2">Annual Tax Due</p>
                  <p className="text-3xl font-serif font-bold text-white">
                    {formatCurrency(results.annualTax)}
                  </p>
                </div>

                {/* Monthly Tax */}
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <p className="text-xs text-green-700 uppercase tracking-wider font-semibold mb-2">Monthly Tax</p>
                  <p className="text-3xl font-serif font-bold text-green-700">
                    {formatCurrency(results.monthlyTax)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center pb-8">
          <div className="inline-block bg-white rounded-full px-8 py-4 shadow-sm border border-gray-100">
            <p className="text-gray-700 font-medium text-sm">🇳🇬 AJETAX 2026 — Nigerian Personal Income Tax Calculator</p>
          </div>
        </div>
      </div>
    </div>
  );
};