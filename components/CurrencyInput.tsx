
import React from 'react';

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
  value, 
  onChange, 
  helperText,
  placeholder = "0.00" 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(isNaN(val) ? 0 : val);
  };

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₦</span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={value === 0 ? "" : value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all duration-200 mono text-gray-800"
        />
      </div>
      {helperText && <p className="text-xs text-gray-500 italic">{helperText}</p>}
    </div>
  );
};

export default CurrencyInput;
