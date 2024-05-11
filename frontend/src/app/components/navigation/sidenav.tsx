import { SideNavItem } from './sidenavitem';

export default function SideNav() {
  return (
    <div className="group fixed bottom-0 left-0 top-0 z-50 bg-beige-500 text-white">
      <div className="min-h-screen w-16 overflow-hidden pt-2 transition-all duration-300 ease-in-out hover:w-64">
        <ul>
          <SideNavItem href="/" value="Home" />
          {/* Add more SideNavItem components as needed */}
        </ul>
      </div>
    </div>
  );
}
