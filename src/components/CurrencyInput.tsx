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
  placeholder = '0',
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
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {label}
        <span className="text-green-600 font-semibold">(₦)</span>
      </label>
      <input
        type="text"
        value={formatNumber(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );
};