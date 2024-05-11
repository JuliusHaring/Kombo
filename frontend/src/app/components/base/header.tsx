interface HeaderProps {
  size: '1' | '2' | '3' | '4' | '5' | '6';
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ size, children }) => {
  const HeaderTag = `h${size}` as keyof JSX.IntrinsicElements;

  return <HeaderTag className={`text-xl font-bold`}>{children}</HeaderTag>;
};
