import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const savedBackground = localStorage.getItem('backgroundIndex') || '0';
    setTheme(savedTheme);
    setBackgroundIndex(parseInt(savedBackground));
    applyTheme(savedTheme);
    applyBackground(parseInt(savedBackground));
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const applyBackground = (index) => {
    const root = document.documentElement;
    root.style.setProperty('--background-image', `url('./assets/bg${index + 1}.jpeg')`);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleBackgroundChange = () => {
    const newIndex = (backgroundIndex + 1) % 3;
    setBackgroundIndex(newIndex);
    localStorage.setItem('backgroundIndex', newIndex.toString());
    applyBackground(newIndex);
  };

  const themes = [
    { 
      value: 'light', 
      icon: Sun, 
      label: 'Light Mode',
      description: 'Warm sunrise colors'
    },
    { 
      value: 'dark', 
      icon: Moon, 
      label: 'Dark Mode',
      description: 'Cool night colors'
    },
    { 
      value: 'background', 
      icon: Monitor, 
      label: 'Background',
      description: 'Cycle backgrounds'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-2">
        <div className="flex gap-1">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isActive = theme === themeOption.value;
            const isBackground = themeOption.value === 'background';
            
            return (
              <motion.button
                key={themeOption.value}
                onClick={() => isBackground ? handleBackgroundChange() : handleThemeChange(themeOption.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative p-3 rounded-xl transition-all duration-300 ease-out group
                  ${isActive && !isBackground
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                    : isBackground && backgroundIndex === 0
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg'
                    : isBackground && backgroundIndex === 1
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                    : isBackground && backgroundIndex === 2
                    ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/20 dark:hover:bg-gray-800/30'
                  }
                `}
                title={`${themeOption.label}: ${themeOption.description}`}
              >
                <Icon size={20} />
                
                {/* Active indicator */}
                {isActive && !isBackground && (
                  <motion.div
                    layoutId="activeTheme"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Background indicator */}
                {isBackground && (
                  <motion.div
                    layoutId="activeBackground"
                    className={`absolute inset-0 rounded-xl -z-10 ${
                      backgroundIndex === 0 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                      backgroundIndex === 1 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                      'bg-gradient-to-r from-purple-400 to-pink-500'
                    }`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Background counter indicator */}
                {isBackground && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                    {backgroundIndex + 1}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
} 