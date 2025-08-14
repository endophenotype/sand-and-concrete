import { Phone, Mail, MapPin, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './Footer.scss';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer = ({ onPrivacyClick, onTermsClick }: FooterProps) => {
  return (
    <footer id="contacts" className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <div className="footer__logo">
              <div className="logo-icon">
                <Truck />
              </div>
              <div className="logo-text">
                <h3>Песок и Бетон</h3>
                <p>Сыпучие материалы</p>
              </div>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <Phone />
                <div className="contact-details">
                  <p>+7 (996) 457-77-08</p>
                  <p className="contact-subtitle">Основной номер</p>
                </div>
              </div>

              <div className="contact-item">
                <Mail />
                <div className="contact-details">
                  <p>pesokbeton22@mail.ru</p>
                  <p className="contact-subtitle">Электронная почта</p>
                </div>
              </div>

              <div className="contact-item contact-item--start">
                <MapPin />
                <div className="contact-details">
                  <p>г. Барнаул</p>
                  <p className="contact-subtitle">
                    Павловский тракт, д. 78, кв. 90
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__section">
            <h3>Режим работы</h3>

            <div className="working-hours">
              <div className="hours-item">
                <Clock />
                <div className="hours-details">
                  <p>Офис продаж</p>
                  <p className="hours-subtitle">Пн-Пт: 8:00 - 18:00</p>
                  <p className="hours-subtitle">Сб: 9:00 - 15:00</p>
                </div>
              </div>

              <div className="hours-item">
                <Truck />
                <div className="hours-details">
                  <p>Доставка</p>
                  <p className="hours-subtitle">В рабочее время</p>
                  <p className="hours-subtitle">Без выходных</p>
                </div>
              </div>

              <div className="emergency-box">
                <h4>Экстренная доставка</h4>
                <p>
                  Принимаем заказы в рабочее время. Доставка в течение 2-4
                  часов.
                </p>
              </div>
            </div>
          </div>

          <div className="footer__section">
            <h3>Услуги</h3>

            <ul className="services-list">
              <li>• Поставка сыпучих материалов</li>
              <li>• Доставка собственным автопарком</li>
              <li>• Консультации по выбору материалов</li>
              <li>• Объемные скидки</li>
              <li>• Работа с юридическими лицами</li>
              <li>• Безналичный и наличный расчет</li>
            </ul>

            <div className="delivery-zone">
              <h4>Зона доставки</h4>
              <p>Барнаул. Доставка в пригород по договоренности.</p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <div className="copyright">
              <p>&copy; 2025 Песок и Бетон. Все права защищены.</p>
            </div>

            <div className="footer__links">
              <Button
                variant="link"
                onClick={onPrivacyClick}
                className="footer-link"
              >
                Политика конфиденциальности
              </Button>
              <Button
                variant="link"
                onClick={onTermsClick}
                className="footer-link"
              >
                Условия использования
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;