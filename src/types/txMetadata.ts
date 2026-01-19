export type TxMetadataLabel = {
  label: string;      // ej "674"
  json?: any;         // el json_metadata
};

export type TxMetadataDto = {
  txHash: string;
  network: string;    // "preview" | "preprod" | "mainnet"
  labels: TxMetadataLabel[];
};
