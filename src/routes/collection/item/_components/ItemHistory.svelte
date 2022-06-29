<script lang="ts">
  import type {
    CollectionItem,
    CollectionItemHistory,
  } from '../../../../libs/interfaces';
  import {
    buildAddressScanLink,
    buildTransactionScanLink,
  } from '../../../../libs/referential.js';
  import ItemComponentHeading from './ItemComponentHeading.svelte';
  import { shortener } from '../../../../libs/util.js';
  import PaginationGenericControl from '../../../_components/PaginationGenericControl.svelte';

  export let item: CollectionItem;
  export let allHistoryItems: CollectionItemHistory[] = [];

  let displayedHistoryItems: CollectionItemHistory[] = [];

  function getBadgeColor(historyType: string): string {
    console.log(historyType);
    if (historyType === 'MINT') {
      return 'red-700';
    } else if (historyType === 'TRANSFER') {
      return 'orange-400';
    }
  }
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
        <th />
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      {#each displayedHistoryItems as historyItem}
        <tr>
          <td>{historyItem.timestamp}</td>
          <td>
            <div
              class="flex items-center space-x-3 badge uppercase text-gray-100"
              class:border-green-500={historyItem.type === 'MINT'}
              class:bg-green-500={historyItem.type === 'MINT'}
              class:border-blue-300={historyItem.type === 'TRANSFER'}
              class:bg-blue-300={historyItem.type === 'TRANSFER'}
              class:border-gray-500={historyItem.type !== 'TRANSFER' &&
                historyItem.type !== 'MINT'}
              class:bg-gray-500={historyItem.type !== 'TRANSFER' &&
                historyItem.type !== 'MINT'}>
              {historyItem.type}
            </div>
          </td>
          <td>
            <span class="badge badge-ghost badge-sm"
              >{historyItem.quantity}</span>
          </td>
          <td>
            From: <span class="badge badge-ghost badge-sm"
              ><a
                href={buildAddressScanLink(
                  historyItem.data.from_addr,
                  item.token_contract.network_id,
                )}
                target="_blank">
                {shortener(historyItem.data.from_addr, 15)}</a
              ></span>
            <br />
            To:
            <span class="badge badge-ghost badge-sm"
              ><a
                href={buildAddressScanLink(
                  historyItem.data.to_addr,
                  item.token_contract.network_id,
                )}
                target="_blank">
                {shortener(historyItem.data.to_addr, 15)}</a
              ></span>
          </td>
          <th>
            <a
              href={buildTransactionScanLink(
                historyItem.data.tx_hash,
                item.token_contract.network_id,
              )}
              class="btn btn-ghost btn-xs"
              target="_blank">see transaction</a>
          </th>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="grid justify-items-center mt-4">
    <PaginationGenericControl
      allItems={allHistoryItems}
      bind:itemsOnPage={displayedHistoryItems}
      itemsPerPage={5}
      label="events" />
  </div>
</div>
