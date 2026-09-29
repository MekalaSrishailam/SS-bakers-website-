import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import { X, Mic, MicOff, Sparkles, Check, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface VoiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const VoiceOrderModal: React.FC<VoiceOrderModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { products, addToCart, addNotification } = useBakery();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedItems, setDetectedItems] = useState<{ product: any; quantity: number }[]>([]);

  const samplePhrases = [
    'Add 2 San Francisco Country Sourdoughs and 1 Butter Croissant',
    'I want 2 Dark Chocolate Velvet Gateau slices',
    'Add 3 Rosemary Focaccias and 2 Cold Brews'
  ];

  const parseVoiceText = (text: string) => {
    const lower = text.toLowerCase();
    const found: { product: any; quantity: number }[] = [];

    products.forEach(p => {
      const titleLower = p.title.toLowerCase();
      // Look for match
      const keywords = titleLower.split(' ');
      const match = keywords.some(kw => kw.length > 3 && lower.includes(kw));

      if (match) {
        // Look for preceding number
        let qty = 1;
        const regex = new RegExp(`(\\d+|two|three|four|five|six|one|a|an)\\s+(?:pieces?\\s+of\\s+)?(?:${keywords[0]}|${p.category})`, 'i');
        const m = lower.match(regex);
        if (m) {
          const word = m[1].toLowerCase();
          const wordNumMap: Record<string, number> = {
            one: 1, a: 1, an: 1, two: 2, three: 3, four: 4, five: 5, six: 6
          };
          qty = parseInt(word, 10) || wordNumMap[word] || 1;
        }
        found.push({ product: p, quantity: qty });
      }
    });

    setDetectedItems(found);
  };

  const handleSimulatePhrase = (phrase: string) => {
    setTranscript(phrase);
    parseVoiceText(phrase);
  };

  const handleToggleVoice = () => {
    if (!isListening) {
      setIsListening(true);
      // Try Web Speech API if supported
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const text = event.results[current][0].transcript;
            setTranscript(text);
            parseVoiceText(text);
          };

          recognition.onerror = () => {
            setIsListening(false);
          };

          recognition.onend = () => {
            setIsListening(false);
          };

          recognition.start();
        } catch (e) {
          // Fallback simulation
          simulateVoiceSpeech();
        }
      } else {
        simulateVoiceSpeech();
      }
    } else {
      setIsListening(false);
    }
  };

  const simulateVoiceSpeech = () => {
    setTimeout(() => {
      const phrase = samplePhrases[0];
      setTranscript(phrase);
      parseVoiceText(phrase);
      setIsListening(false);
    }, 1800);
  };

  const handleAddAllDetected = () => {
    if (detectedItems.length === 0) return;
    detectedItems.forEach(item => {
      addToCart(item.product, item.quantity);
    });
    addNotification('success', 'Voice Items Added', `Added ${detectedItems.length} items to your bakery bag.`);
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="relative inline-block mb-3">
            <button
              onClick={handleToggleVoice}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-amber-600 text-white shadow-lg ring-8 ring-amber-200 dark:ring-amber-900/50 animate-pulse'
                  : 'bg-amber-900 dark:bg-amber-700 text-white hover:bg-amber-950'
              }`}
            >
              {isListening ? <Mic className="w-8 h-8" /> : <Mic className="w-7 h-7" />}
            </button>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-amber-950 dark:text-stone-100">
            Voice Rapid Order
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
            {isListening
              ? 'Listening... Speak your order naturally'
              : 'Tap the microphone or choose a voice prompt below'}
          </p>
        </div>

        {/* Live Transcript Display */}
        <div className="mt-5 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 min-h-[70px] flex items-center justify-center text-center">
          {transcript ? (
            <p className="text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 italic">
              "{transcript}"
            </p>
          ) : (
            <p className="text-xs text-stone-400">
              Speak e.g. "Add 2 sourdough loaves and 1 chocolate cake"
            </p>
          )}
        </div>

        {/* Quick Sample Prompts */}
        <div className="mt-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block mb-1.5">
            Quick Voice Simulation Presets:
          </span>
          <div className="space-y-1.5">
            {samplePhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => handleSimulatePhrase(phrase)}
                className="w-full text-left p-2 rounded-xl text-xs bg-amber-50/50 dark:bg-stone-800 hover:bg-amber-100/60 dark:hover:bg-stone-700 text-amber-950 dark:text-amber-200 border border-amber-900/5 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="truncate">{phrase}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Parsed / Detected Items */}
        {detectedItems.length > 0 && (
          <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-2">
              Recognized Bakery Items ({detectedItems.length})
            </span>
            <div className="space-y-2">
              {detectedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono-numbers px-2 py-0.5 bg-amber-100 dark:bg-stone-700 text-amber-950 dark:text-amber-200 rounded font-bold">
                      {item.quantity}x
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {item.product.title}
                    </span>
                  </div>
                  <span className="font-mono-numbers text-stone-600 dark:text-stone-400">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddAllDetected}
              className="mt-4 w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 cursor-pointer"
              style={{
                backgroundColor: 'var(--cta-caramel)',
                color: 'var(--cta-text, #3D2314)'
              }}
            >
              <Check className="w-4 h-4" style={{ color: 'var(--cta-text, #3D2314)' }} />
              <span>Confirm & Add Recognized Items to Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
