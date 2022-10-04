import { error } from '@sveltejs/kit';
import { config } from '../../../../base-config';
export async function load({ params, fetch }) {
  try {
    const itemId = params['id'];
    let respItem = await fetch(
      `${config.api_url}/api/v2/public/items/${itemId}`,
      {},
    );
    let respHistory = await fetch(
      `${config.api_url}/api/v2/public/items/${itemId}/history`,
      {},
    );
    if (respItem.status === 200) {
      const item = await respItem.json();
      let history;
      if (respHistory.status === 200) {
        history = await respHistory.json();
      }
      return {
        item,
        history: history?.history,
      };
    } else {
      throw error(404, 'Item not found');
    }
  } catch (e) {
    throw error(500, e);
  }
}
