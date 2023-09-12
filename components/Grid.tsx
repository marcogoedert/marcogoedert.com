interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Grid({ children, ...props }: GridProps) {
  return (
    <div
      id="content"
      className={
        "grid items-stretch gap-x-4 gap-y-24 grid-cols-[1fr_minmax(auto,880px)_1fr] " +
        props.className
      }
      {...props}
    >
      {children}
    </div>
  );
}
