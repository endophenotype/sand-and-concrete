
import React, { useState, useEffect } from 'react';
import { X, Calculator as CalculatorIcon, Truck } from 'lucide-react';
import './ProductModal.scss';

interface Product {
  name: string;
  image: string;
  varieties: string[];
  price: number;
  description: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const [volume, setVolume] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = React.useCallback(() => {
    if (product && volume) {
      const materialCost = product.price * parseFloat(volume);
      setTotalCost(materialCost); // Теперь totalCost - это только стоимость материала
    } else {
      setTotalCost(0); // Сброс totalCost, если нет продукта или объема
    }
  }, [product, volume]);

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Auto-calculate when volume changes
  React.useEffect(() => {
    calculateCost();
  }, [calculateCost]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!volume || !address || !phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    console.log({ product: product.name, volume, address, phone, totalCost });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="product-modal__header">
          <div className="product-modal__image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-modal__info">
            <h2>{product.name}</h2>
            <p className="price">{product.price} ₽/м³</p>
            <p className="description">{product.description}</p>
          </div>
        </div>

        <div className="product-modal__varieties">
          <h3>Виды:</h3>
          <div className="varieties-list">
            {product.varieties.map((variety, idx) => (
              <span key={idx} className="variety-badge">
                {variety}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="product-modal__form">
          <div className="form-title">
            <CalculatorIcon size={20} />
            <span>Калькулятор стоимости</span>
          </div>

          <div className="form-group">
            <label htmlFor="volume">Объём (м³)</label>
            <input
              id="volume"
              type="number"
              className="form-input"
              placeholder="Введите объём в м³"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              min="1"
              step="0.5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <textarea
              id="address"
              className="form-textarea"
              placeholder="Укажите полный адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Номер телефона</label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {totalCost > 0 && (
            <div className="cost-summary">
              <div className="cost-row">
                <span>Стоимость материала:</span>
                <span>{(product.price * parseFloat(volume || '0')).toLocaleString()} ₽</span>
              </div>
               <div className="cost-row">
                <span>Стоимость доставки:</span>
                <span>Рассчитаем стоимость доставки и сообщим вам</span>
              </div>
              <div className="cost-total">
                <span>Итого к оплате:</span>
                <span>{totalCost.toLocaleString()} ₽ + стоимость доставки</span>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-large">
            Рассчитать и оформить заказ
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
