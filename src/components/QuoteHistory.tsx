import React from 'react';
import { History, Trash2 } from 'lucide-react';
import type { Quote } from '../types';

interface QuoteHistoryProps {
  quotes: Array<{ quote: Quote; mood: string; timestamp: number }>;
  onSelect: (quote: Quote, mood: string) => void;
  onClear: () => void;
}

export function QuoteHistory({ quotes, onSelect, onClear }: QuoteHistoryProps) {
  if (quotes.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold">Quote History</h2>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear History
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotes.map(({ quote, mood, timestamp }, index) => (
          <div
            key={timestamp}
            onClick={() => onSelect(quote, mood)}
            className="cursor-pointer p-4 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <p className="text-gray-300 text-sm mb-2">"{quote.text}"</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">- {quote.author}</span>
              <span className="text-purple-400 capitalize">{mood}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}