import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="relative w-full py-8 md:py-12 overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Brain className="w-96 h-96 text-purple-400 rotate-12" />
      </div>
      
      <div className="relative z-10 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-8 md:w-12 h-8 md:h-12 text-purple-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              AI Quote Generator
            </h1>
          </div>
          <Sparkles className="hidden md:block w-6 h-6 text-purple-400 animate-pulse" />
        </div>
        <p className="text-base md:text-lg text-gray-400">
          Generate inspiring quotes based on your mood
        </p>
      </div>
    </header>
  );
}