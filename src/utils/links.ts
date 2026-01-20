export function cardanoScanTxUrl(txHash: string) {
  const network = (import.meta.env.VITE_CARDANO_NETWORK ?? "preview").toLowerCase();

  // CardanoScan tiene subdominios para testnets. Si en tu caso cambia, lo ajustamos.
  if (network === "preview") return `https://preview.cardanoscan.io/transaction/${txHash}`;
  if (network === "preprod") return `https://preprod.cardanoscan.io/transaction/${txHash}`;
  return `https://cardanoscan.io/transaction/${txHash}`;
}

export function ipfsUrl(cidOrHash: string) {
  const gw = import.meta.env.VITE_IPFS_GATEWAY ?? "https://ipfs.io/ipfs";
  const clean = cidOrHash.replace("ipfs://", "").replace("/ipfs/", "");
  return `${gw}/${clean}`;
}
