type ButtonVariant = "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export default function Button({ variant, children, ...props }: ButtonProps) {
  const variants = {
    secondary: "hover:shadow-[0_2px_40px_rgba(255,255,255,0.5)]",
  };

  const variantClass = variant ? variants[variant] : variants.secondary;

  return (
    <button
      className={`select-none border border-secondary border-solid backdrop-blur-[8px] flex justify-center items-center outline-none text-sm font-medium h-11 w-max py-3 px-4 transition-all duration-200 rounded-lg ${variantClass} ${props.className}`}
    >
      {children}
    </button>
  );
}
