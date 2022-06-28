<script lang="ts">

  import { browser } from '$app/env';
  import { defaultEvmStores } from "svelte-ethers-store";
  import { connected, provider, signer } from "svelte-ethers-store";
  import { onMount } from 'svelte';
  import Button from "./Button.svelte";
  async function connectWallet() {
    console.log('trying to connect');
    if(browser){
      console.log('trying to connect');
      await defaultEvmStores.setProvider();
      console.log($connected);
      if($connected){
        const { name, chainId } = await $provider.getNetwork();
        console.log(chainId);
        console.log(name);
        const balance = await $signer.getBalance();
        console.log(balance.toString() * 1/Math.pow(10, 18));

      }
    }
  }

  onMount(
    async () => {
      // add a test to return in SSR context
      // TODO should only be used to reconnect automatically after a page refresh, not for a connect when reaching the app for the first time...
      //defaultEvmStores.setProvider()
      //await defaultEvmStores.setProvider();
    }
  )
</script>
<Button style="primary" outline={true} small={true} label="Connect" on:click={connectWallet} />