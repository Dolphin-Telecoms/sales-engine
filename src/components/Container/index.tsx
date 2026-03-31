import cn from "classnames";

export default function Container({
  children,
  className,
  bgColor,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}>) {
  return (
    <div className={cn(bgColor)}>
      <main className={cn("max-w-7xl mx-auto px-4 sm:px-6 md:px-8", className)}>
        {children}
      </main>
    </div>
  );
}
