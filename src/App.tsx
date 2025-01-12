import React, { useState, useEffect } from 'react';
import { Quote, Loader, Sparkles } from 'lucide-react';
import { generateQuote } from './utils/gemini';
import { QuoteCard } from './components/QuoteCard';
import { QuoteHistory } from './components/QuoteHistory';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { Mood, Quote as QuoteType } from './types';

const moods: { id: Mood; label: string; }[] = [
  { id: 'happy', label: 'Happy' },
  { id: 'relaxed', label: 'Relaxed' },
  { id: 'motivated', label: 'Motivated' },
  { id: 'creative', label: 'Creative' },
  { id: 'funny', label: 'Funny' }
];

function App() {
  const [selectedMood, setSelectedMood] = useState<Mood>('motivated');
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ quote: QuoteType; mood: string; timestamp: number }>>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('quoteHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleGenerateQuote = async () => {
    setLoading(true);
    try {
      const newQuote = await generateQuote(selectedMood);
      setQuote(newQuote);
      const historyItem = { quote: newQuote, mood: selectedMood, timestamp: Date.now() };
      const updatedHistory = [historyItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('quoteHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('quoteHistory');
  };

  const selectFromHistory = (historyQuote: QuoteType, historyMood: string) => {
    setQuote(historyQuote);
    setSelectedMood(historyMood as Mood);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <Header />

        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedMood === mood.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerateQuote}
            disabled={loading}
            className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Quote className="w-5 h-5" />
                <span>Generate Quote</span>
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </button>
        </div>

        {quote && (
          <div className="flex justify-center mb-12">
            <QuoteCard
              quote={quote}
              mood={selectedMood}
            />
          </div>
        )}

        <QuoteHistory
          quotes={history}
          onSelect={selectFromHistory}
          onClear={clearHistory}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;