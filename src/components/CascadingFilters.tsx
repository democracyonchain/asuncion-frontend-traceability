import React, { useEffect, useMemo, useState } from "react";
import type { OptionItem } from "../types/catalogo";
import { SelectBox } from "./SelectBox";
import {
  getCantones,
  getDignidades,
  getJuntas,
  getParroquias,
  getProvincias,
  getZonas,
} from "../api/catalogo.api";

export type TraceQuery = {
  provinciaId: number;
  cantonId: number;
  parroquiaId: number;
  zonaId: number;
  juntaId: number;
  dignidadId: number;
};

export function CascadingFilters({
  onSearch,
}: {
  onSearch: (q: TraceQuery) => void;
}) {
  const [loading, setLoading] = useState(false);

  const [provinciaId, setProvinciaId] = useState<number | null>(null);
  const [cantonId, setCantonId] = useState<number | null>(null);
  const [parroquiaId, setParroquiaId] = useState<number | null>(null);
  const [zonaId, setZonaId] = useState<number | null>(null);
  const [juntaId, setJuntaId] = useState<number | null>(null);
  const [dignidadId, setDignidadId] = useState<number | null>(null);

  const [provincias, setProvincias] = useState<OptionItem[]>([]);
  const [cantones, setCantones] = useState<OptionItem[]>([]);
  const [parroquias, setParroquias] = useState<OptionItem[]>([]);
  const [zonas, setZonas] = useState<OptionItem[]>([]);
  const [juntas, setJuntas] = useState<OptionItem[]>([]);
  const [dignidades, setDignidades] = useState<OptionItem[]>([]);

  const isComplete = useMemo(
    () =>
      !!provinciaId &&
      !!cantonId &&
      !!parroquiaId &&
      zonaId !== null &&   
      !!juntaId &&
      !!dignidadId,
    [provinciaId, cantonId, parroquiaId, zonaId, juntaId, dignidadId]
  );

  // 1) Carga inicial: provincias
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const prov = await getProvincias();
        setProvincias(prov);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) provincia -> cantones (resetea todo lo de abajo)
  useEffect(() => {
    (async () => {
      setCantonId(null);
      setParroquiaId(null);
      setZonaId(null);
      setJuntaId(null);
      setDignidadId(null);

      setCantones([]);
      setParroquias([]);
      setZonas([]);
      setJuntas([]);
      setDignidades([]);

      if (!provinciaId) return;

      setLoading(true);
      try {
        setCantones(await getCantones(provinciaId));
      } finally {
        setLoading(false);
      }
    })();
  }, [provinciaId]);

  // 3) canton -> parroquias
  useEffect(() => {
    (async () => {
      setParroquiaId(null);
      setZonaId(null);
      setJuntaId(null);
      setDignidadId(null);

      setParroquias([]);
      setZonas([]);
      setJuntas([]);
      setDignidades([]);

      if (!cantonId) return;

      setLoading(true);
      try {
        setParroquias(await getParroquias(cantonId));
      } finally {
        setLoading(false);
      }
    })();
  }, [cantonId]);

  // 4) parroquia -> zonas
  useEffect(() => {
    (async () => {
      setZonaId(null);
      setJuntaId(null);
      setDignidadId(null);

      setZonas([]);
      setJuntas([]);
      setDignidades([]);

      if (!parroquiaId) return;

      setLoading(true);
      try {
        setZonas(await getZonas(parroquiaId));
      } finally {
        setLoading(false);
      }
    })();
  }, [parroquiaId]);

  // 5) zona -> juntas (requiere parroquiaId + zonaId)
  useEffect(() => {
    (async () => {
      setJuntaId(null);
      setDignidadId(null);

      setJuntas([]);
      setDignidades([]);

        if (zonaId === null || parroquiaId === null) return;

      setLoading(true);
      try {
        setJuntas(await getJuntas(parroquiaId, zonaId));
      } finally {
        setLoading(false);
      }
    })();
  }, [zonaId, parroquiaId]);

  // 6) junta -> dignidades (requiere juntaId)
  useEffect(() => {
    (async () => {
      setDignidadId(null);
      setDignidades([]);

      if (!juntaId) return;

      setLoading(true);
      try {
        setDignidades(await getDignidades(juntaId));
      } finally {
        setLoading(false);
      }
    })();
  }, [juntaId]);

  function resetAll() {
    setProvinciaId(null);
    setCantonId(null);
    setParroquiaId(null);
    setZonaId(null);
    setJuntaId(null);
    setDignidadId(null);

    setCantones([]);
    setParroquias([]);
    setZonas([]);
    setJuntas([]);
    setDignidades([]);
  }

  function submit() {
    if (!isComplete) return;
    onSearch({
      provinciaId: provinciaId!,
      cantonId: cantonId!,
      parroquiaId: parroquiaId!,
      zonaId: zonaId!,
      juntaId: juntaId!,
      dignidadId: dignidadId!,
    });
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <SelectBox
          label="Provincia"
          value={provinciaId}
          items={provincias}
          disabled={loading}
          onChange={setProvinciaId}
        />

        <SelectBox
          label="Cantón"
          value={cantonId}
          items={cantones}
          disabled={!provinciaId || loading}
          onChange={setCantonId}
        />

        <SelectBox
          label="Parroquia"
          value={parroquiaId}
          items={parroquias}
          disabled={!cantonId || loading}
          onChange={setParroquiaId}
        />

        <SelectBox
          label="Zona"
          value={zonaId}
          items={zonas}
          disabled={!parroquiaId || loading}
          onChange={setZonaId}
        />

        <SelectBox
          label="Junta"
          value={juntaId}
          items={juntas}
          disabled={zonaId === null || loading}
          onChange={setJuntaId}
        />

        <SelectBox
          label="Dignidad"
          value={dignidadId}
          items={dignidades}
          disabled={juntaId === null || loading}
          onChange={setDignidadId}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 disabled:opacity-40"
          disabled={!isComplete || loading}
          onClick={submit}
        >
          Buscar · Mostrar trazabilidad
        </button>

        <button
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800/60 disabled:opacity-40"
          disabled={loading}
          onClick={resetAll}
        >
          Limpiar
        </button>

        {loading && <span className="text-sm text-slate-400">Cargando…</span>}
      </div>
    </div>
  );
}
