import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader } from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card'
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Example: Story = {
  render: () => (
    <Card>
      <CardHeader>Header</CardHeader>
      <CardContent>Content goes here</CardContent>
    </Card>
  )
};