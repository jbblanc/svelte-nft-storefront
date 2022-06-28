<script lang="ts">
  import type { Collection, CollectionItem } from "../libs/interfaces";

  export let item: CollectionItem = null;
  export let collection: Collection = null;
</script>

<div class="text-sm breadcrumbs">
  <ul>
    <li>
      <a href="/">Home</a></li>
    <li>
      <a href="/gallery">Gallery</a></li>
    {#if collection}
      <li>
        &nbsp;{collection.name}</li>
    {/if}
    {#if item}
      <li>
        &nbsp;<a href="/collection/{item.collection_id}">Collection</a></li>
      <li>
        &nbsp;{item.attributes.title}</li>
    {/if}
  </ul>
</div>


