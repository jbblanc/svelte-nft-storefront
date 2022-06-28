import { getContext, setContext } from 'svelte';
import { config } from '../base-config';
import type { Network } from './interfaces';

const networkContentKey = 'networks';

let txScanUrls: Map<number, string>;
let addressScanUrls: Map<number, string>;
let tokenScanUrls: Map<number, string>;

export function initScanUrls() {
  txScanUrls = new Map<number, string>();
  txScanUrls.set(1, 'https://etherscan.io/tx/${tx}');
  txScanUrls.set(4, 'https://rinkeby.etherscan.io/tx/${tx}');
  txScanUrls.set(137, 'https://polygonscan.com/tx/${tx}');
  txScanUrls.set(80001, 'https://mumbai.polygonscan.com/tx/${tx}');
  addressScanUrls = new Map<number, string>();
  addressScanUrls.set(1, 'https://etherscan.io/address/${address}');
  addressScanUrls.set(4, 'https://rinkeby.etherscan.io/address/${address}');
  addressScanUrls.set(137, 'https://polygonscan.com/address/${address}');
  addressScanUrls.set(
    80001,
    'https://mumbai.polygonscan.com/address/${address}',
  );
  tokenScanUrls = new Map<number, string>();
  tokenScanUrls.set(1, 'https://etherscan.io/token/${address}?a=${tokenId}');
  tokenScanUrls.set(
    4,
    'https://rinkeby.etherscan.io/token/${address}?a=${tokenId}',
  );
  tokenScanUrls.set(
    137,
    'https://polygonscan.com/token/${address}?a=${tokenId}',
  );
  tokenScanUrls.set(
    80001,
    'https://mumbai.polygonscan.com/token/${address}?a=${tokenId}',
  );
}

export function loadNetworks(networks: Network[]) {
  /*let networks: Network[] = [];
  const resp = await fetch(`${config.api_url}/public/networks`);
  if (resp.status === 200) {
    networks = await resp.json();
  }*/
  setContext(networkContentKey, networks);
}

export function getNetwork(networkId: number): Network {
  const networks = getContext(networkContentKey) as Network[];
  if (networks) {
    const filtered = networks.filter((n) => n.id === networkId);
    return filtered[0];
  }
  return null;
}

export function buildTransactionScanLink(
  tx: string,
  networkId: number,
): string {
  return txScanUrls.get(networkId).replace('${tx}', tx);
}

export function buildAddressScanLink(
  address: string,
  networkId: number,
): string {
  return addressScanUrls.get(networkId).replace('${address}', address);
}

export function buildTokenScanLink(
  contractAddress: string,
  tokenId: string,
  networkId: number,
): string {
  return tokenScanUrls
    .get(networkId)
    .replace('${address}', contractAddress)
    .replace('${tokenId}', tokenId);
}

export function buildCnftCollectionLink(collectionId: string): string {
  return `${config.api_url}/product/${collectionId}`;
}

export function buildCnftItemLink(itemId: string): string {
  return `${config.api_url}/collectibles/${itemId}`;
}
