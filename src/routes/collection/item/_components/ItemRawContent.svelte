<script lang="ts">
  import type { CollectionItem } from "../../../../libs/interfaces";
  import ItemComponentHeading from "./ItemComponentHeading.svelte";
  import CopyToClipboardButton from "../../../../_components/CopyToClipboardButton.svelte";

  export let item: CollectionItem;
  let message = JSON.stringify(item);
</script>

  <ItemComponentHeading title="Raw JSON from CNFT" />

<div class="grid grid-flow-row">
  <div class="grid justify-items-end pr-4 mb-2"><CopyToClipboardButton content={message} /></div>
  <textarea rows="15" class="p-5" bind:value={message}></textarea>
</div>