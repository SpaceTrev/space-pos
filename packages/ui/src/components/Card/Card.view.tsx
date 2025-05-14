import React from 'react';
import type { CardProps } from './Card.model';

export const CardView = ({ className, children }: CardProps) => {
  return <div className={className ?? 'p-4 border'}>{children ?? 'CardView'}</div>;
};