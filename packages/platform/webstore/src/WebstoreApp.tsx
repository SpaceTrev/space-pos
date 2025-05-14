import React from 'react';
import type { WebstoreConfig } from './config';

type Props = { config: WebstoreConfig };

export const WebstoreApp: React.FC<Props> = ({ config }) => (
  <main>
    <h1>Welcome to {config.tenantId} Webstore</h1>
    <p>Locale: {config.locale}</p>
    <p>Theme: {config.theme}</p>
    <p>Delivery: {config.features.delivery ? "Yes" : "No"}</p>
  </main>
);