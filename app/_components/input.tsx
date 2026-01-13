'use client';

type ControllerInputProps = {
  value: string;
  placeholder?: string;
  isDisable?: boolean;
  onChange?: (value: string) => void;
};

export function ControlledInput({ placeholder, value, isDisable, onChange }: ControllerInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="input w-full"
      disabled={isDisable}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
