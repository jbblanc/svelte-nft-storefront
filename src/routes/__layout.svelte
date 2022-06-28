<script lang="ts" context="module">

  import type { Network } from "../libs/interfaces";

  export async function load({ fetch }) {
    try {
      console.log("fetching networks");
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
  import { config } from "../base-config";
  import { fade } from "svelte/transition";
  import HeaderBar from "./_components/HeaderBar.svelte";
  import Footer from "./_components/Footer.svelte";
  import { initScanUrls, loadNetworks } from "../libs/referential";
  import { theme } from "../stores/theme.js";
  import { enrichConfigFromLocalStorage, getThemeIfAnyFromLocalStorage } from "../libs/config-storage";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let networks: Network[];

  initScanUrls();
  loadNetworks(networks);

  onMount(()=>{
    const res = enrichConfigFromLocalStorage(config);
    const themeToUse = getThemeIfAnyFromLocalStorage();
    if(themeToUse){
      $theme = themeToUse;
    }
    if(res.configHasChanged){
      config.api_url = res.config.api_url;
      config.org_id = res.config.org_id;
     goto('/');
    }
  });

</script>

<div class="min-h-screen main-layout" data-theme="{$theme}" transition:fade={{ duration: 300 }}>
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
