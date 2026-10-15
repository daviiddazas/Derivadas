import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MousePointer2, 
  PenTool, 
  Highlighter, 
  Search, 
  Focus, 
  Trash2, 
  Undo2, 
  Minimize2, 
  Maximize2,
  Crosshair,
  Square,
  ZoomIn,
  ZoomOut,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type AnnotationTool = 'none' | 'laser' | 'pen' | 'highlighter' | 'magnifier' | 'spotlight' | 'box_select';

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  id: string;
  tool: 'pen' | 'highlighter';
  color: string;
  width: number;
  points: StrokePoint[];
}

interface HighlightBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ANNOTATION_COLORS = [
  { name: 'Amarillo Neón', value: '#facc15' },
  { name: 'Rojo Láser', value: '#ef4444' },
  { name: 'Cian Cuántico', value: '#06b6d4' },
  { name: 'Verde Esmeralda', value: '#10b981' },
  { name: 'Blanco Tiza', value: '#ffffff' },
];

export const AnnotationCanvas: React.FC = () => {
  const { isDark, currentTheme } = useTheme();
  const [activeTool, setActiveTool] = useState<AnnotationTool>('none');
  const [selectedColor, setSelectedColor] = useState<string>('#facc15');
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState<boolean>(false);

  // Drawing strokes
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const isDrawingRef = useRef<boolean>(false);
  const currentPointsRef = useRef<StrokePoint[]>([]);

  // Pointer position for high-performance direct rendering
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);

  // Variable Magnifier state
  const [magnifierZoom, setMagnifierZoom] = useState<number>(2.2); // 1.5x to 4x
  const [magnifierSize, setMagnifierSize] = useState<number>(180); // diameter px

  // Spotlight state
  const [spotlightRadius, setSpotlightRadius] = useState<number>(150);

  // Temporary selection box
  const [activeBox, setActiveBox] = useState<HighlightBox | null>(null);
  const boxStartRef = useRef<{ x: number; y: number } | null>(null);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Clone container for Magnifier
  const [clonedHtml, setClonedHtml] = useState<string>('');

  // Update cloned HTML for the magnifier when entering magnifier mode or moving
  useEffect(() => {
    if (activeTool === 'magnifier') {
      const target = document.getElementById('slide-main-canvas');
      if (target) {
        setClonedHtml(target.innerHTML);
      }
    }
  }, [activeTool]);

  // Full Redraw of strokes on canvas
  const redrawAllStrokes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      for (let i = 1; i < stroke.points.length; i++) {
        const xc = (stroke.points[i].x + stroke.points[i - 1].x) / 2;
        const yc = (stroke.points[i].y + stroke.points[i - 1].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, xc, yc);
      }
      ctx.lineTo(stroke.points[stroke.points.length - 1].x, stroke.points[stroke.points.length - 1].y);

      if (stroke.tool === 'highlighter') {
        ctx.strokeStyle = stroke.color;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = stroke.width * 4;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'bevel';
      } else {
        ctx.strokeStyle = stroke.color;
        ctx.globalAlpha = 0.95;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }

      ctx.stroke();
      ctx.restore();
    });
  }, [strokes]);

  // Handle window resize without losing drawings
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Preserve current canvas content during resize
      const prevWidth = canvas.width;
      const prevHeight = canvas.height;
      if (prevWidth === window.innerWidth && prevHeight === window.innerHeight) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawAllStrokes();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawAllStrokes]);

  useEffect(() => {
    redrawAllStrokes();
  }, [redrawAllStrokes]);

  // Keyboard shortcut: ESC to deactivate tools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeTool !== 'none') {
        setActiveTool('none');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool]);

  // Pointer Down handler
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }

    if (activeTool === 'pen' || activeTool === 'highlighter') {
      isDrawingRef.current = true;
      currentPointsRef.current = [{ x: e.clientX, y: e.clientY }];
    } else if (activeTool === 'box_select') {
      boxStartRef.current = { x: e.clientX, y: e.clientY };
      setActiveBox({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    }
  };

  // Pointer Move handler
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setPointerPos({ x: e.clientX, y: e.clientY });

    // Drawing in progress
    if (isDrawingRef.current && (activeTool === 'pen' || activeTool === 'highlighter')) {
      const newPoint = { x: e.clientX, y: e.clientY };
      currentPointsRef.current.push(newPoint);

      // Fast incremental draw to avoid full redraw every mouse move
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const pts = currentPointsRef.current;
        if (ctx && pts.length >= 2) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
          ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
          ctx.strokeStyle = selectedColor;
          ctx.lineWidth = activeTool === 'highlighter' ? strokeWidth * 4 : strokeWidth;
          ctx.globalAlpha = activeTool === 'highlighter' ? 0.35 : 0.95;
          ctx.lineCap = activeTool === 'highlighter' ? 'square' : 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Temporary box in progress
    if (activeTool === 'box_select' && boxStartRef.current) {
      const x = Math.min(boxStartRef.current.x, e.clientX);
      const y = Math.min(boxStartRef.current.y, e.clientY);
      const width = Math.abs(e.clientX - boxStartRef.current.x);
      const height = Math.abs(e.clientY - boxStartRef.current.y);
      setActiveBox({ x, y, width, height });
    }
  };

  // Pointer Up handler
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (isDrawingRef.current && currentPointsRef.current.length > 0) {
      const newStroke: Stroke = {
        id: Math.random().toString(36).substring(2, 9),
        tool: activeTool === 'highlighter' ? 'highlighter' : 'pen',
        color: selectedColor,
        width: strokeWidth,
        points: [...currentPointsRef.current],
      };
      setStrokes((prev) => [...prev, newStroke]);
      isDrawingRef.current = false;
      currentPointsRef.current = [];
    }

    if (activeTool === 'box_select') {
      boxStartRef.current = null;
    }
  };

  // Wheel handler for Variable Magnifier and Spotlight
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (activeTool === 'magnifier') {
      e.preventDefault();
      // Zoom factor: 1.2x to 4.5x
      setMagnifierZoom((prev) => {
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        return Math.min(4.5, Math.max(1.2, parseFloat((prev + delta).toFixed(2))));
      });
    } else if (activeTool === 'spotlight') {
      e.preventDefault();
      setSpotlightRadius((prev) => Math.min(300, Math.max(60, prev - e.deltaY * 0.2)));
    }
  };

  const handleClearAll = () => {
    setStrokes([]);
    setActiveBox(null);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const isInteractiveActive = activeTool !== 'none';

  return (
    <>
      {/* Overlay Canvas for Freehand Drawing & Highlighting */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        style={{ touchAction: 'none' }}
        className={`fixed inset-0 z-35 transition-opacity ${
          isInteractiveActive ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
        }`}
      />

      {/* 1. Laser Pointer Renderer */}
      {activeTool === 'laser' && pointerPos && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: pointerPos.x,
              top: pointerPos.y,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-rose-500 animate-ping opacity-60 absolute -inset-0" />
            <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-[0_0_15px_#f43f5e] relative" />
          </div>
        </div>
      )}

      {/* 2. Variable Magnifying Glass (Lupa de Aumento Variable para Enfocar) */}
      {activeTool === 'magnifier' && pointerPos && (
        <div
          className="fixed pointer-events-none z-45 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-4 border-indigo-400 bg-slate-900 overflow-hidden select-none"
          style={{
            width: magnifierSize,
            height: magnifierSize,
            left: pointerPos.x - magnifierSize / 2,
            top: pointerPos.y - magnifierSize / 2,
          }}
        >
          {/* Scaled mirrored content container */}
          <div
            className="absolute pointer-events-none transform-gpu origin-top-left"
            style={{
              width: window.innerWidth,
              height: window.innerHeight,
              left: -(pointerPos.x * magnifierZoom - magnifierSize / 2),
              top: -(pointerPos.y * magnifierZoom - magnifierSize / 2),
              transform: `scale(${magnifierZoom})`,
            }}
            dangerouslySetInnerHTML={{ __html: clonedHtml }}
          />

          {/* Optical Glass Glare Overlay */}
          <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent" />

          {/* Center Precision Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-5 h-px bg-indigo-400/60" />
            <div className="h-5 w-px bg-indigo-400/60 absolute" />
          </div>

          {/* Zoom Level Indicator Badge on Loupe */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/50 shadow">
            {magnifierZoom}×
          </div>
        </div>
      )}

      {/* 3. Spotlight Effect Renderer */}
      {activeTool === 'spotlight' && pointerPos && (
        <div
          className="fixed inset-0 pointer-events-none z-40 transition-all"
          style={{
            background: `radial-gradient(circle ${spotlightRadius}px at ${pointerPos.x}px ${pointerPos.y}px, transparent 0%, rgba(0, 0, 0, 0.65) 100%)`,
          }}
        />
      )}

      {/* 4. Temporary Selection Box Renderer */}
      {activeBox && activeBox.width > 5 && (
        <div
          className="fixed pointer-events-none z-40 border-2 border-amber-400 bg-amber-400/10 rounded-md shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all"
          style={{
            left: activeBox.x,
            top: activeBox.y,
            width: activeBox.width,
            height: activeBox.height,
          }}
        >
          <div className="absolute -top-6 left-0 bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight shadow">
            ÁREA DE ENFOQUE TEMPORAL
          </div>
        </div>
      )}

      {/* Floating Professorial Annotation Toolbar */}
      <div className="fixed bottom-16 right-4 sm:right-6 z-50 select-none animate-fadeIn">
        <div
          className={`flex items-center gap-1.5 p-2 rounded-2xl border shadow-2xl backdrop-blur-md transition-all ${
            isDark
              ? 'bg-slate-900/95 border-slate-700 text-white'
              : 'bg-white/95 border-slate-300 text-slate-900 shadow-xl'
          }`}
        >
          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setIsToolbarCollapsed(!isToolbarCollapsed)}
            className={`p-2 rounded-xl transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
            title={isToolbarCollapsed ? 'Expandir barra de herramientas' : 'Minimizar barra'}
          >
            {isToolbarCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>

          {!isToolbarCollapsed && (
            <>
              {/* Tool 0: Neutral Pointer */}
              <button
                onClick={() => setActiveTool('none')}
                className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                  activeTool === 'none'
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-xs font-semibold'
                      : 'bg-slate-200 text-slate-900 font-semibold'
                    : isDark
                    ? 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
                title="Puntero normal (Navegación estándar)"
              >
                <MousePointer2 className="w-4 h-4" />
              </button>

              {/* Tool 1: Laser Pointer */}
              <button
                onClick={() => setActiveTool('laser')}
                className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                  activeTool === 'laser'
                    ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400'
                    : isDark
                    ? 'hover:bg-slate-800/60 text-slate-400 hover:text-rose-400'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-rose-600'
                }`}
                title="Puntero Láser (Foco puntual)"
              >
                <Crosshair className="w-4 h-4" />
              </button>

              {/* Tool 2: Variable Magnifier (Lupa Variable para Enfocar) */}
              <button
                onClick={() => {
                  setActiveTool('magnifier');
                  // Snapshot current content
                  const target = document.getElementById('slide-main-canvas');
                  if (target) {
                    setClonedHtml(target.innerHTML);
                  }
                }}
                className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                  activeTool === 'magnifier'
                    ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300'
                    : isDark
                    ? 'hover:bg-slate-800/60 text-slate-400 hover:text-sky-400'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-sky-600'
                }`}
                title="Lupa de Aumento Variable (Rueda del ratón para ampliar hasta 4.5×)"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Tool 3: Pen / Marcador */}
              <button
                onClick={() => setActiveTool('pen')}
                className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                  activeTool === 'pen'
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400'
                    : isDark
                    ? 'hover:bg-slate-800/60 text-slate-400 hover:text-indigo-400'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-indigo-600'
                }`}
                title="Pluma de Anotación (Trazos sobre la diapositiva)"
              >
                <PenTool className="w-4 h-4" />
              </button>

              {/* Tool 4: Highlighter / Resaltador */}
              <button
                onClick={() => setActiveTool('highlighter')}
                className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                  activeTool === 'highlighter'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300 font-bold'
                    : isDark
                    ? 'hover:bg-slate-800/60 text-slate-400 hover:text-amber-400'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-amber-600'
                }`}
                title="Resaltador Fluorescente (Subrayado translúcido)"
              >
                <Highlighter className="w-4 h-4" />
              </button>

              {/* Tool 5: Spotlight / Foco */}
              <button
                onClick={() => {
                  setActiveTool('spotlight');
                  if (!pointerPos) {
                    setPointerPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
                  }
                }}
                className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                  activeTool === 'spotlight'
                    ? 'bg-violet-600 text-white shadow-md ring-2 ring-violet-300'
                    : isDark
                    ? 'hover:bg-slate-800/60 text-slate-400 hover:text-violet-400'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-violet-600'
                }`}
                title="Foco de Atención Spotlight (Aislar fórmulas)"
              >
                <Focus className="w-4 h-4" />
              </button>

              {/* Tool 6: Temporary Box Highlight */}
              <button
                onClick={() => setActiveTool('box_select')}
                className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                  activeTool === 'box_select'
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                    : isDark
                    ? 'hover:bg-slate-800/60 text-slate-400 hover:text-emerald-400'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-emerald-600'
                }`}
                title="Enmarcado Temporal (Arrastrar para delimitar)"
              >
                <Square className="w-4 h-4" />
              </button>

              {/* Divider */}
              <div className={`w-px h-6 mx-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

              {/* Controls specific to Magnifier */}
              {activeTool === 'magnifier' && (
                <div className="flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded-xl border border-slate-700 text-xs font-mono">
                  <button
                    onClick={() => setMagnifierZoom((prev) => Math.max(1.2, parseFloat((prev - 0.3).toFixed(1))))}
                    className="p-1 hover:text-sky-300 transition-colors"
                    title="Reducir aumento"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sky-300 font-bold px-1">{magnifierZoom}×</span>
                  <button
                    onClick={() => setMagnifierZoom((prev) => Math.min(4.5, parseFloat((prev + 0.3).toFixed(1))))}
                    className="p-1 hover:text-sky-300 transition-colors"
                    title="Aumentar ampliación"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Color Choices for Pen/Highlighter */}
              {(activeTool === 'pen' || activeTool === 'highlighter') && (
                <div className="flex items-center gap-1.5 px-1">
                  {ANNOTATION_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setSelectedColor(c.value)}
                      className={`w-5 h-5 rounded-full transition-transform ${
                        selectedColor === c.value ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-900' : 'hover:scale-110 opacity-70'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              )}

              {/* Action: Undo */}
              {strokes.length > 0 && (
                <button
                  onClick={handleUndo}
                  className={`p-2 rounded-xl transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                  title="Deshacer último trazo (Ctrl+Z)"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
              )}

              {/* Action: Clear All Annotations */}
              {(strokes.length > 0 || activeBox) && (
                <button
                  onClick={handleClearAll}
                  className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                  title="Limpiar todas las anotaciones"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Status tooltip indicator when an active tool is engaged */}
        {isInteractiveActive && (
          <div className="absolute right-0 bottom-full mb-2 bg-slate-950/95 text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-slate-700 shadow-xl whitespace-nowrap flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Herramienta activa:{' '}
              <strong className="text-amber-400">
                {activeTool === 'laser' && 'Puntero Láser'}
                {activeTool === 'magnifier' && `Lupa Variable (${magnifierZoom}× · Rueda del ratón para zoom)`}
                {activeTool === 'pen' && 'Pluma de Trazado'}
                {activeTool === 'highlighter' && 'Marcador Resaltador'}
                {activeTool === 'spotlight' && 'Foco Spotlight'}
                {activeTool === 'box_select' && 'Enmarcado Temporal'}
              </strong>
            </span>
            <button
              onClick={() => setActiveTool('none')}
              className="ml-2 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] transition-colors"
              title="Presione ESC para salir"
            >
              Terminar (ESC)
            </button>
          </div>
        )}
      </div>
    </>
  );
};
