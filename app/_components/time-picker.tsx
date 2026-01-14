'use client';

import { TimePicker as TimePickerTool } from "react-daisyui-timetools";

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name?: string;
  errorMessage?: string;
}

export function TimePicker({ value, onChange, label, name, errorMessage }: TimePickerProps) {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      {name && <input type="hidden" name={name} value={value} />}
      <div className="rounded-2xl w-full">
        <TimePickerTool value={value} onChange={onChange} interval="60" />
      </div>
      {errorMessage && (
        <span className="text-error text-xs ml-1 mt-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
