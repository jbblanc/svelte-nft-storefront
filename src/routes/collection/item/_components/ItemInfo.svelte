<script lang="ts">
  import type { CollectionItem, Network } from '../../../../libs/interfaces';
  import { getNetwork } from '../../../../libs/referential.js';
  import ItemMetadata from './ItemMetadata.svelte';
  import { networks } from '../../../../stores/networks';

  export let item: CollectionItem;
  let network: Network;
  network = getNetwork(item.token_contract?.network_id, $networks);
  console.log(network);
</script>

<div class="grid grid-flow">
  <h1 class="text-4xl font-bold">{item.attributes.title}</h1>
  <div>
    <div class="badge border-blue-400 bg-blue-400 uppercase text-gray-100">
      {item.token_contract?.token_type}
    </div>
    <div class="badge border-yellow-500 bg-yellow-500 uppercase text-gray-100">
      {network?.name}
    </div>
    <div class="badge badge-outline uppercase">
      {item.listing ? item.listing.type : 'No active listing'}
    </div>
  </div>
  <p class="mt-6">{item.attributes.description}</p>
  <div class="my-6">
    <ItemMetadata {item} />
  </div>
</div>
