<script lang="ts" context="module">
  import { config } from '../../base-config';
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
          status: 200,
          props: {
            item,
          },
        };
      } else {
        return {
          error: 'Claim not found',
          status: 404,
        };
      }
    } catch (error) {
      return {
        error,
        status: 500,
      };
    }
  }
</script>

<script lang="ts">
  import type {
    CollectionItem,
    CollectionItemHistory,
  } from '../../libs/interfaces';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import Seo from '../../_components/Seo.svelte';
  import { truncater } from '../../libs/util.js';

  export let item: CollectionItem;
  export let history: CollectionItemHistory[];
</script>
