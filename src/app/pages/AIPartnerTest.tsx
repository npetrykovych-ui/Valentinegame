import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Brain, MessageSquare, FileSpreadsheet, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Як ти вирішуєш складні завдання?',
    options: [
      { text: 'Аналізую дані та шукаю патерни', value: 'copilot' },
      { text: 'Питаю пораду у експертів', value: 'chatgpt' },
      { text: 'Перевіряю формули та розрахунки', value: 'excel' },
      { text: 'Генерую нові ідеї та експериментую', value: 'dalle' },
    ],
  },
  {
    id: 2,
    question: 'Твій ідеальний робочий день виглядає як:',
    options: [
      { text: 'Кодинг та автоматизація процесів', value: 'copilot' },
      { text: 'Креативні брейнштормінги', value: 'chatgpt' },
      { text: 'Робота з великими даними', value: 'excel' },
      { text: 'Створення візуального контенту', value: 'dalle' },
    ],
  },
  {
    id: 3,
    question: 'Що тебе найбільше мотивує?',
    options: [
      { text: 'Оптимізація та ефективність', value: 'copilot' },
      { text: 'Спілкування та обмін ідеями', value: 'chatgpt' },
      { text: 'Точність та структурованість', value: 'excel' },
      { text: 'Краса та естетика', value: 'dalle' },
    ],
  },
  {
    id: 4,
    question: 'Як ти відпочиваєш після роботи?',
    options: [
      { text: 'Читаю технічні статті', value: 'copilot' },
      { text: 'Спілкуюся з друзями', value: 'chatgpt' },
      { text: 'Організовую свої справи', value: 'excel' },
      { text: 'Малюю або переглядаю арт', value: 'dalle' },
    ],
  },
];

interface AIPartner {
  type: string;
  name: string;
  emoji: string;
  description: string;
  prediction: string;
  icon: any;
  gradient: string;
}

const aiPartners: Record<string, AIPartner> = {
  copilot: {
    type: 'copilot',
    name: 'GitHub Copilot',
    emoji: '🤖',
    description: 'Ти - технічний генік! Любиш автоматизацію, оптимізацію та ефективність. Copilot стане твоїм ідеальним помічником у кодингу.',
    prediction: 'У 2026 році ти створиш інноваційний проєкт, який змінить підхід до роботи всієї команди!',
    icon: Zap,
    gradient: 'from-cyan-500 to-blue-600',
  },
  chatgpt: {
    type: 'chatgpt',
    name: 'ChatGPT',
    emoji: '💬',
    description: 'Ти - комунікатор і креативна душа! Любиш генерувати ідеї, спілкуватись та вирішувати нестандартні завдання.',
    prediction: 'Цього року твої ідеї надихнуть команду на нові досягнення та проривні рішення!',
    icon: MessageSquare,
    gradient: 'from-green-500 to-emerald-600',
  },
  excel: {
    type: 'excel',
    name: 'Excel-оракул',
    emoji: '📊',
    description: 'Ти - майстер структури та аналітики! Любиш порядок, точність та роботу з даними. Excel - твоя суперсила!',
    prediction: 'У 2026 ти станеш експертом, до якого звертаються за найскладнішими аналітичними задачами!',
    icon: FileSpreadsheet,
    gradient: 'from-green-600 to-teal-600',
  },
  dalle: {
    type: 'dalle',
    name: 'DALL-E Creator',
    emoji: '🎨',
    description: 'Ти - візіонер і творець! Любиш естетику, креатив та візуальне мислення. DALL-E допоможе втілити твої найсміливіші ідеї!',
    prediction: 'Твоя креативність у 2026 створить вражаючі візуальні проєкти, які захоплять всіх!',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-600',
  },
};

export default function AIPartnerTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<AIPartner | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('');

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: string[]) => {
    const counts: Record<string, number> = {};
    allAnswers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    setResult(aiPartners[winner]);
    localStorage.setItem('aiPartner', winner);
  };

  const handleContinue = () => {
    if (selectedTool) {
      localStorage.setItem('selectedTool', selectedTool);
      navigate('/results');
    }
  };

  if (result) {
    const Icon = result.icon;
    
    return (
      <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 bg-white/90 backdrop-blur-xl border-2 border-purple-200">
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", duration: 1 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${result.gradient} mb-4`}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Твоя AI-ідеальна пара
                </h2>
                <div className="text-5xl mb-3">{result.emoji}</div>
                <h3 className={`text-2xl font-bold mb-5 bg-gradient-to-r ${result.gradient} bg-clip-text text-transparent`}>
                  {result.name}
                </h3>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-6"
            >
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-purple-600" />
                  Про тебе
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.description}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Передбачення на 2026
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.prediction}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <h4 className="font-bold text-gray-800 text-center mb-3 text-sm">
                Обери свій AI-інструмент для старту:
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedTool('Copilot')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTool === 'Copilot'
                      ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-cyan-300'
                  }`}
                >
                  <Zap className={`w-7 h-7 mx-auto mb-2 ${selectedTool === 'Copilot' ? 'text-cyan-600' : 'text-gray-400'}`} />
                  <div className="font-semibold text-gray-800 text-sm">Copilot</div>
                </button>

                <button
                  onClick={() => setSelectedTool('ChatGPT')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTool === 'ChatGPT'
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-green-300'
                  }`}
                >
                  <MessageSquare className={`w-7 h-7 mx-auto mb-2 ${selectedTool === 'ChatGPT' ? 'text-green-600' : 'text-gray-400'}`} />
                  <div className="font-semibold text-gray-800 text-sm">ChatGPT</div>
                </button>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!selectedTool}
                className={`w-full py-5 text-base bg-gradient-to-r ${result.gradient} hover:opacity-90 text-white rounded-xl disabled:opacity-50`}
              >
                Обіцяю спробувати! 💫
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <Card className="p-8 bg-white/90 backdrop-blur-xl border-2 border-purple-200">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-600">
                Питання {currentQuestion + 1} з {questions.length}
              </span>
              <span className="text-xs font-semibold text-purple-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              {question.question}
            </h3>

            <div className="space-y-2.5">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-4 text-left rounded-xl border-2 border-purple-200 bg-white hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:border-purple-400 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform shrink-0">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-semibold text-gray-800 flex-1 text-sm">
                      {option.text}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}