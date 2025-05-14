import React from 'react';
import { Input } from './Input.container';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <Input>Example Input</Input>
  </div>
);