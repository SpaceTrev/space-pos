import React from 'react';
import { CardView } from './Card.view';
import type { CardProps } from './Card.model';

export const Card = (props: CardProps) => {
  return <CardView {...props} />;
};