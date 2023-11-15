// components/Card.tsx
import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white shadow rounded-lg p-4">{children}</div>;
};

export default Card;
