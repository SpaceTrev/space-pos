import React from 'react';
import type { POSConfig } from '../config/config';

type Props = {
  config: POSConfig;
};

export const PlatformPOS: React.FC<Props> = ({ config }) => {
  const styles = {
    color: config.ui?.colors?.primary ?? 'black',
    fontFamily: config.ui?.fontFamily ?? 'sans-serif'
  };

  return (
    <div style={styles}>
      <h1>{config.translations?.checkout ?? 'Checkout'}</h1>
      <p>Store ID: {config.storeId}</p>
      <p>Locale: {config.locale}</p>
      <p>Theme: {config.theme}</p>
      <p>Delivery Enabled: {config.features.enableDelivery ? "Yes" : "No"}</p>
    </div>
  );
};