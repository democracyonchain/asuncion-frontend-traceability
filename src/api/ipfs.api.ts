const META_BASE = import.meta.env.VITE_METADATA_BASE_URL as string;

export function buildIpfsImageUrl(pathipfs: string) {
  return `${META_BASE}/api/Ipfs/getFile/${encodeURIComponent(pathipfs)}`;
}
