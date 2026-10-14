import React, { useId } from 'react';

interface CurrencyInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
  placeholder?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  name,
  value,
  onChange,
  helperText,
  placeholder = '0.00',
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
    <div className="flex w-full flex-col space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-gray-400"
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
          placeholder={placeholder}
          autoComplete="off"
          aria-describedby={helperId}
          className="mono w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-8 pr-4 text-gray-800 transition-all duration-200 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
        />
      </div>
      {helperText && (
        <p id={helperId} className="text-xs italic text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default CurrencyInput;
