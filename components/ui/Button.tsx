/**
 * Button Component
 * Props:
 * variant: primary | secondary | outline
 * size: sm | md | lg
 * disabled: boolean
 * onClick: () => void
 */

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 border rounded"
    >
      {children}
    </button>
  );
}