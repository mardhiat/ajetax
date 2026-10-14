import React, { useMemo, useState } from 'react';
import packageJson from '../package.json';
import CurrencyInput from './components/CurrencyInput';
import Logo from './components/Logo';
import ResultsSection from './components/ResultsSection';
import type { TaxFormData } from './types';
import { calculateTax } from './utils/taxCalculations';

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

const EXAMPLE_FORM_DATA: TaxFormData = {
  ...INITIAL_FORM_DATA,
  basicSalary: 4_800_000,
  employmentAllowances: 1_200_000,
  pensionPaid: 480_000,
  nhfPaid: 120_000,
  rentPaid: 2_000_000,
  payeWithheld: 200_000,
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<TaxFormData>(INITIAL_FORM_DATA);
  const results = useMemo(() => calculateTax(formData), [formData]);

  const updateField = (field: keyof TaxFormData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Logo />
            <div>
              <h1 className="text-xl font-bold text-gray-800">AJETAX</h1>
              <p className="text-xs font-medium text-gray-500">
                Nigerian PIT Calculator • 2026 Tax Year
              </p>
            </div>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-emerald-700">Personal income tax estimator</p>
            <p className="text-xs text-gray-400">For informational purposes only</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-12">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          <div className="space-y-10 xl:col-span-6">
            <section>
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Income Declaration</h2>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setFormData(EXAMPLE_FORM_DATA)}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50"
                  >
                    Load example
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(INITIAL_FORM_DATA)}
                    className="rounded-full border border-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600 transition-all hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Reset All
                  </button>
                </div>
              </div>

              <div className="mb-6 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="border-l-4 border-emerald-600 pl-3 text-base font-bold text-gray-700">
                  Employment Income
                </h3>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <CurrencyInput
                    label="Annual Basic Salary"
                    name="basicSalary"
                    value={formData.basicSalary}
                    onChange={(v) => updateField('basicSalary', v)}
                  />
                  <CurrencyInput
                    label="Employment Allowances"
                    name="employmentAllowances"
                    value={formData.employmentAllowances}
                    onChange={(v) => updateField('employmentAllowances', v)}
                    helperText="Housing, Transport, etc."
                  />
                  <CurrencyInput
                    label="Other Allowances"
                    name="otherEmploymentAllowances"
                    value={formData.otherEmploymentAllowances}
                    onChange={(v) => updateField('otherEmploymentAllowances', v)}
                  />
                  <CurrencyInput
                    label="Benefits in Kind"
                    name="benefitsInKind"
                    value={formData.benefitsInKind}
                    onChange={(v) => updateField('benefitsInKind', v)}
                  />
                  <CurrencyInput
                    label="Annual Pension Income / Gratuity"
                    name="gratuityReceived"
                    value={formData.gratuityReceived}
                    onChange={(v) => updateField('gratuityReceived', v)}
                  />
                  <CurrencyInput
                    label="Job Compensation"
                    name="lossOfJobCompensation"
                    value={formData.lossOfJobCompensation}
                    onChange={(v) => updateField('lossOfJobCompensation', v)}
                  />
                  <CurrencyInput
                    label="Salary Arrears"
                    name="salaryArrears"
                    value={formData.salaryArrears}
                    onChange={(v) => updateField('salaryArrears', v)}
                  />
                  <CurrencyInput
                    label="Bonus / Commission"
                    name="bonusCommission"
                    value={formData.bonusCommission}
                    onChange={(v) => updateField('bonusCommission', v)}
                  />
                  <CurrencyInput
                    label="Notice Pay"
                    name="noticePay"
                    value={formData.noticePay}
                    onChange={(v) => updateField('noticePay', v)}
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="border-l-4 border-emerald-600 pl-3 text-base font-bold text-gray-700">
                  Investment & Gains
                </h3>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <CurrencyInput
                    label="Net Trading Income"
                    name="netTradingIncome"
                    value={formData.netTradingIncome}
                    onChange={(v) => updateField('netTradingIncome', v)}
                  />
                  <CurrencyInput
                    label="Gross Rental Income"
                    name="grossRentalIncome"
                    value={formData.grossRentalIncome}
                    onChange={(v) => updateField('grossRentalIncome', v)}
                  />
                  <CurrencyInput
                    label="Gross Dividend"
                    name="grossDividendReceived"
                    value={formData.grossDividendReceived}
                    onChange={(v) => updateField('grossDividendReceived', v)}
                  />
                  <CurrencyInput
                    label="Gross Interest"
                    name="grossInterestReceived"
                    value={formData.grossInterestReceived}
                    onChange={(v) => updateField('grossInterestReceived', v)}
                  />
                  <CurrencyInput
                    label="Digital Earnings (Crypto/NFT)"
                    name="virtualDigitalEarnings"
                    value={formData.virtualDigitalEarnings}
                    onChange={(v) => updateField('virtualDigitalEarnings', v)}
                  />
                  <CurrencyInput
                    label="Gross Foreign Income"
                    name="grossForeignIncome"
                    value={formData.grossForeignIncome}
                    onChange={(v) => updateField('grossForeignIncome', v)}
                  />
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-gray-100 pt-4 md:col-span-2 md:grid-cols-2">
                    <CurrencyInput
                      label="Cost of Shares Disposed"
                      name="initialCostOfShares"
                      value={formData.initialCostOfShares}
                      onChange={(v) => updateField('initialCostOfShares', v)}
                    />
                    <CurrencyInput
                      label="Proceeds from Shares"
                      name="sharesDisposedProceeds"
                      value={formData.sharesDisposedProceeds}
                      onChange={(v) => updateField('sharesDisposedProceeds', v)}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 border-b border-gray-100 pb-4 text-2xl font-bold text-gray-800">
                Allowable Deductions
              </h2>
              <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <CurrencyInput
                    label="Rent Paid"
                    name="rentPaid"
                    value={formData.rentPaid}
                    onChange={(v) => updateField('rentPaid', v)}
                    helperText="Max deduction: ₦500k or 20% of rent"
                  />
                  <CurrencyInput
                    label="Pension Contribution"
                    name="pensionPaid"
                    value={formData.pensionPaid}
                    onChange={(v) => updateField('pensionPaid', v)}
                    helperText="Max: 8% of basic salary + employment allowances"
                  />
                  <CurrencyInput
                    label="NHF Paid"
                    name="nhfPaid"
                    value={formData.nhfPaid}
                    onChange={(v) => updateField('nhfPaid', v)}
                    helperText="Max: 2.5% of basic salary"
                  />
                  <CurrencyInput
                    label="NHIS Paid"
                    name="nhisPaid"
                    value={formData.nhisPaid}
                    onChange={(v) => updateField('nhisPaid', v)}
                  />
                  <CurrencyInput
                    label="Mortgage Interest"
                    name="mortgageInterest"
                    value={formData.mortgageInterest}
                    onChange={(v) => updateField('mortgageInterest', v)}
                  />
                  <CurrencyInput
                    label="Life Insurance"
                    name="lifeInsurancePaid"
                    value={formData.lifeInsurancePaid}
                    onChange={(v) => updateField('lifeInsurancePaid', v)}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 border-b border-gray-100 pb-4 text-2xl font-bold text-gray-800">
                Prepaid Taxes
              </h2>
              <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <CurrencyInput
                    label="PAYE Withheld"
                    name="payeWithheld"
                    value={formData.payeWithheld}
                    onChange={(v) => updateField('payeWithheld', v)}
                  />
                  <CurrencyInput
                    label="WHT on Dividend"
                    name="whtDividend"
                    value={formData.whtDividend}
                    onChange={(v) => updateField('whtDividend', v)}
                  />
                  <CurrencyInput
                    label="WHT on Interest"
                    name="whtInterest"
                    value={formData.whtInterest}
                    onChange={(v) => updateField('whtInterest', v)}
                  />
                  <CurrencyInput
                    label="WHT on Rent"
                    name="whtRent"
                    value={formData.whtRent}
                    onChange={(v) => updateField('whtRent', v)}
                  />
                  <CurrencyInput
                    label="Foreign Tax Prepaid"
                    name="foreignTaxPrepaid"
                    value={formData.foreignTaxPrepaid}
                    onChange={(v) => updateField('foreignTaxPrepaid', v)}
                  />
                  <CurrencyInput
                    label="Other Prepaid Tax"
                    name="otherPrepaidTax"
                    value={formData.otherPrepaidTax}
                    onChange={(v) => updateField('otherPrepaidTax', v)}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="relative xl:col-span-6">
            <div className="sticky top-28">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Calculation Results</h2>
                <div
                  className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
              </div>
              <ResultsSection results={results} />

              <div className="mt-8 flex items-start space-x-4 rounded-xl border border-emerald-100 bg-emerald-50 p-6">
                <div className="mt-1 rounded-lg bg-emerald-700 p-2 text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">How calculations work</h4>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-800">
                    Results use 2026 Nigerian tax brackets and statutory deduction limits for
                    pension and NHF contributions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-32 border-t border-gray-200 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
          <Logo className="mb-6 h-8 w-12" wordmark={false} />
          <p className="text-sm font-medium text-gray-500">
            Produced by Maruf A. Ajetunmobi, MSc, AMNIM, FCTI
          </p>
          <ul className="mt-3 flex flex-col items-center space-y-1 text-xs text-gray-400">
            <li>
              <a
                href="mailto:marmutmufmur@gmail.com"
                className="transition-colors hover:text-emerald-600"
              >
                marmutmufmur@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/18623715007"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-600"
              >
                WhatsApp: +1 (862) 371-5007
              </a>
            </li>
            <li>
              <a href="tel:+2349138047181" className="transition-colors hover:text-emerald-600">
                Direct call: +234 913 804 7181
              </a>
            </li>
          </ul>
          <p className="mt-2 text-xs text-gray-400">Developed by Mardhiat Ajetunmobi</p>
          <p className="mt-3 max-w-md text-center text-xs text-gray-400">
            This tool provides estimates for the 2026 tax year. For official filings, consult a
            certified tax professional or the Nigerian Revenue Service (NRS).
          </p>
          <div className="mt-8 flex w-full justify-center space-x-6 border-t border-gray-50 pt-8 text-xs text-gray-400">
            <span>&copy; 2026 AJETAX</span>
            <span>Version {packageJson.version}</span>
            <span>2026 tax year</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
