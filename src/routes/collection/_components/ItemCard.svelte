<script lang="ts">
  import type { CollectionItem } from "../../../libs/interfaces";

  export let item: CollectionItem;

  let description = item.attributes.description && item.attributes.description.length > 30 ? item.attributes.description.substring(0, 30) + " (...)" : item.attributes.description;
</script>


<div class="card card-compact h-80 w-72 m-4 bg-accent bg-opacity-20 shadow-xl">
  <div class="card-body">
    <figure><img src="{item.media.image.tiny}" alt="{item.attributes.title}" /></figure>

    <h2 class="card-title">{item.attributes.title}</h2>
    <p>{description}</p>
    <div class="card-actions justify-end">
      <a sveltekit:prefetch class="btn btn-primary btn-sm" href="/collection/item/{item.id}">view</a>
    </div>
  </div>
</div>
