import axios from "axios";

// ✅ Catálogo / API principal (7236)
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});

// ✅ Trazabilidad acta (7236, pero separado por claridad)
export const traceHttp = axios.create({
  baseURL: import.meta.env.VITE_TRACE_BASE_URL,
  timeout: 30000,
});

// ✅ Metadata / Blockfrost proxy (5116)
export const metadataHttp = axios.create({
  baseURL: import.meta.env.VITE_METADATA_BASE_URL,
  timeout: 30000,
});

// ✅ IPFS gateway
export const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY;
