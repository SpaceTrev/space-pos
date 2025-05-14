import React from 'react';
import { ModalView } from './Modal.view';
import type { ModalProps } from './Modal.model';

export const Modal = (props: ModalProps) => {
  return <ModalView {...props} />;
};