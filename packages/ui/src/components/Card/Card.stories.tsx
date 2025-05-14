import React from 'react';
import { Card } from './Card.container';

export default {
  title: 'Components/Card',
  component: Card,
};

export const Default = () => (
  <div style={ padding: 20 }>
    <Card>Example Card</Card>
  </div>
);