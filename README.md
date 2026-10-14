# AJETAX

A web app that estimates Nigerian Personal Income Tax for the 2026 tax year. Enter your income, deductions, and prepaid taxes to see your estimated liability, bracket breakdown, and monthly payment.

Live app: https://ajetax.vercel.app

## What it does

The calculator covers employment income, investments, capital gains, statutory deductions (pension, NHF, rent relief), and prepaid taxes (PAYE, WHT). Results update as you type.

Tax logic lives in `src/utils/taxCalculations.ts`, including the 2026 progressive brackets and deduction caps. Use **Fill with a sample** to try a worked example.

## Getting started

Requirements: Node.js 20.19 or later, or Node.js 22.12 or later.

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build       # production build to dist/
npm run preview     # preview the production build locally
npm run test        # unit tests for the tax calculation
npm run typecheck   # TypeScript
npm run lint        # ESLint
```

## Project structure

```
index.html                   App shell
public/favicon.svg           Tab icon
src/
  main.tsx                   React entry
  App.tsx                    Layout and form
  types.ts                   Form and result types
  components/
    CurrencyInput.tsx        Naira input field
    ResultsSection.tsx       The amount left to pay, and the band table
  utils/
    taxCalculations.ts       Tax computation logic
```

## Tech stack

React, TypeScript, Vite, Tailwind CSS

## Disclaimer

This tool is for estimation only. For official filings, consult the Nigerian Revenue Service (NRS) or a certified tax professional.

## Credits

Developed by Mardhiat Ajetunmobi  
Tax concept by Maruf A. Ajetunmobi, MSc, AMNIM, FCTI
