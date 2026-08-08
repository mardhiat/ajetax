AJETAX

A web app that estimates Nigerian Personal Income Tax for the 2026 tax year. Enter your income, deductions, and prepaid taxes to see your estimated liability, bracket breakdown, and monthly payment.

Live app: https://ajetax.vercel.app

What it does

The calculator covers employment income, investments, capital gains, statutory deductions (pension, NHF, rent relief), and prepaid taxes (PAYE, WHT). Results update as you type.

Tax logic lives in `utils/taxCalculations.ts`, including the 2026 progressive brackets and deduction caps.

Getting started

Requirements: Node.js 18 or later.

```
npm install
npm run dev
```

Other commands:

```
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

Project structure

```
App.tsx                      Main layout and form
components/
  CurrencyInput.tsx          Naira input field
  ResultsSection.tsx         Summary cards and bracket table
utils/
  taxCalculations.ts         Tax computation logic
types.ts                     Form and result types
```

Tech stack

React, TypeScript, Vite, Tailwind CSS

Disclaimer

This tool is for estimation only. For official filings, consult the Nigerian Revenue Service (NRS) or a certified tax professional.

Credits

Developed by Mardhiat Ajetunmobi  
Tax concept by Maruf A. Ajetunmobi, Msc, AMNIM, FCTI
