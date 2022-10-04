import { error } from '@sveltejs/kit';
import { config } from '../../../base-config';
export async function load({ params, fetch }) {
  try {
    const redeemKey = params['key'];
    let respItem = await fetch(
      `${config.api_url}/api/v2/public/redeem/${redeemKey}`,
      {},
    );

    if (respItem.status === 200) {
      const item = await respItem.json();
      return {
        item,
      };
    } else {
      throw error(404, 'Claim not found');
    }
  } catch (e) {
    throw error(500, e);
  }
}
