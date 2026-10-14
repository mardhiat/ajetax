import React, { useMemo, useState } from 'react';
import packageJson from '../package.json';
import CurrencyInput from './components/CurrencyInput';
import ResultsSection, { BracketTable } from './components/ResultsSection';
import type { TaxFormData } from './types';
import { calculateTax, formatNaira } from './utils/taxCalculations';

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

  const amountLeft = formatNaira(Math.abs(results.taxLiability));
  const barLabel =
    results.taxLiability < 0
      ? 'Tax overpaid'
      : results.taxLiability === 0
        ? 'No tax left to pay'
        : 'Tax left to pay';

  return (
    <div className="min-h-screen pb-24 lg:pb-10">
      <header className="border-b border-gray-300 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-2xl font-semibold">AJETAX</h1>
          <p className="text-sm text-gray-700">Work out your 2026 personal income tax</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <p className="max-w-2xl text-sm text-gray-700">
          Enter what you earned this year, what you are allowed to deduct, and any tax already
          taken. The figure updates as you type. This is an estimate, not a filing.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setFormData(EXAMPLE_FORM_DATA)}
            className="rounded border border-green-900 bg-green-900 px-3 py-2 text-sm text-white"
          >
            Fill with a sample
          </button>
          <button
            type="button"
            onClick={() => setFormData(INITIAL_FORM_DATA)}
            className="rounded border border-gray-400 bg-white px-3 py-2 text-sm"
          >
            Clear
          </button>
        </div>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <Section title="Work">
              <CurrencyInput
                label="Basic salary for the year"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={(v) => updateField('basicSalary', v)}
              />
              <CurrencyInput
                label="Housing and transport"
                name="employmentAllowances"
                value={formData.employmentAllowances}
                onChange={(v) => updateField('employmentAllowances', v)}
                helperText="This is the allowance used for the pension limit."
              />
              <CurrencyInput
                label="Other allowances"
                name="otherEmploymentAllowances"
                value={formData.otherEmploymentAllowances}
                onChange={(v) => updateField('otherEmploymentAllowances', v)}
              />
              <CurrencyInput
                label="Benefits from work"
                name="benefitsInKind"
                value={formData.benefitsInKind}
                onChange={(v) => updateField('benefitsInKind', v)}
                helperText="Such as a car or accommodation."
              />
              <CurrencyInput
                label="Pension or gratuity received"
                name="gratuityReceived"
                value={formData.gratuityReceived}
                onChange={(v) => updateField('gratuityReceived', v)}
              />
              <CurrencyInput
                label="Pay for losing your job"
                name="lossOfJobCompensation"
                value={formData.lossOfJobCompensation}
                onChange={(v) => updateField('lossOfJobCompensation', v)}
              />
              <CurrencyInput
                label="Salary arrears"
                name="salaryArrears"
                value={formData.salaryArrears}
                onChange={(v) => updateField('salaryArrears', v)}
              />
              <CurrencyInput
                label="Bonus or commission"
                name="bonusCommission"
                value={formData.bonusCommission}
                onChange={(v) => updateField('bonusCommission', v)}
              />
              <CurrencyInput
                label="Notice pay"
                name="noticePay"
                value={formData.noticePay}
                onChange={(v) => updateField('noticePay', v)}
              />
            </Section>

            <Section title="Other income">
              <CurrencyInput
                label="Profit from business"
                name="netTradingIncome"
                value={formData.netTradingIncome}
                onChange={(v) => updateField('netTradingIncome', v)}
              />
              <CurrencyInput
                label="Rent you received"
                name="grossRentalIncome"
                value={formData.grossRentalIncome}
                onChange={(v) => updateField('grossRentalIncome', v)}
              />
              <CurrencyInput
                label="Dividends"
                name="grossDividendReceived"
                value={formData.grossDividendReceived}
                onChange={(v) => updateField('grossDividendReceived', v)}
              />
              <CurrencyInput
                label="Interest"
                name="grossInterestReceived"
                value={formData.grossInterestReceived}
                onChange={(v) => updateField('grossInterestReceived', v)}
              />
              <CurrencyInput
                label="Crypto and other digital earnings"
                name="virtualDigitalEarnings"
                value={formData.virtualDigitalEarnings}
                onChange={(v) => updateField('virtualDigitalEarnings', v)}
              />
              <CurrencyInput
                label="Income from outside Nigeria"
                name="grossForeignIncome"
                value={formData.grossForeignIncome}
                onChange={(v) => updateField('grossForeignIncome', v)}
              />
              <CurrencyInput
                label="What you paid for the shares"
                name="initialCostOfShares"
                value={formData.initialCostOfShares}
                onChange={(v) => updateField('initialCostOfShares', v)}
              />
              <CurrencyInput
                label="What you sold the shares for"
                name="sharesDisposedProceeds"
                value={formData.sharesDisposedProceeds}
                onChange={(v) => updateField('sharesDisposedProceeds', v)}
              />
            </Section>

            <Section title="What you can deduct">
              <CurrencyInput
                label="Rent you paid"
                name="rentPaid"
                value={formData.rentPaid}
                onChange={(v) => updateField('rentPaid', v)}
                helperText="Relief is 20% of this, up to ₦500,000."
              />
              <CurrencyInput
                label="Pension you paid"
                name="pensionPaid"
                value={formData.pensionPaid}
                onChange={(v) => updateField('pensionPaid', v)}
                helperText="Up to 8% of basic salary plus housing and transport."
              />
              <CurrencyInput
                label="NHF you paid"
                name="nhfPaid"
                value={formData.nhfPaid}
                onChange={(v) => updateField('nhfPaid', v)}
                helperText="Up to 2.5% of basic salary."
              />
              <CurrencyInput
                label="NHIS you paid"
                name="nhisPaid"
                value={formData.nhisPaid}
                onChange={(v) => updateField('nhisPaid', v)}
              />
              <CurrencyInput
                label="Mortgage interest"
                name="mortgageInterest"
                value={formData.mortgageInterest}
                onChange={(v) => updateField('mortgageInterest', v)}
              />
              <CurrencyInput
                label="Life insurance"
                name="lifeInsurancePaid"
                value={formData.lifeInsurancePaid}
                onChange={(v) => updateField('lifeInsurancePaid', v)}
              />
            </Section>

            <Section title="Tax already taken">
              <CurrencyInput
                label="PAYE taken by your employer"
                name="payeWithheld"
                value={formData.payeWithheld}
                onChange={(v) => updateField('payeWithheld', v)}
              />
              <CurrencyInput
                label="Withholding tax on dividends"
                name="whtDividend"
                value={formData.whtDividend}
                onChange={(v) => updateField('whtDividend', v)}
              />
              <CurrencyInput
                label="Withholding tax on interest"
                name="whtInterest"
                value={formData.whtInterest}
                onChange={(v) => updateField('whtInterest', v)}
              />
              <CurrencyInput
                label="Withholding tax on rent"
                name="whtRent"
                value={formData.whtRent}
                onChange={(v) => updateField('whtRent', v)}
              />
              <CurrencyInput
                label="Tax paid abroad"
                name="foreignTaxPrepaid"
                value={formData.foreignTaxPrepaid}
                onChange={(v) => updateField('foreignTaxPrepaid', v)}
              />
              <CurrencyInput
                label="Any other tax already paid"
                name="otherPrepaidTax"
                value={formData.otherPrepaidTax}
                onChange={(v) => updateField('otherPrepaidTax', v)}
              />
            </Section>
          </div>

          <aside className="lg:sticky lg:top-4">
            <ResultsSection results={results} />
          </aside>
        </div>
        <BracketTable results={results} />
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-gray-300 bg-white px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4">
          <p className="text-sm">{barLabel}</p>
          <p className="num text-xl font-semibold">{amountLeft}</p>
        </div>
      </div>

      <footer className="border-t border-gray-300 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-700">
          <p>Produced by Maruf A. Ajetunmobi, MSc, AMNIM, FCTI</p>
          <p className="mt-2">
            <a className="underline" href="mailto:marmutmufmur@gmail.com">
              marmutmufmur@gmail.com
            </a>
            {' · '}
            <a
              className="underline"
              href="https://wa.me/18623715007"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +1 (862) 371-5007
            </a>
            {' · '}
            <a className="underline" href="tel:+2349138047181">
              +234 913 804 7181
            </a>
          </p>
          <p className="mt-2">Developed by Mardhiat Ajetunmobi</p>
          <p className="mt-2">
            For an official filing, talk to a tax professional or the Nigerian Revenue Service.
            Version {packageJson.version}.
          </p>
        </div>
      </footer>
    </div>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 border-b border-gray-300 pb-2 text-lg font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default App;
