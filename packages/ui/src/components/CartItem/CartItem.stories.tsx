import React from 'react';
import { CartItem } from './CartItem.container';

export default {
  title: 'Components/CartItem',
  component: CartItem,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <CartItem>Example CartItem</CartItem>
  </div>
);