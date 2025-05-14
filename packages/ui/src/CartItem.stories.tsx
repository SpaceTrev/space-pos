import React from 'react';
import { CartItem } from '../index';

export default {
  title: 'Components/CartItem',
  component: CartItem,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <CartItem />
  </div>
);