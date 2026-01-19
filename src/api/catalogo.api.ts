import { http } from "./http";
import type { OptionItem } from "../types/catalogo";

export async function getProvincias(): Promise<OptionItem[]> {
  const { data } = await http.get("/api/catalogo/provincias");
  return normalizeOptions(data);
}

export async function getCantones(provinciaId: number): Promise<OptionItem[]> {
  const { data } = await http.get("/api/catalogo/cantones", { params: { provinciaId } });
  return normalizeOptions(data);
}

export async function getParroquias(cantonId: number): Promise<OptionItem[]> {
  const { data } = await http.get("/api/catalogo/parroquias", { params: { cantonId } });
  return normalizeOptions(data);
}

export async function getZonas(parroquiaId: number): Promise<OptionItem[]> {
  const { data } = await http.get("/api/catalogo/zonas", { params: { parroquiaId } });
  return normalizeOptions(data);
}

export async function getJuntas(parroquiaId: number, zonaId: number): Promise<OptionItem[]> {
  const { data } = await http.get("/api/catalogo/juntas", {
    params: { parroquiaId, zonaId },
  });
  return normalizeOptions(data);
}


export async function getDignidades(juntaId: number): Promise<OptionItem[]> {
  const { data } = await http.get("/api/catalogo/dignidades", {
    params: { juntaId },
  });
  return normalizeOptions(data);
}


/**
 * Normaliza respuestas típicas:
 * - Ya viene como [{id, nombre}]
 * - O viene como [{codigo, descripcion}] (lo mapeamos)
 * - O viene envuelto { items: [...] }
 */
function normalizeOptions(raw: any): OptionItem[] {
  const arr = Array.isArray(raw) ? raw : (raw?.items ?? raw?.data ?? []);
  return (arr ?? []).map((x: any) => ({
    id: Number(x.id ?? x.codigo ?? x.value ?? x.key),
    nombre: String(x.nombre ?? x.descripcion ?? x.name ?? x.label ?? x.text),
  }));
}
