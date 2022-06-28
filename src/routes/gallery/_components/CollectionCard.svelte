<script lang="ts">
  import type { Collection } from "../../../libs/interfaces";

  export let collection: Collection;
</script>

<div class="m-2 p-4 rounded-xl shadow-md bg-accent bg-opacity-20">
  <div class="py-4 font-bold">{collection.name}</div>
</div>
