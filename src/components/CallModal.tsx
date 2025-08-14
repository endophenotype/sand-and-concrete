import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { validatePhone, sanitizeTextInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";
import InfoModal from "./InfoModal";
interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallModal = ({ isOpen, onClose }: CallModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // Состояние для модального окна политики
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      alert("Пожалуйста, введите корректный номер телефона");
      return;
    }

    try {
      const response = await fetch("/api/send-call-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Заявка отправлена! Мы перезвоним вам");
        onClose();
        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-center flex items-center justify-center gap-3">
            <Phone className="w-6 h-6 text-nature-green" />
            Заказать звонок
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            Оставьте ваши контакты и мы перезвоним вам
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Ваше имя <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Введите ваше имя"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: sanitizeTextInput(e.target.value),
                })
              }
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">
              Номер телефона <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-medium">
              Комментарий (необязательно)
            </Label>
            <Textarea
              id="message"
              placeholder="Опишите ваш вопрос или требования..."
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: sanitizeTextInput(e.target.value),
                })
              }
              className="min-h-20"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-nature-green hover:bg-nature-green/90 text-white font-bold"
          >
            Заказать звонок
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <button
              type="button"
              className="text-nature-green hover:underline"
              onClick={() => setPrivacyOpen(true)}
            >
              политикой конфиденциальности
            </button>
          </p>
        </form>
      </DialogContent>
      {/* Модальное окно политики конфиденциальности */}
      <InfoModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Политика конфиденциальности"
        content="privacy"
      />
    </Dialog>
  );
};

export default CallModal;
