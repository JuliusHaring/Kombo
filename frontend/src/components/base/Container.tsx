import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="m-4 rounded-lg bg-beige-50 p-4 shadow-lg">{children}</div>
  );
};
