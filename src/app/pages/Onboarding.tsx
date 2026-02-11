import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Onboarding() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem('playerName', name);
      localStorage.setItem('gameStarted', 'true');
      navigate('/game');
    }
  };

  return (
    <div className="size-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center overflow-hidden relative">
      {/* Animated 3D Hearts Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -100,
              scale: 0.4 + Math.random() * 0.4,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: 360 + Math.random() * 360,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <div className="relative">
              <Heart 
                className="w-10 h-10 text-pink-400 fill-pink-400 opacity-20"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3))',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  K
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl mx-auto p-6"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-pink-200">
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-5"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center transform rotate-12">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Kasta AI Matchmaker
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-gray-700 mb-1.5 text-center font-semibold"
          >
            Шлях Kasta AI Matchmaker
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 mb-6 border border-pink-200"
          >
            <p className="text-sm text-gray-700 leading-relaxed text-center">
              На маркетплейсі ажіотаж: мільйони сердець шукають подарунки, 
              а сервери Купідонів димляться від навантаження. Ми розширюємо 
              команду AI-Купідонів. Твоя місія: приборкати нейромережі та 
              врятувати свято за лічені секунди. Час довести свою любов 
              ділом і зробити <span className="font-bold text-purple-600">ЩЕ більше дива!</span>
            </p>
          </motion.div>

          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-5"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
              Представся, AI-Купідоне:
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Твоє ім'я"
              className="text-center text-base py-5 border-2 border-pink-300 focus:border-purple-500 rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            />
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={handleStart}
              disabled={!name.trim()}
              className="w-full py-5 text-base bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Heart className="w-4 h-4 mr-2 fill-white" />
              Довести свою любов ділом
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}