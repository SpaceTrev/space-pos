export type AdminConfig = {
  tenantId: string;
  theme: string;
  locale: string;
};

export function createAdminConfig(config: AdminConfig): AdminConfig {
  return config;
}