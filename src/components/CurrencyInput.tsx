import React, { useId } from 'react';

interface CurrencyInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  name,
  value,
  onChange,
  helperText,
}) => {
  const generatedId = useId();
  const inputId = `${name}-${generatedId}`;
  const helperId = helperText ? `${inputId}-help` : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (Number.isNaN(val)) {
      onChange(0);
      return;
    }
    onChange(Math.max(0, val));
  };

  return (
    <div>
      <label htmlFor={inputId} className="mb-1 block text-sm">
        {label}
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
          aria-hidden="true"
        >
          ₦
        </span>
        <input
          id={inputId}
          type="number"
          name={name}
          inputMode="decimal"
          step="0.01"
          min="0"
          value={value === 0 ? '' : value}
          onChange={handleChange}
          placeholder="0"
          autoComplete="off"
          aria-describedby={helperId}
          className="num w-full rounded border border-gray-400 bg-white py-2.5 pl-8 pr-3 text-base focus:border-green-800 focus:outline-none"
        />
      </div>
      {helperText && (
        <p id={helperId} className="mt-1 text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default CurrencyInput;
