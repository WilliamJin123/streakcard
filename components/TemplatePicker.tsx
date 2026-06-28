import { templates } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";

interface TemplatePickerProps {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}

export function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Template
      </span>
      <div className="mt-2 grid grid-cols-3 gap-2.5">
        {templates.map((t) => {
          const selected = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              aria-pressed={selected}
              className={`group rounded-2xl p-1 transition ${
                selected
                  ? "ring-2 ring-neutral-900 ring-offset-2 ring-offset-white"
                  : "ring-1 ring-black/10 hover:ring-black/25"
              }`}
            >
              <span
                style={t.swatchStyle}
                className="flex h-12 w-full items-end justify-start rounded-xl"
              />
              <span className="mt-1.5 block text-center text-xs font-medium text-neutral-600">
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
