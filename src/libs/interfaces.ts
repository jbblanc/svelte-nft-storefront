export interface Config {
  theme: string;
  app_name: string;
  api_url: string;
  org_id: string;
}

export interface Network {
  id: number;
  name: string;
}

export interface Collection {
  id: string;
  name: string;
  items: CollectionItem[];
}

export interface CollectionItem {
  id: string;
  attributes: {
    title: string;
    description: string;
    image_url: string;
    [others: string]: any;
  };
  media: {
    image: {
      full: string;
      original: string;
      thumb: string;
      tiny: string;
    };
  };
  collection_id: string;
  token_contract: {
    address: string;
    network_id: number;
    symbol: string;
    token_type: string;
    tx_hash: string;
    capabilities: string[];
  };
  token_id: string;
  listing: any;
}

export interface CollectionItemHistory {
  data: {
    from_addr: string;
    to_addr: string;
    tx_hash: string;
  };
  quantity: number;
  timestamp: Date;
  type: string;
}
