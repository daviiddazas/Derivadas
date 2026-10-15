import React from 'react';
import { SLIDES_DATA } from '../data/slidesData';
import { X, Download, FileText, Check } from 'lucide-react';
import { generateFullPresentationMarkdown } from '../utils/markdownExporter';
import { useTheme } from '../context/ThemeContext';

interface PresentationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const PresentationDrawer: React.FC<PresentationDrawerProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onSelectSlide,
}) => {
  const { isDark, currentTheme } = useTheme();
  const [copiedAll, setCopiedAll] = React.useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const content = generateFullPresentationMarkdown();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Catedra_Derivadas_Presentacion_Academica_Completa.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyAll = async () => {
    const content = generateFullPresentationMarkdown();
    try {
      await navigator.clipboard.writeText(content);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className={`w-full max-w-xl border-l h-full flex flex-col shadow-2xl transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Drawer Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div>
            <h3 className={`font-semibold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Índice Temático de la Cátedra
            </h3>
            <p className="text-xs text-slate-400">
              10 Diapositivas Estructuradas · Plan de Estudios Universitario
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Export Actions */}
        <div
          className={`p-4 border-b flex items-center gap-3 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <button
            onClick={handleDownload}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg text-white transition-colors ${currentTheme.primaryBg} ${currentTheme.primaryHover}`}
          >
            <Download className="w-4 h-4" />
            Descargar Markdown (.md)
          </button>
          <button
            onClick={handleCopyAll}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
            }`}
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-500" /> : <FileText className="w-4 h-4" />}
            {copiedAll ? '¡Copiado!' : 'Copiar Todo'}
          </button>
        </div>

        {/* Slide List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {SLIDES_DATA.map((s, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isCurrent
                    ? `${currentTheme.subtleBg} ${currentTheme.borderLight} ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } shadow-md`
                    : isDark
                    ? 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? `${currentTheme.primaryBg} text-white`
                      : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s.slideNumber.toString().padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs font-mono block uppercase truncate ${currentTheme.accentText}`}
                  >
                    {s.module}
                  </span>
                  <h4 className="text-sm font-medium leading-snug line-clamp-1">{s.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{s.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
