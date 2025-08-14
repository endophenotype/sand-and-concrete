import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  validatePhone,
  validateNumeric,
  sanitizeTextInput,
} from "../lib/validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calculator as CalculatorIcon, Truck } from "lucide-react";
import "./Calculator.scss";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Calculator = ({ isOpen, onClose }: CalculatorModalProps) => {
  const [formData, setFormData] = useState({
    material: "",
    volume: "",
    address: "",
    phone: "",
  });

  const materials = [
    { value: "sand", label: "Песок", price: 850 },
    { value: "marble", label: "Мраморная крошка", price: 1250 },
    { value: "gravel", label: "Гравий", price: 600 },
    { value: "crushed-stone", label: "Щебень", price: 1250 },
    { value: "expanded-clay", label: "Керамзит", price: 600 },
    { value: "soil", label: "Грунт", price: 850 },
  ];

  const selectedMaterial = materials.find((m) => m.value === formData.material);
  const materialLabel = selectedMaterial ? selectedMaterial.label : "";
  const materialCost =
    selectedMaterial && formData.volume
      ? selectedMaterial.price * parseFloat(formData.volume)
      : 0;
  const deliveryCostDisplay =
    "Рассчитаем стоимость доставки и сообщим вам по телефону";
  const totalCostDisplay =
    materialCost.toLocaleString() + " ₽ + стоимость доставки";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.material ||
      !formData.volume ||
      !formData.address ||
      !formData.phone
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      alert("Пожалуйста, введите корректный номер телефона");
      return;
    }

    // Validate volume
    const volumeValidation = validateNumeric(formData.volume, 0.1, 1000);
    if (!volumeValidation.isValid) {
      alert("Пожалуйста, введите корректный объём (от 0.1 до 1000 м³)");
      return;
    }

    try {
      const response = await fetch("/api/send-calculator-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, material: materialLabel }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(
          `Failed to send request: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      alert(
        "Заявка отправлена! Мы свяжемся с вами для уточнения деталей заказа."
      );
      if (onClose && typeof onClose === "function") {
        onClose();
      }
      setFormData({
        material: "",
        volume: "",
        address: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <section id="calculator" className="calculator">
      <div className="container">
        <div className="calculator__container">
          <Card className="calculator__card">
            <CardHeader className="calculator__header">
              <CardTitle className="calculator__title">
                <CalculatorIcon />
                Калькулятор стоимости
              </CardTitle>
              <p>Рассчитайте стоимость материалов</p>
            </CardHeader>

            <CardContent className="calculator__content">
              <form onSubmit={handleSubmit} className="calculator__form">
                <div className="form-field">
                  <Label htmlFor="material">Выберите материал</Label>
                  <Select
                    value={formData.material}
                    onValueChange={(value) =>
                      setFormData({ ...formData, material: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((mat) => (
                        <SelectItem key={mat.value} value={mat.value}>
                          {mat.label} - {mat.price} ₽/м³
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-field">
                  <Label htmlFor="volume">Объём (м³)</Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder="Введите объём в м³"
                    value={formData.volume}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: e.target.value })
                    }
                    min="1"
                    step="0.5"
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="address">Адрес доставки</Label>
                  <Textarea
                    id="address"
                    placeholder="Укажите полный адрес доставки"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: sanitizeTextInput(e.target.value),
                      })
                    }
                    className="textarea"
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {selectedMaterial && formData.volume && (
                  <div className="cost-summary">
                    <div className="cost-row">
                      <span className="cost-label">Стоимость материала:</span>
                      <span className="font-medium">
                        {materialCost.toLocaleString()} ₽
                      </span>
                    </div>
                    <div className="cost-row">
                      <span className="cost-label">Стоимость доставки:</span>
                      <span className="cost-value">
                        Рассчитаем стоимость доставки и сообщим вам
                      </span>
                    </div>
                    <div className="cost-row total">
                      <span className="cost-label">Итого к оплате:</span>
                      <span className="cost-value">{totalCostDisplay}</span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="submit-button">
                  Рассчитать и оформить заказ
                </Button>
              </form>

              <p className="privacy-text">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
