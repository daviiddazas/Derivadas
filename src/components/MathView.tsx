import React, { useMemo } from 'react';
import katex from 'katex';
import { useTheme } from '../context/ThemeContext';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const { isDark } = useTheme();

  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  const textColorClass = isDark ? 'text-slate-100' : 'text-slate-900';

  return (
    <span
      className={`${block ? 'block my-3 text-center overflow-x-auto py-1' : 'inline'} ${textColorClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
