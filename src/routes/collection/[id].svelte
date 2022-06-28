<script lang="ts" context="module">

  export async function load({ params, fetch }) {
    try {
      const collectionId = params["id"];
      let respCols = await fetch(`${config.api_url}/api/v2/public/${config.org_id}/collections`);
      let respItems = await fetch(`${config.api_url}/api/v2/public/${config.org_id}/items?collection_id=${collectionId}&limit=10`);
      if (respItems.status === 200 && respCols.status === 200) {
        const collections = await respCols.json();
        const collection = collections.filter(c => c.id === collectionId)[0];
        const collectionResult = await respItems.json();
        console.log(respItems);
        return {
          status: 200,
          props: {
            collection,
            collectionResult
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
  import type { CollectionQueryResult, Collection, CollectionItem } from "../../libs/interfaces";
  import ItemCard from "./_components/ItemCard.svelte";
  import Seo from "../../_components/Seo.svelte";
  import PageHeading from "../../_components/PageHeading.svelte";
  import Breadcrumb from "../../_components/Breadcrumb.svelte";
  import { config } from "../../base-config";

  export let collection: Collection;
  export let collectionResult: CollectionQueryResult;
  $:console.log(collectionResult);

  let displayedItems: CollectionItem[];
  let currentPage = 1;
  let totalItems = collectionResult.total_results;
  let itemsPerPage = 10;
  let totalPages = totalItems <= itemsPerPage ? 1 : (totalItems / itemsPerPage + (totalItems % itemsPerPage > 0 ? 1 : 0));
  let previousCnftCursor = null;
  let nextCnftCursor = collectionResult.cursor;
  let hasMore = collectionResult.has_more;
  const cursors: string[] = ['', nextCnftCursor];// one cursor indexed per page number - 1

  $: displayedItems = collectionResult.items;

  async function loadPage(cursor: string): Promise<CollectionQueryResult> {
    let respItems = await fetch(`${config.api_url}/api/v2/public/${config.org_id}/items?collection_id=${collection.id}&limit=${itemsPerPage}&cursor=${cursor}`);

    return await respItems.json();
  }

  async function nextPage(): Promise<CollectionQueryResult> {
    if (hasMore) {
      currentPage++;
      collectionResult = await loadPage(nextCnftCursor);
      previousCnftCursor = nextCnftCursor;
      nextCnftCursor = collectionResult.cursor;
      cursors[currentPage - 1] = nextCnftCursor;
    }
  }

  async function previousPage(): Promise<CollectionQueryResult> {
    if (currentPage > 1) {
      currentPage--;
      collectionResult = await loadPage(cursors[currentPage - 1]);
    }
  }
</script>

<Seo
  title="{collection.name} - NFT Collection by ConsensysNFT"
  description="{collection.name} - NFT Collection by ConsensysNFT"
/>

<section class="px-24">
  <div class="grid grid-cols-2">
    <Breadcrumb {collection} />
    <div class="grid justify-items-end">
      <span class="my-3 uppercase text-secondary">collection</span>
      <PageHeading title={collection.name} />
    </div>
  </div>

  <div class="grid xl:grid-cols-4 grid-cols-3 sm:grid-cols-1">
    {#if !collectionResult.items || collectionResult.items.length === 0}
      <div>The collection is empty</div>
    {:else}
      {#each collectionResult.items as item}
        <ItemCard {item} />
      {/each}
    {/if}
  </div>
  <div>
    {#if currentPage > 1}
      <button on:click={previousPage}>Prev.</button>
    {/if}
    <div>Page {currentPage} / {totalPages}</div>
    {#if hasMore}
      <button on:click={nextPage}>Next.</button>
    {/if}
    <div>Total items: {totalItems}</div>
  </div>
</section>
