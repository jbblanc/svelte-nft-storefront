<script lang="ts" context="module">
  export async function load({ params, fetch }) {
    try {
      const collectionId = params['id'];
      let respCols = await fetch(
        `${config.api_url}/api/v2/public/${config.org_id}/collections`,
      );
      let respItems = await fetch(
        `${config.api_url}/api/v2/public/${config.org_id}/items?collection_id=${collectionId}&limit=10`,
      );
      if (respItems.status === 200 && respCols.status === 200) {
        const collections = await respCols.json();
        const collection = collections.filter((c) => c.id === collectionId)[0];
        const collectionResult = await respItems.json();
        console.log(respItems);
        return {
          status: 200,
          props: {
            collection,
            collectionResult,
          },
        };
      } else {
        return {
          error: 'Collection not found',
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
    CollectionQueryResult,
    Collection,
    CollectionItem,
  } from '../../libs/interfaces';
  import ItemCard from './_components/ItemCard.svelte';
  import Seo from '../../_components/Seo.svelte';
  import PageHeading from '../../_components/PageHeading.svelte';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import { config } from '../../base-config';
  import Button from '../../_components/Button.svelte';
  import PaginationControl from './_components/PaginationControl.svelte';

  export let collection: Collection;
  export let collectionResult: CollectionQueryResult;
  $: console.log(collectionResult);

  let displayedItems: CollectionItem[];
  let itemsPerPage = 10;
  let currentPage = 1;
  let totalItems = collectionResult.total_results;
  let totalPages =
    totalItems <= itemsPerPage
      ? 1
      : Math.floor(totalItems / itemsPerPage) +
        (totalItems % itemsPerPage > 0 ? 1 : 0);
  let hasMore = collectionResult.has_more;
  const cursors: string[] = ['', collectionResult.cursor]; // one cursor indexed per page number

  $: displayedItems = collectionResult.items;

  async function loadPage(cursor: string): Promise<CollectionQueryResult> {
    let respItems = await fetch(
      `${config.api_url}/api/v2/public/${config.org_id}/items?collection_id=${collection.id}&limit=${itemsPerPage}&cursor=${cursor}`,
    );

    return await respItems.json();
  }

  async function nextPage(): Promise<CollectionQueryResult> {
    if (hasMore) {
      collectionResult = await loadPage(cursors[currentPage]);
      currentPage++;
      cursors[currentPage] = collectionResult.cursor;
    }
  }

  async function previousPage(): Promise<CollectionQueryResult> {
    if (currentPage > 1) {
      collectionResult = await loadPage(cursors[currentPage - 2]);
      currentPage--;
    }
  }
</script>

<Seo
  title="{collection.name} - NFT Collection by ConsensysNFT"
  description="{collection.name} - NFT Collection by ConsensysNFT" />

<section class="px-24">
  <div class="grid grid-cols-2">
    <Breadcrumb {collection} />
    <div class="grid justify-items-end">
      <span class="my-3 uppercase text-secondary">collection</span>
      <PageHeading title={collection.name} />
    </div>
  </div>

  <div class="grid justify-items-center mb-4">
    <PaginationControl
      {totalItems}
      {totalPages}
      {hasMore}
      {currentPage}
      {nextPage}
      {previousPage} />
  </div>
  {#if !collectionResult.items || collectionResult.items.length === 0}
    <div>The collection is empty</div>
  {:else}
    <div class="grid xl:grid-cols-4 grid-cols-3 sm:grid-cols-1">
      {#each collectionResult.items as item}
        <ItemCard {item} />
      {/each}
    </div>
  {/if}
  <div class="grid justify-items-center my-6">
    <PaginationControl
      {totalItems}
      {totalPages}
      {hasMore}
      {currentPage}
      {nextPage}
      {previousPage} />
  </div>
</section>
