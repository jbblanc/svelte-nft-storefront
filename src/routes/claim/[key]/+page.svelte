<script lang="ts">
  import type {
    CollectionItem,
    CollectionItemHistory,
  } from '../../../libs/interfaces';

  export let data;
  let item: CollectionItem = data.item;
  let history: CollectionItemHistory[] = data.history;
</script>
