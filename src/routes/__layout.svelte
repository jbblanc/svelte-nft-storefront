<script lang="ts" context="module">
  import { config } from "../config";
  import type { Network } from "../libs/interfaces";

  export async function load({ fetch }) {
    try {
      const resp = await fetch(`${config.api_url}/api/v2/public/networks`);
      let networks: Network[]= [];
      if (resp.status === 200) {
        networks = await resp.json();

      }
      return {
        status: 200,
        props: {
          networks
        }
      };
    } catch (error) {
      return {
        error,
        status: 500
      };
    }
  }
</script>

<script lang="ts">
  import "../app.css";
  import { fade } from "svelte/transition";
  import HeaderBar from "./_components/HeaderBar.svelte";
  import Footer from "./_components/Footer.svelte";
  import { initScanUrls, loadNetworks } from "../libs/referential";

  export let networks: Network[];

  initScanUrls();
  loadNetworks(networks);

</script>

<div class="min-h-screen main-layout" data-theme="{config.theme}" transition:fade={{ duration: 300 }}>
  <HeaderBar />

  <div class="grid grid-flow-row justify-items-center w-full bg-color-landing">
    <slot />
  </div>

  <Footer />
</div>

<style>
  .main-layout{
      display: grid;
      grid-template-rows: 4rem auto 4rem;
  }
</style>
