<script lang="ts" context="module">
  import { config } from "../../base-config";

  export async function load({ params, fetch }) {
    try {
      const collectionId = params["id"];
      let respCols = await fetch(`${config.api_url}/api/v2/public/${config.org_id}/collections`);
      let respItems = await fetch(`${config.api_url}/api/v2/public/${config.org_id}/items?collection_id=${collectionId}`);
      if (respItems.status === 200 && respCols.status === 200) {
        const collections = await respCols.json();
        const collection = collections.filter(c => c.id === collectionId)[0];
        const body = await respItems.json();
        const items = body.items;
        return {
          status: 200,
          props: {
            collection: {
              ...collection,
              items
            }
          }
        };
      } else {
        return {
          error: "Collection not found",
          status: 404
        };
      }
    } catch (error) {
      return {
        error,
        status: 500
      };
    }
  }
</script>

<script lang="ts">
  import type { Collection } from "../../libs/interfaces";
  import ItemCard from "./_components/ItemCard.svelte";
  import Seo from "../../_components/Seo.svelte";
  import PageHeading from "../../_components/PageHeading.svelte";
  import Breadcrumb from "../../_components/Breadcrumb.svelte";

  export let collection: Collection;
</script>

<Seo
  title="{collection.name} - NFT Collection by ConsensysNFT"
  description="{collection.name} - NFT Collection by ConsensysNFT"
/>

<section>
  <div class="grid grid-cols-2">
    <Breadcrumb {collection} />
    <div class="grid justify-items-end">
      <span class="my-3 uppercase text-secondary">collection</span>
      <PageHeading title={collection.name} />
    </div>
  </div>

  <div class="grid xl:grid-cols-4 grid-cols-3 sm:grid-cols-1">
    {#if !collection.items || collection.items.length === 0}
      <div>The collection is empty</div>
    {:else}
      {#each collection.items as item}
        <ItemCard {item} />
      {/each}
    {/if}
  </div>
</section>
