interface HeaderProps {
  size: '1' | '2' | '3' | '4' | '5' | '6';
  children: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  size,
  children,
  className,
}) => {
  const HeaderTag = `h${size}` as keyof JSX.IntrinsicElements;

  return <HeaderTag className={`font-bold ${className}`}>{children}</HeaderTag>;
};
