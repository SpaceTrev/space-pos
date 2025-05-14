import React from 'react';
import type { PosConfig } from './config';

type Props = { config: PosConfig };

export const PosApp: React.FC<Props> = { config } => (
  <main>
    <h1>Pos App - Tenant: {config.tenantId}</h1>
    <p>Theme: {config.theme}, Locale: {config.locale}</p>
  </main>
);