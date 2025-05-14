import React from 'react';
import type { ProductCardProps } from './ProductCard.model';

export const ProductCardView = ({ className, children }: ProductCardProps) => {
  return <div className={className ?? 'p-4 border'}>{children ?? 'ProductCardView'}</div>;
};