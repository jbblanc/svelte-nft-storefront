import { writable } from 'svelte/store';
import type { Network } from '../libs/interfaces';

export const networks = writable<Network[]>([]);
