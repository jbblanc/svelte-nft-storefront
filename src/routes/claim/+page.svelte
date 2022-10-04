<script lang="ts">
  import Seo from '../../_components/Seo.svelte';
  let claimKey = '';
</script>

<Seo />

<div class="hero bg-base-100">
  <div class="hero-content text-center">
    <div class="max-w-screen-lg">
      <h1 class="text-5xl font-bold">Claim My NFT</h1>
      <p class="py-6">
        Enter here your unique claim key to start the claim flow
      </p>
      <div>
        <input type="text" placeholder="My key" bind:value={claimKey} />
        <a class="btn btn-primary" href="/claim/{claimKey}">Start claim flow</a>
      </div>
    </div>
  </div>
</div>
