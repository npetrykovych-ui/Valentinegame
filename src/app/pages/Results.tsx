import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  Heart, 
  Download, 
  Copy, 
  Trophy, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  Award,
  Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import html2canvas from 'html2canvas';

export default function Results() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [aiPartner, setAiPartner] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [copied, setCopied] = useState(false);
  const valentineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = localStorage.getItem('playerName') || 'AI-Купідон';
    const finalScore = localStorage.getItem('finalScore') || '0';
    const partner = localStorage.getItem('aiPartner') || 'chatgpt';
    const tool = localStorage.getItem('selectedTool') || 'ChatGPT';
    
    setPlayerName(name);
    setScore(parseInt(finalScore));
    setAiPartner(partner);
    setSelectedTool(tool);
  }, []);

  const handleDownload = async () => {
    if (valentineRef.current) {
      const canvas = await html2canvas(valentineRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `kasta-valentine-${playerName}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleCopy = () => {
    const text = `🎉 Я — ${playerName}, AI-Купідон Kasta!\n💯 Мій рахунок: ${score}\n💝 Моя AI-пара: ${getPartnerName()}\n✨ Обрав інструмент: ${selectedTool}\n\n#KastaAIMatchmaker #SuperAppLove`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestart = () => {
    localStorage.removeItem('gameStarted');
    navigate('/');
  };

  const getPartnerName = () => {
    const names: Record<string, string> = {
      copilot: 'GitHub Copilot',
      chatgpt: 'ChatGPT',
      excel: 'Excel-оракул',
      dalle: 'DALL-E Creator',
    };
    return names[aiPartner] || 'ChatGPT';
  };

  const getPartnerEmoji = () => {
    const emojis: Record<string, string> = {
      copilot: '🤖',
      chatgpt: '💬',
      excel: '📊',
      dalle: '🎨',
    };
    return emojis[aiPartner] || '💬';
  };

  const getRank = () => {
    if (score >= 40) return { title: 'AI-Легенда', color: 'from-yellow-400 to-orange-500', icon: '👑' };
    if (score >= 30) return { title: 'AI-Майстер', color: 'from-purple-400 to-pink-500', icon: '⭐' };
    if (score >= 20) return { title: 'AI-Експерт', color: 'from-blue-400 to-cyan-500', icon: '💎' };
    return { title: 'AI-Новачок', color: 'from-green-400 to-emerald-500', icon: '🌟' };
  };

  const getValentineMessage = () => {
    const messages = [
      {
        condition: score >= 40,
        text: 'Твої навички AI-матчмейкінгу — легендарні! Ти майстер контексту, який знає, що кожна деталь має значення. Разом ми зробили неймовірне — допомогли десяткам клієнтів знайти ідеальні подарунки!'
      },
      {
        condition: score >= 30,
        text: 'Ти — справжній AI-майстер! Твої рішення точні, а інтуїція — бездоганна. Кожен клієнт отримав подарунок мрії завдяки твоєму таланту розуміти контекст та потреби!'
      },
      {
        condition: score >= 20,
        text: 'Твій рівень AI-експертизи вражає! Ти знаєш, як підібрати правильний подарунок у правильний момент. Разом ми створили магію романтики для багатьох пар!'
      },
      {
        condition: true,
        text: 'Це тільки початок твоєї AI-подорожі! Кожен новий виклик робить тебе сильнішим. Продовжуй вчитися, і скоро ти станеш справжньою легендою AI-матчмейкінгу!'
      }
    ];
    return messages.find(m => m.condition)?.text || messages[messages.length - 1].text;
  };

  const rank = getRank();

  return (
    <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-2"
          >
            <Trophy className="w-12 h-12 text-yellow-500 fill-yellow-500" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Вітаємо, {playerName}! 🎉
          </h1>
          <p className="text-sm text-gray-700">
            Ти — справжній AI Купідон, який відчуває контекст і дбає про деталі!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 bg-white/90 backdrop-blur-xl border-2 border-pink-200 text-center">
              <div className="text-3xl mb-1">💯</div>
              <div className="text-2xl font-bold text-pink-600 mb-1">{score}</div>
              <div className="text-xs text-gray-600">Балів зароблено</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 bg-white/90 backdrop-blur-xl border-2 border-purple-200 text-center">
              <div className="text-3xl mb-1">{rank.icon}</div>
              <div className={`text-lg font-bold bg-gradient-to-r ${rank.color} bg-clip-text text-transparent mb-1`}>
                {rank.title}
              </div>
              <div className="text-xs text-gray-600">Твій ранг</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 bg-white/90 backdrop-blur-xl border-2 border-blue-200 text-center">
              <div className="text-3xl mb-1">{getPartnerEmoji()}</div>
              <div className="text-base font-bold text-blue-600 mb-1">{getPartnerName()}</div>
              <div className="text-xs text-gray-600">Твоя AI-пара</div>
            </Card>
          </motion.div>
        </div>

        {/* Valentine Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <div
            ref={valentineRef}
            className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-2xl p-6 border-4 border-pink-300 shadow-2xl relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(15)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-pink-500 fill-pink-500"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${15 + Math.random() * 25}px`,
                    height: `${15 + Math.random() * 25}px`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Valentine Content */}
            <div className="relative z-10 text-center">
              <div className="mb-3">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mb-2 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Офіційна Валентинка 💝
              </h2>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 mb-4 max-w-2xl mx-auto shadow-lg border-2 border-pink-200">
                <p className="text-xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-2">
                  "{playerName}"
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {getValentineMessage()}
                </p>
                <div className="flex items-center justify-center gap-2 text-pink-600 font-bold text-lg">
                  <Sparkles className="w-5 h-5" />
                  <span>superApp Love</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Heart className="w-3 h-3 fill-current" />
                <span>Kasta AI Matchmaker 2026</span>
                <Heart className="w-3 h-3 fill-current" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleDownload}
              className="w-full py-4 text-sm bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Зберегти валентинку
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleCopy}
              className="w-full py-4 text-sm bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Скопійовано!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Копіювати текст
                </>
              )}
            </Button>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-3 bg-white/90 backdrop-blur-xl border-2 border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs">Стікерпак</h3>
                    <p className="text-[10px] text-gray-600">Для Teams</p>
                  </div>
                </div>
                <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-xs py-2 px-3">
                  <Download className="w-3 h-3 mr-1" />
                  Завантажити
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-3 bg-white/90 backdrop-blur-xl border-2 border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shrink-0">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs">Kasta</h3>
                    <p className="text-[10px] text-gray-600">Ідеальний подарунок</p>
                  </div>
                </div>
                <Button 
                  onClick={() => window.open('https://kasta.ua', '_blank')}
                  size="sm"
                  className="bg-purple-500 hover:bg-purple-600 text-xs py-2 px-3"
                >
                  Відкрити
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-3 text-center"
        >
          <Button
            onClick={handleRestart}
            variant="outline"
            size="sm"
            className="px-6 py-2 border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-xs"
          >
            Пройти знову
          </Button>
        </motion.div>
      </div>
    </div>
  );
}