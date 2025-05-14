export type WebstoreConfig = {
  tenantId: string;
  theme: string;
  locale: string;
  logoUrl?: string;
  features: {
    delivery: boolean;
    loyalty: boolean;
  };
};

export function createWebstoreConfig(config: WebstoreConfig): WebstoreConfig {
  return config;
}