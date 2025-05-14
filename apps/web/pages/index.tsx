import { Button, Input, Card, CardHeader, CardContent, Modal } from '@platform/ui';
import { useState } from 'react';

export default function WebApp() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="p-4 font-sans">
      <h1 className="text-2xl mb-4">Web App</h1>
      <Card>
        <CardHeader>Welcome</CardHeader>
        <CardContent>
          <Input placeholder="Type something..." />
          <Button onClick={() => setModalOpen(true)} className="mt-2">Open Modal</Button>
        </CardContent>
      </Card>
      <Modal open={modalOpen} onOpenChange={setModalOpen} title="Example Modal">
        <p>This is a modal in the web app.</p>
      </Modal>
    </main>
  );
}