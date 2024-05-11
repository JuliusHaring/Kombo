import { SideNavItem } from './SideNavItem';

export default function SideNav() {
  return (
    <div className="group fixed bottom-0 left-0 top-0 z-50 bg-beige-500 text-white shadow-xl">
      <div className="min-h-screen w-16 overflow-hidden pt-2 transition-all duration-300 ease-in-out hover:w-64">
        <ul>
          <SideNavItem href="/" value="Home" />
        </ul>
      </div>
    </div>
  );
}
