import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// removed ScrollArea import

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: 'privacy' | 'terms';
}

const InfoModal = ({ isOpen, onClose, title, content }: InfoModalProps) => {
  const privacyContent = (
    <div className="space-y-6 text-sm leading-relaxed">
      <div>
        <h3 className="font-bold text-base mb-3">1. Общие положения</h3>
        <p className="text-muted-foreground">
          Настоящая Политика конфиденциальности определяет порядок обработки
          персональных данных пользователей сайта компании "Песок и Бетон".
          Используя наш сайт, вы соглашаетесь с условиями данной политики.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">
          2. Сбор персональных данных
        </h3>
        <p className="text-muted-foreground mb-2">
          Мы можем собирать следующую информацию:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Имя и фамилия</li>
          <li>Контактный номер телефона</li>
          <li>Адрес электронной почты</li>
          <li>Адрес доставки</li>
          <li>Информация о заказах и предпочтениях</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">3. Использование данных</h3>
        <p className="text-muted-foreground mb-2">
          Собранная информация используется для:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Обработки заказов и предоставления услуг</li>
          <li>Связи с клиентами по вопросам заказов</li>
          <li>Улучшения качества обслуживания</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">4. Защита данных</h3>
        <p className="text-muted-foreground">
          Мы принимаем все необходимые меры для защиты ваших персональных данных
          от несанкционированного доступа, изменения, раскрытия или уничтожения.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">5. Контакты</h3>
        <p className="text-muted-foreground">
          По вопросам обработки персональных данных обращайтесь по адресу:
          pesokbeton22@mail.ru
        </p>
      </div>
    </div>
  );

  const termsContent = (
    <div className="space-y-6 text-sm leading-relaxed">
      <div>
        <h3 className="font-bold text-base mb-3">1. Предмет договора</h3>
        <p className="text-muted-foreground">
          Компания "Песок и Бетон" предоставляет услуги по поставке сыпучих
          строительных материалов с доставкой по Барнаулу.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">
          2. Порядок оформления заказа
        </h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Заказ оформляется через сайт или по телефону</li>
          <li>Наш менеджер перезвонит вам для подтверждение заказа</li>
          <li>Доставка осуществляется в согласованное время</li>
          <li>Оплата производится наличными или безналичным расчетом</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">3. Стоимость и оплата</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Цены указаны на сайте и могут изменяться</li>
          <li>Возможна оплата наличными при получении</li>
          <li>Для юридических лиц предусмотрен безналичный расчет</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">4. Гарантии качества</h3>
        <p className="text-muted-foreground">
          Все материалы соответствуют ГОСТ. При обнаружении несоответствия
          качества материал подлежит замене.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">5. Ответственность</h3>
        <p className="text-muted-foreground">
          Компания не несет ответственности за задержки доставки, связанные с
          погодными условиями или действиями третьих лиц.
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-2xl max-h-80vh rounded-lg overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="max-h-60vh pr-4 overflow-y-auto no-scrollbar">
          {content === 'privacy' ? privacyContent : termsContent}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;