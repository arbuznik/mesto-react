import mestoLogo from './../images/logo.svg';

function Header() {
  return (
    <header className="header page__header">
      <img className="logo" src={mestoLogo} alt="Логотип Место" />
    </header>
  );
}

export default Header;