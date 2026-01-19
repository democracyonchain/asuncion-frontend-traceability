import React from "react";
import type { ActaTraceDto } from "../types/traceability";
import { ActaImage } from "./ActaImage";
import { StepCard } from "./StepCard";


export function TraceTimeline({ data }: { data: ActaTraceDto }) {
  const s = data.steps;

  return (
    <div className="mt-6 space-y-4">
      {/* Header / Scope */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="text-sm text-slate-400">Acta</div>
        <div className="mt-1 text-lg font-semibold text-slate-100">
          #{data.actaId} · Código: {data.codigo}
        </div>

        <div className="mt-3 grid gap-2 text-sm text-slate-200 md:grid-cols-2">
          <div><span className="text-slate-400">Provincia:</span> {data.scope.provincia}</div>
          <div><span className="text-slate-400">Cantón:</span> {data.scope.canton}</div>
          <div><span className="text-slate-400">Parroquia:</span> {data.scope.parroquia}</div>
          <div><span className="text-slate-400">Zona:</span> {data.scope.zona}</div>
          <div><span className="text-slate-400">Junta:</span> {data.scope.junta}</div>
          <div><span className="text-slate-400">Dignidad:</span> {data.scope.dignidad}</div>
        </div>
      </div>

      {/* Imagen + Timeline */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ActaImage data={data} />

        <div className="space-y-4">
          <StepCard title="1) Escaneo" step={s.escaneo} />
          <StepCard title="2) Digitación" step={s.digitacion} />
          <StepCard title="3) Control de Calidad" step={s.control} />
        </div>
      </div>
    </div>
  );
}

