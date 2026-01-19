import type { TraceQuery } from "../components/CascadingFilters";
import type { ActaTraceDto } from "../types/traceability";
import { traceHttp } from "./http";

// POST /api/traceability/acta
export async function getActaTrace(q: TraceQuery): Promise<ActaTraceDto> {
  const { data } = await traceHttp.post<ActaTraceDto>(
    "/api/traceability/acta",
    {
      juntaId: q.juntaId,
      dignidadId: q.dignidadId,
    }
  );

  return data;
}
