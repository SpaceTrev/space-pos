export type POSConfig = {
  storeId: string;
  locale: string;
  theme: string;
  features: {
    enableDelivery: boolean;
    showLoyalty: boolean;
  };
  ui?: {
    colors?: Record<string, string>;
    fontFamily?: string;
  };
  translations?: Record<string, string>;
};

export function createPOSConfig(config: POSConfig): POSConfig {
  return config;
}