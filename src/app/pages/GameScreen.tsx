import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Clock, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

interface Client {
  id: number;
  name: string;
  age: string;
  story: string;
  objects: { text: string; correct: boolean }[];
  contexts: { text: string; correct: boolean }[];
  features: { text: string; correct: boolean }[];
  successMessage: string;
  errorMessage: string;
}

const allClients: Client[] = [
  {
    id: 1,
    name: 'Ігор',
    age: '25 років',
    story: 'У мене в кишені лише стипендія і велике кохання. Треба щось таке, щоб дівчина не здогадалася, що я тиждень їв мівіну',
    objects: [
      { text: 'Набір патчів для очей', correct: true },
      { text: 'Золотий ланцюжок', correct: false },
      { text: 'Dyson', correct: false },
    ],
    contexts: [
      { text: 'Догляд та піклування', correct: true },
      { text: 'Техніка', correct: false },
      { text: 'Поїздка в гори', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Kasta Premium', correct: false },
      { text: 'Без знижки', correct: false },
    ],
    successMessage: 'Метч! Ігор справжній романтик на мінімалках 💕',
    errorMessage: 'Упс! Студентський бюджет не потягне...',
  },
  {
    id: 2,
    name: 'Женя',
    age: '27 років',
    story: '14 лютого, 23:30. Я щойно прокинувся і зрозумів, що завтра буду холостяком, якщо нічого не куплю. Рятуйте!',
    objects: [
      { text: 'Відкрию їй Kasta Visa Card для покупок без ліміту', correct: true },
      { text: 'Шкарпетки', correct: false },
      { text: 'Букет дешевих квітів', correct: false },
    ],
    contexts: [
      { text: 'Миттєве зізнання', correct: true },
      { text: 'Планування на рік', correct: false },
      { text: 'Подорож', correct: false },
    ],
    features: [
      { text: 'Оформлення онлайн', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Самовивіз через тиждень', correct: false },
    ],
    successMessage: 'Врятовано! Женя залишається закоханим!',
    errorMessage: 'Занадто повільно... стосунки під загрозою',
  },
  {
    id: 3,
    name: 'Максим',
    age: '32 роки',
    story: 'Ми разом 5 років. Хочу здивувати її особливим подарунком! Все має бути ідеально, як у кіно',
    objects: [
      { text: 'Годинник Versace', correct: true },
      { text: 'Набір шампунів і масок', correct: false },
      { text: 'Набір викруток', correct: false },
    ],
    contexts: [
      { text: 'Той самий момент', correct: true },
      { text: 'Вечеря з батьками', correct: false },
      { text: 'Перегляд футболу', correct: false },
    ],
    features: [
      { text: 'BNPL розстрочка', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Без упаковки', correct: false },
    ],
    successMessage: 'Вона наче знову сказала ТАК! 💍 Ви створили магію!',
    errorMessage: 'Це не той момент... місія провалена',
  },
  {
    id: 4,
    name: 'Петро',
    age: '55 років',
    story: 'Дружина каже, що романтика померла. Хочу довести, що я ще той козак! Потрібен подарунок, щоб вона ахнула',
    objects: [
      { text: 'Шовкова нічна сорочка', correct: true },
      { text: 'Праска', correct: false },
      { text: 'Набір сит', correct: false },
    ],
    contexts: [
      { text: 'Друга молодість', correct: true },
      { text: 'Прибирання на кухні', correct: false },
      { text: 'Похід на рибалку', correct: false },
    ],
    features: [
      { text: 'Kasta Premium', correct: true },
      { text: 'Без KVC', correct: false },
      { text: 'Економ варіант', correct: false },
    ],
    successMessage: 'Козак не підвів! Романтика воскресла 🔥',
    errorMessage: 'Побутовий подарунок? Романтика точно померла...',
  },
  {
    id: 5,
    name: 'Сергій',
    age: '27 років',
    story: 'Вона надіслала мені 40 посилань на цей стайлер. Ну ви розумієте ...',
    objects: [
      { text: 'Стайлер Dyson', correct: true },
      { text: 'Сковорідка з антипригарним покриттям', correct: false },
      { text: 'Фен', correct: false },
    ],
    contexts: [
      { text: 'Техніка - мрія кожної дівчини', correct: true },
      { text: 'Приготування млинців', correct: false },
      { text: 'Заняття спортом', correct: false },
    ],
    features: [
      { text: 'BNPL розстрочка', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Бюджетна альтернатива', correct: false },
    ],
    successMessage: 'Натяк зараховано! Катя в захваті! ✨',
    errorMessage: 'Сковорідка знову? Стосунки в небезпеці!',
  },
  {
    id: 6,
    name: 'Діма',
    age: '30 років',
    story: 'Забув про нашу річницю минулого тижня. На день Валентина маю реабілітуватися так, щоб отримати прощення на рік вперед',
    objects: [
      { text: 'Величезний набір преміум косметики', correct: true },
      { text: 'Шоколадка', correct: false },
      { text: 'Одна троянда', correct: false },
    ],
    contexts: [
      { text: 'Щире каяття', correct: true },
      { text: 'Серйозна розмова', correct: false },
      { text: 'Вигул собаки', correct: false },
    ],
    features: [
      { text: 'Kasta Premium', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Мінімальний бюджет', correct: false },
    ],
    successMessage: 'Прощення отримано! Діма врятований 🙏',
    errorMessage: 'Замало для прощення... спробуй через рік',
  },
  {
    id: 7,
    name: 'Оксана',
    age: '45 років',
    story: 'Мій чоловік серйозний інженер, ніколи не святкує Валентина. Хочу розтопити його серце чимось теплим',
    objects: [
      { text: 'Якісний махровий халат', correct: true },
      { text: 'Краватка', correct: false },
      { text: 'Калькулятор', correct: false },
    ],
    contexts: [
      { text: 'Домашній релакс', correct: true },
      { text: 'Нарада на роботі', correct: false },
      { text: 'Ремонт гаража', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Без KVC', correct: false },
      { text: 'Технічний підхід', correct: false },
    ],
    successMessage: 'Серце інженера розтануло! Тепло перемогло 💝',
    errorMessage: 'Занадто формально... серце залишилось холодним',
  },
  {
    id: 8,
    name: 'Влад',
    age: '21 рік',
    story: 'Це наше перше 14 лютого. Мама радить подарувати сервіз, але я не хочу стати мемом у її ТікТоці',
    objects: [
      { text: 'Настільна лампа-котик з Тіктоку', correct: true },
      { text: 'Столовий сервіз на 12 осіб', correct: false },
      { text: 'Енциклопедія', correct: false },
    ],
    contexts: [
      { text: 'Затишок та тепло', correct: true },
      { text: 'Обід у бабусі', correct: false },
      { text: 'Підготовка до іспитів', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'BNPL розстрочка', correct: false },
      { text: 'Радянські традиції', correct: false },
    ],
    successMessage: 'Крінж-стоп! Влад тренді і в темі 😎',
    errorMessage: 'Меми в ТікТоці вже готуються...',
  },
  {
    id: 9,
    name: 'Андрій',
    age: '40 років',
    story: 'Дружина поїхала до мами. Хочу зробити їй сюрприз — щоб по поверненню на неї чекало щось розкішне прямо в ліжку',
    objects: [
      { text: 'Комплект елітної білизни', correct: true },
      { text: 'Подушка', correct: false },
      { text: 'Халат', correct: false },
    ],
    contexts: [
      { text: 'Пристрасний сюрприз', correct: true },
      { text: 'Приїзд тещі', correct: false },
      { text: 'Сніданок на самоті', correct: false },
    ],
    features: [
      { text: 'Kasta Premium', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Економ клас', correct: false },
    ],
    successMessage: 'Романтика на вищому рівні! 🔥',
    errorMessage: 'Не той настрій... сюрприз не вдався',
  },
  {
    id: 10,
    name: 'Марина',
    age: '38 років',
    story: 'Хлопця немає, але є кістлявий котяра, який любить мене більше за всіх. Святкуємо разом!',
    objects: [
      { text: 'Плюшевий лежак для тварин', correct: true },
      { text: 'Коробка цукерок', correct: false },
      { text: 'Набір чаю', correct: false },
    ],
    contexts: [
      { text: 'Кохання до вух', correct: true },
      { text: 'Побачення в Тіндері', correct: false },
      { text: 'Вечірка з подругами', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Швидка доставка', correct: false },
      { text: 'Людський формат', correct: false },
    ],
    successMessage: 'Котик схвалює! Кращий Валентин ever 🐱💕',
    errorMessage: 'Котяра не оцінив... він образився',
  },
  {
    id: 11,
    name: 'Артем',
    age: '24 роки',
    story: 'Дівчина каже, що я проводжу забагато часу в CS. Треба довести, що вона для мене — топ-1 у всьому лобі.',
    objects: [
      { text: 'Парні худі з прикольним принтом', correct: true },
      { text: 'Нова механічна клавіатура', correct: false },
      { text: 'Килимок для мишки', correct: false },
    ],
    contexts: [
      { text: 'Для пар', correct: true },
      { text: 'Нічний рейд у рейдах', correct: false },
      { text: 'Одиночна кампанія', correct: false },
    ],
    features: [
      { text: 'Kasta Premium', correct: true },
      { text: 'BNPL розстрочка', correct: false },
      { text: 'Самовивіз через тиждень', correct: false },
    ],
    successMessage: 'Катка виграна! Рівень кохання +1000 🏆',
    errorMessage: 'Game Over. Твої речі вже на балконі...',
  },
  {
    id: 12,
    name: 'Оля',
    age: '31 рік',
    story: 'Хочу влаштувати романтичну вечерю, навіть якщо вимкнуть світло. Романтика має сяяти яскравіше за ДТЕК!',
    objects: [
      { text: 'Набір стильних аромасвічок', correct: true },
      { text: 'Налобний ліхтар', correct: false },
      { text: 'Газова конфорка', correct: false },
    ],
    contexts: [
      { text: 'Вечеря при свічках', correct: true },
      { text: 'Ремонт щитка', correct: false },
      { text: 'Пошук ключів у темряві', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Made in China', correct: false },
    ],
    successMessage: 'Світло в душі, затишок у домі! ✨',
    errorMessage: 'Занадто практично... романтика згасла.',
  },
  {
    id: 13,
    name: 'Ігор',
    age: '35 років',
    story: 'Ми разом бігаємо марафони. Шоколад — це не про нас, нам треба щось для ендорфінів.',
    objects: [
      { text: 'Розумні ваги або фітнес-трекер', correct: true },
      { text: 'Коробка протеїнових батончиків', correct: false },
      { text: 'Чіпси Pringles', correct: false },
    ],
    contexts: [
      { text: 'Спорт разом', correct: true },
      { text: 'Блекаут', correct: false },
      { text: 'Перегляд серіалів', correct: false },
    ],
    features: [
      { text: 'BNPL розстрочка', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Бюджетний сегмент', correct: false },
    ],
    successMessage: 'Новий рекорд у стосунках зафіксовано! 🏃‍♂️💨',
    errorMessage: 'Збив режим... серце б\'ється не в такт.',
  },
  {
    id: 14,
    name: 'Катя',
    age: '22 роки',
    story: 'Навіщо чекати принца, якщо у мене є Kasta? Купую подарунок найріднішій людині — собі.',
    objects: [
      { text: 'Шовкова піжама', correct: true },
      { text: 'Набір каструль', correct: false },
      { text: 'Настільна гра', correct: false },
    ],
    contexts: [
      { text: 'Для себе коханої', correct: true },
      { text: 'Прийом гостей', correct: false },
      { text: 'Генеральне прибирання', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'BNPL розстрочка', correct: false },
      { text: 'Подарункова упаковка', correct: false },
    ],
    successMessage: 'Найкраще побачення! Я себе обожнюю 💖',
    errorMessage: 'Це не подарунок, а домашні хлопоти...',
  },
  {
    id: 15,
    name: 'Юля',
    age: '26 років',
    story: 'Моя косметичка не закривається, але мені терміново потрібна «та сама» палетка, про яку кажуть всі блогери. Але хочу її від Олежика на день Валентина.',
    objects: [
      { text: 'Лімітована палетка тіней', correct: true },
      { text: 'Крем для рук', correct: false },
      { text: 'Ватні диски', correct: false },
    ],
    contexts: [
      { text: 'Преміум косметика', correct: true },
      { text: 'Змивання макіяжу', correct: false },
      { text: 'Робота в офісі', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Економ-пакування', correct: false },
      { text: 'Доставка Укрпоштою', correct: false },
    ],
    successMessage: 'Образ на мільйон! Стрілки ідеальні ✨',
    errorMessage: 'Це вже є у кожній косметичці... нудно.',
  },
  {
    id: 16,
    name: 'Тарас',
    age: '33 роки',
    story: 'Хочу здивувати її своїми кулінарними здібностями, але без професійних девайсів я тільки яєшню можу спалити.',
    objects: [
      { text: 'Електричний гриль', correct: true },
      { text: 'Набір виделок', correct: false },
      { text: 'Фартух з написом «Master Chef»', correct: false },
    ],
    contexts: [
      { text: 'Гурманський вечір', correct: true },
      { text: 'Швидкий перекус', correct: false },
      { text: 'Дієта', correct: false },
    ],
    features: [
      { text: 'BNPL розстрочка', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Мінімальний чек', correct: false },
    ],
    successMessage: 'Вечеря як у Мішлен! Вона в захваті від стейка 🥩',
    errorMessage: 'Фартух та виделки не готують... ми замовили піцу.',
  },
  {
    id: 17,
    name: 'Ілона',
    age: '42 роки',
    story: 'Ми разом вже 20 років. Хочу повернути той час, коли ми слухали платівки і гуляли до ранку.',
    objects: [
      { text: 'Вініловий програвач', correct: true },
      { text: 'Навушники-вкладиші', correct: false },
      { text: 'Радіоприймач', correct: false },
    ],
    contexts: [
      { text: 'Ностальгічний вечір', correct: true },
      { text: 'Блекаут', correct: false },
      { text: 'Прогулянка в лісі', correct: false },
    ],
    features: [
      { text: 'BNPL розстрочка', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Kasta Premium', correct: false },
    ],
    successMessage: 'Мелодія кохання зазвучала знову! ❤️🎶',
    errorMessage: 'Сучасні гаджети — це не про душу...',
  },
  {
    id: 18,
    name: 'Саша',
    age: '28 років',
    story: 'Наш єдиний Валентин зараз — це 8-місячний син, який не дає спати. Хочу трохи тиші та затишку для Саші.',
    objects: [
      { text: 'Набір преміум догляду за обличчя та тілом', correct: true },
      { text: 'Дитячий комбінезон', correct: false },
      { text: 'Блендер для пюре', correct: false },
    ],
    contexts: [
      { text: '15 хвилин спокою', correct: true },
      { text: 'Прогулянка в парку', correct: false },
      { text: 'Годування малюка', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Швидка доставка', correct: false },
      { text: 'Kasta Premium', correct: false },
    ],
    successMessage: 'Мама відпочила — вся сім\'я щаслива! 🛀✨',
    errorMessage: 'Знову подарунок для дитини... а де ж я?',
  },
  {
    id: 19,
    name: 'Максим',
    age: '28 років',
    story: 'Кожні вихідні ми десь: то в горах, то в наметі під Києвом. Хочу подарувати щось, що зробить наш ранок у лісі не таким «диким».',
    objects: [
      { text: 'Портативна кавоварка або термокружка', correct: true },
      { text: 'Паперові стаканчики', correct: false },
      { text: 'Чайник для плити', correct: false },
    ],
    contexts: [
      { text: 'Світанок у горах', correct: true },
      { text: 'Сніданок вдома', correct: false },
      { text: 'Черга на заправці', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Доставка Укрпоштою', correct: false },
      { text: 'Громіздке пакування', correct: false },
    ],
    successMessage: 'Кава з краєвидом — це 10/10! Макс — герой ранку ☕️⛰',
    errorMessage: 'Кава холодна, настрій теж. Спробуй ще раз.',
  },
  {
    id: 20,
    name: 'Катерина',
    age: '40 років',
    story: 'Чоловік кличе в похід, а я люблю готелі. Треба знайти компроміс, щоб я не прокляла цей «відпочинок» після першої ж ночі.',
    objects: [
      { text: 'Надувна подушка під шию + маска для сну', correct: true },
      { text: 'Килимок-пінка (каремат)', correct: false },
      { text: 'Спальник на -20°C', correct: false },
    ],
    contexts: [
      { text: 'Переїзд у комфорті', correct: true },
      { text: 'Виживання в дикій природі', correct: false },
      { text: 'Ранкова руханка', correct: false },
    ],
    features: [
      { text: 'З KVC', correct: true },
      { text: 'Оплата готівкою', correct: false },
      { text: 'Великий бюджет', correct: false },
    ],
    successMessage: 'Навіть у наметі як у 5 зірках! Дякуємо Kasta ☁️💤',
    errorMessage: 'Шия болить, настрою немає. Похід зіпсовано.',
  },
];

export default function GameScreen() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback'>('intro');
  const [clients, setClients] = useState<Client[]>([]);
  const [currentClientIndex, setCurrentClientIndex] = useState(0);
  const [selectedObject, setSelectedObject] = useState<string>('');
  const [selectedContext, setSelectedContext] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(150);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const maxRounds = 5;

  useEffect(() => {
    // Shuffle and select random clients
    const shuffled = [...allClients].sort(() => Math.random() - 0.5);
    setClients(shuffled.slice(0, maxRounds));
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp();
    }
  }, [timeLeft, gameState]);

  const handleTimeUp = () => {
    localStorage.setItem('finalScore', score.toString());
    navigate('/test');
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(150);
  };

  const handleSubmit = () => {
    if (!selectedObject || !selectedContext || !selectedFeature) return;

    const currentClient = clients[currentClientIndex];
    const isObjectCorrect = currentClient.objects.find(o => o.text === selectedObject)?.correct;
    const isContextCorrect = currentClient.contexts.find(c => c.text === selectedContext)?.correct;
    const isFeatureCorrect = currentClient.features.find(f => f.text === selectedFeature)?.correct;

    if (isObjectCorrect && isContextCorrect && isFeatureCorrect) {
      setScore(score + 10);
      setFeedback('success');
    } else {
      setFeedback('error');
    }

    setGameState('feedback');

    setTimeout(() => {
      if (currentClientIndex < clients.length - 1) {
        setCurrentClientIndex(currentClientIndex + 1);
        setSelectedObject('');
        setSelectedContext('');
        setSelectedFeature('');
        setGameState('playing');
        setFeedback(null);
        setRoundsPlayed(roundsPlayed + 1);
      } else {
        localStorage.setItem('finalScore', score.toString());
        navigate('/test');
      }
    }, 2000);
  };

  if (gameState === 'intro') {
    return (
      <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full"
        >
          <Card className="p-8 bg-white/90 backdrop-blur-xl border-2 border-purple-200">
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-3"
              >
                <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Майстерність АІ-Купідона
              </h2>
              <p className="text-xs text-purple-600 font-semibold mb-3">Valentine Comedy & Drama</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-5 mb-6 border border-pink-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                Ключик до серця лежить через "той самий" ідеальний подарунок. 
                У тебе є <span className="font-bold text-purple-600">150 секунд (30 сек на клієнта)</span> на 5 клієнтів, 
                щоб підібрати ідеальні складові для AI-запиту: 
                <span className="font-bold"> подарунок, контекст і фішку</span>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">1</div>
                <div className="text-xs">
                  <div className="font-semibold text-gray-800">Подарунок</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">2</div>
                <div className="text-xs">
                  <div className="font-semibold text-gray-800">Контекст</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">3</div>
                <div className="text-xs">
                  <div className="font-semibold text-gray-800">Фішка</div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleStartGame}
              className="w-full py-5 text-base bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-xl"
            >
              <Zap className="w-4 h-4 mr-2" />
              Почати челендж!
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (clients.length === 0) return null;
  const currentClient = clients[currentClientIndex];

  return (
    <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-3">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-xl p-3 mb-3 border border-purple-200 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-600">Клієнт {currentClientIndex + 1}/{maxRounds}</div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span className="text-lg font-bold text-gray-800">{score}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timeLeft <= 30 ? 'text-red-500' : 'text-blue-500'}`} />
              <span className={`text-lg font-bold ${timeLeft <= 30 ? 'text-red-500' : 'text-gray-800'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          <Progress value={(timeLeft / 150) * 100} className="h-1.5" />
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-3 p-3 rounded-xl ${
                feedback === 'success'
                  ? 'bg-green-100 border border-green-400'
                  : 'bg-red-100 border border-red-400'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <p className={`text-sm font-semibold ${
                  feedback === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {feedback === 'success' ? currentClient.successMessage : currentClient.errorMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-3">
          {/* Client Story */}
          <div className="col-span-1">
            <Card className="p-4 bg-white/90 backdrop-blur-xl border-2 border-purple-200 h-full">
              <div className="mb-3">
                <div className="text-xl font-bold text-gray-800">{currentClient.name}</div>
                <div className="text-xs text-gray-500">{currentClient.age}</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-700 leading-relaxed italic">
                  "{currentClient.story}"
                </p>
              </div>

              {/* Selected Constructor */}
              <div className="space-y-2 mb-4">
                <div className={`p-2.5 rounded-lg border-2 ${
                  selectedObject
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 border-transparent'
                    : 'bg-gray-50 border-dashed border-gray-300'
                }`}>
                  {selectedObject ? (
                    <div>
                      <div className="text-[10px] font-semibold text-white/80 mb-0.5">Подарунок</div>
                      <div className="text-xs text-white font-semibold">{selectedObject}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 text-center">Обери подарунок</div>
                  )}
                </div>

                <div className={`p-2.5 rounded-lg border-2 ${
                  selectedContext
                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 border-transparent'
                    : 'bg-gray-50 border-dashed border-gray-300'
                }`}>
                  {selectedContext ? (
                    <div>
                      <div className="text-[10px] font-semibold text-white/80 mb-0.5">Контекст</div>
                      <div className="text-xs text-white font-semibold">{selectedContext}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 text-center">Обери контекст</div>
                  )}
                </div>

                <div className={`p-2.5 rounded-lg border-2 ${
                  selectedFeature
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent'
                    : 'bg-gray-50 border-dashed border-gray-300'
                }`}>
                  {selectedFeature ? (
                    <div>
                      <div className="text-[10px] font-semibold text-white/80 mb-0.5">Фішка</div>
                      <div className="text-xs text-white font-semibold">{selectedFeature}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 text-center">Обери фішку</div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!selectedObject || !selectedContext || !selectedFeature}
                className="w-full py-4 text-sm bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50"
              >
                Відправити запит
              </Button>
            </Card>
          </div>

          {/* Options */}
          <div className="col-span-2 space-y-2.5">
            {/* Objects */}
            <div>
              <h4 className="text-xs font-bold text-pink-600 mb-2 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
                Подарунки
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {currentClient.objects.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedObject(option.text)}
                    className={`p-3 rounded-lg text-xs font-semibold transition-all ${
                      selectedObject === option.text
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                        : 'bg-white text-gray-800 border border-pink-200 hover:bg-pink-50'
                    }`}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Contexts */}
            <div>
              <h4 className="text-xs font-bold text-purple-600 mb-2 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500" />
                Контексти
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {currentClient.contexts.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedContext(option.text)}
                    className={`p-3 rounded-lg text-xs font-semibold transition-all ${
                      selectedContext === option.text
                        ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-md'
                        : 'bg-white text-gray-800 border border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xs font-bold text-blue-600 mb-2 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                Фішки
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {currentClient.features.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFeature(option.text)}
                    className={`p-3 rounded-lg text-xs font-semibold transition-all ${
                      selectedFeature === option.text
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                        : 'bg-white text-gray-800 border border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
