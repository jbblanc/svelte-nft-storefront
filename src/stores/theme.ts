import { writable } from 'svelte/store';
import { config } from '../base-config';

export const theme = writable(config.theme);
