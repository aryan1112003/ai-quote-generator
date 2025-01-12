import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, Copy, Check } from 'lucide-react';
import type { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
  mood: string;
}

export function QuoteCard({ quote, mood }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = 'quote.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const shareQuote = async () => {
    const text = `"${quote.text}" - ${quote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspiring Quote',
          text: text,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Quote copied to clipboard!');
    }
  };

  const copyToClipboard = async () => {
    const text = `"${quote.text}" - ${quote.author}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full max-w-2xl p-8 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-500 ${
        getMoodBackground(mood)
      }`}
    >
      <div className="relative z-10">
        <blockquote className="text-xl md:text-2xl font-serif mb-4 text-white">
          "{quote.text}"
        </blockquote>
        <cite className="block text-base md:text-lg text-white/90">- {quote.author}</cite>
      </div>
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <Copy className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={downloadImage}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          title="Download as image"
        >
          <Download className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={shareQuote}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          title="Share quote"
        >
          <Share2 className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

function getMoodBackground(mood: string): string {
  const backgrounds = {
    happy: 'bg-gradient-to-br from-yellow-400/80 to-orange-500/80',
    relaxed: 'bg-gradient-to-br from-blue-400/80 to-purple-500/80',
    motivated: 'bg-gradient-to-br from-red-500/80 to-pink-500/80',
    creative: 'bg-gradient-to-br from-green-400/80 to-teal-500/80',
    funny: 'bg-gradient-to-br from-pink-400/80 to-purple-500/80'
  };
  return backgrounds[mood as keyof typeof backgrounds] || backgrounds.motivated;
}