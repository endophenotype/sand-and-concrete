import { Award, DollarSign, Clock } from 'lucide-react';
import './About.scss';

const About = () => {
  const advantages = [
    {
      icon: Award,
      title: "Гарантия качества",
      description: "Все материалы соответствуют ГОСТ и проходят контроль качества"
    },
    {
      icon: DollarSign,
      title: "Цены от производителя",
      description: "Работаем напрямую с поставщиками, исключая посредников"
    },
    {
      icon: Clock,
      title: "Доставка 24/7",
      description: "Круглосуточная доставка в удобное для вас время"
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__header">
          <h2>О компании</h2>
          <div className="description">
            <p>
              Мы занимаемся поставками качественных сыпучих материалов уже более 10 лет. 
              Наша компания зарекомендовала себя как надежный партнер для строительных компаний, 
              частных застройщиков и ландшафтных дизайнеров.
            </p>
            <p>
              Собственный автопарк и прямые договоры с производителями позволяют нам 
              предлагать конкурентные цены и гарантировать своевременную доставку.
            </p>
          </div>
        </div>

        <div className="advantages-grid">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="advantage-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="icon-wrapper">
                <advantage.icon />
              </div>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;