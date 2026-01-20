export type StepDto = {
  txHash: string;
  timestamp?: string | null;
  block?: number | null;
  metadata?: any;
  result?: string | null;
};

export type ActaScopeDto = {
  provincia: string;
  canton: string;
  parroquia: string;
  zona: string;
  junta: string;
  dignidad: string;
};

export type IpfsCorteDto = {
  candidatoId: number;
  candidato: string;
  cid: string;
  url: string;
};

export type ImagenActaDto = {
  acta_id: number | null;
  nombre: string | null;
  pagina: number | null;
  hash: string | null;
  pathipfs: string | null;
  fecha: string | null;
};

export type TraceabilityStepsDto = {
  escaneo: StepDto;
  digitacion: StepDto;
  control: StepDto;
};

export type ActaTraceDto = {
  actaId: number;
  codigo: string;
  scope: ActaScopeDto;
  imagenes: ImagenActaDto[];
  steps: TraceabilityStepsDto;
  resultados?: any;
  lastUpdated?: string | null;
};

export type TraceabilityRequest = {
  juntaId: number;
  dignidadId: number;
};
