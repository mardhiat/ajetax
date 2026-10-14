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
      <label htmlFor={inputId} className="mb-1 block font-semibold">
        {label}
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-bold"
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
          className="money-field num"
        />
      </div>
      {helperText && (
        <p id={helperId} className="help">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default CurrencyInput;
