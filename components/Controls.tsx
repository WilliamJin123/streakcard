import { TemplatePicker } from "./TemplatePicker";
import type { TemplateId } from "@/lib/templates";

interface ControlsProps {
  habit: string;
  day: number;
  startDate: string;
  template: TemplateId;
  onHabitChange: (value: string) => void;
  onDayChange: (value: number) => void;
  onStartDateChange: (value: string) => void;
  onTemplateChange: (id: TemplateId) => void;
}

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white";
const labelClass =
  "text-xs font-semibold uppercase tracking-wider text-neutral-500";

export function Controls({
  habit,
  day,
  startDate,
  template,
  onHabitChange,
  onDayChange,
  onStartDateChange,
  onTemplateChange,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Habit</span>
        <input
          type="text"
          value={habit}
          maxLength={40}
          onChange={(e) => onHabitChange(e.target.value)}
          placeholder="Meditation"
          className={fieldClass}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Day count</span>
          <input
            type="number"
            min={1}
            value={Number.isFinite(day) ? day : ""}
            onChange={(e) => onDayChange(Math.max(1, Number(e.target.value) || 1))}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Start date (optional)</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>
      <p className="-mt-3 text-xs text-neutral-400">
        Set a start date and we&apos;ll count the days for you.
      </p>

      <TemplatePicker value={template} onChange={onTemplateChange} />
    </div>
  );
}
