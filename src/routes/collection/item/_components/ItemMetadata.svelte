<script lang="ts">
  import type { CollectionItem } from "../../../../libs/interfaces";
  import ItemComponentHeading from "./ItemComponentHeading.svelte";

  export let item: CollectionItem;
  const metadata = extractMetadataFromItem(item);

  function extractMetadataFromItem(item: CollectionItem): any {
    const attributesToDisplay = {};
    const attributesKeysToIgnore = ["title", "description", "image_url"];
    for (const attributeKey of Object.keys(item.attributes)) {
      if (!attributesKeysToIgnore.includes(attributeKey)) {
        attributesToDisplay[attributeKey] = item.attributes[attributeKey];
      }
    }
    return attributesToDisplay;
  }
</script>

<div>
  <ItemComponentHeading title="Attributes" />
  <div class="grid grid-cols-2 sm:grid-cols-3">
    {#each Object.keys(metadata) as attributeKey}
      <div class="card w-36 my-2 text-center border border-base-content bg-base-100">
        <div class="card-body px-4 py-2 items-center text-center">
          <span class="uppercase font-bold text-secondary">{attributeKey}</span>
          <span class="text-xs">{metadata[attributeKey]}</span>
        </div>
      </div>
    {/each}
  </div>


</div>