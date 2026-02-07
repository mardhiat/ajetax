import React, { useState, useMemo, useEffect } from 'react';
import type { TaxFormData, TaxResults } from './types';
import { calculateTax } from './utils/taxCalculations';
import CurrencyInput from './components/CurrencyInput';
import ResultsSection from './components/ResultsSection';

const INITIAL_FORM_DATA: TaxFormData = {
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
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<TaxFormData>(INITIAL_FORM_DATA);
  const results = useMemo(() => calculateTax(formData), [formData]);

  const updateField = (field: keyof TaxFormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [activeSection, setActiveSection] = useState<'income' | 'deductions' | 'prepaid'>('income');

  return (
    <div className="min-h-screen pb-20" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
                <div className="flex h-10 w-16">
                    <div className="bg-emerald-700 h-full flex-1 rounded-l-md"></div>
                    <div className="bg-white h-full flex-1"></div>
                    <div className="bg-emerald-700 h-full flex-1 rounded-r-md"></div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 tracking-tighter mt-1">AJETAX</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AJETAX</h1>
              <p className="text-xs text-gray-500 font-medium">Nigerian PIT Calculator • 2026 Tax Year</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-emerald-700">Premium Financial Tool</p>
            <p className="text-xs text-gray-400">Strictly for informational purposes</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Inputs Panel */}
          <div className="xl:col-span-6 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Income Declaration</h2>
                <div className="flex space-x-2">
                    <button onClick={() => setFormData(INITIAL_FORM_DATA)} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 hover:bg-emerald-50 transition-all">
                        Reset All
                    </button>
                </div>
              </div>

              {/* Employment Income Sub-Section */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 mb-6">
                <h3 className="text-base font-bold text-gray-700 border-l-4 border-emerald-600 pl-3">Employment Income</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <CurrencyInput label="Annual Basic Salary" name="basicSalary" value={formData.basicSalary} onChange={(v) => updateField('basicSalary', v)} />
                  <CurrencyInput label="Employment Allowances" name="employmentAllowances" value={formData.employmentAllowances} onChange={(v) => updateField('employmentAllowances', v)} helperText="Housing, Transport, etc." />
                  <CurrencyInput label="Other Allowances" name="otherEmploymentAllowances" value={formData.otherEmploymentAllowances} onChange={(v) => updateField('otherEmploymentAllowances', v)} />
                  <CurrencyInput label="Benefits in Kind" name="benefitsInKind" value={formData.benefitsInKind} onChange={(v) => updateField('benefitsInKind', v)} />
                  <CurrencyInput label="Annual Pension Income / Gratuity" name="gratuityReceived" value={formData.gratuityReceived} onChange={(v) => updateField('gratuityReceived', v)} />
                  <CurrencyInput label="Job Compensation" name="lossOfJobCompensation" value={formData.lossOfJobCompensation} onChange={(v) => updateField('lossOfJobCompensation', v)} />
                  <CurrencyInput label="Salary Arrears" name="salaryArrears" value={formData.salaryArrears} onChange={(v) => updateField('salaryArrears', v)} />
                  <CurrencyInput label="Bonus / Commission" name="bonusCommission" value={formData.bonusCommission} onChange={(v) => updateField('bonusCommission', v)} />
                  <CurrencyInput label="Notice Pay" name="noticePay" value={formData.noticePay} onChange={(v) => updateField('noticePay', v)} />
                </div>
              </div>

              {/* Investment & Capital Gains Sub-Section */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-base font-bold text-gray-700 border-l-4 border-emerald-600 pl-3">Investment & Gains</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <CurrencyInput label="Net Trading Income" name="netTradingIncome" value={formData.netTradingIncome} onChange={(v) => updateField('netTradingIncome', v)} />
                  <CurrencyInput label="Gross Rental Income" name="grossRentalIncome" value={formData.grossRentalIncome} onChange={(v) => updateField('grossRentalIncome', v)} />
                  <CurrencyInput label="Gross Dividend" name="grossDividendReceived" value={formData.grossDividendReceived} onChange={(v) => updateField('grossDividendReceived', v)} />
                  <CurrencyInput label="Gross Interest" name="grossInterestReceived" value={formData.grossInterestReceived} onChange={(v) => updateField('grossInterestReceived', v)} />
                  <CurrencyInput label="Digital Earnings (Crypto/NFT)" name="virtualDigitalEarnings" value={formData.virtualDigitalEarnings} onChange={(v) => updateField('virtualDigitalEarnings', v)} />
                  <CurrencyInput label="Gross Foreign Income" name="grossForeignIncome" value={formData.grossForeignIncome} onChange={(v) => updateField('grossForeignIncome', v)} />
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-4 border-t border-gray-100">
                    <CurrencyInput label="Cost of Shares Disposed" name="initialCostOfShares" value={formData.initialCostOfShares} onChange={(v) => updateField('initialCostOfShares', v)} />
                    <CurrencyInput label="Proceeds from Shares" name="sharesDisposedProceeds" value={formData.sharesDisposedProceeds} onChange={(v) => updateField('sharesDisposedProceeds', v)} />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Allowable Deductions</h2>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <CurrencyInput label="Rent Paid" name="rentPaid" value={formData.rentPaid} onChange={(v) => updateField('rentPaid', v)} helperText="Max deduction: ₦500k or 20% of rent" />
                  <CurrencyInput label="Pension Contribution" name="pensionPaid" value={formData.pensionPaid} onChange={(v) => updateField('pensionPaid', v)} helperText="Max: 8% of Basic + Allowances" />
                  <CurrencyInput label="NHF Paid" name="nhfPaid" value={formData.nhfPaid} onChange={(v) => updateField('nhfPaid', v)} helperText="Max: 2.5% of Basic Salary" />
                  <CurrencyInput label="NHIS Paid" name="nhisPaid" value={formData.nhisPaid} onChange={(v) => updateField('nhisPaid', v)} />
                  <CurrencyInput label="Mortgage Interest" name="mortgageInterest" value={formData.mortgageInterest} onChange={(v) => updateField('mortgageInterest', v)} />
                  <CurrencyInput label="Life Insurance" name="lifeInsurancePaid" value={formData.lifeInsurancePaid} onChange={(v) => updateField('lifeInsurancePaid', v)} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Prepaid Taxes</h2>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <CurrencyInput label="PAYE Withheld" name="payeWithheld" value={formData.payeWithheld} onChange={(v) => updateField('payeWithheld', v)} />
                  <CurrencyInput label="WHT on Dividend" name="whtDividend" value={formData.whtDividend} onChange={(v) => updateField('whtDividend', v)} />
                  <CurrencyInput label="WHT on Interest" name="whtInterest" value={formData.whtInterest} onChange={(v) => updateField('whtInterest', v)} />
                  <CurrencyInput label="WHT on Rent" name="whtRent" value={formData.whtRent} onChange={(v) => updateField('whtRent', v)} />
                  <CurrencyInput label="Foreign Tax Prepaid" name="foreignTaxPrepaid" value={formData.foreignTaxPrepaid} onChange={(v) => updateField('foreignTaxPrepaid', v)} />
                  <CurrencyInput label="Other Prepaid Tax" name="otherPrepaidTax" value={formData.otherPrepaidTax} onChange={(v) => updateField('otherPrepaidTax', v)} />
                </div>
              </div>
            </section>
          </div>

          {/* Results Side Panel */}
          <div className="xl:col-span-6 relative">
            <div className="sticky top-28">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Calculation Results</h2>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <ResultsSection results={results} />
              
              <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-4">
                <div className="p-2 bg-emerald-700 rounded-lg text-white mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <h4 className="font-bold text-emerald-900 text-sm">Real-time Compliance Check</h4>
                    <p className="text-emerald-800 text-xs leading-relaxed mt-1">AJETAX automatically applies the 2026 Nigerian tax regulations, including revised bracket thresholds and statutory deduction caps for Pensions and NHF.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-32 border-t border-gray-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex h-8 w-12 mb-6">
            <div className="bg-emerald-700 h-full flex-1 rounded-l-sm"></div>
            <div className="bg-white h-full flex-1 border-t border-b border-gray-100"></div>
            <div className="bg-emerald-700 h-full flex-1 rounded-r-sm"></div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Produced by Maruf A. Ajetunmobi, Msc, AMNIM, FCTI</p>
          <div className="mt-2 flex flex-col items-center space-y-1">
            <p className="text-xs text-gray-400">
              <a href="mailto:marmutmufmur@gmail.com" className="hover:text-emerald-600 transition-colors">Email: marmutmufmur@gmail.com</a>
            </p>
            <p className="text-xs text-gray-400">
              Tel: <a href="tel:+18623715007" className="hover:text-emerald-600 transition-colors">+1 (862) 371-5007</a> | <a href="tel:+18623072294" className="hover:text-emerald-600 transition-colors">+1 (862) 307-2294</a>
            </p>
          </div>
          {/* <p className="text-xs text-gray-400 mt-1">Developed by Mardhiat Ajetunmobi</p> */}
          <p className="text-xs text-gray-400 mt-3 text-center max-w-md">Disclaimer: This tool provides estimations based on provided logic for the 2026 tax year. For official filings, consult a certified tax professional or the Nigerian Revenue Service (NRS).</p>
          <div className="mt-8 pt-8 border-t border-gray-50 w-full flex justify-center space-x-6 text-xs text-gray-400">
            <span>&copy; 2026 AJETAX</span>
            <span>Version 1.0.4-stable</span>
            <span>Tax Protocol: NG-PIT-2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;