import React from "react";

type Item = { id: number; nombre: string };

export function SelectBox({
  label,
  value,
  items,
  disabled,
  onChange,
}: {
  label: string;
  value: number | null;
  items: Item[];
  disabled?: boolean;
  onChange: (v: number | null) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs text-slate-400">{label}</span>
      <select
        className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-indigo-500 disabled:opacity-40"
        disabled={!!disabled}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Seleccionar…</option>
        {items.map((it) => (
          <option key={it.id} value={it.id}>
            {it.nombre}
          </option>
        ))}
      </select>
    </label>
  );
}
