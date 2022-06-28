import type { Config } from './interfaces';

export function saveConfigToLocalStorage(config: Config) {
  localStorage?.setItem('api_url', config.api_url);
  localStorage?.setItem('org_id', config.org_id);
}

export function enrichConfigFromLocalStorage(config: Config): {
  config: Config;
  configHasChanged: boolean;
} {
  let configHasChanged = false;
  const api_url = localStorage?.getItem('api_url');
  const org_id = localStorage?.getItem('org_id');
  if (api_url && config.api_url !== api_url) {
    config.api_url = api_url;
    configHasChanged = true;
  }
  if (org_id && config.org_id !== org_id) {
    config.org_id = org_id;
    configHasChanged = true;
  }
  return {
    config,
    configHasChanged,
  };
}

export function saveThemeToLocalStorage(theme: string) {
  localStorage?.setItem('theme', theme);
}

export function getThemeIfAnyFromLocalStorage(): string {
  return localStorage?.getItem('theme');
}
