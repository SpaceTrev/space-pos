import React from 'react';
import type { CartItemProps } from './CartItem.model';

export const CartItemView = ({ className, children }: CartItemProps) => {
  return <div className={className ?? 'p-4 border'}>{children ?? 'CartItemView'}</div>;
};