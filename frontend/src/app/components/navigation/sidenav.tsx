import { SideNavItem } from './sidenavitem';

export default function SideNav() {
  return (
    <div className="min-h-screen w-64 bg-gray-800 text-white">
      <h1 className="p-5 text-xl font-bold">SideNav</h1>
      <ul>
        <SideNavItem href="/" value="Home" />
      </ul>
    </div>
  );
}
