<script lang="ts" context="module">
  import { config } from "../../../base-config";
  export async function load({ params, fetch }) {
    try {
      const itemId = params["id"];
      let respItem = await fetch(`${config.api_url}/api/v2/public/items/${itemId}`, {});
      let respHistory = await fetch(`${config.api_url}/api/v2/public/items/${itemId}/history`, {});
      if (respItem.status === 200) {
        const item = await respItem.json();
        let history;
        if(respHistory.status === 200){
          history = await respHistory.json();
        }
        return {
          status: 200,
          props: {
            item,
            history: history?.history,
          },
        };
      } else {
        return {
          error: "Item not found",
          status: 404,
        };
      }
    } catch (error) {
      return {
        error,
        status: 500,
      };
    }
  }
</script>

<script lang="ts">
  import type { CollectionItem, CollectionItemHistory } from "../../../libs/interfaces";
import Breadcrumb from "../../../_components/Breadcrumb.svelte";
  import Seo from "../../../_components/Seo.svelte";
  import ItemHistory from "./_components/ItemHistory.svelte";
  import ItemInfo from "./_components/ItemInfo.svelte";
  import ItemPreview from "./_components/ItemPreview.svelte";
  import ItemTechDetails from "./_components/ItemTechDetails.svelte";
  import ItemRawContent from "./_components/ItemRawContent.svelte";
  import ItemListing from "./_components/ItemListing.svelte";
  import { truncater } from "../../../libs/util.js";

  export let item: CollectionItem;
  export let history: CollectionItemHistory[];
</script>

<Seo
  title="{item.attributes.title} - by {config.app_name}"
  description={truncater(item.attributes.description, 155)}
  image={item.media.image.thumb}
  imageType="image/jpeg"
/>


<div class="w-full px-12 py-3 mb-4">
    <Breadcrumb {item} />
</div>

<div class="w-full sm:px-24 grid grid-cols-1 sm:grid-cols-2">
  <div class="mr-1 mb-2"><ItemPreview {item} /></div>
  <div class="bg-accent bg-opacity-10 ml-1 mb-2 p-4 rounded-xl"><ItemInfo {item} /></div>
  <div class="bg-accent bg-opacity-10 mr-1 mb-2 p-4 rounded-xl"><ItemTechDetails {item} /></div>
  <div class="bg-accent bg-opacity-10 ml-1 mb-2 p-4 rounded-xl"><ItemListing {item} /></div>
  <div class="sm:col-span-2 bg-accent bg-opacity-10 mb-2 p-4 rounded-xl"><ItemHistory {item} {history} /></div>
  <div class="sm:col-span-2 bg-accent bg-opacity-10 mb-2 p-4 rounded-xl"><ItemRawContent {item} /></div>
</div>
