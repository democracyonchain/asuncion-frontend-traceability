import React, { useState } from "react";
import { CascadingFilters, type TraceQuery } from "./components/CascadingFilters";
import { getActaTrace } from "./api/traceability.api";
import type { ActaTraceDto } from "./types/traceability";
import { TraceTimeline } from "./components/TraceTimeline";

export default function App() {
  const [lastQuery, setLastQuery] = useState<TraceQuery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trace, setTrace] = useState<ActaTraceDto | null>(null);

  async function handleSearch(q: TraceQuery) {
    setLastQuery(q);
    setError(null);
    setTrace(null);

    setLoading(true);
    try {
      const data = await getActaTrace(q);
      setTrace(data);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ??
        e?.response?.data ??
        e?.message ??
        "Error consultando trazabilidad";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Trazabilidad de Actas</h1>
          <p className="text-slate-400 text-sm">
            Provincia → Cantón → Parroquia → Zona → Junta → Dignidad. Network:{" "}
            <b className="text-slate-200">Preview</b>
          </p>
        </header>

        <div className="space-y-6">
          <CascadingFilters onSearch={handleSearch} />

         

          {loading && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
              Consultando trazabilidad…
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-900/40 bg-red-950/30 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {trace && <TraceTimeline data={trace} />}
        </div>
      </div>
    </div>
  );
}
