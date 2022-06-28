<script lang="ts">
  import { goto } from "$app/navigation";
  import { config } from "../../base-config";
  import { theme } from "../../stores/theme";
  import PageHeading from "../../_components/PageHeading.svelte";
  import Button from "../../_components/Button.svelte";
  import { saveConfigToLocalStorage, saveThemeToLocalStorage } from "../../libs/config-storage";

  let api_url = config.api_url;
  let org_id = config.org_id;

  function saveSettings() {
    const redirectToGallery = api_url !== config.api_url || org_id !== config.org_id;
    config.api_url = api_url;
    config.org_id = org_id;
    saveConfigToLocalStorage(config);
    saveThemeToLocalStorage($theme);
    if (redirectToGallery) {
      goto("/gallery");
    }
  }
</script>

<PageHeading title="Settings" />

<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">CNFT API URL</span>
  </label>
  <input type="text" placeholder="Type url here" bind:value={api_url} class="input input-bordered w-full max-w-xs" />
</div>

<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">ORG ID</span>
  </label>
  <input type="text" placeholder="Type url here" bind:value={org_id} class="input input-bordered w-full max-w-xs" />
</div>

<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">Choose your theme</span>
  </label>
  <select bind:value={$theme} class="select select-bordered">
    <option>fantasy</option>
    <option selected>autumn</option>
    <option>luxury</option>
    <option>cyberpunk</option>
  </select>
</div>
<Button label="Save & Apply" on:click={saveSettings} />

