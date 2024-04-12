interface Input {
  value: string;
  handleValue?: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}
export default function Input({
  value,
  handleValue,
  placeholder,
  disabled,
  label,
}: Input) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleValue) handleValue(e.target.value);
  };

  return (
    <div>
      {!!label && <label className="text-small-regular">{label}</label>}
      <input
        className={`h-10 w-full rounded border border-gray-200 placeholder:border-gray-200 ${disabled ? "bg-gray-100 text-gray-300" : ""} px-2 py-1 outline-[theme(colors.primary.default)] focus:outline-2`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
