import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallModal = ({ isOpen, onClose }: CallModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive",
      });
      return;
    }

    // Здесь можно добавить отправку данных на сервер
    console.log({ name, phone, message });
    
    toast({
      title: "Заявка отправлена!",
      description: "Мы перезвоним вам в течение 15 минут",
    });

    // Очистка формы и закрытие модального окна
    setName('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-center flex items-center justify-center gap-3">
            <Phone className="w-6 h-6 text-nature-green" />
            Заказать звонок
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            Оставьте ваши контакты и мы перезвоним в течение 15 минут
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            Нажимая кнопку, вы соглашаетесь с{' '}
            <button type="button" className="text-nature-green hover:underline">
              политикой конфиденциальности
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;