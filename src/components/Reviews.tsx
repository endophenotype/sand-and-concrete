import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import './Reviews.scss';

const Reviews = () => {
  const reviews = [
    {
      name: "Александр М.",
      role: "Частный застройщик",
      text: "Заказывал песок и щебень для фундамента. Качество отличное, доставили точно в срок. Цены действительно выгодные, буду обращаться еще.",
      rating: 5
    },
    {
      name: "Елена К.",
      role: "Ландшафтный дизайнер",
      text: "Постоянно заказываю у них мраморную крошку и грунт для своих проектов. Всегда качественные материалы, быстрая доставка. Рекомендую!",
      rating: 5
    },
    {
      name: "ООО 'СтройТех'",
      role: "Строительная компания",
      text: "Работаем с этой компанией уже второй год. Большие объемы, всегда в срок, документы в порядке. Надежные партнеры.",
      rating: 5
    }
  ];

  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews__header">
          <h2>Отзывы клиентов</h2>
          <p>Более 1000 довольных клиентов выбрали нашу компанию</p>
        </div>

        <div className="reviews__grid">
          {reviews.map((review, index) => (
            <Card 
              key={index}
              className="review-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="review-content">
                <div className="quote-icon">
                  <Quote />
                </div>
                
                <div className="rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>

                <p className="review-text">
                  "{review.text}"
                </p>

                <div className="reviewer">
                  <h4>{review.name}</h4>
                  <p>{review.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="reviews__cta">
          <div className="cta-box">
            <h3>Присоединяйтесь к нашим клиентам!</h3>
            <p>Закажите материалы сегодня и убедитесь в нашем качестве</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;