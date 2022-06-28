<script lang="ts">

  export let content: string;

  function copyToClipboard(){
    navigator.clipboard.writeText(content);
  }
</script>

<button class="btn btn-secondary btn-xs" on:click={copyToClipboard}>COPY</button>