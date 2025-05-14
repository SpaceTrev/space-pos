import React from 'react';
import { InputView } from './Input.view';
import type { InputProps } from './Input.model';

export const Input = (props: InputProps) => {
  return <InputView {...props} />;
};