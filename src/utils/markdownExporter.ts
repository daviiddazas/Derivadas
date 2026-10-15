import { SLIDES_DATA, SlideItem } from '../data/slidesData';

export function generateSlideMarkdown(slide: SlideItem): string {
  let md = `## Diapositiva ${slide.slideNumber}: ${slide.title}\n\n`;
  md += `*${slide.subtitle}*\n\n`;
  md += `**Módulo:** ${slide.module}\n\n`;

  // 1. Contenido conceptual
  md += `### 1. Contenido Conceptual Profundo y Riguroso\n\n`;
  md += `> **Tesis Epistemológica:** ${slide.conceptualContent.thesis}\n\n`;

  slide.conceptualContent.sections.forEach((sec) => {
    md += `#### ${sec.heading}\n\n`;
    sec.paragraphs.forEach((p) => {
      md += `${p}\n\n`;
    });
    if (sec.mathBlocks) {
      sec.mathBlocks.forEach((mb) => {
        md += `$$\n${mb}\n$$\n\n`;
      });
    }
    if (sec.afterMathParagraphs) {
      sec.afterMathParagraphs.forEach((p) => {
        md += `${p}\n\n`;
      });
    }
    if (sec.bullets) {
      sec.bullets.forEach((b) => {
        md += `- ${b}\n`;
      });
      md += `\n`;
    }
  });

  // 2. Representación visual
  md += `### 2. Representación Visual o Descripción Gráfica Recomendada\n\n`;
  md += `**${slide.visualRepresentation.title}**\n\n`;
  md += `${slide.visualRepresentation.description}\n\n`;
  md += `**Elementos a Ilustrar en el Plano Cartesiano:**\n`;
  slide.visualRepresentation.elementsToDraw.forEach((elem) => {
    md += `- ${elem}\n`;
  });
  md += `\n*Clave Pedagógica Visual:* ${slide.visualRepresentation.pedagogicalInsight}\n\n`;

  // 3. Ejemplo práctico resuelto paso a paso
  if (slide.stepByStepExample) {
    md += `### 3. Ejemplo Práctico Resuelto Paso a Paso (Algebraico y Geométrico)\n\n`;
    md += `**Problema:** ${slide.stepByStepExample.statement}\n\n`;
    slide.stepByStepExample.algebraicSteps.forEach((step) => {
      md += `**Paso ${step.stepNumber}: ${step.label}**\n`;
      md += `$$\n${step.math}\n$$\n`;
      md += `*Justificación Teórica:* ${step.deduction}\n\n`;
    });
    md += `**Interpretación Geométrica:** ${slide.stepByStepExample.geometricInterpretation}\n\n`;
    md += `**Conclusión Analítica:** ${slide.stepByStepExample.conclusion}\n\n`;
  }

  // 4. Reto o Ejercicio Propuesto para el Estudiante
  if (slide.proposedExercise) {
    md += `### 4. Ejercicio y Reto Propuesto para el Estudiante (Práctica Activa)\n\n`;
    md += `**Enunciado:** ${slide.proposedExercise.statement}\n\n`;
    md += `*Analogía Cotidiana / Intuición Real:* ${slide.proposedExercise.everydayAnalogy}\n\n`;
    md += `*Pista Metodológica:* ${slide.proposedExercise.hint}\n\n`;
    md += `#### Solución Paso a Paso del Reto:\n\n`;
    slide.proposedExercise.solutionSteps.forEach((step) => {
      md += `**Paso ${step.stepNumber}: ${step.label}**\n`;
      md += `$$\n${step.math}\n$$\n`;
      md += `*Deducción:* ${step.deduction}\n\n`;
    });
    md += `**Respuesta Definitiva de Verificación:** ${slide.proposedExercise.finalAnswer}\n\n`;
  }

  // 5. Preguntas de reflexión
  if (slide.reflectionQuestions && slide.reflectionQuestions.length > 0) {
    md += `### 4. Preguntas de Reflexión o Autoevaluación para la Audiencia\n\n`;
    slide.reflectionQuestions.forEach((q, idx) => {
      md += `${idx + 1}. **«${q.question}»**\n`;
      md += `   - *Objetivo Pedagógico:* ${q.pedagogicalGoal}\n`;
      md += `   - *Disparador de Reflexión:* ${q.promptToThink}\n\n`;
    });
  }

  // Verification questions (Slide 9)
  if (slide.verificationQuestions && slide.verificationQuestions.length > 0) {
    md += `### Cuestionario de Verificación Conceptual (4 Preguntas Clave)\n\n`;
    slide.verificationQuestions.forEach((q, idx) => {
      md += `**Pregunta ${idx + 1}:** ${q.question}\n\n`;
      q.options.forEach((opt) => {
        md += `- **${opt.key})** ${opt.text}\n`;
      });
      md += `\n`;
    });

    md += `### Patrón Oficial de Corrección y Rúbrica Explicativa\n\n`;
    slide.verificationQuestions.forEach((q, idx) => {
      md += `#### Pregunta ${idx + 1}: Clave Correcta [${q.correctKey}]\n\n`;
      md += `- **Sustentación Analítica:** ${q.rigorousExplanation}\n`;
      md += `- **Preconcepción Errónea Común:** ${q.commonMisconception}\n\n`;
    });
  }

  // References APA 7 (Slide 10)
  if (slide.referencesAPA && slide.referencesAPA.length > 0) {
    md += `### Referencias Bibliográficas en Formato APA 7ma Edición\n\n`;
    slide.referencesAPA.forEach((ref) => {
      md += `- ${ref.citation}\n`;
      md += `  *Aporte curricular:* ${ref.annotation}\n`;
      if (ref.doiOrIsbn) {
        md += `  *Identificador:* ${ref.doiOrIsbn}\n`;
      }
      md += `\n`;
    });
  }

  md += `---\n\n`;
  return md;
}

export function generateFullPresentationMarkdown(): string {
  let full = `# Cátedra Magistral: Fundamentos de la Derivada y la Recta Tangente\n`;
  full += `**Profesor Titular de Matemáticas Superiores y Diseño Instruccional**\n\n`;
  full += `Plataforma Universitaria de Cálculo Diferencial · 10 Diapositivas Académicas Rigurosas\n\n`;
  full += `---\n\n`;

  SLIDES_DATA.forEach((s) => {
    full += generateSlideMarkdown(s);
  });

  return full;
}
