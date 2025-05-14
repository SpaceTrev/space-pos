import React from 'react';
import type { InputProps } from './Input.model';

export const InputView = ({ className, children }: InputProps) => {
  return <div className={className ?? 'p-4 border'}>{children ?? 'InputView'}</div>;
};