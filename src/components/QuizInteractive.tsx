import React, { useState } from 'react';
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { SlideItem } from '../data/slidesData';
import { useTheme } from '../context/ThemeContext';

interface QuizInteractiveProps {
  slide: SlideItem;
}

export const QuizInteractive: React.FC<QuizInteractiveProps> = ({ slide }) => {
  const { isDark, currentTheme } = useTheme();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showPattern, setShowPattern] = useState<boolean>(false);
  const [revealedSingle, setRevealedSingle] = useState<Record<number, boolean>>({});

  const questions = slide.verificationQuestions || [];

  const handleSelect = (questionId: number, optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const toggleSingleReveal = (qId: number) => {
    setRevealedSingle((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}
      >
        <div>
          <h3 className={`font-semibold text-base ${currentTheme.accentText}`}>
            Cuestionario Diagnóstico de Análisis Crítico
          </h3>
          <p className="text-xs text-slate-400">
            4 reactivos conceptuales diseñados para evaluar comprensión profunda y desterrar falacias habituales.
          </p>
        </div>
        <button
          onClick={() => setShowPattern(!showPattern)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white transition-colors ${
            showPattern
              ? 'bg-amber-600 hover:bg-amber-500'
              : `${currentTheme.primaryBg} ${currentTheme.primaryHover}`
          }`}
        >
          {showPattern ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPattern ? 'Ocultar Patrón de Corrección' : 'Revelar Patrón de Corrección Completo'}
        </button>
      </div>

      <div className="space-y-5">
        {questions.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isRevealed = showPattern || revealedSingle[q.id];
          const isCorrect = selected === q.correctKey;

          let cardStyle = isDark
            ? 'bg-slate-900/70 border-slate-800'
            : 'bg-white border-slate-200 shadow-sm';

          if (isRevealed) {
            if (isCorrect) {
              cardStyle = isDark
                ? 'bg-slate-900/90 border-emerald-500/50'
                : 'bg-emerald-50/50 border-emerald-300 shadow-sm';
            } else {
              cardStyle = isDark
                ? 'bg-slate-900/90 border-amber-500/40'
                : 'bg-amber-50/40 border-amber-300 shadow-sm';
            }
          }

          return (
            <div key={q.id} className={`p-5 rounded-xl border transition-all ${cardStyle}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full font-mono text-xs font-bold shrink-0 mt-0.5 border ${
                      isDark
                        ? `${currentTheme.subtleBg} ${currentTheme.primaryText} ${currentTheme.borderLight}`
                        : `${currentTheme.subtleBg} ${currentTheme.primaryText} ${currentTheme.borderLight}`
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <p
                    className={`font-medium text-sm leading-relaxed ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {q.question}
                  </p>
                </div>
                <button
                  onClick={() => toggleSingleReveal(q.id)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 underline decoration-dotted"
                >
                  {isRevealed ? 'Ocultar' : 'Revisar'}
                </button>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-2.5 mt-4 ml-8">
                {q.options.map((opt) => {
                  const isThisSelected = selected === opt.key;
                  const isThisCorrect = opt.key === q.correctKey;

                  let optionStyle = isDark
                    ? 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (isRevealed) {
                    if (isThisCorrect) {
                      optionStyle = isDark
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = isDark
                        ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                        : 'bg-rose-50 border-rose-300 text-rose-800';
                    }
                  } else if (isThisSelected) {
                    optionStyle = isDark
                      ? `${currentTheme.subtleBg} border-indigo-500 ${currentTheme.accentText}`
                      : `${currentTheme.subtleBg} border-indigo-500 text-slate-900 font-medium`;
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(q.id, opt.key)}
                      className={`flex items-start gap-3 p-3 text-left rounded-lg border text-xs leading-relaxed transition-all ${optionStyle}`}
                    >
                      <span className="font-mono font-bold shrink-0">{opt.key})</span>
                      <span className="flex-1">{opt.text}</span>
                      {isRevealed && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {isRevealed && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Revealed Rubric and Explanation */}
              {isRevealed && (
                <div
                  className={`mt-4 pt-3 border-t ml-8 space-y-2 text-xs ${
                    isDark ? 'border-slate-800/80' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Patrón de Respuesta Oficial: Opción {q.correctKey}</span>
                  </div>
                  <div
                    className={`p-3 rounded-lg border space-y-1.5 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <p>
                      <strong className={`font-semibold ${currentTheme.accentText}`}>
                        Sustentación Analítica:
                      </strong>{' '}
                      {q.rigorousExplanation}
                    </p>
                    <p className={isDark ? 'text-amber-300/90' : 'text-amber-800'}>
                      <strong className="font-semibold text-amber-500">
                        Preconcepción Errónea Típica:
                      </strong>{' '}
                      {q.commonMisconception}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
