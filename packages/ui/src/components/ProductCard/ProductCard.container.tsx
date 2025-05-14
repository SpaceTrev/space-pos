import React from 'react';
import { ProductCardView } from './ProductCard.view';
import type { ProductCardProps } from './ProductCard.model';

export const ProductCard = (props: ProductCardProps) => {
  return <ProductCardView {...props} />;
};