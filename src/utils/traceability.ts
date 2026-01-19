export function cardanoScanTxUrl(txHash: string) {
  // Por ahora Preview. Luego lo haces configurable con env.
  return `https://preview.cardanoscan.io/transaction/${txHash}`;
}

export function fmt(ts?: string | null) {
  if (!ts) return "—";
  const d = new Date(ts);
  if (isNaN(d.getTime())) return ts; // por si viene en formato raro
  return d.toLocaleString();
}

export function hasTx(txHash?: string | null) {
  return !!txHash && txHash.trim().length > 0;
}
