import React from 'react';
import type { ButtonProps } from './Button.model';

export const ButtonView = ({ className, children }: ButtonProps) => {
  return <div className={className ?? 'p-4 border'}>{children ?? 'ButtonView'}</div>;
};