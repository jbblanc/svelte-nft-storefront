<script lang="ts">
  import type { CollectionItem } from '../../libs/interfaces';
  import CollectionCard from './_components/CollectionCard.svelte';
  import Seo from '../../_components/Seo.svelte';
  import PageHeading from '../../_components/PageHeading.svelte';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import { config } from '../../base-config';
  import PaginationGenericControl from '../_components/PaginationGenericControl.svelte';

  let displayedCollections: CollectionItem[];

  async function loadCollectionsForActiveOrg(): Promise<CollectionItem[]> {
    const resp = await fetch(
      `${config.api_url}/api/v2/public/${config.org_id}/collections`,
      {},
    );
    if (resp.status === 200) {
      return await resp.json();
    } else {
      return [];
    }
  }
</script>

<Seo />

<section class="px-24">
  <div class="grid grid-cols-2">
    <Breadcrumb />
    <div class="grid justify-items-end">
      <span class="my-3 uppercase text-secondary">gallery</span>
      <PageHeading title="All public collections from organization" />
    </div>
  </div>

  {#await loadCollectionsForActiveOrg()}
    <div>Loading...</div>
  {:then allCollections}
    <div class="grid grid-cols-4">
      {#each allCollections as collection}
        <div>
          <a sveltekit:prefetch href="/collection/{collection.id}"
            ><CollectionCard {collection} /></a>
        </div>
      {/each}
    </div>
    <div class="grid justify-items-center mt-4">
      <PaginationGenericControl
        allItems={allCollections}
        bind:itemsOnPage={displayedCollections}
        itemsPerPage={30}
        label="public collections" />
    </div>
  {/await}
</section>
