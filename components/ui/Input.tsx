/**
 * Input Component
 * Props:
 * label
 * placeholder
 * type
 * value
 * onChange
 * error
 */

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input
        className="border p-2 w-full"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p>{error}</p>}
    </div>
  );
}