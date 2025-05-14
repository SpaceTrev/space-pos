import React from 'react';
import type { AdminConfig } from './config';

type Props = { config: AdminConfig };

export const AdminApp: React.FC<Props> = { config } => (
  <main>
    <h1>Admin App - Tenant: {config.tenantId}</h1>
    <p>Theme: {config.theme}, Locale: {config.locale}</p>
  </main>
);