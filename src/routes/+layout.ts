import { error } from '@sveltejs/kit';
import { loadNetworks } from '../libs/referential';

export async function load({ fetch }) {
  try {
    console.log('fetching networks');
    const initialNetworks = await loadNetworks(fetch);
    return {
      initialNetworks,
    };
  } catch (e) {
    throw error(500, e);
  }
}
