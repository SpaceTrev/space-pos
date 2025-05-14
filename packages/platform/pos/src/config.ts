export type PosConfig = {
  tenantId: string;
  theme: string;
  locale: string;
};

export function createPosConfig(config: PosConfig): PosConfig {
  return config;
}