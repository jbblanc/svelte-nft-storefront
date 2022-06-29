<script lang="ts">
  import Button from '../../../_components/Button.svelte';

  export let currentPage: number;
  export let hasMore: boolean;
  export let totalPages: number;
  export let totalItems: number;
  export let previousPage: Function;
  export let nextPage: Function;
</script>

<div class="flex items-center space-x-4">
  <div>Page {currentPage} / {totalPages}</div>
  <Button label="Prev." on:click={previousPage} disabled={currentPage === 1} />
  <Button label="Next" on:click={nextPage} disabled={!hasMore} />
  <div>Total items: {totalItems}</div>
</div>
