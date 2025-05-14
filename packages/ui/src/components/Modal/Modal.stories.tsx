import React from 'react';
import { Modal } from './Modal.container';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <Modal>Example Modal</Modal>
  </div>
);