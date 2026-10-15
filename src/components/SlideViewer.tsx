import React, { useState, useEffect } from 'react';
import { SlideItem } from '../data/slidesData';
import { MathView } from './MathView';
import { InteractiveGraph } from './InteractiveGraph';
import { QuizInteractive } from './QuizInteractive';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Check, 
  Copy, 
  Maximize2, 
  Minimize2, 
  GraduationCap,
  ExternalLink,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  Compass,
  Pencil,
  ArrowRight,
  BrainCircuit,
  Lock,
  Unlock
} from 'lucide-react';

interface SlideViewerProps {
  slide: SlideItem;
  totalSlides: number;
  currentSlideIndex: number;
  onNavigate: (index: number) => void;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  onCopyMarkdown: () => void;
  copied: boolean;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slide,
  totalSlides,
  currentSlideIndex,
  onNavigate,
  isFullScreen,
  onToggleFullScreen,
  onCopyMarkdown,
  copied,
}) => {
  const { isDark, currentTheme } = useTheme();

  // State for hiding and stepping through the worked example
  const [showExampleResolution, setShowExampleResolution] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(1);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);

  // State for proposed student challenge
  const [showStudentSolution, setShowStudentSolution] = useState<boolean>(false);
  const [showStudentHint, setShowStudentHint] = useState<boolean>(false);

  // When changing slides, reset resolution states so new slide starts with solutions hidden
  useEffect(() => {
    setShowExampleResolution(false);
    setCurrentStepIndex(1);
    setShowAllSteps(false);
    setShowStudentSolution(false);
    setShowStudentHint(false);
  }, [slide.id]);

  const totalExampleSteps = slide.stepByStepExample?.algebraicSteps.length || 0;
  const isLastStepRevealed = currentStepIndex >= totalExampleSteps || showAllSteps;

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Academic Presentation Bar */}
      <header className={`sticky top-0 z-30 backdrop-blur border-b px-4 sm:px-6 py-3 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Cátedra identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className={`p-2 border rounded-lg ${currentTheme.subtleBg} ${currentTheme.borderLight} ${currentTheme.primaryText}`}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-semibold text-sm block tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Cátedra de Cálculo Diferencial Superior
              </span>
              <span className="text-xs text-slate-400">
                Dr. Valerio Escalante · Análisis Matemático & Diseño Instruccional
              </span>
            </div>
          </div>

          {/* Slide Progress Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Diapositiva</span>
            <span className={`px-2 py-0.5 border rounded font-semibold ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200'
            } ${currentTheme.accentText}`}>
              {slide.slideNumber} / {totalSlides}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-400 truncate max-w-xs">{slide.module}</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCopyMarkdown}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
              title="Copiar contenido de esta diapositiva en formato Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Markdown'}</span>
            </button>

            <button
              onClick={onToggleFullScreen}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/60'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
              }`}
              title={isFullScreen ? 'Salir de pantalla completa' : 'Pantalla completa de cátedra'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Slide Content Canvas */}
      <main id="slide-main-canvas" className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Slide Title Banner */}
        <div className={`border-b pb-5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`flex items-center gap-2 text-xs font-mono font-bold mb-2 ${currentTheme.accentText}`}>
            <span>DIAPOSITIVA {slide.slideNumber.toString().padStart(2, '0')}</span>
            <span>·</span>
            <span>{slide.module.toUpperCase()}</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-serif ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {slide.title}
          </h1>
          <p className={`mt-2 text-sm sm:text-base leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {slide.subtitle}
          </p>
        </div>

        {/* Section 1: Contenido Conceptual Profundo y Riguroso */}
        <section className="space-y-5">
          <div className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase ${currentTheme.accentText}`}>
            <BookOpen className="w-4 h-4" />
            <span>1. Fundamentación Teórica y Explicación Formal</span>
          </div>

          <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 transition-colors ${
            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className={`p-5 border rounded-xl text-sm sm:text-base leading-relaxed ${currentTheme.subtleBg} ${currentTheme.borderLight}`}>
              <strong className={`font-bold block mb-1.5 text-xs uppercase tracking-wider ${currentTheme.accentText}`}>
                Tesis Epistemológica Central:
              </strong>
              <p className={`font-medium leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {slide.conceptualContent.thesis}
              </p>
            </div>

            {slide.conceptualContent.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3.5 pt-2">
                <h3 className={`text-base sm:text-lg font-bold font-serif ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {sec.heading}
                </h3>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
                    {p}
                  </p>
                ))}

                {sec.mathBlocks && sec.mathBlocks.map((mb, mIdx) => (
                  <div key={mIdx} className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-950 border-slate-700/80 shadow-md' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <MathView math={mb} block />
                  </div>
                ))}

                {sec.afterMathParagraphs && sec.afterMathParagraphs.map((p, pIdx) => (
                  <p key={`after-${pIdx}`} className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
                    {p}
                  </p>
                ))}

                {sec.bullets && (
                  <ul className={`space-y-2.5 pt-1 ml-4 list-disc text-sm sm:text-base ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Representación Visual o Descripción Gráfica Recomendada */}
        <section className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-sky-500 uppercase">
            <Layers className="w-4 h-4" />
            <span>2. Representación Visual y Modelo Cartesiano Dinámico</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Top: Technical Drawing Instruction & Pedagogy */}
            <div className={`lg:col-span-5 border rounded-2xl p-6 space-y-4 text-xs sm:text-sm leading-relaxed transition-colors ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              <h4 className={`font-bold text-sm sm:text-base font-serif ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {slide.visualRepresentation.title}
              </h4>
              <p className={isDark ? 'text-slate-200' : 'text-slate-600'}>
                {slide.visualRepresentation.description}
              </p>

              <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Elementos Canónicos a Trazar:
                </span>
                <ul className="space-y-2 ml-4 list-disc">
                  {slide.visualRepresentation.elementsToDraw.map((elem, eIdx) => (
                    <li key={eIdx} className={isDark ? 'text-slate-200' : 'text-slate-600'}>
                      {elem}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-3.5 border rounded-xl text-xs sm:text-sm leading-relaxed ${
                isDark ? 'bg-sky-950/70 border-sky-800 text-sky-100' : 'bg-sky-50 border-sky-200 text-sky-900'
              }`}>
                <strong className={`block font-bold mb-1 ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                  Clave Pedagógica Visual:
                </strong>
                {slide.visualRepresentation.pedagogicalInsight}
              </div>
            </div>

            {/* Right/Bottom: Interactive Mathematical Canvas */}
            <div className="lg:col-span-7">
              <InteractiveGraph type={slide.visualRepresentation.interactiveType} />
            </div>
          </div>
        </section>

        {/* Section 3: Ejemplo Práctico Resuelto Paso a Paso (Con Modo Oculto y Paso a Paso Interactivo) */}
        {slide.stepByStepExample && (
          <section className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-500 uppercase">
                <Sparkles className="w-4 h-4" />
                <span>3. Demostración y Ejemplo Práctico Resuelto Paso a Paso</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                {showExampleResolution ? 'Modo Interactivo Activo' : 'Resolución Oculta por Defecto'}
              </span>
            </div>

            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              {/* Enunciado del Problema (Siempre visible) */}
              <div className={`p-5 border rounded-xl text-sm sm:text-base leading-relaxed ${
                isDark ? 'bg-emerald-950/60 border-emerald-800 text-emerald-100' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <strong className={`font-bold text-xs uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Enunciado del Problema:
                  </strong>
                  <span className="text-xs font-mono opacity-80">
                    {totalExampleSteps} pasos analíticos
                  </span>
                </div>
                <p className="font-serif font-medium">{slide.stepByStepExample.statement}</p>
              </div>

              {/* Botón de apertura / Stepper Toolbar */}
              {!showExampleResolution ? (
                <div className={`p-6 border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="space-y-1">
                    <h5 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Resolución Analítica Paso a Paso Oculta
                    </h5>
                    <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Plantea tu hipótesis o discute en clase antes de desplegar las deducciones algebraicas.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowExampleResolution(true);
                        setCurrentStepIndex(1);
                        setShowAllSteps(false);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Iniciar Paso a Paso</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowExampleResolution(true);
                        setShowAllSteps(true);
                        setCurrentStepIndex(totalExampleSteps);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Ver Todo</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Stepper Controller Active Bar */
                <div className="space-y-6">
                  <div className={`p-4 border rounded-xl flex flex-wrap items-center justify-between gap-3 ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    {/* Step indicator badges */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                      {slide.stepByStepExample.algebraicSteps.map((step) => {
                        const isCompleted = !showAllSteps && step.stepNumber < currentStepIndex;
                        const isActive = !showAllSteps && step.stepNumber === currentStepIndex;
                        const isVisible = showAllSteps || step.stepNumber <= currentStepIndex;

                        return (
                          <button
                            key={step.stepNumber}
                            onClick={() => {
                              setShowAllSteps(false);
                              setCurrentStepIndex(step.stepNumber);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 ${
                              isActive
                                ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
                                : isCompleted
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : isVisible
                                ? 'bg-slate-800 text-slate-200'
                                : 'opacity-40 bg-slate-800/50 text-slate-400 hover:opacity-80'
                            }`}
                            title={`Ir al Paso ${step.stepNumber}`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : null}
                            <span>Paso {step.stepNumber}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (currentStepIndex > 1 && !showAllSteps) {
                            setCurrentStepIndex((prev) => prev - 1);
                          } else if (showAllSteps) {
                            setShowAllSteps(false);
                            setCurrentStepIndex(totalExampleSteps - 1);
                          }
                        }}
                        disabled={currentStepIndex <= 1 && !showAllSteps}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1 transition-colors ${
                          currentStepIndex <= 1 && !showAllSteps
                            ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                            : isDark
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Anterior</span>
                      </button>

                      {currentStepIndex < totalExampleSteps && !showAllSteps ? (
                        <button
                          onClick={() => setCurrentStepIndex((prev) => Math.min(totalExampleSteps, prev + 1))}
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                        >
                          <span>Siguiente Paso</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : null}

                      <button
                        onClick={() => setShowAllSteps(!showAllSteps)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          showAllSteps
                            ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                            : isDark
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                        }`}
                      >
                        {showAllSteps ? 'Modo Paso a Paso' : 'Mostrar Todos'}
                      </button>

                      <button
                        onClick={() => {
                          setShowExampleResolution(false);
                          setCurrentStepIndex(1);
                          setShowAllSteps(false);
                        }}
                        className={`p-1.5 rounded-lg border text-xs transition-colors ${
                          isDark
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                            : 'bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 border-slate-200'
                        }`}
                        title="Ocultar resolución completa"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Render Revealed Steps */}
                  <div className="space-y-4">
                    {slide.stepByStepExample.algebraicSteps
                      .filter((step) => showAllSteps || step.stepNumber <= currentStepIndex)
                      .map((step) => {
                        const isCurrentActive = !showAllSteps && step.stepNumber === currentStepIndex;

                        return (
                          <div
                            key={step.stepNumber}
                            className={`p-5 sm:p-6 rounded-2xl border space-y-3 transition-all ${
                              isCurrentActive
                                ? isDark
                                  ? 'bg-slate-950 border-emerald-500/80 shadow-lg ring-1 ring-emerald-500/30'
                                  : 'bg-emerald-50/50 border-emerald-400 shadow-md ring-1 ring-emerald-400/30'
                                : isDark
                                ? 'bg-slate-950/80 border-slate-800'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  isCurrentActive ? 'bg-emerald-500' : 'bg-slate-700'
                                }`}>
                                  {step.stepNumber}
                                </span>
                                <span>{step.label.toUpperCase()}</span>
                              </span>

                              {isCurrentActive && (
                                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  Paso en Explicación
                                </span>
                              )}
                            </div>

                            <div className={`py-3 px-4 rounded-xl border ${
                              isDark ? 'bg-slate-900 border-slate-700/80' : 'bg-white border-slate-200'
                            }`}>
                              <MathView math={step.math} block />
                            </div>

                            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                              <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Justificación Teórica:
                              </strong>{' '}
                              {step.deduction}
                            </p>
                          </div>
                        );
                      })}
                  </div>

                  {/* Inline Next Step CTA */}
                  {currentStepIndex < totalExampleSteps && !showAllSteps && (
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => setCurrentStepIndex((prev) => Math.min(totalExampleSteps, prev + 1))}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95"
                      >
                        <span>Avanzar al Paso {currentStepIndex + 1}: {slide.stepByStepExample.algebraicSteps[currentStepIndex].label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Geometric interpretation & Conclusion (Revealed when all steps are reached or showAllSteps) */}
                  {isLastStepRevealed && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <span className="font-bold text-sky-400 block mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <Compass className="w-4 h-4" />
                          <span>Interpretación Geométrica:</span>
                        </span>
                        <p className={`leading-relaxed text-xs sm:text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          {slide.stepByStepExample.geometricInterpretation}
                        </p>
                      </div>
                      <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <span className="font-bold text-emerald-400 block mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" />
                          <span>Conclusión Analítica Definitiva:</span>
                        </span>
                        <p className={`leading-relaxed text-xs sm:text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          {slide.stepByStepExample.conclusion}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 4: Reto y Ejercicio Propuesto para el Estudiante (Práctica Activa Guiada) */}
        {slide.proposedExercise && (
          <section className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-violet-400 uppercase">
                <BrainCircuit className="w-4 h-4" />
                <span>4. Reto y Ejercicio Propuesto para el Estudiante (Práctica Activa)</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${
                isDark ? 'bg-violet-950/60 border-violet-800 text-violet-300' : 'bg-violet-50 border-violet-200 text-violet-700'
              }`}>
                Autoaprendizaje y Consolidación
              </span>
            </div>

            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 transition-colors ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              {/* Enunciado del Reto */}
              <div className={`p-5 border rounded-xl text-sm sm:text-base leading-relaxed ${
                isDark ? 'bg-violet-950/40 border-violet-800 text-violet-100' : 'bg-violet-50/70 border-violet-200 text-violet-950'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Pencil className="w-4 h-4 text-violet-400" />
                  <strong className={`font-bold text-xs uppercase tracking-wider ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
                    Problema Propuesto para el Estudiante:
                  </strong>
                </div>
                <p className="font-serif leading-relaxed">{slide.proposedExercise.statement}</p>
              </div>

              {/* Analogía Cotidiana / Intuición Real */}
              <div className={`p-4 border rounded-xl flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'bg-sky-950/40 border-sky-800/80 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-900'
              }`}>
                <Compass className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className={`font-bold block mb-1 ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                    Intuición Cotidiana y Física Universal:
                  </strong>
                  <span>{slide.proposedExercise.everydayAnalogy}</span>
                </div>
              </div>

              {/* Pista Metodológica Desplegable */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowStudentHint(!showStudentHint)}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    showStudentHint
                      ? isDark ? 'bg-amber-950 border-amber-800 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-800'
                      : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showStudentHint ? 'Ocultar Pista Metodológica' : '¿Necesitas una pista para comenzar?'}</span>
                </button>

                {showStudentHint && (
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 ${
                    isDark ? 'bg-amber-950/30 border-amber-800 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <strong className="font-semibold block mb-1">Sugerencia Operacional:</strong>
                    {slide.proposedExercise.hint}
                  </div>
                )}
              </div>

              {/* Solución Paso a Paso del Reto (Oculta por defecto) */}
              <div className="pt-2 border-t border-slate-800/60">
                {!showStudentSolution ? (
                  <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Solución Oficial Protegida</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Intenta resolver el ejercicio en tu cuaderno de cálculo antes de verificar la respuesta.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowStudentSolution(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Revelar Solución Paso a Paso</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <h5 className={`font-bold text-sm font-serif ${isDark ? 'text-violet-300' : 'text-violet-800'}`}>
                        Desarrollo y Demostración Oficial del Reto:
                      </h5>
                      <button
                        onClick={() => setShowStudentSolution(false)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                          isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Ocultar Solución</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {slide.proposedExercise.solutionSteps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className={`p-4 sm:p-5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <span className="font-mono text-xs sm:text-sm font-bold text-violet-400">
                            PASO {step.stepNumber}: {step.label.toUpperCase()}
                          </span>
                          <div className={`py-2 px-3 rounded-lg border ${
                            isDark ? 'bg-slate-900 border-slate-700/80' : 'bg-white border-slate-200'
                          }`}>
                            <MathView math={step.math} block />
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                            <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Deducción:
                            </strong>{' '}
                            {step.deduction}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Verified Final Answer Box */}
                    <div className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3 ${
                      isDark ? 'bg-emerald-950/60 border-emerald-800 text-emerald-100' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    }`}>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className={`font-bold block text-xs uppercase tracking-wider mb-1 ${
                          isDark ? 'text-emerald-300' : 'text-emerald-800'
                        }`}>
                          Respuesta Definitiva de Verificación:
                        </strong>
                        <p className="font-serif text-sm leading-relaxed">{slide.proposedExercise.finalAnswer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Slide 9 Special Interactive Quiz */}
        {slide.verificationQuestions && slide.verificationQuestions.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-500 uppercase">
              <Check className="w-4 h-4" />
              <span>5. Instrumento de Evaluación Formativa y Patrón Oficial de Corrección</span>
            </div>
            <QuizInteractive slide={slide} />
          </section>
        )}

        {/* Slide 10: Referencias Bibliográficas APA 7 */}
        {slide.referencesAPA && slide.referencesAPA.length > 0 && (
          <section className="space-y-5">
            <div className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase ${currentTheme.accentText}`}>
              <BookOpen className="w-4 h-4" />
              <span>5. Corpus Bibliográfico en Formato APA 7ma Edición</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.referencesAPA.map((ref, rIdx) => (
                <div
                  key={rIdx}
                  className={`p-5 border rounded-xl space-y-3 flex flex-col justify-between transition-colors ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <p className={`text-xs sm:text-sm font-serif font-semibold leading-relaxed pl-4 -indent-4 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {ref.citation}
                    </p>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                      {ref.annotation}
                    </p>
                  </div>
                  {ref.doiOrIsbn && (
                    <div className={`pt-2 border-t flex items-center justify-between text-xs font-mono ${
                      isDark ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-500'
                    }`}>
                      <span>{ref.doiOrIsbn}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Preguntas Socráticas de Reflexión o Autoevaluación para la Audiencia */}
        {slide.reflectionQuestions && slide.reflectionQuestions.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-rose-500 uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas Socráticas de Reflexión para el Aula</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.reflectionQuestions.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className={`p-5 border rounded-xl space-y-3 transition-colors ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                  }`}
                >
                  <h4 className={`font-bold text-sm sm:text-base leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    «{q.question}»
                  </h4>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p>
                      <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
                        Objetivo Pedagógico:
                      </strong>{' '}
                      <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{q.pedagogicalGoal}</span>
                    </p>
                    <p>
                      <strong className={`font-semibold ${currentTheme.accentText}`}>
                        Disparador de Análisis:
                      </strong>{' '}
                      <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{q.promptToThink}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Floating Bottom Presentation Navigation Bar */}
      <footer className={`sticky bottom-0 z-30 backdrop-blur border-t px-4 py-3 transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate(Math.max(0, currentSlideIndex - 1))}
            disabled={currentSlideIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentSlideIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-transparent'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {/* Quick jump slide pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-md sm:max-w-xl">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-medium flex items-center justify-center transition-all shrink-0 ${
                  i === currentSlideIndex
                    ? `${currentTheme.primaryBg} text-white font-bold ring-2 ${currentTheme.ringColor} ring-offset-2 ring-offset-slate-900`
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                }`}
                title={`Ir a Diapositiva ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate(Math.min(totalSlides - 1, currentSlideIndex + 1))}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors text-white ${
              currentSlideIndex === totalSlides - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-600'
                : `${currentTheme.primaryBg} ${currentTheme.primaryHover}`
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
