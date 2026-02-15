import ColombiaFlag from './colombia-flag';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => (
  <header className={`w-full pt-2 pb-6 px-2 md:px-0 text-center ${className ?? ''}`}>
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight flex items-center justify-center gap-2">
      <ColombiaFlag className="w-8 h-6 md:w-10 md:h-7 inline-block align-middle" />
      {title}
    </h1>
  </header>
);

export default Header;
