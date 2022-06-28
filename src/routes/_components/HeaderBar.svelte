<script>
  import { connected } from "svelte-ethers-store";
  import ConnectButton from "../../_components/ConnectButton.svelte";
  import { Identicon } from "svelte-ethers-store/components";
  import { config } from "../../config";
  $: console.log('test ' + $connected);

</script>

<nav class="navbar bg-accent">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/" title="Home">{config.app_name}</a>
  </div>
  <div>
    <ul class="menu menu-horizontal p-0">
      <li><a href="/gallery">Gallery</a></li>
      <li><a href="/claim">Claim</a></li>
    </ul>
  </div>
  <div class="flex-none ml-10">
    {#if $connected !== undefined && $connected }
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <Identicon />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a href="/settings">Settings</a></li>
          <li><a>Disconnect</a></li>
        </ul>
      </div>
    {:else}
      <div>
        <ConnectButton />
      </div>
    {/if}
  </div>
</nav>