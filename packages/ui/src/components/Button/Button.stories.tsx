import React from 'react';
import { Button } from './Button.container';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <Button>Example Button</Button>
  </div>
);