import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button'
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click Me'
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
};