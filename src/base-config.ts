import type { Config } from './libs/interfaces';

export let config: Config = {
  theme: 'autumn',
  app_name: import.meta.env.VITE_APP_NAME,
  api_url: import.meta.env.VITE_API_URL,
  org_id: import.meta.env.VITE_ORG_ID,
};
