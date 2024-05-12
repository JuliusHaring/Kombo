// components/base/BaseForm.tsx
import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

const Form: React.FC<FormProps> = ({ children, onSubmit, className }) => {
  return (
    <form onSubmit={onSubmit} className={`${className}`}>
      {children}
    </form>
  );
};

export default Form;
