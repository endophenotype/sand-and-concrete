import React, { useState, useEffect } from "react";
import { X, Calculator as CalculatorIcon, Truck } from "lucide-react";
import "./ProductModal.scss";

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
  const [formData, setFormData] = useState({
    volume: "",
    address: "",
    phone: "",
    totalCost: "",
  });

  const calculateCost = React.useCallback(() => {
    if (product && formData.volume) {
      const parsedVolume = parseFloat(formData.volume);
      const materialCost =
        product.price * (isNaN(parsedVolume) ? 0 : parsedVolume);
      setFormData((f) => ({
        ...f,
        totalCost: materialCost.toFixed(1),
      }));
    } else {
      setFormData((f) => ({
        ...f,
        totalCost: "0.0",
      }));
    }
  }, [product, formData.volume]);

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Auto-calculate when volume changes
  React.useEffect(() => {
    calculateCost();
  }, [calculateCost]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { volume, address, phone, totalCost } = formData;

    if (!volume || !address || !phone) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    try {
      const response = await fetch("/api/send-product-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          product: {
            name: product.name,
            price: product.price,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(
          `Failed to send request: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
      alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      if (onClose && typeof onClose === "function") {
        onClose();
      }
      setFormData({
        volume: "",
        address: "",
        phone: "",
        totalCost: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content product-modal"
        onClick={(e) => e.stopPropagation()}
      >
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
              value={formData.volume}
              onChange={(e) =>
                setFormData({ ...formData, volume: e.target.value })
              }
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
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
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
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          {parseFloat(formData.totalCost) > 0 && (
            <div className="cost-summary">
              <div className="cost-row">
                <span>Стоимость материала:</span>
                <span>{formData.totalCost} ₽</span>
              </div>
              <div className="cost-row">
                <span>Стоимость доставки:</span>
                <span>Рассчитаем стоимость доставки и сообщим вам</span>
              </div>
              <div className="cost-total">
                <span>Итого к оплате:</span>
                <span>{formData.totalCost} ₽ + стоимость доставки</span>
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
