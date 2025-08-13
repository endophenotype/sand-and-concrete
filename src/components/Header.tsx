import { useState } from 'react';
import { Menu, Phone, Truck } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  onCallClick: () => void;
}

const Header = ({ onCallClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navigationItems = [
    { name: 'Главная', id: 'hero' },
    { name: 'Товары', id: 'products' },
    { name: 'Доставка', id: 'about' },
    { name: 'Контакты', id: 'contacts' },
  ];

  return (
    <header className="header">
      <div className="container header__container">
        {/* Logo */}
        <div className="header__logo">
          <div className="header__logo-icon">
            <Truck size={24} />
          </div>
          <div className="header__logo-text">
            <h1>Песок и Бетон</h1>
            <p>Сыпучие материалы</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="header__nav-item"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Call Button */}
        <div className="header__cta">
          <button type="button" onClick={onCallClick} className="btn btn-primary">
            <Phone size={16} style={{ marginRight: '8px' }} />
            Заказать звонок
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="header__mobile-menu">
          <button 
            className="header__mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Mobile Menu Content */}
      <div className={`header__mobile-menu-content ${isOpen ? 'open' : ''}`}>
        <div className="nav-items">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button 
          type="button"
          onClick={() => {
            onCallClick();
            setIsOpen(false);
          }}
          className="btn btn-primary"
        >
          <Phone size={16} style={{ marginRight: '8px' }} />
          Заказать звонок
        </button>
      </div>
    </header>
  );
};

export default Header;