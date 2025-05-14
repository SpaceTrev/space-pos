import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './modal';
import { Button } from './button';

const meta: Meta = {
  title: 'Components/Modal',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Modal</Button>
        <Modal open={open} onOpenChange={setOpen} title="Modal Title">
          Modal content.
        </Modal>
      </>
    );
  }
};

export default meta;