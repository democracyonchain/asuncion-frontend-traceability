export async function getTxMetadata(txHash: string) {
  const res = await fetch(
    `http://localhost:5116/api/traceability/tx-metadata?txHash=${txHash}`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error al obtener metadata");
  }

  return res.json();
}
