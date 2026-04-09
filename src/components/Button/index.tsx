import cn from "classnames";

function Button({
  className,
  children,
  variant,
  disabled,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  variant: "outline" | "filld";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "w-full md:w-auto px-6 rounded-lg font-medium transition",
        className,
        {
          "border border-[#2F5D67] text-[#2F5D67] py-[11px]":
            variant === "outline",
          "bg-[#2F5D67] hover:bg-[#254c54] text-white py-3":
            variant === "filld",
        },
      )}
      disabled={disabled ? disabled : false}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
