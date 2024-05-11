interface SideNavIconProps {
  path: string;
  className: string;
}

export const SideNavIcon: React.FC<SideNavIconProps> = ({
  path,
  className,
}) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className="h-5 w-5 fill-current"
      >
        <path d={path}></path>
      </svg>
    </div>
  );
};
