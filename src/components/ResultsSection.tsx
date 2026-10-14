import React from 'react';
import type { TaxResults } from '../types';
import { formatNaira } from '../utils/taxCalculations';

interface ResultsSectionProps {
  results: TaxResults;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const isCredit = results.taxLiability < 0;
  const monthlyIsCredit = results.monthlyTax < 0;

  const getAmountFontSize = (value: number) => {
    const formatted = formatNaira(value);
    if (formatted.length > 18) return 'text-base';
    if (formatted.length > 15) return 'text-lg';
    return 'text-xl';
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Gross Worldwide Income
          </p>
          <p
            className={`${getAmountFontSize(results.grossWorldwideIncome)} whitespace-nowrap font-bold text-gray-800`}
          >
            {formatNaira(results.grossWorldwideIncome)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Deductions
          </p>
          <p
            className={`${getAmountFontSize(results.totalDeductions)} whitespace-nowrap font-bold text-emerald-700`}
          >
            {formatNaira(results.totalDeductions)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Taxable Income
          </p>
          <p
            className={`${getAmountFontSize(results.taxableIncome)} whitespace-nowrap font-bold text-gray-800`}
          >
            {formatNaira(results.taxableIncome)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">Tax Due</p>
          <p
            className={`${getAmountFontSize(results.taxDue)} whitespace-nowrap font-bold text-gray-800`}
          >
            {formatNaira(results.taxDue)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Prepaid Taxes
          </p>
          <p
            className={`${getAmountFontSize(results.totalPrepaidTaxes)} whitespace-nowrap font-bold text-emerald-600`}
          >
            {formatNaira(results.totalPrepaidTaxes)}
          </p>
        </div>

        <div
          className={`rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md ${isCredit ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-white'}`}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            {isCredit ? 'Tax Credit (Refundable)' : 'Tax Liability (Payable)'}
          </p>
          <p
            className={`${getAmountFontSize(Math.abs(results.taxLiability))} whitespace-nowrap font-bold ${isCredit ? 'text-emerald-700' : 'text-red-600'}`}
          >
            {formatNaira(Math.abs(results.taxLiability))}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl bg-emerald-700 p-8 text-center text-white shadow-lg">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-emerald-100">
          {monthlyIsCredit ? 'Estimated Monthly Credit' : 'Estimated Monthly Tax Payment'}
        </p>
        <p className="mb-2 whitespace-nowrap text-4xl font-bold tracking-tight">
          {formatNaira(Math.abs(results.monthlyTax))}
        </p>
        <p className="text-xs text-emerald-200 opacity-80">
          {monthlyIsCredit
            ? 'Based on the annual credit divided by 12 months'
            : 'Based on the annual liability divided by 12 months'}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-800">Tax Bracket Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Tax Bracket</th>
                <th className="px-6 py-3 text-right">Income in Bracket</th>
                <th className="px-6 py-3 text-right">Rate</th>
                <th className="px-6 py-3 text-right">Tax Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.brackets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                    Enter income to see how it falls across the 2026 brackets.
                  </td>
                </tr>
              ) : (
                results.brackets.map((bracket) => (
                  <tr key={bracket.label} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{bracket.label}</td>
                    <td className="px-6 py-4 text-right text-sm">{formatNaira(bracket.amount)}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      {(bracket.rate * 100).toFixed(0)}%
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                      {formatNaira(bracket.tax)}
                    </td>
                  </tr>
                ))
              )}
              <tr className="bg-gray-50">
                <td colSpan={3} className="px-6 py-4 font-bold text-gray-800">
                  Total Tax Due
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">
                  {formatNaira(results.taxDue)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
