<script lang="ts">
  import type { CollectionItem } from "../../../../libs/interfaces";
  import ItemAuction from "./ItemAuction.svelte";
  import ItemComponentHeading from "./ItemComponentHeading.svelte";

  export let item: CollectionItem;
</script>

<ItemComponentHeading title="Listing" />
{#if item.listing}
  {#if item.listing.type === 'ONCHAIN_ENGLISH_AUCTION'}
    <ItemAuction {item} />
  {/if}
{:else}
  <p>No listing is referenced for this item at the moment.</p>
{/if}