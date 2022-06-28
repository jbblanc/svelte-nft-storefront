<script lang="ts">
  import type { CollectionItem, CollectionItemHistory } from "../../../../libs/interfaces";
  import { buildAddressScanLink, buildTransactionScanLink } from "../../../../libs/referential.js";
  import ItemComponentHeading from "./ItemComponentHeading.svelte";
  import { shortener } from "../../../../libs/util.js";

  export let item: CollectionItem;
  export let history: CollectionItemHistory[] = [];
</script>

<div class="overflow-x-auto w-full">
  <ItemComponentHeading title="History" />
  <table class="table w-full">
    <!-- head -->
    <thead>
    <tr>
      <th>Occurred</th>
      <th>Action</th>
      <th>Quantity</th>
      <th>Details</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <!-- row 1 -->
    {#each history as historyItem }
      <tr>
        <td>{historyItem.timestamp}</td>
        <td>
          <div class="flex items-center space-x-3">

            {historyItem.type}

          </div>
        </td>
        <td>
          <span class="badge badge-ghost badge-sm">{historyItem.quantity}</span>
        </td>
        <td>
          From: <span class="badge badge-ghost badge-sm"><a
          href="{buildAddressScanLink(historyItem.data.from_addr, item.token_contract.network_id)}" target="_blank">
          {shortener(historyItem.data.from_addr, 15)}</a></span>
          <br>
          To: <span class="badge badge-ghost badge-sm"><a
          href="{buildAddressScanLink(historyItem.data.to_addr, item.token_contract.network_id)}" target="_blank">
          {shortener(historyItem.data.to_addr, 15)}</a></span>
        </td>
        <th>
          <a href="{buildTransactionScanLink(historyItem.data.tx_hash, item.token_contract.network_id)}"
             class="btn btn-ghost btn-xs" target="_blank">see transaction</a>
        </th>
      </tr>
    {/each}
    </tbody>
  </table>
</div>