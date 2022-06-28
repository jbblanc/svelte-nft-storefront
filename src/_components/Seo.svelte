<script lang="ts">
  import { config } from "../base-config";

  export let title = `${config.app_name} - built with SvelteKit`; //$_("landing.home.seo.title");
  export let description =
    "This is as NFT storefront built using Consensys NFT API and SvelteKit";
  export let url = "";
  export let image = "";
  export let imageType = "image/png";
  export let type = "website";
  export let locale = "en_US";
  export let localeAlternate = "fr_FR"; //ex: en_US
  export let twitterAccount = null; //ex: @bobby_12
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  {#if imageType}
    <meta property="og:image:type" content={imageType} />
  {/if}
  <meta property="og:locale" content={locale} />
  {#if localeAlternate}
    <meta property="og:locale:alternate" content={localeAlternate} />
  {/if}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={image} />
  {#if twitterAccount}
    <meta property="twitter:site" content={twitterAccount} />
  {/if}
</svelte:head>
