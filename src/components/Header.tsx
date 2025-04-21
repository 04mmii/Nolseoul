import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <Logo />
      <Nav />
    </div>
  </header>
);

export default Header;
