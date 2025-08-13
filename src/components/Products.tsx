import { useState } from 'react';
import ProductModal from './ProductModal';
import sandImg from '@/assets/sand.jpg';
import gravelImg from '@/assets/gravel.jpg';
import marbleImg from '@/assets/marble.jpg';
import graniteImg from '@/assets/granite.jpg';
import keramzitImg from '@/assets/keramzit.jpg';
import soilImg from '@/assets/soil.jpg';
import './Products.scss';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = [
    {
      name: "Песок",
      image: sandImg,
      varieties: ["Карьерный", "Речной", "Сеянный"],
      price: 850,
      description: "Высококачественный песок для строительных и отделочных работ"
    },
    {
      name: "Мраморная крошка",
      image: marbleImg,
      varieties: ["Крошка белая", "Крошка чёрная", "Крошка цветная"],
      price: 1250,
      description: "Декоративная крошка для ландшафтного дизайна и отделки"
    },
    {
      name: "Гравий",
      image: gravelImg,
      varieties: ["Фракция 5-20 мм", "Фракция 20-40 мм", "Фракция 40-70 мм"],
      price: 600,
      description: "Природный гравий различных фракций для дренажа и строительства"
    },
    {
      name: "Щебень",
      image: graniteImg,
      varieties: ["Гранитный", "Гравийный", "Известняковый"],
      price: 1250,
      description: "Прочный щебень для фундаментов и дорожного строительства"
    },
    {
      name: "Керамзит",
      image: keramzitImg,
      varieties: ["Фракция 0-5 мм", "Фракция 5-10 мм", "Фракция 10-20 мм"],
      price: 600,
      description: "Легкий утеплитель и заполнитель для строительных работ"
    },
    {
      name: "Грунт",
      image: soilImg,
      varieties: ["Почвогрунт", "Планировочный", "Растительный"],
      price: 850,
      description: "Плодородный грунт для благоустройства и озеленения"
    }
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="products__header fade-in">
          <h2>Каталог материалов</h2>
          <p>Широкий ассортимент качественных сыпучих материалов для любых строительных задач</p>
        </div>

        <div className="products__grid">
          {products.map((product, index) => (
            <div 
              key={index}
              className="product-card card slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProductClick(product)}
            >
              <div className="product-card__image">
                <img 
                  src={product.image} 
                  alt={product.name}
                />
                <div className="product-card__price">
                  {product.price} ₽/м³
                </div>
              </div>
              
              <div className="product-card__content">
                <h3>{product.name}</h3>
                <p className="product-card__description">
                  {product.description}
                </p>
                
                <div className="product-card__varieties">
                  <h4>Виды:</h4>
                  <div className="varieties-list">
                    {product.varieties.map((variety, idx) => (
                      <span key={idx} className="variety-badge">
                        {variety}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="products__footer">
          <div className="delivery-info">
            <h3>Быстрая доставка по области</h3>
            <p>Доставляем в течение 24 часов после заказа</p>
          </div>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
};

export default Products;