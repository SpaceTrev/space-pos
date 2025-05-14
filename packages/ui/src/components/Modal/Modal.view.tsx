import React from 'react';
import type { ModalProps } from './Modal.model';

export const ModalView = ({ className, children }: ModalProps) => {
  return <div className={className ?? 'p-4 border'}>{children ?? 'ModalView'}</div>;
};