import Logo from "../Logo";
import Nav from "./Nav";

const Header = () => (
  <header className="bg-white sticky top-0 z-50 py-5 pt-10 border-b-1 border-b-gray-300">
    <div className="max-w-7xl mx-auto py-2 flex justify-between items-center">
      <Logo />
      <Nav />
    </div>
  </header>
);

export default Header;
