import { useEffect, useMemo, useState } from "react";
import * as UTIF from "utif";
import type { ActaTraceDto, ImagenActaDto } from "../types/traceability";
import { buildIpfsImageUrl } from "../api/ipfs.api";


function isLikelyCid(v: string) {
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(v) || /^b[a-z2-7]{20,}$/.test(v);
}

export function ActaImage({ data }: { data: ActaTraceDto }) {
  const [index, setIndex] = useState(0);
  const [renderUrl, setRenderUrl] = useState<string | null>(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imagenes = useMemo<ImagenActaDto[]>(() => {
    return (data.imagenes ?? [])
      .filter((i) => !!i.pathipfs && isLikelyCid(i.pathipfs))
      .sort((a, b) => (a.pagina ?? 0) - (b.pagina ?? 0));
  }, [data.imagenes]);

  useEffect(() => {
    setIndex(0);
  }, [data.actaId]);

  const img = imagenes[index];
  const total = imagenes.length;

  // ✅ Endpoint actual que devuelve el archivo (TIFF) desde tu mismo API
  const downloadUrl = img?.pathipfs
  ? buildIpfsImageUrl(img.pathipfs)
  : null;

useEffect(() => {
  let cancelled = false;

  async function loadAndConvert() {
    if (!downloadUrl) return;

    setLoadingImg(true);
    setError(null);
    setRenderUrl(null);

    try {
      const resp = await fetch(downloadUrl);

      if (!resp.ok) {
        const txt = await resp.text().catch(() => "");
        throw new Error(`HTTP ${resp.status} ${txt?.slice(0, 120)}`);
      }

      const contentType = resp.headers.get("content-type") || "";
      const buf = await resp.arrayBuffer();
      const u8 = new Uint8Array(buf);

      // ✅ Validación rápida: magic bytes TIFF
      const isTiff =
        (u8.length > 4 &&
          ((u8[0] === 0x49 && u8[1] === 0x49 && u8[2] === 0x2a && u8[3] === 0x00) ||
           (u8[0] === 0x4d && u8[1] === 0x4d && u8[2] === 0x00 && u8[3] === 0x2a)));

      if (!isTiff) {
        // Esto te confirma si el backend está devolviendo JSON/HTML en vez de TIFF
        const previewText = new TextDecoder().decode(u8.slice(0, 200));
        throw new Error(
          `Respuesta no es TIFF. content-type=${contentType}. bytes[0..200]=${previewText}`
        );
      }

      const ifds = UTIF.decode(u8);
      if (!ifds || ifds.length === 0) throw new Error("TIFF inválido (sin IFDs)");

      // Muy importante: decodeImage
      UTIF.decodeImage(u8, ifds[0]);

      // width/height: a veces vienen en ifd o en tags
      const w = (ifds[0].width || ifds[0]["t256"] || ifds[0]["ImageWidth"] || 0) as number;
      const h = (ifds[0].height || ifds[0]["t257"] || ifds[0]["ImageLength"] || 0) as number;

      if (!w || !h || Number.isNaN(w) || Number.isNaN(h)) {
        throw new Error(`No se pudo obtener dimensiones TIFF (w=${w}, h=${h})`);
      }

      const rgba = UTIF.toRGBA8(ifds[0]);
      if (!rgba || rgba.length !== w * h * 4) {
        throw new Error(`RGBA inválido. len=${rgba?.length}, esperado=${w * h * 4}`);
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No se pudo obtener contexto canvas");

      const imgData = new ImageData(new Uint8ClampedArray(rgba), w, h);
      ctx.putImageData(imgData, 0, 0);

      const blob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("toBlob falló"))),
          "image/png"
        );
      });

      const url = URL.createObjectURL(blob);

      if (!cancelled) {
        setRenderUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } else {
        URL.revokeObjectURL(url);
      }
    } catch (e: any) {
      if (!cancelled) setError(e?.message ?? "Error desconocido");
    } finally {
      if (!cancelled) setLoadingImg(false);
    }
  }

  loadAndConvert();

  return () => {
    cancelled = true;
  };
}, [downloadUrl]);

  if (imagenes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h3 className="text-base font-semibold text-slate-100">Imagen del acta</h3>
        <div className="mt-4 flex h-72 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/50 text-sm text-slate-400">
          Aún no hay imagen para esta acta.
        </div>
      </div>
    );
  }

  const canPrev = index > 0;
  const canNext = index < total - 1;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Imagen del acta</h3>
          <p className="mt-1 text-sm text-slate-400">
            Página {index + 1} de {total}
            {img.nombre ? ` · ${img.nombre}` : ""}
          </p>
        </div>

        <div className="flex gap-2">
          {downloadUrl ? (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-800/60"
            >
              Descargar
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        {loadingImg ? (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/50 text-sm text-slate-400">
            Cargando imagen…
          </div>
        ) : error ? (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-red-900/40 bg-red-950/30 text-sm text-red-200">
            No se pudo convertir/renderizar TIFF: {error}
          </div>
        ) : renderUrl ? (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/30">
            <img
              src={renderUrl}
              alt={`Acta ${data.codigo} página ${img.pagina ?? index + 1}`}
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/50 text-sm text-slate-400">
            Sin preview
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={!canPrev}
          onClick={() => canPrev && setIndex((x) => x - 1)}
          className="rounded-xl border border-slate-700 px-3 py-2 text-xs disabled:opacity-40"
        >
          ◀ Anterior
        </button>

        <span className="text-xs text-slate-400">
          CID: {(img.pathipfs ?? "").slice(0, 10)}…{(img.pathipfs ?? "").slice(-6)}
        </span>

        <button
          disabled={!canNext}
          onClick={() => canNext && setIndex((x) => x + 1)}
          className="rounded-xl border border-slate-700 px-3 py-2 text-xs disabled:opacity-40"
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}
