import React from 'react';
import { ProductCard } from './ProductCard.container';

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <ProductCard>Example ProductCard</ProductCard>
  </div>
);