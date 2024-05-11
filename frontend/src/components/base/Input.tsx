// components/base/BaseInput.tsx
import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      <label className="mb-2 text-lg font-bold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default Input;
