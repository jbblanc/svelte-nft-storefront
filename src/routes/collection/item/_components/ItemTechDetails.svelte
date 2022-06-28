<script lang="ts">
  import type { CollectionItem, Network } from "../../../../libs/interfaces";
  import {
    buildAddressScanLink,
    buildCnftCollectionLink,
    buildCnftItemLink,
    buildTokenScanLink, getNetwork
  } from "../../../../libs/referential.js";
  import ItemComponentHeading from "./ItemComponentHeading.svelte";
  import ItemTechDetailsRow from "./ItemTechDetailsRow.svelte";
  import { shortener } from "../../../../libs/util.js";
  import { networks } from "../../../../stores/networks";

  export let item: CollectionItem;

  let network: Network;
  network = getNetwork(item.token_contract?.network_id, $networks);
</script>

<div class="grid grid-flow">
  <ItemComponentHeading title="Technical Details" />

  <div class="grid grid-cols-3">
    <ItemTechDetailsRow header="Token Type" value={item.token_contract.token_type} />
    <ItemTechDetailsRow header="Network" value={network?.name} />
    <ItemTechDetailsRow header="Token ID">
      <a href="{buildTokenScanLink(item.token_contract.address, item.token_id, item.token_contract.network_id)}" target="_blank">{item.token_id}</a>
    </ItemTechDetailsRow>
    <ItemTechDetailsRow header="Token Contract">
      <a href="{buildAddressScanLink(item.token_contract.address, item.token_contract.network_id)}" target="_blank">{shortener(item.token_contract.address, 25)}</a>
    </ItemTechDetailsRow>
    <ItemTechDetailsRow header="CNFT Item ID">
      <a href="{buildCnftItemLink(item.id)}" target="_blank">{item.id}</a>
    </ItemTechDetailsRow>
    <ItemTechDetailsRow header="CNFT Collection ID">
      <a href="{buildCnftCollectionLink(item.collection_id)}" target="_blank">{item.collection_id}</a>
    </ItemTechDetailsRow>
  </div>
</div>