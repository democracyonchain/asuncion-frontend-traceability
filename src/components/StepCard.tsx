import React, { useState } from "react";
import type { StepDto } from "../types/traceability";
import { cardanoScanTxUrl, fmt, hasTx } from "../utils/traceability";
import { getTxMetadata } from "../api/metadata.api";
import { Modal } from "./Modal";

export function StepCard({ title, step }: { title: string; step: StepDto }) {
  const ok = hasTx(step.txHash);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadMetadata() {
    if (!step.txHash) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getTxMetadata(step.txHash);
      setMetadata(data);
      setOpen(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-100">{title}</h3>
            <div className="mt-1 text-sm text-slate-300">
              <span className="text-slate-400">Fecha:</span>{" "}
              {fmt(step.timestamp)}
            </div>
          </div>

          <div className="flex gap-2">
            {ok && (
              <button
                onClick={loadMetadata}
                className="rounded-xl border border-indigo-600 px-3 py-2 text-xs font-semibold text-indigo-200 hover:bg-indigo-900/40"
              >
                {loading ? "Cargando..." : "Metadatos"}
              </button>
            )}

            {ok && (
              <a
                href={cardanoScanTxUrl(step.txHash)}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-100 hover:bg-slate-800/60"
              >
                Ver tx
              </a>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-2 text-xs text-red-400">{error}</div>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Metadata de la transacción`}
      >
        <pre className="rounded-xl bg-slate-950 p-3 text-xs overflow-auto">
          {JSON.stringify(metadata, null, 2)}
        </pre>
      </Modal>
    </>
  );
}
