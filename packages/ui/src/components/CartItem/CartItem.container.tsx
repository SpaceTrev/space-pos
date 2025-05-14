import React from 'react';
import { CartItemView } from './CartItem.view';
import type { CartItemProps } from './CartItem.model';

export const CartItem = (props: CartItemProps) => {
  return <CartItemView {...props} />;
};