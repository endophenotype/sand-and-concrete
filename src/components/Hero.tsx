import { Button } from '@/components/ui/button';
import { Calculator, ArrowDown } from 'lucide-react';
import heroBg from '@/assets/hero-bulldozer.jpg';
import './Hero.scss';

interface HeroProps {
  onCalculateClick: () => void;
}

const Hero = ({ onCalculateClick }: HeroProps) => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="hero"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(76, 175, 79, 0.7), rgba(168, 213, 186, 0.6)), url(${heroBg})`,
      }}
    >
      <div className="hero__content">
        <div className="hero__text">
          <h1>
            Качественные сыпучие материалы 
            <span className="text-nature-beige">с доставкой</span>
          </h1>
          
          <p>
            Прямые поставки от производителя — без переплат
          </p>
          
          <div className="hero__buttons">
            <Button 
              onClick={onCalculateClick}
              className="btn-primary"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Рассчитать стоимость
            </Button>
            
            <Button 
              onClick={scrollToProducts}
              className="btn-outline"
            >
              Посмотреть каталог
            </Button>
          </div>

          <div className="hero__features">
            <div className="feature-card">
              <h3>Работаем честно</h3>
              <p>Гарантируем качество материалов</p>
            </div>
            <div className="feature-card">
              <h3>Собственный автопарк</h3>
              <p>Быстрая доставка в любую точку</p>
            </div>
            <div className="feature-card">
              <h3>Цены от производителя</h3>
              <p>Без посредников и наценок</p>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <ArrowDown className="arrow-down" />
      </div>
    </section>
  );
};

export default Hero;