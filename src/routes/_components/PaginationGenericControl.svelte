<script lang="ts">
  import Button from '../../_components/Button.svelte';

  export let currentPage = 1;
  export let itemsPerPage = 10;
  export let allItems: any[];
  export let itemsOnPage: any[];
  export let label: string = 'items';

  let totalItems = allItems?.length;
  let totalPages =
    totalItems <= itemsPerPage
      ? 1
      : Math.floor(totalItems / itemsPerPage) +
        (totalItems % itemsPerPage > 0 ? 1 : 0);

  function setNewContent() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex =
      startIndex + itemsPerPage < allItems.length - 1
        ? startIndex + itemsPerPage
        : undefined; // undefined => up to the end of array
    itemsOnPage = allItems.slice(startIndex, endIndex);
  }

  function nextPage() {
    currentPage++;
    setNewContent();
  }

  function previousPage() {
    currentPage--;
    setNewContent();
  }

  setNewContent(); // init page 1
</script>

<div class="flex items-center space-x-4">
  <div>Page {currentPage} / {totalPages}</div>
  <Button label="Prev." on:click={previousPage} disabled={currentPage === 1} />
  <Button
    label="Next"
    on:click={nextPage}
    disabled={currentPage === totalPages} />
  <div>Total {label}: {totalItems}</div>
</div>
