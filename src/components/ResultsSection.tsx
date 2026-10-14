import React from 'react';
import type { TaxResults } from '../types';
import { formatNaira } from '../utils/taxCalculations';

interface ResultsSectionProps {
  results: TaxResults;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const isCredit = results.taxLiability < 0;
  const headline = isCredit
    ? 'Tax overpaid'
    : results.taxLiability === 0
      ? 'No tax left to pay'
      : 'Tax left to pay';

  const rows = [
    ['Total income', results.grossWorldwideIncome],
    ['Deductions allowed', results.totalDeductions],
    ['Taxable income', results.taxableIncome],
    ['Tax for the year', results.taxDue],
    ['Tax already paid', results.totalPrepaidTaxes],
  ] as const;

  return (
    <div className="border border-gray-300 bg-white p-4">
      <p className="text-sm text-gray-700">{headline}</p>
      <p className="num mt-1 text-3xl font-semibold text-green-900">
        {formatNaira(Math.abs(results.taxLiability))}
      </p>
      <p className="num mt-1 text-sm text-gray-700">
        {results.monthlyTax < 0
          ? `${formatNaira(Math.abs(results.monthlyTax))} a month overpaid`
          : `${formatNaira(results.monthlyTax)} a month`}
      </p>

      <dl className="mt-4 border-t border-gray-200">
        {rows.map(([label, amount]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4 border-b border-gray-200 py-2 text-sm"
          >
            <dt>{label}</dt>
            <dd className="num whitespace-nowrap">{formatNaira(amount)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export function BracketTable({ results }: ResultsSectionProps) {
  return (
    <section className="mt-8 border border-gray-300 bg-white p-4">
      <h2 className="mb-2 text-base font-semibold">How the tax was split</h2>
      {results.brackets.length === 0 ? (
        <p className="text-sm text-gray-600">Enter your income and the bands will show here.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-gray-700">
                <th className="py-2 pr-3 font-medium">Band</th>
                <th className="py-2 pr-3 text-right font-medium">Income in this band</th>
                <th className="py-2 pr-3 text-right font-medium">Rate</th>
                <th className="py-2 text-right font-medium">Tax</th>
              </tr>
            </thead>
            <tbody>
              {results.brackets.map((bracket) => (
                <tr key={bracket.label} className="border-b border-gray-200">
                  <td className="py-2 pr-3">{bracket.label}</td>
                  <td className="num whitespace-nowrap py-2 pr-3 text-right">
                    {formatNaira(bracket.amount)}
                  </td>
                  <td className="num py-2 pr-3 text-right">{(bracket.rate * 100).toFixed(0)}%</td>
                  <td className="num whitespace-nowrap py-2 text-right">
                    {formatNaira(bracket.tax)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 pr-3 font-semibold" colSpan={3}>
                  Tax for the year
                </td>
                <td className="num whitespace-nowrap py-2 text-right font-semibold">
                  {formatNaira(results.taxDue)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ResultsSection;
