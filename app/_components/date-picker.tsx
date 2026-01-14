'use client';

import { DatePicker as DatePickerTool } from "react-daisyui-timetools";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <div className="rounded-2xl w-48" style={{ width: "390px" }}>
      <DatePickerTool locale='uk-UA' value={value} onChange={onChange} />
    </div>
  );
}
