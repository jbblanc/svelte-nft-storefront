<script lang="ts">
  export let header: string;
  export let value: string;
</script>

<div class="bg-base-200 mr-2 mb-2 font-bold text-primary">{header}</div>
<div class="col-span-2 mb-2 bg-base-100">{#if value}{value}
  {:else}
  <slot />
{/if}
  </div>