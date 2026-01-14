'use client';

export type ControllerInputProps = {
  value: string;
  name?: string;
  placeholder?: string;
  isDisable?: boolean;
  onChange?: (value: string) => void;
  type?: string;
  error?: string | string[];
};

export function ControlledInput({ placeholder, value, name, isDisable, onChange, type = "text", error }: ControllerInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`input w-full ${error ? 'input-error' : ''}`}
        disabled={isDisable}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && (
        <span className="text-error text-xs ml-1">
          {Array.isArray(error) ? error[0] : error}
        </span>
      )}
    </div>
  );
}
