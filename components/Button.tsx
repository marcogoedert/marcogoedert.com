type ButtonVariant = "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export default function Button({ variant, children, ...props }: ButtonProps) {
  const variants = {
    secondary: "hover:bg-brand-muted hover:border-brand",
  };

  const variantClass = variant ? variants[variant] : variants.secondary;

  return (
    <button
      {...props}
      className={`select-none border border-border backdrop-blur-[8px] flex justify-center items-center outline-none text-sm font-medium h-11 w-max py-3 px-4 transition-all duration-200 rounded-lg text-foreground ${variantClass} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
