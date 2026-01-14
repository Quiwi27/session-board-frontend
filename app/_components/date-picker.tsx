'use client';

import { DatePicker as DatePickerTool } from "react-daisyui-timetools";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name?: string;
  errorMessage?: string;
}

export function DatePicker({ value, onChange, label, name, errorMessage }: DatePickerProps) {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      {name && <input type="hidden" name={name} value={value} />}
      <div className="rounded-2xl w-full">
        <DatePickerTool locale='uk-UA' value={value} onChange={onChange} />
      </div>
      {errorMessage && (
        <span className="text-error text-xs ml-1 mt-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
