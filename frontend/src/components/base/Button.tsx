// components/base/BaseButton.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
