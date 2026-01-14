'use client';

import { TimePicker as TimePickerTool } from "react-daisyui-timetools";

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  return (
    <div className="rounded-2xl w-48" style={{ width: "390px" }}>
      <TimePickerTool value={value} onChange={onChange} interval="60" />
    </div>
  );
}
