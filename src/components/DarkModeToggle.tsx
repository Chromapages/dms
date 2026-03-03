"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-text-primary/10 transition-colors group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              <Sun className="w-5 h-5 text-accent" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              <Moon className="w-5 h-5 text-text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle hover ring */}
      <span className="absolute inset-0 rounded-full border border-accent/0 scale-0 group-hover:scale-100 group-hover:border-accent/20 transition-transform duration-300" />
    </button>
  );
}
