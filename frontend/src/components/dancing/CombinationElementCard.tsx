import { PublicTables } from '@/app/types/database.types';
import React from 'react';
import { Header } from '../base/Header';

interface CombinationElementProps {
  element: PublicTables['combination_elements']['Row'];
  className: string;
}

const CombinationElementCard: React.FC<CombinationElementProps> = ({
  element,
  className,
}) => {
  function getColorByType(
    element: PublicTables['combination_elements']['Row'],
  ) {
    switch (element.type) {
      case 'move':
        return 'bg-playfulRed-500';
      case 'position':
        return 'bg-playfulPurple-500';
      case 'transition':
        return 'bg-darkGreen-500';
      default:
        throw Error(`Color not found for type ${element.type}`);
    }
  }

  return (
    <div
      className={`mb-4 rounded-lg p-4 shadow-lg ${getColorByType(element)} ${className}`}
    >
      <div className="w-full">
        <Header className="rounded-lg p-2 shadow-inner" size="6">
          {element.name}
        </Header>
        <hr className="my-2" />
      </div>
      <p className="text-sm">Difficulty: {element.difficulty}</p>
    </div>
  );
};

export default CombinationElementCard;
