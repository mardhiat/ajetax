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
    <div className="result-card" aria-live="polite">
      <p className="result-kicker">{headline}</p>
      <p className="result-amount num">{formatNaira(Math.abs(results.taxLiability))}</p>
      <p className="result-month num">
        {results.monthlyTax < 0
          ? `${formatNaira(Math.abs(results.monthlyTax))} a month overpaid`
          : `${formatNaira(results.monthlyTax)} a month`}
      </p>

      <dl>
        {rows.map(([label, amount]) => (
          <div key={label}>
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
    <section className="band-table" aria-labelledby="band-heading">
      <h2 id="band-heading">How the tax was split</h2>
      <div className="band-body">
        {results.brackets.length === 0 ? (
          <p>Enter your income and the bands will show here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Band</th>
                  <th scope="col">Income in this band</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Tax</th>
                </tr>
              </thead>
              <tbody>
                {results.brackets.map((bracket) => (
                  <tr key={bracket.label}>
                    <td>{bracket.label}</td>
                    <td className="num whitespace-nowrap">{formatNaira(bracket.amount)}</td>
                    <td className="num">{(bracket.rate * 100).toFixed(0)}%</td>
                    <td className="num whitespace-nowrap">{formatNaira(bracket.tax)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="font-extrabold" colSpan={3}>
                    Tax for the year
                  </td>
                  <td className="num whitespace-nowrap font-extrabold">
                    {formatNaira(results.taxDue)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ResultsSection;
