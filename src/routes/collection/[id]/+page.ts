import { error } from '@sveltejs/kit';
import { config } from '../../../base-config';

export async function load({ params, fetch }) {
  try {
    const collectionId = params['id'];
    let respCols = await fetch(
      `${config.api_url}/api/v2/public/${config.org_id}/collections`,
    );
    let respItems = await fetch(
      `${config.api_url}/api/v2/public/${config.org_id}/items?collection_id=${collectionId}&limit=12`,
    );
    if (respItems.status === 200 && respCols.status === 200) {
      const collections = await respCols.json();
      const collection = collections.filter((c) => c.id === collectionId)[0];
      const collectionResult = await respItems.json();
      console.log(respItems);
      return {
        collection,
        collectionResult,
      };
    } else {
      throw error(404, 'Collection not found');
    }
  } catch (e) {
    throw error(500, e);
  }
}
