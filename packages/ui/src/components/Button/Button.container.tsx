import React from 'react';
import { ButtonView } from './Button.view';
import type { ButtonProps } from './Button.model';

export const Button = (props: ButtonProps) => {
  return <ButtonView {...props} />;
};