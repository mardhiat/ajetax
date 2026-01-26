import React from 'react';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '0.00',
}) => {
  const formatNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-NG');
  };

  const parseNumber = (str: string): number => {
    const cleaned = str.replace(/[^0-9]/g, '');
    return cleaned === '' ? 0 : parseInt(cleaned, 10);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseNumber(e.target.value);
    onChange(parsed);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          ₦
        </span>
        <input
          type="text"
          value={formatNumber(value)}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  );
};