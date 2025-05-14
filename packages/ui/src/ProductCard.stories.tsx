import React from 'react';
import { ProductCard } from '../index';

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <ProductCard />
  </div>
);