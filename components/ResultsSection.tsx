
import React from 'react';
import { TaxResults } from '../types';
import { formatNaira } from '../utils/taxCalculations';

interface ResultsSectionProps {
  results: TaxResults;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const isCredit = results.taxLiability < 0;

  return (
    <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Gross Worldwide Income</p>
          <p className="text-2xl font-bold mono text-gray-800">{formatNaira(results.grossWorldwideIncome)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Deductions</p>
          <p className="text-2xl font-bold mono text-emerald-700">{formatNaira(results.totalDeductions)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Taxable Income</p>
          <p className="text-2xl font-bold mono text-gray-800">{formatNaira(results.taxableIncome)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Tax Due</p>
          <p className="text-2xl font-bold mono text-gray-800">{formatNaira(results.taxDue)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Prepaid Taxes</p>
          <p className="text-2xl font-bold mono text-emerald-600">{formatNaira(results.totalPrepaidTaxes)}</p>
        </div>

        <div className={`p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${isCredit ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200'}`}>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
            {isCredit ? 'Tax Credit (Refundable)' : 'Tax Liability (Payable)'}
          </p>
          <p className={`text-2xl font-bold mono ${isCredit ? 'text-emerald-700' : 'text-red-600'}`}>
            {formatNaira(Math.abs(results.taxLiability))}
          </p>
        </div>
      </div>

      <div className="bg-emerald-700 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-white text-center transform hover:scale-[1.01] transition-transform">
        <p className="text-emerald-100 font-medium uppercase tracking-widest text-sm mb-2">Estimated Monthly Tax Payment</p>
        <p className="text-5xl font-bold mono tracking-tight mb-2">
          {formatNaira(Math.max(0, results.monthlyTax))}
        </p>
        <p className="text-emerald-200 text-sm opacity-80">Based on annual liability divided by 12 months</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Tax Bracket Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Tax Bracket</th>
                <th className="px-6 py-3 text-right">Income in Bracket</th>
                <th className="px-6 py-3 text-right">Rate</th>
                <th className="px-6 py-3 text-right">Tax Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.brackets.map((b, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-700">{b.label}</td>
                  <td className="px-6 py-4 text-right mono">{formatNaira(b.amount)}</td>
                  <td className="px-6 py-4 text-right mono">{(b.rate * 100).toFixed(0)}%</td>
                  <td className="px-6 py-4 text-right mono font-semibold text-gray-800">{formatNaira(b.tax)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan={3} className="px-6 py-4 font-bold text-gray-800">Total Tax Due</td>
                <td className="px-6 py-4 text-right mono font-bold text-gray-900">{formatNaira(results.taxDue)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
