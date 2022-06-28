<script lang="ts">
  import type { CollectionItem } from "../../../../libs/interfaces";
  import ItemComponentHeading from "./ItemComponentHeading.svelte";

  export let item: CollectionItem;
</script>

<div class="grid grid-flow-row">
  <ItemComponentHeading title="English Auction (on chain)" />
  <div class="badge bg-blue-800 uppercase">Auction listing</div>
  <div>The auction for this item is finished!</div>

  <div>Winning bid: 3006.0 USDC</div>
</div>
