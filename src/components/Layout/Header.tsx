import Logo from "../Logo";
import Nav from "./Nav";
import LanguageSwitcher from "../Common/LanguageSwitcher";

const Header = () => (
  <header className="bg-white sticky top-0 z-50 py-5 pt-10 border-b-1 border-b-gray-300">
    <div className="max-w-7xl mx-auto py-2 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-6">
        <Nav />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
);

export default Header;
