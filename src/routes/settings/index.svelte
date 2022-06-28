<script lang="ts">
  import { config } from "../../config";
  import PageHeading from "../../_components/PageHeading.svelte";
  import Button from "../../_components/Button.svelte";

  let api_url = config.api_url;
  let org_id = config.org_id;
  let theme = config.theme;

  function saveSettings() {
    config.api_url = api_url;
    config.org_id = org_id;
  config.theme = theme;
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
  <select bind:value={theme} class="select select-bordered">
    <option>light</option>
    <option selected>dark</option>
    <option>cupcake</option>
  </select>
</div>
<Button label="Save & Apply" on:click={saveSettings} />

