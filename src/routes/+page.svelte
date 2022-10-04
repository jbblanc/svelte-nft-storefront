<script lang="ts">
  import Seo from "../_components/Seo.svelte";
  import { config } from "../base-config.js";
</script>

<Seo />

<div class="hero bg-base-100">
  <div class="hero-content text-center">
    <div class="max-w-screen-lg">
      <h1 class="text-5xl font-bold">{config.app_name}</h1>
      <p class="py-6">A sample dapp built on top of <a href="https://consensys.net/nft/" target="_blank">ConsensysNFT</a> <span class="underline">public</span> API.</p>
      <a class="btn btn-primary" href="/gallery">Visit Organisation Gallery</a>
      <p class="mt-14">Go to <span class="font-bold"><a href="/settings">Settings</a></span> to set your <span class="italic">organisation</span> and API <span class="italic">url</span>, or even select another <span class="italic">theme</span> for the app.</p>
    </div>
  </div>
</div>
