import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface InteractiveGraphProps {
  type?: 'secant_to_tangent' | 'rates_of_change' | 'continuity_corner' | 'rules_polynomial' | 'physics_projectile';
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ type = 'secant_to_tangent' }) => {
  const { isDark, currentTheme } = useTheme();

  // Secant to tangent state
  const [h, setH] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const x0 = 1.5;

  // Function f(x) = 0.5x^2 + 0.5
  const f_quad = (x: number) => 0.5 * x * x + 0.5;
  const df_quad = (x: number) => x;

  // Polynomial interactive state
  const [polyX, setPolyX] = useState<number>(0.5);

  // Corner tab state
  const [cornerTab, setCornerTab] = useState<'abs' | 'cusp' | 'vertical' | 'jump'>('abs');

  // Animation for secant convergence
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const step = () => {
        setH((prev) => {
          if (Math.abs(prev) <= 0.04) {
            setIsPlaying(false);
            return 0.02;
          }
          return prev * 0.95;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Coordinate mapper for SVG
  const width = 560;
  const height = 340;
  const padding = 45;

  const toSvgX = (x: number, minX: number, maxX: number) =>
    padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);

  const toSvgY = (y: number, minY: number, maxY: number) =>
    height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  // Visual Theme Variables
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const axisColor = isDark ? '#475569' : '#94a3b8';
  const textMuted = isDark ? '#64748b' : '#64748b';
  const cardClasses = isDark
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-slate-200 text-slate-800 shadow-sm';
  const svgBgClasses = isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200';
  const metricBoxClasses = isDark
    ? 'bg-slate-950 border-slate-800 text-slate-200'
    : 'bg-slate-50 border-slate-200 text-slate-800';

  // 1. Render Secant to Tangent Canvas
  if (type === 'secant_to_tangent') {
    const minX = -0.5;
    const maxX = 3.5;
    const minY = 0;
    const maxY = 5.5;

    const y0 = f_quad(x0);
    const effectiveH = Math.abs(h) < 0.001 ? (h >= 0 ? 0.001 : -0.001) : h;
    const xQ = x0 + effectiveH;
    const yQ = f_quad(xQ);
    const mSec = (yQ - y0) / effectiveH;
    const mTan = df_quad(x0);

    // Points for parabola path
    const curvePoints: string[] = [];
    const stepCount = 50;
    for (let i = 0; i <= stepCount; i++) {
      const curX = minX + (i / stepCount) * (maxX - minX);
      const curY = f_quad(curX);
      curvePoints.push(`${toSvgX(curX, minX, maxX)},${toSvgY(curY, minY, maxY)}`);
    }

    // Tangent Line coords
    const tanX1 = x0 - 1.2;
    const tanY1 = y0 + mTan * (tanX1 - x0);
    const tanX2 = x0 + 1.2;
    const tanY2 = y0 + mTan * (tanX2 - x0);

    // Secant Line coords
    const secX1 = minX;
    const secY1 = y0 + mSec * (secX1 - x0);
    const secX2 = maxX;
    const secY2 = y0 + mSec * (secX2 - x0);

    return (
      <div className={`border rounded-xl p-4 ${cardClasses}`}>
        <div className={`flex items-center justify-between mb-3 border-b pb-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div>
            <h4 className={`font-semibold text-sm ${currentTheme.accentText}`}>Simulador de Límite: Secante a Tangente</h4>
            <p className="text-xs text-slate-400">
              Curva: <span className="font-mono font-medium">f(x) = 0.5x² + 0.5</span> en P({x0}, {y0.toFixed(2)})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setH(1.2);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs ${currentTheme.primaryBg} ${currentTheme.primaryHover} rounded text-white font-medium transition-colors`}
              title="Iniciar animación continua h → 0"
            >
              <Play className="w-3.5 h-3.5" />
              Animar h → 0
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setH(1.0);
              }}
              className={`p-1 rounded transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
              title="Restablecer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`relative overflow-hidden rounded-lg border ${svgBgClasses}`}>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid */}
            {[0, 1, 2, 3].map((val) => (
              <g key={`x-${val}`}>
                <line
                  x1={toSvgX(val, minX, maxX)}
                  y1={toSvgY(minY, minY, maxY)}
                  x2={toSvgX(val, minX, maxX)}
                  y2={toSvgY(maxY, minY, maxY)}
                  stroke={gridColor}
                  strokeDasharray="3 3"
                />
                <text
                  x={toSvgX(val, minX, maxX)}
                  y={height - padding + 18}
                  fill={textMuted}
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono"
                >
                  {val}
                </text>
              </g>
            ))}
            {[0, 1, 2, 3, 4, 5].map((val) => (
              <g key={`y-${val}`}>
                <line
                  x1={toSvgX(minX, minX, maxX)}
                  y1={toSvgY(val, minY, maxY)}
                  x2={toSvgX(maxX, minX, maxX)}
                  y2={toSvgY(val, minY, maxY)}
                  stroke={gridColor}
                  strokeDasharray="3 3"
                />
                <text
                  x={padding - 10}
                  y={toSvgY(val, minY, maxY) + 4}
                  fill={textMuted}
                  fontSize="11"
                  textAnchor="end"
                  fontFamily="IBM Plex Mono"
                >
                  {val}
                </text>
              </g>
            ))}

            {/* Axes */}
            <line
              x1={padding}
              y1={toSvgY(0, minY, maxY)}
              x2={width - padding}
              y2={toSvgY(0, minY, maxY)}
              stroke={axisColor}
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0, minX, maxX)}
              y1={height - padding}
              x2={toSvgX(0, minX, maxX)}
              y2={padding}
              stroke={axisColor}
              strokeWidth="1.5"
            />

            {/* Parabola curve */}
            <polyline
              fill="none"
              stroke={currentTheme.graphStroke}
              strokeWidth="2.5"
              points={curvePoints.join(' ')}
            />

            {/* Secant line */}
            <line
              x1={toSvgX(secX1, minX, maxX)}
              y1={toSvgY(secY1, minY, maxY)}
              x2={toSvgX(secX2, minX, maxX)}
              y2={toSvgY(secY2, minY, maxY)}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Tangent line */}
            <line
              x1={toSvgX(tanX1, minX, maxX)}
              y1={toSvgY(tanY1, minY, maxY)}
              x2={toSvgX(tanX2, minX, maxX)}
              y2={toSvgY(tanY2, minY, maxY)}
              stroke="#f43f5e"
              strokeWidth="2"
            />

            {/* Triangle for delta x and delta y */}
            <line
              x1={toSvgX(x0, minX, maxX)}
              y1={toSvgY(y0, minY, maxY)}
              x2={toSvgX(xQ, minX, maxX)}
              y2={toSvgY(y0, minY, maxY)}
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(xQ, minX, maxX)}
              y1={toSvgY(y0, minY, maxY)}
              x2={toSvgX(xQ, minX, maxX)}
              y2={toSvgY(yQ, minY, maxY)}
              stroke="#10b981"
              strokeWidth="1.5"
            />

            {/* Triangle labels */}
            <text
              x={(toSvgX(x0, minX, maxX) + toSvgX(xQ, minX, maxX)) / 2}
              y={toSvgY(y0, minY, maxY) + (h > 0 ? 15 : -8)}
              fill="#10b981"
              fontSize="11"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontWeight="bold"
            >
              h = Δx = {effectiveH.toFixed(2)}
            </text>
            <text
              x={toSvgX(xQ, minX, maxX) + (h > 0 ? 8 : -8)}
              y={(toSvgY(y0, minY, maxY) + toSvgY(yQ, minY, maxY)) / 2}
              fill="#10b981"
              fontSize="11"
              textAnchor={h > 0 ? 'start' : 'end'}
              fontFamily="IBM Plex Mono"
              fontWeight="bold"
            >
              Δy = {(yQ - y0).toFixed(2)}
            </text>

            {/* Point P */}
            <circle
              cx={toSvgX(x0, minX, maxX)}
              cy={toSvgY(y0, minY, maxY)}
              r="5"
              fill={currentTheme.graphStroke}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <text
              x={toSvgX(x0, minX, maxX) - 10}
              y={toSvgY(y0, minY, maxY) - 10}
              fill={currentTheme.graphStroke}
              fontSize="12"
              fontWeight="bold"
            >
              P({x0}, {y0.toFixed(2)})
            </text>

            {/* Point Q */}
            <circle
              cx={toSvgX(xQ, minX, maxX)}
              cy={toSvgY(yQ, minY, maxY)}
              r="5"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <text
              x={toSvgX(xQ, minX, maxX) + 8}
              y={toSvgY(yQ, minY, maxY) - 8}
              fill="#f59e0b"
              fontSize="12"
              fontWeight="bold"
            >
              Q({xQ.toFixed(2)}, {yQ.toFixed(2)})
            </text>
          </svg>
        </div>

        {/* Live numerical dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
          <div className={`p-2.5 rounded-lg border ${metricBoxClasses}`}>
            <span className="text-slate-400 block">Incremento (h = Δx)</span>
            <span className="font-mono text-emerald-500 font-semibold text-sm">{h.toFixed(3)}</span>
          </div>
          <div className={`p-2.5 rounded-lg border ${metricBoxClasses}`}>
            <span className="text-slate-400 block">Pendiente Secante (m_sec)</span>
            <span className="font-mono text-amber-500 font-semibold text-sm">{mSec.toFixed(3)}</span>
          </div>
          <div className={`p-2.5 rounded-lg border ${metricBoxClasses}`}>
            <span className="text-slate-400 block">Pendiente Tangente (m_tan)</span>
            <span className="font-mono text-rose-500 font-semibold text-sm">{mTan.toFixed(3)}</span>
          </div>
          <div className={`p-2.5 rounded-lg border ${metricBoxClasses}`}>
            <span className="text-slate-400 block">Error |m_sec - m_tan|</span>
            <span className="font-mono font-semibold text-sm" style={{ color: currentTheme.hex }}>
              {Math.abs(mSec - mTan).toFixed(4)}
            </span>
          </div>
        </div>

        {/* Interactive slider */}
        <div className={`mt-3 pt-2 border-t flex items-center gap-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <label htmlFor="h-slider" className="text-xs text-slate-500 dark:text-slate-300 whitespace-nowrap shrink-0">
            Variar h manualmente:
          </label>
          <input
            id="h-slider"
            type="range"
            min="-1.2"
            max="1.5"
            step="0.01"
            value={h}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setH(Math.abs(val) < 0.02 ? 0.02 : val);
            }}
            className="w-full cursor-pointer"
            style={{ accentColor: currentTheme.hex }}
          />
          <span className="font-mono text-xs font-semibold min-w-10 text-right" style={{ color: currentTheme.hex }}>
            {h.toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

  // 2. Render Rates of Change (Free fall s(t) = 16t^2)
  if (type === 'rates_of_change') {
    const minX = 0;
    const maxX = 3.2;
    const minY = 0;
    const maxY = 150;

    const t0 = 1.0;
    const dt = Math.max(0.01, Math.abs(h));
    const s0 = 16 * t0 * t0;
    const s1 = 16 * (t0 + dt) * (t0 + dt);
    const vProm = (s1 - s0) / dt;
    const vInst = 32 * t0; // 32 ft/s

    const curvePoints: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const curT = (i / 40) * 3;
      const curS = 16 * curT * curT;
      curvePoints.push(`${toSvgX(curT, minX, maxX)},${toSvgY(curS, minY, maxY)}`);
    }

    return (
      <div className={`border rounded-xl p-4 ${cardClasses}`}>
        <div className={`flex items-center justify-between mb-3 border-b pb-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div>
            <h4 className={`font-semibold text-sm ${currentTheme.accentText}`}>
              Cinemática: Rapidez Promedio vs. Velocímetro Instantáneo
            </h4>
            <p className="text-xs text-slate-400">Trayectoria: <span className="font-mono">s(t) = 16t²</span> pies en el vacío</p>
          </div>
          <button
            onClick={() => setH(0.01)}
            className="px-2.5 py-1 text-xs bg-emerald-600 hover:bg-emerald-500 rounded text-white font-medium transition-colors"
          >
            Paso al Límite (Δt → 0)
          </button>
        </div>

        <div className={`relative overflow-hidden rounded-lg border ${svgBgClasses}`}>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid */}
            {[0, 1, 2, 3].map((val) => (
              <g key={`t-${val}`}>
                <line
                  x1={toSvgX(val, minX, maxX)}
                  y1={toSvgY(minY, minY, maxY)}
                  x2={toSvgX(val, minX, maxX)}
                  y2={toSvgY(maxY, minY, maxY)}
                  stroke={gridColor}
                  strokeDasharray="3 3"
                />
                <text
                  x={toSvgX(val, minX, maxX)}
                  y={height - padding + 18}
                  fill={textMuted}
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono"
                >
                  t = {val} s
                </text>
              </g>
            ))}
            {[0, 32, 64, 96, 128].map((val) => (
              <g key={`s-${val}`}>
                <line
                  x1={toSvgX(minX, minX, maxX)}
                  y1={toSvgY(val, minY, maxY)}
                  x2={toSvgX(maxX, minX, maxX)}
                  y2={toSvgY(val, minY, maxY)}
                  stroke={gridColor}
                  strokeDasharray="3 3"
                />
                <text
                  x={padding - 8}
                  y={toSvgY(val, minY, maxY) + 4}
                  fill={textMuted}
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="IBM Plex Mono"
                >
                  {val} ft
                </text>
              </g>
            ))}

            {/* Position curve */}
            <polyline
              fill="none"
              stroke={currentTheme.graphStroke}
              strokeWidth="2.5"
              points={curvePoints.join(' ')}
            />

            {/* Secant chord */}
            <line
              x1={toSvgX(t0, minX, maxX)}
              y1={toSvgY(s0, minY, maxY)}
              x2={toSvgX(t0 + dt, minX, maxX)}
              y2={toSvgY(s1, minY, maxY)}
              stroke="#f59e0b"
              strokeWidth="2"
            />

            {/* Tangent slope at t=1 */}
            <line
              x1={toSvgX(0.2, minX, maxX)}
              y1={toSvgY(16 + 32 * (0.2 - 1), minY, maxY)}
              x2={toSvgX(2.2, minX, maxX)}
              y2={toSvgY(16 + 32 * (2.2 - 1), minY, maxY)}
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Points */}
            <circle cx={toSvgX(t0, minX, maxX)} cy={toSvgY(s0, minY, maxY)} r="5" fill={currentTheme.graphStroke} />
            <circle cx={toSvgX(t0 + dt, minX, maxX)} cy={toSvgY(s1, minY, maxY)} r="5" fill="#f59e0b" />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
          <div className={`p-2 rounded-lg border ${metricBoxClasses}`}>
            <span className="text-slate-400 block">Ventana Δt</span>
            <span className="font-mono text-emerald-500 font-semibold text-sm">{dt.toFixed(3)} s</span>
          </div>
          <div className={`p-2 rounded-lg border ${metricBoxClasses}`}>
            <span className="text-slate-400 block">Velocidad Promedio</span>
            <span className="font-mono text-amber-500 font-semibold text-sm">{vProm.toFixed(2)} ft/s</span>
          </div>
          <div className={`p-2 rounded-lg border ${metricBoxClasses}`}>
            <span className="text-slate-400 block">Velocímetro Instantáneo</span>
            <span className="font-mono text-rose-500 font-semibold text-sm">{vInst.toFixed(2)} ft/s</span>
          </div>
        </div>

        <div className={`mt-3 flex items-center gap-4 ${isDark ? 'border-t border-slate-800 pt-2' : 'border-t border-slate-100 pt-2'}`}>
          <label htmlFor="dt-slider" className="text-xs text-slate-500 dark:text-slate-300 whitespace-nowrap shrink-0">
            Ajustar ventana Δt:
          </label>
          <input
            id="dt-slider"
            type="range"
            min="0.01"
            max="1.5"
            step="0.02"
            value={h}
            onChange={(e) => setH(parseFloat(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: currentTheme.hex }}
          />
          <span className="font-mono text-xs font-semibold" style={{ color: currentTheme.hex }}>{h.toFixed(2)}s</span>
        </div>
      </div>
    );
  }

  // 3. Render Differentiability vs Continuity Atlas
  if (type === 'continuity_corner') {
    const minX = -2;
    const maxX = 2;
    const minY = -1;
    const maxY = 2.5;

    const renderFunc = () => {
      const pts: string[] = [];
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const x = minX + (i / steps) * (maxX - minX);
        let y = 0;
        if (cornerTab === 'abs') {
          y = Math.abs(x);
        } else if (cornerTab === 'cusp') {
          y = Math.pow(Math.abs(x), 2 / 3);
        } else if (cornerTab === 'vertical') {
          y = Math.cbrt(x);
        } else if (cornerTab === 'jump') {
          y = x < 0 ? -0.5 : 1.2;
        }
        pts.push(`${toSvgX(x, minX, maxX)},${toSvgY(y, minY, maxY)}`);
      }
      return pts.join(' ');
    };

    return (
      <div className={`border rounded-xl p-4 ${cardClasses}`}>
        <div className={`flex flex-wrap items-center justify-between gap-2 mb-3 border-b pb-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <h4 className={`font-semibold text-sm ${currentTheme.accentText}`}>Atlas de Singularidades: Casos de No Derivabilidad</h4>
          <div className={`flex gap-1 p-1 rounded-lg border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            <button
              onClick={() => setCornerTab('abs')}
              className={`px-2.5 py-1 rounded transition-colors ${cornerTab === 'abs' ? `${currentTheme.primaryBg} text-white font-medium` : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            >
              1. Esquina |x|
            </button>
            <button
              onClick={() => setCornerTab('cusp')}
              className={`px-2.5 py-1 rounded transition-colors ${cornerTab === 'cusp' ? `${currentTheme.primaryBg} text-white font-medium` : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            >
              2. Cúspide
            </button>
            <button
              onClick={() => setCornerTab('vertical')}
              className={`px-2.5 py-1 rounded transition-colors ${cornerTab === 'vertical' ? `${currentTheme.primaryBg} text-white font-medium` : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            >
              3. Tangente Vertical
            </button>
            <button
              onClick={() => setCornerTab('jump')}
              className={`px-2.5 py-1 rounded transition-colors ${cornerTab === 'jump' ? `${currentTheme.primaryBg} text-white font-medium` : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            >
              4. Salto
            </button>
          </div>
        </div>

        <div className={`relative overflow-hidden rounded-lg border ${svgBgClasses}`}>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Axes */}
            <line
              x1={padding}
              y1={toSvgY(0, minY, maxY)}
              x2={width - padding}
              y2={toSvgY(0, minY, maxY)}
              stroke={axisColor}
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0, minX, maxX)}
              y1={height - padding}
              x2={toSvgX(0, minX, maxX)}
              y2={padding}
              stroke={axisColor}
              strokeWidth="1.5"
            />

            {cornerTab !== 'jump' && (
              <polyline
                fill="none"
                stroke={currentTheme.graphStroke}
                strokeWidth="2.5"
                points={renderFunc()}
              />
            )}

            {cornerTab === 'jump' && (
              <>
                <line
                  x1={toSvgX(minX, minX, maxX)}
                  y1={toSvgY(-0.5, minY, maxY)}
                  x2={toSvgX(0, minX, maxX)}
                  y2={toSvgY(-0.5, minY, maxY)}
                  stroke={currentTheme.graphStroke}
                  strokeWidth="2.5"
                />
                <circle cx={toSvgX(0, minX, maxX)} cy={toSvgY(-0.5, minY, maxY)} r="4" fill={isDark ? '#020617' : '#ffffff'} stroke={currentTheme.graphStroke} strokeWidth="2" />
                <line
                  x1={toSvgX(0, minX, maxX)}
                  y1={toSvgY(1.2, minY, maxY)}
                  x2={toSvgX(maxX, minX, maxX)}
                  y2={toSvgY(1.2, minY, maxY)}
                  stroke={currentTheme.graphStroke}
                  strokeWidth="2.5"
                />
                <circle cx={toSvgX(0, minX, maxX)} cy={toSvgY(1.2, minY, maxY)} r="4" fill={currentTheme.graphStroke} stroke="#ffffff" strokeWidth="1.5" />
              </>
            )}

            {/* Lateral slopes indicators for |x| */}
            {cornerTab === 'abs' && (
              <>
                <line
                  x1={toSvgX(-1.5, minX, maxX)}
                  y1={toSvgY(1.5, minY, maxY)}
                  x2={toSvgX(0, minX, maxX)}
                  y2={toSvgY(0, minY, maxY)}
                  stroke="#f43f5e"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <line
                  x1={toSvgX(0, minX, maxX)}
                  y1={toSvgY(0, minY, maxY)}
                  x2={toSvgX(1.5, minX, maxX)}
                  y2={toSvgY(1.5, minY, maxY)}
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <text x={toSvgX(-1, minX, maxX)} y={toSvgY(1.3, minY, maxY)} fill="#f43f5e" fontSize="12" fontFamily="IBM Plex Mono" fontWeight="bold">
                  m_izq = -1
                </text>
                <text x={toSvgX(0.7, minX, maxX)} y={toSvgY(1.3, minY, maxY)} fill="#10b981" fontSize="12" fontFamily="IBM Plex Mono" fontWeight="bold">
                  m_der = +1
                </text>
                <circle cx={toSvgX(0, minX, maxX)} cy={toSvgY(0, minY, maxY)} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              </>
            )}
          </svg>
        </div>

        <div className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed ${metricBoxClasses}`}>
          {cornerTab === 'abs' && (
            <p>
              <strong className="text-amber-500 font-semibold">Punto Anguloso en x = 0:</strong> f(x) = |x| es continua en 0, pero las derivadas laterales no concuerdan (f&apos;_-(0) = -1 ≠ f&apos;_+(0) = +1). La gráfica tiene una esquina picuda sin tangente única.
            </p>
          )}
          {cornerTab === 'cusp' && (
            <p>
              <strong className="text-amber-500 font-semibold">Cúspide en x = 0:</strong> f(x) = x^(2/3) presenta un afilamiento infinito; f&apos;_-(0) → -∞ y f&apos;_+(0) → +∞ con signos opuestos.
            </p>
          )}
          {cornerTab === 'vertical' && (
            <p>
              <strong className="text-amber-500 font-semibold">Tangente Vertical en x = 0:</strong> f(x) = ∛x tiene recta tangente geométrica x = 0, pero su pendiente analítica f&apos;(0) = lim 1/(3 ∛x²) = +∞ no es un número real finito.
            </p>
          )}
          {cornerTab === 'jump' && (
            <p>
              <strong className="text-amber-500 font-semibold">Discontinuidad de Salto:</strong> Al fallar la continuidad fundamental, el contra-recíproco del teorema garantiza que la función jamás puede ser derivable.
            </p>
          )}
        </div>
      </div>
    );
  }

  // 4. Render Dual Curve Polynomial f(x) and f'(x)
  if (type === 'rules_polynomial') {
    const minX = -2.5;
    const maxX = 2.5;
    const minY = -4;
    const maxY = 4;

    const f_poly = (x: number) => x * x * x - 3 * x;
    const df_poly = (x: number) => 3 * x * x - 3;

    const curvePointsF: string[] = [];
    const curvePointsDF: string[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const x = minX + (i / steps) * (maxX - minX);
      curvePointsF.push(`${toSvgX(x, minX, maxX)},${toSvgY(f_poly(x), minY, maxY)}`);
      curvePointsDF.push(`${toSvgX(x, minX, maxX)},${toSvgY(df_poly(x), minY, maxY)}`);
    }

    const curY = f_poly(polyX);
    const curM = df_poly(polyX);

    return (
      <div className={`border rounded-xl p-4 ${cardClasses}`}>
        <div className={`flex items-center justify-between mb-3 border-b pb-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div>
            <h4 className={`font-semibold text-sm ${currentTheme.accentText}`}>Dualidad: Curva f(x) vs. Curva Derivada f&apos;(x)</h4>
            <p className="text-xs text-slate-400">
              <span className="font-semibold" style={{ color: currentTheme.hex }}>Línea sólida: f(x) = x³ - 3x</span> ·{' '}
              <span className="text-rose-500 font-semibold">Línea discontinua: f&apos;(x) = 3x² - 3</span>
            </p>
          </div>
          <div className={`text-xs font-mono px-3 py-1 rounded border ${metricBoxClasses}`}>
            Pendiente m = {curM.toFixed(2)}
          </div>
        </div>

        <div className={`relative overflow-hidden rounded-lg border ${svgBgClasses}`}>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Zero axes */}
            <line
              x1={padding}
              y1={toSvgY(0, minY, maxY)}
              x2={width - padding}
              y2={toSvgY(0, minY, maxY)}
              stroke={axisColor}
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0, minX, maxX)}
              y1={height - padding}
              x2={toSvgX(0, minX, maxX)}
              y2={padding}
              stroke={axisColor}
              strokeWidth="1.5"
            />

            {/* Critical points vertical markers */}
            {[-1, 1].map((c) => (
              <g key={`crit-${c}`}>
                <line
                  x1={toSvgX(c, minX, maxX)}
                  y1={padding}
                  x2={toSvgX(c, minX, maxX)}
                  y2={height - padding}
                  stroke="#10b981"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx={toSvgX(c, minX, maxX)} cy={toSvgY(0, minY, maxY)} r="4" fill="#10b981" />
                <circle cx={toSvgX(c, minX, maxX)} cy={toSvgY(f_poly(c), minY, maxY)} r="5" fill={currentTheme.graphStroke} />
              </g>
            ))}

            {/* f(x) curve */}
            <polyline fill="none" stroke={currentTheme.graphStroke} strokeWidth="2.5" points={curvePointsF.join(' ')} />

            {/* f'(x) curve */}
            <polyline fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 3" points={curvePointsDF.join(' ')} />

            {/* Tangent line at current polyX */}
            <line
              x1={toSvgX(polyX - 0.8, minX, maxX)}
              y1={toSvgY(curY + curM * -0.8, minY, maxY)}
              x2={toSvgX(polyX + 0.8, minX, maxX)}
              y2={toSvgY(curY + curM * 0.8, minY, maxY)}
              stroke="#f59e0b"
              strokeWidth="2.5"
            />

            {/* Current point */}
            <circle cx={toSvgX(polyX, minX, maxX)} cy={toSvgY(curY, minY, maxY)} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>

        <div className={`mt-3 flex items-center gap-4 ${isDark ? 'border-t border-slate-800 pt-2' : 'border-t border-slate-100 pt-2'}`}>
          <label htmlFor="polyx-slider" className="text-xs text-slate-500 dark:text-slate-300 whitespace-nowrap shrink-0">
            Deslizar punto x₀:
          </label>
          <input
            id="polyx-slider"
            type="range"
            min="-2.0"
            max="2.0"
            step="0.05"
            value={polyX}
            onChange={(e) => setPolyX(parseFloat(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: currentTheme.hex }}
          />
          <span className="font-mono text-xs font-semibold" style={{ color: currentTheme.hex }}>{polyX.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  // 5. Render Projectile Motion
  const minT = 0;
  const maxT = 6.2;
  const minS = 0;
  const maxS = 240;

  const s_proj = (t: number) => -16 * t * t + 64 * t + 160;

  const projPoints: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * 5.74;
    projPoints.push(`${toSvgX(t, minT, maxT)},${toSvgY(s_proj(t), minS, maxS)}`);
  }

  return (
    <div className={`border rounded-xl p-4 ${cardClasses}`}>
      <div className={`flex items-center justify-between mb-3 border-b pb-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div>
          <h4 className={`font-semibold text-sm ${currentTheme.accentText}`}>Trayectoria Balística: s(t) = -16t² + 64t + 160</h4>
          <p className="text-xs text-slate-400">Vértice en t = 2s (h_máx = 224 ft, v = 0) · Impacto en t = 5.74s (v = -119.7 ft/s)</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">
            v(t) = -32t + 64
          </span>
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-lg border ${svgBgClasses}`}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
          {/* Axes */}
          <line x1={padding} y1={toSvgY(0, minS, maxS)} x2={width - padding} y2={toSvgY(0, minS, maxS)} stroke={axisColor} strokeWidth="1.5" />
          <line x1={toSvgX(0, minT, maxT)} y1={height - padding} x2={toSvgX(0, minT, maxT)} y2={padding} stroke={axisColor} strokeWidth="1.5" />

          {/* Time markers */}
          {[1, 2, 3, 4, 5].map((t) => (
            <text key={`pt-${t}`} x={toSvgX(t, minT, maxT)} y={height - padding + 18} fill={textMuted} fontSize="10" textAnchor="middle" fontFamily="IBM Plex Mono">
              {t}s
            </text>
          ))}

          {/* Parabola */}
          <polyline fill="none" stroke={currentTheme.graphStroke} strokeWidth="2.5" points={projPoints.join(' ')} />

          {/* Vertex horizontal tangent */}
          <line
            x1={toSvgX(1.0, minT, maxT)}
            y1={toSvgY(224, minS, maxS)}
            x2={toSvgX(3.0, minT, maxT)}
            y2={toSvgY(224, minS, maxS)}
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <circle cx={toSvgX(2, minT, maxT)} cy={toSvgY(224, minS, maxS)} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <text x={toSvgX(2, minT, maxT)} y={toSvgY(224, minS, maxS) - 10} fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">
            Cénit (2s, 224 ft) · v = 0
          </text>

          {/* Ground impact */}
          <circle cx={toSvgX(5.74, minT, maxT)} cy={toSvgY(0, minS, maxS)} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
          <text x={toSvgX(5.74, minT, maxT) - 25} y={toSvgY(0, minS, maxS) - 10} fill="#f43f5e" fontSize="11" fontWeight="bold">
            Suelo t = 5.74s
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
        <div className={`p-2.5 rounded-lg border ${metricBoxClasses}`}>
          <span className="text-slate-400 block">Fase 1: Ascenso (0 ≤ t &lt; 2s)</span>
          <span className="font-mono font-semibold text-sm" style={{ color: currentTheme.hex }}>
            v(t) &gt; 0, a = -32
          </span>
        </div>
        <div className={`p-2.5 rounded-lg border ${metricBoxClasses}`}>
          <span className="text-slate-400 block">Fase 2: Altura Máx (t = 2s)</span>
          <span className="font-mono text-emerald-500 font-semibold text-sm">v(2) = 0 ft/s</span>
        </div>
        <div className={`p-2.5 rounded-lg border ${metricBoxClasses}`}>
          <span className="text-slate-400 block">Fase 3: Descenso (2 &lt; t ≤ 5.74s)</span>
          <span className="font-mono text-rose-500 font-semibold text-sm">v(t) &lt; 0 (Acelerado)</span>
        </div>
      </div>
    </div>
  );
};
