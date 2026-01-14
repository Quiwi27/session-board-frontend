'use client';

export type ControllerInputProps = {
  value: string;
  name?: string;
  type?: string;
  placeholder?: string;
  isDisable?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
};

export function ControlledInput({ placeholder, value, name, isDisable, onChange, type = "text", errorMessage }: ControllerInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`input w-full ${errorMessage ? 'input-error' : ''}`}
        disabled={isDisable}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {errorMessage && (
        <span className="text-error text-xs ml-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
