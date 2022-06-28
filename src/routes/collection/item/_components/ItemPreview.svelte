<script lang="ts">
  import type { CollectionItem } from "../../../../libs/interfaces";

  export let item: CollectionItem;
</script>

<div class="flex items-center justify-center p-4">
  <img src={item.media.image.full} alt={item.attributes.title} />
</div>
<div class="flex items-center justify-center px-4">
  <div>
    <a class="btn btn-outline btn-sm" href={item.media.image.tiny} target="_blank">Tiny</a>
    <a class="btn btn-outline btn-sm" href={item.media.image.thumb} target="_blank">Thumb</a>
    <a class="btn btn-outline btn-sm" href={item.media.image.full} target="_blank">Full</a>
    <a class="btn btn-outline btn-sm" href={item.media.image.original} target="_blank">Original</a>
  </div>
</div>
