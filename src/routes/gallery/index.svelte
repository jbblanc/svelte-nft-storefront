<script lang="ts">
  import { config } from "../../config";
  import type { CollectionItem } from "../../libs/interfaces";
  import CollectionCard from "./_components/CollectionCard.svelte";
  import Seo from "../../_components/Seo.svelte";
  import PageHeading from "../../_components/PageHeading.svelte";
  import Breadcrumb from "../../_components/Breadcrumb.svelte";

  async function loadCollectionsForActiveOrg(): Promise<CollectionItem[]> {
    const resp = await fetch(
      `${config.api_url}/api/v2/public/${config.org_id}/collections`,
      {}
    );
    if (resp.status === 200) {
      return await resp.json();
    } else {
      return [];
    }
  }
</script>

<Seo />

<section>
  <div class="grid grid-cols-2">
    <Breadcrumb />
    <div class="grid justify-items-end">
      <span class="my-3 uppercase text-secondary">gallery</span>
      <PageHeading title="All public collections from organization" />
    </div>
  </div>


  {#await loadCollectionsForActiveOrg()}
    <div>Loading...</div>
  {:then collections}
    <div class="grid grid-cols-4">
      {#each collections as collection}
        <div>
          <a sveltekit:prefetch href="/collection/{collection.id}"
          ><CollectionCard {collection} /></a
          >
        </div>
      {/each}
    </div>
  {/await}
</section>

