export interface SlideItem {
  id: number;
  slideNumber: number;
  title: string;
  subtitle: string;
  module: string;
  conceptualContent: {
    thesis: string;
    sections: {
      heading: string;
      paragraphs: string[];
      mathBlocks?: string[];
      afterMathParagraphs?: string[];
      bullets?: string[];
    }[];
  };
  visualRepresentation: {
    title: string;
    description: string;
    elementsToDraw: string[];
    pedagogicalInsight: string;
    interactiveType?: 'secant_to_tangent' | 'rates_of_change' | 'continuity_corner' | 'rules_polynomial' | 'physics_projectile';
  };
  stepByStepExample: {
    statement: string;
    algebraicSteps: {
      stepNumber: number;
      label: string;
      math: string;
      deduction: string;
    }[];
    geometricInterpretation: string;
    conclusion: string;
  };
  proposedExercise?: {
    statement: string;
    everydayAnalogy: string;
    hint: string;
    solutionSteps: {
      stepNumber: number;
      label: string;
      math: string;
      deduction: string;
    }[];
    finalAnswer: string;
  };
  reflectionQuestions: {
    question: string;
    pedagogicalGoal: string;
    promptToThink: string;
  }[];
  verificationQuestions?: {
    id: number;
    question: string;
    options: { key: string; text: string }[];
    correctKey: string;
    rigorousExplanation: string;
    commonMisconception: string;
  }[];
  referencesAPA?: {
    citation: string;
    annotation: string;
    doiOrIsbn?: string;
  }[];
}

export const SLIDES_DATA: SlideItem[] = [
  {
    id: 1,
    slideNumber: 1,
    title: "Cátedra de Cálculo Diferencial: Fundamentos de la Derivada",
    subtitle: "Del Problema de la Tangente a la Mecánica Clásica y la Rigurosidad del Límite",
    module: "Apertura & Objetivos de Aprendizaje",
    conceptualContent: {
      thesis: "La derivada no es un mero algoritmo de manipulación algebraica, sino la culminación analítica de dos problemas históricos gemelos: el problema geométrico de determinar la pendiente de la recta tangente a una curva en un punto arbitrario (Fermat, Descartes, Leibniz), y el problema cinemático de caracterizar el cambio instantáneo de una magnitud física en continuo movimiento (Galileo, Newton).",
      sections: [
        {
          heading: "Contextualización Epistemológica",
          paragraphs: [
            "Durante siglos, la geometría euclidiana clásica definió la recta tangente exclusivamente para la circunferencia como aquella recta que 'toca' a la curva en un único punto y se mantiene enteramente de un lado de ella. Sin embargo, para curvas algebraicas y trascendentes de orden superior, esta definición colapsa: una recta tangente puede cortar a la curva en múltiples puntos distantes, e incluso atravesarla en su punto de contacto (como ocurre en los puntos de inflexión de f(x) = x³).",
            "La solución rigurosa requirió sustituir la propiedad estática de intersección única por el concepto dinámico de paso al límite del cociente de diferencias formulado sobre una familia infinita de rectas secantes."
          ],
          mathBlocks: [
            "\\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x} = \\lim_{h \\to 0} \\frac{f(x_0+h) - f(x_0)}{h} = f'(x_0) = \\left. \\frac{dy}{dx} \\right|_{x=x_0}"
          ]
        },
        {
          heading: "Objetivos de Aprendizaje Operacionales (Taxonomía de Bloom Superior)",
          paragraphs: [
            "Al término de esta lección magistral, el estudiante de ciencias e ingeniería habrá consolidado competencias clave:"
          ],
          bullets: [
            "Deducir e interpretar formalmente la derivada a partir del límite del cociente de Fermat-Newton, identificando rigurosamente cada indeterminación 0/0.",
            "Diferenciar ontológica y cuantitativamente entre tasas de cambio promedio en intervalos compactos [a, b] y tasas de cambio instantáneas en puntos singulares.",
            "Analizar las condiciones de existencia de la derivada mediante el teorema de derivabilidad e identificar patologías: discontinuidades, esquinas, cúspides y tangentes verticales.",
            "Demostrar formalmente las reglas de derivación elementales y avanzadas (potencia, producto, cociente, regla de la cadena), desmitificando errores históricos como el de Leibniz de 1675.",
            "Modelar problemas cinemáticos de optimización y tasas relacionadas, verificando la consistencia dimensional y geométrica de cada resultado."
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Diagrama Cartesiano Dual: Geometría vs. Cinemática",
      description: "Esquema conceptual en dos paneles cartesianos paralelos compartiendo la misma estructura analítica.",
      elementsToDraw: [
        "Panel A (Geometría): Curva continua suave y = f(x), punto fijo P(x₀, f(x₀)), punto móvil Q(x₀+h, f(x₀+h)), recta secante secante PQ y recta tangente final T.",
        "Panel B (Cinemática): Gráfica posición-tiempo s = f(t), vector velocidad media v_prom entre t₀ y t₀+Δt, y flecha de velocidad instantánea v(t₀) que converge exactamente a la pendiente de la tangente.",
        "Anotaciones de cota: Marcar explícitamente el incremento horizontal Δx = h y el incremento vertical Δy = f(x₀+h) - f(x₀), formando el triángulo diferencial de Leibniz."
      ],
      pedagogicalInsight: "Demostrar visualmente que la física newtoniana del movimiento rectilíneo y la geometría leibniziana de tangentes son 'gemelos idénticos' bajo el microscopio infinitesimal."
    },
    stepByStepExample: {
      statement: "Planteamiento introductorio: Verificación de la no adecuación de la definición estática de Euclides para la curva cúbica f(x) = x³ en x₀ = 0.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Evaluación de la recta tangente conjeturada",
          math: "y = 0 \\quad \\text{(Eje horizontal x)}",
          deduction: "La recta horizontal pasa por el punto P(0,0). La función f(x) = x³ cambia de signo: para x < 0, f(x) < 0 (la curva está por debajo del eje); para x > 0, f(x) > 0 (la curva está por encima del eje)."
        },
        {
          stepNumber: 2,
          label: "Cálculo analítico del límite de la pendiente",
          math: "m_{\\text{tan}} = \\lim_{h \\to 0} \\frac{f(0+h) - f(0)}{h} = \\lim_{h \\to 0} \\frac{h^3 - 0}{h} = \\lim_{h \\to 0} h^2 = 0",
          deduction: "El límite existe y vale exactamente 0. Por tanto, la recta tangente en (0,0) es y - 0 = 0(x - 0) \\implies y = 0."
        },
        {
          stepNumber: 3,
          label: "Contradicción con la definición de Euclides",
          math: "y = 0 \\cap \\{(x, x^3) : x \\in \\mathbb{R}\\} = \\{(0,0)\\}",
          deduction: "Aunque la intersección local es única en (0,0), la recta atraviesa transversalmente la curva y no se sitúa a un solo lado de ella. Para Euclides no sería tangente, pero para el cálculo diferencial sí lo es debido a su contacto de orden superior (punto de inflexión)."
        }
      ],
      geometricInterpretation: "La recta tangente representa la mejor aproximación lineal local: si aumentamos el zoom de forma ilimitada alrededor de (0,0), la curva y = x³ se aplana ópticamente y se confunde visualmente con la recta y = 0.",
      conclusion: "La tangencia debe definirse por el comportamiento del límite de rectas secantes y no por restricciones globales de intersección."
    },
    proposedExercise: {
      statement: "Considere la curva f(x) = x² y la recta candidata y = 2x - 1. Demuestre analíticamente mediante el límite del cociente de diferencias si dicha recta es efectivamente la recta tangente a la parábola en el punto P(1, 1). Verifique si la recta corta a la curva en algún otro punto del plano cartesiano.",
      everydayAnalogy: "Piense en la rueda de una bicicleta apoyada sobre el pavimento nivelado: en ese único milímetro de contacto, la curvatura de la llanta y la línea recta del suelo comparten exactamente la misma inclinación instantánea sin traspasarse.",
      hint: "Encuentre la pendiente teórica m_tan = lim_{h→0} [f(1+h) - f(1)] / h. Luego construya la ecuación cartesiana de la recta tangente y resuelva el sistema algebraico de intersección x² = 2x - 1.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Evaluación de la ordenada en el punto de contacto",
          math: "f(1) = 1^2 = 1 \\implies P(1, 1)",
          deduction: "El punto pertenece tanto a la parábola f(1)=1 como a la recta y = 2(1) - 1 = 1."
        },
        {
          stepNumber: 2,
          label: "Cálculo formal de la pendiente mediante el cociente de diferencias",
          math: "m_{\\text{tan}} = \\lim_{h \\to 0} \\frac{(1+h)^2 - 1}{h} = \\lim_{h \\to 0} \\frac{1 + 2h + h^2 - 1}{h} = \\lim_{h \\to 0} (2 + h) = 2",
          deduction: "Cancelamos el factor infinitesimal h no nulo (h ≠ 0) para disolver la indeterminación 0/0, obteniendo m = 2."
        },
        {
          stepNumber: 3,
          label: "Construcción de la ecuación punto-pendiente de la tangente",
          math: "y - 1 = 2(x - 1) \\implies y = 2x - 2 + 1 \\implies y = 2x - 1",
          deduction: "La ecuación deducida por cálculo infinitesimal coincide exactamente con la recta candidata."
        },
        {
          stepNumber: 4,
          label: "Análisis algebraico de intersección global con la curva",
          math: "x^2 = 2x - 1 \\implies x^2 - 2x + 1 = 0 \\implies (x - 1)^2 = 0 \\implies x = 1 \\text{ (raíz doble)}",
          deduction: "El trinomio cuadrado perfecto produce una raíz real con multiplicidad 2 (contacto tangencial de orden 1), confirmando que no existe ningún otro punto de corte en todo el plano real."
        }
      ],
      finalAnswer: "La recta y = 2x - 1 es efectivamente la recta tangente en (1, 1). Posee contacto tangencial de orden 1 (raíz doble en x = 1) y no corta la parábola en ningún otro punto."
    },
    reflectionQuestions: [
      {
        question: "¿Por qué un velocímetro vehicular marca una cantidad precisa en un instante exacto si para recorrer una distancia se requiere obligatoriamente que transcurra un intervalo de tiempo no nulo?",
        pedagogicalGoal: "Provocar la paradoja de Zenón sobre el movimiento instantáneo y justificar la necesidad del concepto de límite.",
        promptToThink: "Considere qué ocurre cuando el lapso temporal Δt se hace arbitrariamente pequeño sin llegar a ser cero en el cociente."
      },
      {
        question: "¿Puede una recta tangente cortar a una función en más de un punto a lo largo de todo el dominio real?",
        pedagogicalGoal: "Erradicar la falsa noción escolar de que 'tangente significa tocar en un solo punto del plano'.",
        promptToThink: "Trace mentalmente la recta tangente en un máximo local de una onda senoidal f(x) = sen(x); ¿cuántas veces corta esa recta horizontal a la función?"
      }
    ]
  },
  {
    id: 2,
    slideNumber: 2,
    title: "El Problema de la Recta Tangente: Intuición Geométrica",
    subtitle: "El Tránsito Analítico de la Secante a la Tangente como Proceso Límite Dinámico",
    module: "Fundamentación Geométrica",
    conceptualContent: {
      thesis: "Sea y = f(x) la gráfica continua de una función en un intervalo abierto I. La recta secante que une los puntos P(c, f(c)) y Q(c+h, f(c+h)) tiene una pendiente determinada por el cociente incremental m_sec = [f(c+h) - f(c)] / h. La recta tangente en P es la posición límite hacia la cual rota la secante conforme el punto móvil Q se aproxima a P a lo largo de la curva (h → 0).",
      sections: [
        {
          heading: "Deducción de la Pendiente de la Secante",
          paragraphs: [
            "Consideremos dos puntos sobre la curva y = f(x): el punto de interés fijo P(c, f(c)) y un punto auxiliar variable Q(c+h, f(c+h)), con h ≠ 0.",
            "La variación en la abscisa es el incremento horizontal Δx = (c + h) - c = h.",
            "La variación correspondiente en la ordenada es el incremento vertical Δy = f(c + h) - f(c).",
            "La pendiente m_sec de la recta que interseca a la curva en ambos puntos viene dada por la clásica razón trigonométrica de elevación sobre avance:"
          ],
          mathBlocks: [
            "m_{\\text{sec}} = \\frac{\\Delta y}{\\Delta x} = \\frac{f(c+h) - f(c)}{h}"
          ]
        },
        {
          heading: "El Paso al Límite y la Definición Formal de la Pendiente Tangente",
          paragraphs: [
            "Cuando el punto Q se desliza a lo largo del trazo de f(x) en dirección a P, la distancia horizontal h decrece hacia 0. No es admisible evaluar simplemente h = 0, pues resultaría en el cociente indeterminado 0/0.",
            "Por ende, se define la pendiente de la recta tangente m_tan como el valor límite que adquiere dicho cociente al aproximarse h infinitesimalmente a cero, siempre que este límite exista como número real finito:"
          ],
          mathBlocks: [
            "m_{\\text{tan}} = \\lim_{h \\to 0} m_{\\text{sec}} = \\lim_{h \\to 0} \\frac{f(c+h) - f(c)}{h}",
            "\\mathcal{L}_{\\text{tan}}: \\quad y - f(c) = m_{\\text{tan}} \\cdot (x - c)"
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Construcción Geométrica del Haz de Secantes Convergentes",
      description: "Plano cartesiano con curva f(x) = x², punto fijo P(2,4) y puntos móviles Q₁, Q₂, Q₃ correspondientes a h = 1, h = 0.5, h = 0.1.",
      elementsToDraw: [
        "Curva parabólica y = x² graficada en color azul índigo en el intervalo [0, 3.5].",
        "Punto fijo P(2,4) destacado con marcador esférico azul.",
        "Sucesión de puntos Q₁, Q₂, Q₃ sobre la curva con líneas segmentadas de color ámbar y cian, mostrando las secantes sucesivas.",
        "Triángulo rectángulo característico con catetos etiquetados: base Δx = h y altura Δy = f(c+h) - f(c).",
        "Recta tangente final trazada en color carmesí continuo con su ecuación y = 4x - 4, pasando tangente en (2,4)."
      ],
      pedagogicalInsight: "Ilustrar cómo el haz de rectas secantes gira continuamente y colapsa en una posición de reposo angular único cuando Q coincide dinámicamente con P.",
      interactiveType: 'secant_to_tangent'
    },
    stepByStepExample: {
      statement: "Encuentre la pendiente y la ecuación cartesiana punto-pendiente de la recta tangente a la parábola f(x) = x² en el punto P(2, 4).",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Planteamiento del cociente de diferencias en c = 2",
          math: "m_{\\text{sec}}(h) = \\frac{f(2+h) - f(2)}{h} = \\frac{(2+h)^2 - (2)^2}{h}",
          deduction: "Sustituimos el argumento (2 + h) en la regla de correspondencia cuadrática y restamos la imagen f(2) = 4."
        },
        {
          stepNumber: 2,
          label: "Desarrollo del binomio al cuadrado",
          math: "(2+h)^2 - 4 = (4 + 4h + h^2) - 4 = 4h + h^2",
          deduction: "El término independiente 4 se cancela con -f(2) = -4, eliminando la constante aislada en el numerador."
        },
        {
          stepNumber: 3,
          label: "Factorización de la indeterminación",
          math: "m_{\\text{sec}}(h) = \\frac{h(4 + h)}{h} = 4 + h \\quad (\\text{para todo } h \\neq 0)",
          deduction: "Puesto que h se aproxima a cero pero nunca es idénticamente cero durante el proceso de límite, podemos cancelar el factor común h del numerador y denominador."
        },
        {
          stepNumber: 4,
          label: "Evaluación analítica del límite",
          math: "m_{\\text{tan}} = \\lim_{h \\to 0} (4 + h) = 4 + 0 = 4",
          deduction: "La pendiente de la recta tangente en el punto (2,4) es exactamente 4."
        },
        {
          stepNumber: 5,
          label: "Construcción de la ecuación punto-pendiente",
          math: "y - y_0 = m(x - x_0) \\implies y - 4 = 4(x - 2) \\implies y = 4x - 4",
          deduction: "Recta lineal que pasa por (2,4) con pendiente positiva pronunciada m = 4, con intersección en el eje y en (0, -4)."
        }
      ],
      geometricInterpretation: "Para h = 1, la secante une (2,4) y (3,9) con pendiente (9-4)/1 = 5. Para h = 0.1, une (2,4) y (2.1, 4.41) con pendiente (0.41)/0.1 = 4.1. Conforme h → 0, las pendientes numéricas {5; 4.5; 4.1; 4.01; ...} convergen al valor exacto 4.",
      conclusion: "La pendiente m_tan = 4 mide la inclinación geométrica instantánea de la parábola en el punto (2,4)."
    },
    proposedExercise: {
      statement: "Calcule la pendiente y la ecuación de la recta tangente a la parábola invertida f(x) = -x² + 2x + 2 en el punto donde la abscisa es x = 1.",
      everydayAnalogy: "Imagine la cresta redondeada de una colina en un sendero de montaña: en el punto culminante exacto, el suelo se nivela momentáneamente de forma perfectamente horizontal antes de descender.",
      hint: "Calcule f(1) para obtener el punto de contacto P(1, f(1)). Luego plantee el cociente incremental m_sec(h) = [f(1+h) - f(1)] / h y evalúe el límite cuando h tiende a 0.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Evaluación de la imagen en x = 1",
          math: "f(1) = -(1)^2 + 2(1) + 2 = -1 + 2 + 2 = 3 \\implies P(1, 3)",
          deduction: "El punto de tangencia sobre la colina parabólica es exactamente (1, 3)."
        },
        {
          stepNumber: 2,
          label: "Planteamiento del cociente incremental",
          math: "m_{\\text{sec}}(h) = \\frac{[-(1+h)^2 + 2(1+h) + 2] - 3}{h}",
          deduction: "Sustituimos (1 + h) en la regla de correspondencia y restamos f(1) = 3."
        },
        {
          stepNumber: 3,
          label: "Expansión y simplificación",
          math: "-(1 + 2h + h^2) + 2 + 2h + 2 - 3 = -1 - 2h - h^2 + 2 + 2h + 2 - 3 = -h^2",
          deduction: "Los términos lineales y constantes se anulan por completo, sobreviviendo únicamente -h²."
        },
        {
          stepNumber: 4,
          label: "Paso al límite cuando h tiende a 0",
          math: "m_{\\text{tan}} = \\lim_{h \\to 0} \\frac{-h^2}{h} = \\lim_{h \\to 0} (-h) = 0",
          deduction: "La pendiente es exactamente 0. Por tanto, la recta tangente es horizontal."
        },
        {
          stepNumber: 5,
          label: "Ecuación de la recta tangente",
          math: "y - 3 = 0(x - 1) \\implies y = 3",
          deduction: "Recta horizontal y = 3 tangente en el vértice superior de la parábola."
        }
      ],
      finalAnswer: "La pendiente es m = 0 y la recta tangente es y = 3 (tangente horizontal en el vértice)."
    },
    reflectionQuestions: [
      {
        question: "¿Qué ocurre algebraicamente si intentamos calcular la pendiente de la recta tangente sustituyendo h = 0 directamente antes de cancelar la variable?",
        pedagogicalGoal: "Comprender la naturaleza de las formas indeterminadas 0/0 y la distinción entre evaluación funcional directa y límite.",
        promptToThink: "Considere por qué (0/0) carece de sentido aritmético y exige factorización previa."
      },
      {
        question: "Si nos aproximamos a P con valores de h negativos (h < 0, es decir, aproximación por la izquierda), ¿debería obtenerse la misma pendiente en una función suave?",
        pedagogicalGoal: "Introducir intuitivamente la necesidad de concordancia entre límites laterales en la derivabilidad.",
        promptToThink: "Calcule m_sec(-0.1) = [f(1.9) - 4] / (-0.1) y compruebe si converge al mismo número 4."
      }
    ]
  },
  {
    id: 3,
    slideNumber: 3,
    title: "Tasa de Cambio Promedio vs. Tasa de Cambio Instantánea",
    subtitle: "De la Cinemática Clásica a la Interpretación Universal del Operador Diferencial",
    module: "Fundamentación Física y Conceptual",
    conceptualContent: {
      thesis: "La tasa de cambio promedio describe el comportamiento global de una magnitud en un intervalo temporal finito [t₁, t₂], perdiendo toda resolución sobre las fluctuaciones intermedias. Por el contrario, la tasa de cambio instantánea define la velocidad exacta con la que dicha magnitud se transforma en un único instante t₀, obtenida como el límite cuando el intervalo de observación se reduce a la nada.",
      sections: [
        {
          heading: "Definición Formal de Tasa de Cambio Promedio",
          paragraphs: [
            "Sea s = f(t) la función que describe una variable dependiente en función del tiempo t (o de cualquier variable independiente continua x).",
            "La tasa promedio de cambio en el intervalo [c, c + Δt] representa el cociente neto de cambio:"
          ],
          mathBlocks: [
            "\\overline{v}_{\\Delta t} = \\frac{\\Delta s}{\\Delta t} = \\frac{f(c + \\Delta t) - f(c)}{\\Delta t}"
          ],
          afterMathParagraphs: [
            "Físicamente, si conducimos 160 kilómetros en 2 horas, la velocidad promedio es de 80 km/h. No obstante, el velocímetro marcó 0 km/h en los semáforos, 110 km/h en autopista y 45 km/h en zonas urbanas. El promedio enmascara la realidad puntual."
          ]
        },
        {
          heading: "Paso al Límite: Tasa de Cambio Instantánea",
          paragraphs: [
            "Para conocer la velocidad en el instante preciso t = c, debemos encoger el intervalo Δt hasta que tienda a cero:",
            "Esta tasa instantánea de cambio coincide unívocamente con la derivada de la posición con respecto al tiempo, e ilustra el principio físico de la velocidad vectorial instantánea:"
          ],
          mathBlocks: [
            "v(c) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t} = \\lim_{h \\to 0} \\frac{f(c + h) - f(c)}{h} = f'(c) = \\left. \\frac{ds}{dt} \\right|_{t=c}"
          ]
        },
        {
          heading: "Generalización Transdisciplinaria",
          paragraphs: [
            "Este concepto es universal en las ciencias exactas y aplicadas:",
            "• En Física: Intensidad de corriente eléctrica I(t) = dq/dt (tasa de flujo de carga eléctrica con respecto al tiempo).",
            "• En Economía: Costo marginal C'(q) = dC/dq e Ingreso marginal I'(q) = dI/dq (tasa de cambio del costo/ingreso por unidad producida).",
            "• En Biología: Tasa instantánea de crecimiento poblacional dN/dt o biomasa bacteriana dm/dt."
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Gráfica Tiempo-Espacio s(t) con Secantes Temporales y Tangente Instantánea",
      description: "Eje horizontal t (segundos), eje vertical s (metros/pies). Curva no lineal convexa s = 16t².",
      elementsToDraw: [
        "Curva cóncava hacia arriba s(t) = 16t² representando la caída libre de un cuerpo en el vacío.",
        "Franja sombreada vertical que resalta el intervalo temporal [1, 2], luego se contrae a [1, 1.5], [1, 1.1] y [1, 1.01].",
        "Tabla adjunta integrada en el plano que muestra la convergencia numérica: Δt=1 s → 48 ft/s; Δt=0.5 s → 40 ft/s; Δt=0.1 s → 33.6 ft/s; Δt=0.01 s → 32.16 ft/s.",
        "Vector tangente destacado en t = 1 s cuya pendiente exacta es 32 ft/s."
      ],
      pedagogicalInsight: "Hacer visible a los ojos que conforme el cronómetro reduce su intervalo de medición, la pendiente promedio se estabiliza en la velocidad instantánea del velocímetro.",
      interactiveType: 'rates_of_change'
    },
    stepByStepExample: {
      statement: "Un objeto en caída libre en el vacío recorre una distancia s(t) = 16t² (en pies) tras t segundos. Calcule la velocidad promedio en [1, 1 + h] y deduzca rigurosamente la velocidad instantánea en t = 1 s.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Cálculo de la tasa promedio para un incremento genérico h",
          math: "v_{\\text{prom}} = \\frac{s(1+h) - s(1)}{h} = \\frac{16(1+h)^2 - 16(1)^2}{h}",
          deduction: "Sustituimos t = 1 + h en la función de movimiento s(t) = 16t²."
        },
        {
          stepNumber: 2,
          label: "Expansión y simplificación del numerador",
          math: "16(1 + 2h + h^2) - 16 = 16 + 32h + 16h^2 - 16 = 32h + 16h^2",
          deduction: "Los términos estáticos 16 y -16 se anulan mutuamente, dejando solo potencias de h."
        },
        {
          stepNumber: 3,
          label: "División entre el intervalo de tiempo h (h ≠ 0)",
          math: "v_{\\text{prom}}(h) = \\frac{h(32 + 16h)}{h} = 32 + 16h \\quad [\\text{pies/s}]",
          deduction: "Esta fórmula permite predecir la velocidad promedio en cualquier intervalo de tamaño h que comience en t = 1 s."
        },
        {
          stepNumber: 4,
          label: "Paso al límite para obtener la velocidad instantánea",
          math: "v(1) = \\lim_{h \\to 0} (32 + 16h) = 32 + 16(0) = 32 \\quad \\text{pies/s}",
          deduction: "Al desvanecerse la duración del intervalo h, el término 16h desaparece por completo."
        }
      ],
      geometricInterpretation: "La pendiente de la curva de posición en t = 1 es exactamente 32. La unidad física se deriva consistentemente: [unidades de posición] / [unidades de tiempo] = pies/segundo.",
      conclusion: "La velocidad instantánea del objeto a exactamente 1 segundo de haber iniciado su caída es v(1) = 32 pies/s (equivalente a 9.75 m/s)."
    },
    proposedExercise: {
      statement: "La altitud de un dron de inspección en ascenso vertical está modelada por s(t) = t² + 2t (en metros, tras t segundos). Determine: (a) La velocidad promedio en el intervalo temporal [2, 2.5] s, y (b) La velocidad instantánea en t = 2 s mediante el límite del cociente de diferencias.",
      everydayAnalogy: "En un automóvil, la velocidad media entre dos peajes de carretera mide el avance total dividido entre las horas de viaje; pero la aguja del velocímetro indica la velocidad instantánea exacta en el segundo preciso en que se consulta.",
      hint: "Para la velocidad promedio aplique v_prom = [s(2.5) - s(2)] / (2.5 - 2). Para la instantánea, plantee lim_{h→0} [s(2+h) - s(2)] / h y simplifique el divisor h.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Evaluación de posiciones temporales",
          math: "s(2) = (2)^2 + 2(2) = 8\\text{ m}; \\quad s(2.5) = (2.5)^2 + 2(2.5) = 6.25 + 5.0 = 11.25\\text{ m}",
          deduction: "Calculamos la posición del dron al inicio y al final del intervalo de medio segundo."
        },
        {
          stepNumber: 2,
          label: "Cálculo de la velocidad promedio",
          math: "v_{\\text{prom}} = \\frac{s(2.5) - s(2)}{2.5 - 2} = \\frac{11.25 - 8}{0.5} = \\frac{3.25}{0.5} = 6.5\\text{ m/s}",
          deduction: "Tasa media de desplazamiento en la ventana temporal macroscópica."
        },
        {
          stepNumber: 3,
          label: "Planteamiento del límite para la velocidad instantánea en t = 2",
          math: "v(2) = \\lim_{h \\to 0} \\frac{s(2+h) - s(2)}{h} = \\lim_{h \\to 0} \\frac{[(2+h)^2 + 2(2+h)] - 8}{h}",
          deduction: "Definición rigurosa de velocidad instantánea de Newton."
        },
        {
          stepNumber: 4,
          label: "Expansión algebraica y cancelación",
          math: "\\frac{(4 + 4h + h^2 + 4 + 2h) - 8}{h} = \\frac{6h + h^2}{h} = 6 + h \\quad (h \\neq 0)",
          deduction: "El término independiente colapsa a cero, permitiendo simplificar h."
        },
        {
          stepNumber: 5,
          label: "Evaluación final del límite",
          math: "v(2) = \\lim_{h \\to 0} (6 + h) = 6.0\\text{ m/s}",
          deduction: "A los 2 segundos exactos, el dron asciende a una tasa puntual de 6 metros por segundo."
        }
      ],
      finalAnswer: "Velocidad promedio en [2, 2.5]s = 6.5 m/s; Velocidad instantánea en t = 2s = 6.0 m/s."
    },
    reflectionQuestions: [
      {
        question: "Si un cuerpo tiene velocidad instantánea v(t₀) = 0 en un instante t₀, ¿significa necesariamente que el cuerpo se encuentra en reposo estático prolongado?",
        pedagogicalGoal: "Distinguir entre velocidad instantánea nula en un punto de detención momentánea y reposo en un intervalo abierto.",
        promptToThink: "Considere el proyectil lanzado hacia arriba cuando alcanza su altura máxima: su velocidad es cero en ese microinstante exacto, pero la aceleración gravitacional sigue actuando."
      },
      {
        question: "¿Cuál es la diferencia conceptual y dimensional entre la velocidad y la rapidez?",
        pedagogicalGoal: "Fijar la definición rigurosa: velocidad como magnitud con signo (v = ds/dt), y rapidez como su valor absoluto escalar (|v| = |ds/dt|).",
        promptToThink: "¿Puede un vehículo desplazarse con velocidad negativa pero con rapidez positiva de 60 km/h?"
      }
    ]
  },
  {
    id: 4,
    slideNumber: 4,
    title: "Definición Formal de la Derivada Mediante Límites",
    subtitle: "El Núcleo del Análisis Matemático: Notaciones Clásicas y Formas Equivalentes",
    module: "Definición Axiomática y Operacional",
    conceptualContent: {
      thesis: "La derivada de una función f con respecto a su variable independiente x es una nueva función f' cuyo valor en cualquier número x del dominio es el límite del cociente de diferencias cuando el incremento h tiende a cero, siempre que este límite exista como número real finito.",
      sections: [
        {
          heading: "Definición Fundamental (Forma Estándar de Incremento h)",
          paragraphs: [
            "Sea f una función real definida en un intervalo abierto que contiene a x. La derivada de f en x se define mediante el operador límite:"
          ],
          mathBlocks: [
            "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}"
          ],
          afterMathParagraphs: [
            "Si este límite existe, decimos que f es derivable (o diferenciable) en x. Si el límite existe para todo x en un intervalo abierto (a, b), f es derivable en (a, b)."
          ]
        },
        {
          heading: "Forma Alternativa en un Punto Fijo c",
          paragraphs: [
            "Reemplazando x + h por una variable genérica t (o x) que se aproxima al punto de evaluación fijo c, donde h = x - c, la definición adopta la forma alternativa muy conveniente para demostraciones teóricas:"
          ],
          mathBlocks: [
            "f'(c) = \\lim_{x \\to c} \\frac{f(x) - f(c)}{x - c}"
          ]
        },
        {
          heading: "Cuadro Sinóptico de Notaciones Históricas",
          paragraphs: [
            "La riqueza del cálculo se refleja en los diversos operadores ideados por sus pioneros:",
            "1. Notación de Lagrange (Prima): f'(x), y' (destaca el carácter funcional).",
            "2. Notación de Leibniz: \\frac{dy}{dx}, \\frac{d}{dx}[f(x)] (rememora el cociente infinitesimal \\Delta y / \\Delta x y facilita la regla de la cadena).",
            "3. Notación de Cauchy / Operador Diferencial: D_x f(x) o D f (enfatiza a la derivación como una transformación lineal sobre espacios de funciones).",
            "4. Notación de Newton (Punto): \\dot{x}(t) (utilizada primordialmente en física analítica para derivadas temporales)."
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "La Función Derivada como un Mapeo de Pendientes",
      description: "Gráfica superior de f(x) alineada verticalmente con la gráfica inferior de su función derivada f'(x).",
      elementsToDraw: [
        "Plano superior: Curva polinomial cúbica f(x) = x³ - 3x con máximo local en (-1, 2) y mínimo local en (1, -2). Tangentes horizontales m = 0 dibujadas en verde en x = -1 y x = 1.",
        "Líneas guía verticales punteadas proyectadas desde los puntos críticos (-1, 2) y (1, -2) hacia el plano inferior.",
        "Plano inferior: Gráfica de la función derivada f'(x) = 3x² - 3 (parábola), mostrando claramente que corta el eje horizontal exactamente en las raíces x = -1 y x = 1 donde las tangentes superiores son horizontales.",
        "Región con f'(x) > 0 sombreada en verde claro (f(x) es estrictamente creciente); región con f'(x) < 0 sombreada en ámbar (f(x) es decreciente)."
      ],
      pedagogicalInsight: "Consolidar que la derivada no es un valor numérico aislado, sino una nueva función completa f' cuyo valor de salida en cada x reproduce con fidelidad la pendiente de la curva original f.",
      interactiveType: 'rules_polynomial'
    },
    stepByStepExample: {
      statement: "Utilizando rigurosamente la definición de límite mediante el cociente de diferencias, determine la derivada de la función racional f(x) = 1/x para todo x ≠ 0.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Planteamiento formal de la definición de derivada",
          math: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = \\lim_{h \\to 0} \\frac{\\frac{1}{x+h} - \\frac{1}{x}}{h}",
          deduction: "Evaluamos f en x + h y en x en el numerador, resultando en una resta de fracciones compuestas sobre el divisor h."
        },
        {
          stepNumber: 2,
          label: "Resta de fracciones algebraicas con mínimo común denominador",
          math: "\\frac{1}{x+h} - \\frac{1}{x} = \\frac{x - (x+h)}{(x+h)x} = \\frac{x - x - h}{(x+h)x} = \\frac{-h}{(x+h)x}",
          deduction: "Combinamos las fracciones del numerador en una sola expresión sobre el denominador común x(x+h)."
        },
        {
          stepNumber: 3,
          label: "Reescritura del cociente y cancelación de la indeterminación",
          math: "\\frac{\\frac{-h}{(x+h)x}}{h} = \\frac{-h}{h \\cdot (x+h)x} = -\\frac{1}{(x+h)x} \\quad (\\text{para } h \\neq 0)",
          deduction: "Multiplicamos por el recíproco 1/h y simplificamos el factor h que causaba la indeterminación 0/0."
        },
        {
          stepNumber: 4,
          label: "Cálculo analítico del límite cuando h tiende a cero",
          math: "f'(x) = \\lim_{h \\to 0} \\left[ -\\frac{1}{(x+h)x} \\right] = -\\frac{1}{(x+0)x} = -\\frac{1}{x^2}",
          deduction: "Por sustitución directa legal tras la cancelación, el factor (x+h) tiende a x, dando como denominador x²."
        }
      ],
      geometricInterpretation: "Dado que x² > 0 para todo x ≠ 0, la derivada f'(x) = -1/x² es estrictamente negativa en todo su dominio. Esto concuerda con la gráfica de la hipérbola equilátera y = 1/x, cuyas rectas tangentes poseen pendiente negativa en todas partes y decrecen monótonamente en cada rama.",
      conclusion: "La derivada de f(x) = 1/x es f'(x) = -1/x² (o equivalentemente d/dx [x⁻¹] = -1 · x⁻²), válida para todo x en (-∞, 0) ∪ (0, ∞)."
    },
    proposedExercise: {
      statement: "A partir de la definición formal de derivada mediante límites, determine f'(x) para la función racional f(x) = \\frac{2}{x + 3} para todo x \\neq -3.",
      everydayAnalogy: "Al igual que una báscula calibrada mide la variación de masa por unidad adicional, el cociente incremental captura cómo varía la fracción cuando el denominador experimenta una perturbación microscópica h.",
      hint: "Plantee lim_{h→0} [f(x+h) - f(x)] / h. Reste las dos fracciones usando denominador común (x+3+h)(x+3) y cancele el factor común h del numerador con el divisor.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Planteamiento del límite formal",
          math: "f'(x) = \\lim_{h \\to 0} \\frac{\\frac{2}{x+h+3} - \\frac{2}{x+3}}{h}",
          deduction: "Aplicamos la definición formal sustituyendo f(x+h) y f(x)."
        },
        {
          stepNumber: 2,
          label: "Resta de fracciones algebraicas",
          math: "\\frac{2(x+3) - 2(x+h+3)}{(x+h+3)(x+3)} = \\frac{2x + 6 - 2x - 2h - 6}{(x+h+3)(x+3)} = \\frac{-2h}{(x+h+3)(x+3)}",
          deduction: "Reducimos al mínimo común denominador."
        },
        {
          stepNumber: 3,
          label: "División entre h y cancelación",
          math: "\\frac{\\frac{-2h}{(x+h+3)(x+3)}}{h} = \\frac{-2}{(x+h+3)(x+3)} \\quad (\\text{para } h \\neq 0)",
          deduction: "Cancelamos el factor h que causaba la indeterminación."
        },
        {
          stepNumber: 4,
          label: "Evaluación analítica del límite",
          math: "f'(x) = \\lim_{h \\to 0} \\frac{-2}{(x+h+3)(x+3)} = \\frac{-2}{(x+0+3)(x+3)} = -\\frac{2}{(x+3)^2}",
          deduction: "Por continuidad al sustituir h = 0 en el denominador resultante."
        }
      ],
      finalAnswer: "f'(x) = -\\frac{2}{(x+3)^2}, \\quad \\forall x \\in \\mathbb{R} \\setminus \\{-3\\}."
    },
    reflectionQuestions: [
      {
        question: "Al simplificar h/h en el cociente de diferencias, ¿por qué es matemáticamente lícito tachar h si sabemos que h tiende a 0?",
        pedagogicalGoal: "Asegurar la comprensión de la definición de límite según Cauchy-Weierstrass: el límite describe el comportamiento en una vecindad perforada 0 < |h| < δ, donde h jamás es exactamente cero.",
        promptToThink: "Recuerde que el límite pregunta qué pasa 'cerca de cero', no 'en cero'."
      },
      {
        question: "¿Qué ocurriría si intentamos evaluar la derivada de f(x) = 1/x en x = 0 mediante la definición de límite?",
        pedagogicalGoal: "Reconocer que la derivada solo puede definirse en puntos donde la función original está previamente definida y posee dominio abierto.",
        promptToThink: "¿Tiene sentido calcular f(0 + h) - f(0) si f(0) no existe?"
      }
    ]
  },
  {
    id: 5,
    slideNumber: 5,
    title: "Derivabilidad y Continuidad: ¿Cuándo Existe una Derivada?",
    subtitle: "Teorema Fundamental de Implicación y Taxonomía de Singularidades No Diferenciables",
    module: "Topología y Condiciones de Existencia",
    conceptualContent: {
      thesis: "La derivabilidad es una condición estrictamente más fuerte y exigente que la continuidad. Si una función es derivable en un punto c, forzosamente es continua en c. Sin embargo, el recíproco es categóricamente falso: existen funciones perfectamente continuas en todo su dominio que carecen de derivada en puntos singulares debido a esquinas abruptas, cúspides o tangentes verticales.",
      sections: [
        {
          heading: "Teorema Fundamental: Derivabilidad Implica Continuidad",
          paragraphs: [
            "Enunciado Teórico: Si una función f es derivable en un punto c (es decir, f'(c) existe como número real finito), entonces f es necesariamente continua en c."
          ],
          mathBlocks: [
            "\\text{Hipótesis: } \\lim_{x \\to c} \\frac{f(x) - f(c)}{x - c} = f'(c) \\in \\mathbb{R} \\implies \\text{Tesis: } \\lim_{x \\to c} f(x) = f(c)"
          ]
        },
        {
          heading: "Demostración Rigurosa (Paso a Paso sin Omisiones)",
          paragraphs: [
            "Para probar la continuidad, debemos demostrar que \\lim_{x \\to c} [f(x) - f(c)] = 0. Para todo x ≠ c, reescribimos algebraicamente la diferencia multiplicando y dividiendo por (x - c):"
          ],
          mathBlocks: [
            "f(x) - f(c) = \\frac{f(x) - f(c)}{x - c} \\cdot (x - c)",
            "\\lim_{x \\to c} [f(x) - f(c)] = \\lim_{x \\to c} \\left[ \\frac{f(x) - f(c)}{x - c} \\cdot (x - c) \\right] = \\left( \\lim_{x \\to c} \\frac{f(x) - f(c)}{x - c} \\right) \\cdot \\left( \\lim_{x \\to c} (x - c) \\right)",
            "\\lim_{x \\to c} [f(x) - f(c)] = f'(c) \\cdot 0 = 0 \\implies \\lim_{x \\to c} f(x) = f(c) \\quad \\blacksquare"
          ]
        },
        {
          heading: "Taxonomía de Casos donde Falla la Derivabilidad",
          paragraphs: [
            "Una función f fracasa en ser derivable en un punto x = c bajo cuatro patologías fundamentales:",
            "1. Discontinuidad: Si f no es continua en c, el contra-recíproco del teorema garantiza que no puede ser derivable en c.",
            "2. Punto Anguloso o Esquina (Corner): Los límites laterales del cociente incremental existen pero no coinciden: f'_-(c) ≠ f'_+(c) (ejemplo clásico: f(x) = |x| en x = 0).",
            "3. Cúspide (Cusp): Las pendientes laterales crecen sin límite con signos opuestos: f'_-(c) → -∞ y f'_+(c) → +∞ (ejemplo: f(x) = x^(2/3) en x = 0).",
            "4. Recta Tangente Vertical: El cociente incremental tiende a infinito con el mismo signo: f'(c) → +∞ o f'(c) → -∞ (ejemplo: f(x) = x^(1/3) en x = 0)."
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Atlas Cartesiano de No Diferenciabilidad en 4 Paneles",
      description: "Cuatro gráficos comparativos que ilustran cada patología en el plano cartesiano.",
      elementsToDraw: [
        "Panel 1 (Esquina/Pico): Gráfica de f(x) = |x| con vértice agudo en el origen (0,0); semirrecta izquierda con flecha de pendiente m = -1 y semirrecta derecha con pendiente m = +1.",
        "Panel 2 (Cúspide): Gráfica de f(x) = x^(2/3) semejante a la punta afilada de un ala de gaviota en x = 0, donde las curvas se vuelven verticales y afiladas.",
        "Panel 3 (Tangente Vertical): Gráfica de f(x) = ∛x con inflexión perfectamente vertical en (0,0); la recta x = 0 es la recta tangente, cuya pendiente no está definida en ℝ.",
        "Panel 4 (Discontinuidad de Salto): Función a trozos con salto finito en x = c; la recta secante 'revienta' al aproximarse verticalmente con base h → 0."
      ],
      pedagogicalInsight: "Demostrar que una gráfica debe ser no solo ininterrumpida (continua), sino 'suave' (sin quiebres bruscos ni pendientes verticales) para admitir recta tangente bien definida.",
      interactiveType: 'continuity_corner'
    },
    stepByStepExample: {
      statement: "Demuestre formalmente que la función valor absoluto f(x) = |x| es continua en x = 0, pero NO es derivable en dicho punto.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Verificación de la continuidad en x = 0",
          math: "f(0) = |0| = 0; \\quad \\lim_{x \\to 0^-} (-x) = 0; \\quad \\lim_{x \\to 0^+} (x) = 0 \\implies \\lim_{x \\to 0} f(x) = 0 = f(0)",
          deduction: "La función existe en 0 y ambos límites laterales coinciden con el valor funcional. Por tanto, f es continua en x = 0."
        },
        {
          stepNumber: 2,
          label: "Planteamiento de los límites laterales de la derivada",
          math: "f'_-(0) = \\lim_{h \\to 0^-} \\frac{f(0+h) - f(0)}{h} = \\lim_{h \\to 0^-} \\frac{|h| - 0}{h}",
          deduction: "Analizamos la derivada por la izquierda mediante valores de h estrictamente negativos."
        },
        {
          stepNumber: 3,
          label: "Evaluación de la derivada lateral izquierda",
          math: "\\text{Como } h < 0 \\implies |h| = -h \\implies \\lim_{h \\to 0^-} \\frac{-h}{h} = \\lim_{h \\to 0^-} (-1) = -1",
          deduction: "La pendiente de aproximación secante por la izquierda es constante e igual a -1."
        },
        {
          stepNumber: 4,
          label: "Evaluación de la derivada lateral derecha",
          math: "\\text{Como } h > 0 \\implies |h| = h \\implies f'_+(0) = \\lim_{h \\to 0^+} \\frac{h}{h} = \\lim_{h \\to 0^+} (1) = 1",
          deduction: "La pendiente de aproximación secante por la derecha es constante e igual a +1."
        },
        {
          stepNumber: 5,
          label: "Conclusión de inexistencia del límite global",
          math: "f'_-(0) = -1 \\neq f'_+(0) = 1 \\implies \\lim_{h \\to 0} \\frac{|0+h| - |0|}{h} \\quad \\text{NO EXISTE}",
          deduction: "Al diferir los límites laterales, el límite bilateral no existe. Por consiguiente, f'(0) no existe."
        }
      ],
      geometricInterpretation: "En el origen, la curva forma una esquina en 'V' de 90°. Por la izquierda la pendiente es -1 y por la derecha es 1; no existe una única recta tangente que se ajuste al punto (0,0), sino infinitas rectas que tocan el vértice sin ser tangentes analíticas.",
      conclusion: "f(x) = |x| es el contraejemplo canónico que prueba que Continuidad ⇏ Derivabilidad."
    },
    proposedExercise: {
      statement: "Considere la función a trozos f(x) = \\begin{cases} mx + b & \\text{si } x < 2 \\\\ x^2 & \\text{si } x \\ge 2 \\end{cases}. Determine los valores exactos de la pendiente m y la ordenada al origen b para que la función sea continua y derivable en todo \\mathbb{R}.",
      everydayAnalogy: "Diseñar la rampa de empalme de una autopista con una vía recta: para que los vehículos no sufran un sacudón brusco, la vía debe unirse en la misma altura (continuidad) y tener exactamente la misma inclinación en el punto de contacto (derivabilidad).",
      hint: "Primero imponga la condición de continuidad en x = 2 igualando los límites laterales. Luego imponga la derivabilidad igualando las derivadas laterales en x = 2.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Condición de Continuidad en x = 2",
          math: "\\lim_{x \\to 2^-} (mx + b) = \\lim_{x \\to 2^+} (x^2) = f(2) \\implies 2m + b = 2^2 = 4",
          deduction: "Para que no haya un salto vertical en la unión x = 2, se requiere que 2m + b = 4."
        },
        {
          stepNumber: 2,
          label: "Condición de Derivabilidad (Igualdad de pendientes laterales)",
          math: "f'_-(2) = m; \\quad f'_+(2) = \\left. \\frac{d}{dx}[x^2] \\right|_{x=2} = 2(2) = 4 \\implies m = 4",
          deduction: "Las pendientes de aproximación deben ser idénticas para evitar una esquina angulosa."
        },
        {
          stepNumber: 3,
          label: "Despeje del parámetro b",
          math: "2(4) + b = 4 \\implies 8 + b = 4 \\implies b = 4 - 8 = -4",
          deduction: "Sustituimos m = 4 en la ecuación de continuidad."
        }
      ],
      finalAnswer: "m = 4 y b = -4. La recta de acople continuo y suave es y = 4x - 4."
    },
    reflectionQuestions: [
      {
        question: "¿Puede existir una función que sea continua en todo el eje real ℝ pero que no sea derivable en ningún punto?",
        pedagogicalGoal: "Ampliar la visión matemática hacia las funciones monstruo de Weierstrass y los fractales.",
        promptToThink: "Karl Weierstrass descubrió en 1872 la función f(x) = ∑ aⁿ cos(bⁿ π x), un fractal continuo sin derivada en ningún punto real."
      },
      {
        question: "Si una función f satisface que f'(c) = +∞, ¿posee la curva una recta tangente geométrica en dicho punto?",
        pedagogicalGoal: "Distinguir entre la existencia de la derivada en los números reales y la existencia de una recta tangente geométrica vertical (x = c).",
        promptToThink: "La recta x = c existe en el plano cartesiano, pero su pendiente es indefinida dentro del cuerpo de los reales ℝ."
      }
    ]
  },
  {
    id: 6,
    slideNumber: 6,
    title: "Reglas Básicas de Derivación: Potencia, Constante y Linealidad",
    subtitle: "Deducción Rigurosa mediante el Teorema del Binomio y Álgebra de Operadores Lineales",
    module: "Mecánica Operativa y Teoremas de Estructura",
    conceptualContent: {
      thesis: "El cálculo diferencial trasciende el cálculo engorroso de límites directos gracias a un conjunto de teoremas operacionales que transforman la derivación en un álgebra exacta. El operador diferencial D_x es un operador lineal sobre el espacio vectorial de funciones diferenciables, satisfaciendo las propiedades de aditividad y homogeneidad.",
      sections: [
        {
          heading: "Teoremas Fundamentales de Derivación Elemental",
          paragraphs: [
            "1. Regla de la Función Constante: Si f(x) = k (con k ∈ ℝ constante), entonces f'(x) = 0 para todo x. Geométricamente, la gráfica es una recta horizontal cuya inclinación es nula.",
            "2. Regla de la Función Identidad: Si f(x) = x, entonces f'(x) = 1. Geométricamente, la recta bisectriz tiene pendiente 1.",
            "3. Regla General de la Potencia: Para cualquier exponente real n ∈ ℝ:"
          ],
          mathBlocks: [
            "\\frac{d}{dx}[k] = 0, \\qquad \\frac{d}{dx}[x] = 1, \\qquad \\frac{d}{dx}[x^n] = n x^{n-1}"
          ]
        },
        {
          heading: "Demostración de la Regla de la Potencia para n Entero Positivo",
          paragraphs: [
            "Aplicamos la definición de límite y expandimos (x + h)ⁿ mediante el Teorema del Binomio de Newton:"
          ],
          mathBlocks: [
            "(x+h)^n = x^n + n x^{n-1}h + \\frac{n(n-1)}{2} x^{n-2}h^2 + \\cdots + n x h^{n-1} + h^n",
            "f'(x) = \\lim_{h \\to 0} \\frac{(x+h)^n - x^n}{h} = \\lim_{h \\to 0} \\frac{n x^{n-1}h + \\frac{n(n-1)}{2} x^{n-2}h^2 + \\cdots + h^n}{h}",
            "f'(x) = \\lim_{h \\to 0} \\left[ n x^{n-1} + \\frac{n(n-1)}{2} x^{n-2}h + \\cdots + h^{n-1} \\right] = n x^{n-1} + 0 + \\cdots + 0 = n x^{n-1} \\quad \\blacksquare"
          ]
        },
        {
          heading: "Linealidad del Operador Derivada",
          paragraphs: [
            "Si f y g son derivables y c, k son constantes reales escalares, el operador derivada D_x satisface:",
            "• Homogeneidad (Múltiplo Constante): D_x [c · f(x)] = c · D_x [f(x)]",
            "• Aditividad (Regla de la Suma y Diferencia): D_x [f(x) ± g(x)] = D_x [f(x)] ± D_x [g(x)]"
          ],
          mathBlocks: [
            "\\frac{d}{dx} \\left[ \\sum_{i=1}^m c_i f_i(x) \\right] = \\sum_{i=1}^m c_i \\frac{d}{dx}[f_i(x)]"
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Descomposición Gráfica de la Derivada de un Polinomio",
      description: "Visualización de cómo la suma de pendientes locales genera la pendiente de la función resultante.",
      elementsToDraw: [
        "Curvas individuales f₁(x) = 2x² (parábola azul) y f₂(x) = -4x (recta verde).",
        "Curva resultante F(x) = f₁(x) + f₂(x) = 2x² - 4x en color violeta oscuro.",
        "Vectores tangentes en x = 2 para f₁ (m₁ = 8), f₂ (m₂ = -4) y F (m_total = 8 - 4 = 4).",
        "Anotación esquemática del operador lineal Dx como una 'caja de procesamiento' que recibe una función y emite su función gradiente."
      ],
      pedagogicalInsight: "Hacer tangible el principio de superposición lineal: la tasa de cambio de un sistema compuesto por adición es exactamente la suma de las tasas de cambio de sus componentes individuales.",
      interactiveType: 'rules_polynomial'
    },
    stepByStepExample: {
      statement: "Derive el polinomio compuesto f(x) = 4x⁵ - \\frac{3}{x^2} + 7\\sqrt{x} - 12 explicitando cada propiedad de linealidad y potencia aplicada.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Reescritura algebraica en términos de exponentes racionales y negativos",
          math: "f(x) = 4x^5 - 3x^{-2} + 7x^{1/2} - 12",
          deduction: "Transformamos las fracciones y radicales a la forma canónica xⁿ para aplicar la regla de la potencia de forma directa."
        },
        {
          stepNumber: 2,
          label: "Aplicación de la propiedad de linealidad del operador diferencial",
          math: "\\frac{df}{dx} = 4\\frac{d}{dx}[x^5] - 3\\frac{d}{dx}[x^{-2}] + 7\\frac{d}{dx}[x^{1/2}] - \\frac{d}{dx}[12]",
          deduction: "Extraemos las constantes multiplicativas y distribuimos la derivada término a término."
        },
        {
          stepNumber: 3,
          label: "Ejecución de la regla de la potencia en cada sumando",
          math: "\\frac{df}{dx} = 4(5x^{5-1}) - 3(-2x^{-2-1}) + 7\\left(\\frac{1}{2}x^{\\frac{1}{2}-1}\\right) - 0",
          deduction: "Multiplicamos por el exponente original y restamos 1 a la potencia en cada variable."
        },
        {
          stepNumber: 4,
          label: "Simplificación algebraica y retorno a notación radical",
          math: "f'(x) = 20x^4 + 6x^{-3} + \\frac{7}{2}x^{-1/2} = 20x^4 + \\frac{6}{x^3} + \\frac{7}{2\\sqrt{x}}",
          deduction: "Agrupamos coeficientes numéricos y expresamos los exponentes negativos como divisores con potencias positivas."
        }
      ],
      geometricInterpretation: "La función derivada resultante f'(x) nos entrega la pendiente exacta de la recta tangente a f(x) para cualquier valor en su dominio x ∈ (0, ∞).",
      conclusion: "f'(x) = 20x⁴ + 6/x³ + 7/(2√x), obtenida en un solo ciclo analítico sin calcular límites explícitos."
    },
    proposedExercise: {
      statement: "Obtenga la derivada de la función polinomial-racional g(x) = 3x^4 - 5x^2 + \\frac{2}{x^3} + \\pi aplicando las reglas de potencia, constante y linealidad.",
      everydayAnalogy: "La linealidad es como calcular el consumo de agua total de una casa: la tasa de gasto total de agua por minuto es simplemente la suma directa del caudal del grifo de la cocina más el de la ducha.",
      hint: "Reescriba 2/x³ como 2x⁻³ y recuerde que π es una constante numérica cuya derivada es exactamente 0.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Reexpresión algebraica con potencias enteras",
          math: "g(x) = 3x^4 - 5x^2 + 2x^{-3} + \\pi",
          deduction: "Transformamos las fracciones a exponentes negativos para aplicar la regla de la potencia."
        },
        {
          stepNumber: 2,
          label: "Aplicación de linealidad y derivación término a término",
          math: "g'(x) = 3(4x^3) - 5(2x) + 2(-3x^{-4}) + 0",
          deduction: "Multiplicamos por el exponente y reducimos en una unidad el grado."
        },
        {
          stepNumber: 3,
          label: "Simplificación final y orden canónico",
          math: "g'(x) = 12x^3 - 10x - \\frac{6}{x^4}",
          deduction: "Expresamos con divisor positivo."
        }
      ],
      finalAnswer: "g'(x) = 12x^3 - 10x - \\frac{6}{x^4}."
    },
    reflectionQuestions: [
      {
        question: "¿Por qué la derivada de una constante es idénticamente cero, tanto desde la perspectiva analítica del límite como desde la perspectiva geométrica?",
        pedagogicalGoal: "Vincular la definición estricta [k - k]/h = 0 con la ausencia absoluta de inclinación (pendiente horizontal) en una función constante.",
        promptToThink: "Si una cantidad no varía en absoluto con respecto al tiempo, ¿cuál es su tasa de variación?"
      },
      {
        question: "¿Es válida la regla de la potencia d/dx[xⁿ] = n xⁿ⁻¹ cuando el exponente n es un número irracional como π o √2?",
        pedagogicalGoal: "Anticipar el uso de la derivación logarítmica y la definición general de potencias reales x^α = exp(α ln x).",
        promptToThink: "Considere cómo se definiría x^π mediante aproximaciones decimales y límites de exponentes racionales."
      }
    ]
  },
  {
    id: 7,
    slideNumber: 7,
    title: "Reglas Avanzadas: Producto, Cociente y Regla de la Cadena",
    subtitle: "Deducción con el Sumando de Acoplamiento y Composición de Funciones",
    module: "Cálculo de Estructuras Complejas",
    conceptualContent: {
      thesis: "La derivada de un producto NO es el producto de las derivadas. El error histórico cometido por Leibniz en noviembre de 1675 revela que el cambio en un área rectangular u · v genera dos términos lineales u·dv + v·du y un infinitesimal de segundo orden du·dv. Análogamente, la composición de funciones exige una multiplicación en cadena de tasas instantáneas locales.",
      sections: [
        {
          heading: "Regla del Producto: El Truco de Sumar y Restar",
          paragraphs: [
            "Teorema: Si f y g son diferenciables en x, su producto (f · g) es diferenciable y su derivada es:",
            "Demostración Rigurosa: Al evaluar el límite del cociente incremental, introducimos el término neutro -f(x+h)g(x) + f(x+h)g(x):"
          ],
          mathBlocks: [
            "\\frac{d}{dx}[f(x)g(x)] = f(x)g'(x) + g(x)f'(x)",
            "(fg)'(x) = \\lim_{h \\to 0} \\frac{f(x+h)g(x+h) - f(x)g(x)}{h}",
            "= \\lim_{h \\to 0} \\frac{[f(x+h)g(x+h) - f(x+h)g(x)] + [f(x+h)g(x) - f(x)g(x)]}{h}",
            "= \\lim_{h \\to 0} f(x+h) \\left[ \\frac{g(x+h) - g(x)}{h} \\right] + g(x) \\lim_{h \\to 0} \\left[ \\frac{f(x+h) - f(x)}{h} \\right]",
            "\\text{Dado que } f \\text{ es derivable, es continua en } x \\implies \\lim_{h \\to 0} f(x+h) = f(x). \\text{ Por tanto:}",
            "(fg)'(x) = f(x)g'(x) + g(x)f'(x) \\quad \\blacksquare"
          ]
        },
        {
          heading: "Regla del Cociente",
          paragraphs: [
            "Teorema: Si f y g son derivables en x y g(x) ≠ 0:"
          ],
          mathBlocks: [
            "\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{g(x)f'(x) - f(x)g'(x)}{[g(x)]^2}"
          ]
        },
        {
          heading: "La Regla de la Cadena (Composición de Funciones)",
          paragraphs: [
            "Teorema: Si g es derivable en x y f es derivable en u = g(x), la función compuesta (f ∘ g)(x) = f(g(x)) es derivable en x:",
            "En notación de Leibniz, este principio exhibe su belleza como cancelación aparente de razones de cambio encadenadas:"
          ],
          mathBlocks: [
            "(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)",
            "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}"
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Geometría del Rectángulo de Leibniz y la Regla de la Cadena",
      description: "Esquema geométrico que demuestra visualmente por qué surgen dos términos en la regla del producto.",
      elementsToDraw: [
        "Rectángulo inicial de base u y altura v, con área A = uv.",
        "Incrementos Δu y Δv añadidos a la derecha y en la parte superior.",
        "Sub-rectángulo 1 de área u · Δv (franja superior).",
        "Sub-rectángulo 2 de área v · Δu (franja lateral derecha).",
        "Sub-rectángulo 3 minúsculo de área Δu · Δv (esquina superior derecha). Al dividir entre Δx y tomar el límite Δx → 0, este término de segundo orden colapsa a 0, dejando u(dv/dx) + v(du/dx).",
        "Diagrama de engranajes acoplados para la Regla de la Cadena: rueda x mueve rueda u (relación du/dx), y rueda u mueve rueda y (relación dy/du)."
      ],
      pedagogicalInsight: "Erradicar para siempre la tentación de decir (fg)' = f'g' al contemplar las dos franjas rectangulares que crecen de manera desacoplada.",
      interactiveType: 'rates_of_change'
    },
    stepByStepExample: {
      statement: "Calcule la derivada de la función racional compuesta F(x) = \\left( \\frac{3x - 5}{x^2 + 7} \\right)^3 aplicando la regla de la cadena combinada con la regla del cociente.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Identificación de la función externa e interna",
          math: "y = u^3, \\quad \\text{donde } u = g(x) = \\frac{3x - 5}{x^2 + 7}",
          deduction: "La función externa es la cúbica u³, y la función interna es el cociente racional u."
        },
        {
          stepNumber: 2,
          label: "Derivada de la función externa según la regla de la potencia",
          math: "\\frac{dy}{du} = 3u^2 = 3\\left( \\frac{3x - 5}{x^2 + 7} \\right)^2",
          deduction: "Bajamos el exponente 3 y reducimos la potencia interna a 2, manteniendo intacto el argumento interno u."
        },
        {
          stepNumber: 3,
          label: "Derivada de la función interna mediante la regla del cociente",
          math: "\\frac{du}{dx} = \\frac{(x^2 + 7)\\frac{d}{dx}[3x - 5] - (3x - 5)\\frac{d}{dx}[x^2 + 7]}{(x^2 + 7)^2} = \\frac{(x^2 + 7)(3) - (3x - 5)(2x)}{(x^2 + 7)^2}",
          deduction: "Aplicamos rigurosamente: [denominador · deriv_numerador - numerador · deriv_denominador] / denominador²."
        },
        {
          stepNumber: 4,
          label: "Simplificación algebraica del numerador del cociente interno",
          math: "(3x^2 + 21) - (6x^2 - 10x) = -3x^2 + 10x + 21",
          deduction: "Expandimos los productos y agrupamos términos semejantes con cuidado en la distribución del signo negativo."
        },
        {
          stepNumber: 5,
          label: "Multiplicación de factores según la Regla de la Cadena",
          math: "F'(x) = \\frac{dy}{du} \\cdot \\frac{du}{dx} = 3\\left( \\frac{3x - 5}{x^2 + 7} \\right)^2 \\cdot \\frac{-3x^2 + 10x + 21}{(x^2 + 7)^2}",
          deduction: "Multiplicamos la derivada externa evaluada en la interna por la derivada interna simplificada."
        },
        {
          stepNumber: 6,
          label: "Expresión final compacta",
          math: "F'(x) = \\frac{3(3x - 5)^2(-3x^2 + 10x + 21)}{(x^2 + 7)^4}",
          deduction: "Combinamos las potencias del denominador: (x² + 7)² · (x² + 7)² = (x² + 7)⁴."
        }
      ],
      geometricInterpretation: "La pendiente de la curva compuesta F(x) responde al producto ponderado de la amplificación generada por elevar al cubo multiplicada por la tasa intrínseca de cambio de la fracción racional.",
      conclusion: "F'(x) = [3(3x - 5)²(-3x² + 10x + 21)] / (x² + 7)⁴."
    },
    proposedExercise: {
      statement: "Dada la función h(x) = (3x^2 - 1) \\cdot \\sqrt{2x + 5}, obtenga su derivada analítica h'(x) aplicando de forma combinada la regla del producto de Leibniz y la regla de la cadena. Exprese el resultado final simplificado en una única fracción irreducible.",
      everydayAnalogy: "Como un sistema de engranajes de bicicleta acoplados: la velocidad final de giro no es solo pedalear más rápido (primer factor) o cambiar de piñón (segundo factor), sino la acción combinada de ambos mecanismos interactuando simultáneamente.",
      hint: "Identifique u(x) = 3x² - 1 y v(x) = (2x + 5)^(1/2). Aplique h' = u'v + uv'. Para derivar v, use la regla de la cadena: (1/2)(2x + 5)^(-1/2) · 2.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Identificación y derivación de los factores individuales",
          math: "u(x) = 3x^2 - 1 \\implies u'(x) = 6x; \\quad v(x) = (2x+5)^{1/2} \\implies v'(x) = \\frac{1}{2}(2x+5)^{-1/2} \\cdot 2 = \\frac{1}{\\sqrt{2x+5}}",
          deduction: "Aplicamos la regla de la potencia básica en u(x) y la regla de la cadena en la raíz v(x), multiplicando por la derivada interna d/dx[2x+5] = 2."
        },
        {
          stepNumber: 2,
          label: "Ensamblaje mediante la regla del producto de Leibniz",
          math: "h'(x) = u'(x)v(x) + u(x)v'(x) = 6x\\sqrt{2x+5} + (3x^2 - 1)\\frac{1}{\\sqrt{2x+5}}",
          deduction: "La tasa de cambio del producto consta de dos sumandos cruzados: u'v + uv'."
        },
        {
          stepNumber: 3,
          label: "Reducción algebraica a un común denominador radical",
          math: "h'(x) = \\frac{6x(2x+5) + (3x^2 - 1)}{\\sqrt{2x+5}} = \\frac{12x^2 + 30x + 3x^2 - 1}{\\sqrt{2x+5}}",
          deduction: "Multiplicamos el primer término por √(2x+5)/√(2x+5), eliminando el radical en el numerador."
        },
        {
          stepNumber: 4,
          label: "Simplificación final y reducción de términos semejantes",
          math: "h'(x) = \\frac{15x^2 + 30x - 1}{\\sqrt{2x+5}} \\quad \\left(x > -\\frac{5}{2}\\right)",
          deduction: "Sumamos los términos cuadráticos (12x² + 3x² = 15x²) y conservamos el dominio diferenciable abierto."
        }
      ],
      finalAnswer: "h'(x) = \\frac{15x^2 + 30x - 1}{\\sqrt{2x+5}}, \\quad \\text{válida para todo } x > -2.5."
    },
    reflectionQuestions: [
      {
        question: "Si Leibniz publicó originalmente en su diario que d(uv) = du · dv, ¿qué contraejemplo numérico sencillo refuta de inmediato esta conjetura?",
        pedagogicalGoal: "Desarrollar el hábito crítico de someter hipótesis algebraicas a funciones elementales como u = x y v = x.",
        promptToThink: "Si u = x y v = x, su producto es x². La derivada real es 2x, mientras que du · dv sería (1) · (1) = 1. Como 2x ≠ 1, la hipótesis colapsa."
      },
      {
        question: "¿Por qué en la demostración de la regla de la cadena la sustitución directa Δu/Δu puede ser matemáticamente inválida si Δu = 0?",
        pedagogicalGoal: "Profundizar en la rigurosidad analítica moderna y la formulación de Carathéodory.",
        promptToThink: "Si la función interna g(x) es oscilante u horizontal constante, Δu puede anularse en puntos arbitrariamente cercanos, generando división por cero."
      }
    ]
  },
  {
    id: 8,
    slideNumber: 8,
    title: "Aplicación Práctica en Física y Optimización",
    subtitle: "Cinemática Balística Completa, Puntos Críticos y Análisis del Signo de la Aceleración",
    module: "Aplicación Modelizada y Validación",
    conceptualContent: {
      thesis: "El cálculo diferencial es el lenguaje matemático de la mecánica clásica y la optimización de procesos. La primera derivada detecta las tasas instantáneas de variación y los puntos de equilibrio crítico (máximos y mínimos locales donde f'(x) = 0), mientras que la segunda derivada dictamina la concavidad, curvatura y la tasa de aceleración del sistema.",
      sections: [
        {
          heading: "El Modelo Cinemático Gravitatorio Unidimensional",
          paragraphs: [
            "Consideremos un cuerpo proyectado verticalmente en el campo gravitacional terrestre despreciando la resistencia del aire. Su altura s(t) medida desde el suelo está modelada por la ecuación cuadrática:"
          ],
          mathBlocks: [
            "s(t) = -\\frac{1}{2}g t^2 + v_0 t + s_0"
          ],
          afterMathParagraphs: [
            "Donde s₀ es la elevación inicial (pies o metros), v₀ es la velocidad inicial de lanzamiento y g es la aceleración de gravedad (32 ft/s² o 9.8 m/s²).",
            "La velocidad instantánea v(t) es la primera derivada temporal de la posición: v(t) = s'(t) = -gt + v₀.",
            "La aceleración instantánea a(t) es la segunda derivada temporal de la posición (primera de la velocidad): a(t) = v'(t) = s''(t) = -g."
          ]
        },
        {
          heading: "Condición de Óptimo (Criterio de la Primera Derivada)",
          paragraphs: [
            "El proyectil alcanza su altura máxima exactamente en el punto crítico donde se agota su impulso ascendente y su velocidad instantánea se anula momentáneamente:",
            "Puesto que la aceleración a(t) = s''(t) = -g < 0 es estrictamente negativa en todo instante, el criterio de la segunda derivada garantiza que dicho punto crítico es un máximo absoluto del movimiento."
          ],
          mathBlocks: [
            "v(t_{\\text{máx}}) = 0 \\iff -gt_{\\text{máx}} + v_0 = 0 \\implies t_{\\text{máx}} = \\frac{v_0}{g}"
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Diagrama Cartesiano Balístico s(t) con Tangente Horizontal en el Vértice",
      description: "Gráfica parabólica cóncava hacia abajo s(t) = -16t² + 64t + 160.",
      elementsToDraw: [
        "Curva parabólica invertida iniciando en el punto de intercepción vertical (0, 160) sobre el eje de altura s.",
        "Punto culminante en el vértice parabólico (2, 224) con una recta tangente horizontal destacada en color esmeralda (m = 0).",
        "Vectores tangentes descendentes con inclinación negativa cada vez más pronunciada para t > 2.",
        "Punto de impacto con el suelo en s = 0 con abscisa t = 2 + √14 ≈ 5.74 s y su tangente de impacto con pendiente v ≈ -119.7 ft/s.",
        "Línea de tiempo inferior que correlaciona: t ∈ [0, 2) sube (v > 0), t = 2 detención instantánea (v = 0), t ∈ (2, 5.74] cae (v < 0)."
      ],
      pedagogicalInsight: "Demostrar cómo la nulidad de la derivada v(t) = 0 marca con precisión quirúrgica el cambio de signo de la función velocidad y la culminación geométrica de la trayectoria.",
      interactiveType: 'physics_projectile'
    },
    stepByStepExample: {
      statement: "Desde lo alto de una torre de s₀ = 160 pies de altura, se dispara verticalmente un objeto hacia arriba con una velocidad inicial de v₀ = 64 pies/s. La ecuación de movimiento es s(t) = -16t² + 64t + 160. Calcule paso a paso: (a) Tiempo en alcanzar la altura máxima, (b) Altura máxima absoluta, (c) Tiempo exacto de impacto contra el suelo, y (d) Rapidez de impacto.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Cálculo de la función velocidad instantánea mediante derivación",
          math: "v(t) = s'(t) = \\frac{d}{dt}[-16t^2 + 64t + 160] = -32t + 64 \\quad [\\text{pies/s}]",
          deduction: "Aplicamos las reglas de potencia, múltiplo constante y constante elemental."
        },
        {
          stepNumber: 2,
          label: "Determinación del tiempo de altura máxima resolviendo v(t) = 0",
          math: "-32t + 64 = 0 \\implies 32t = 64 \\implies t_{\\text{máx}} = \\frac{64}{32} = 2 \\quad \\text{segundos}",
          deduction: "El objeto asciende durante exactamente 2 segundos antes de detenerse e iniciar el descenso."
        },
        {
          stepNumber: 3,
          label: "Evaluación de la altura máxima alcanzada s(2)",
          math: "s(2) = -16(2)^2 + 64(2) + 160 = -16(4) + 128 + 160 = -64 + 288 = 224 \\quad \\text{pies}",
          deduction: "La altura máxima absoluta por encima del nivel del suelo es de 224 pies."
        },
        {
          stepNumber: 4,
          label: "Resolución del instante de colisión contra el suelo (s(t) = 0)",
          math: "-16t^2 + 64t + 160 = 0 \\implies \\text{Dividiendo entre } -16: \\quad t^2 - 4t - 10 = 0",
          deduction: "Planteamos la condición física de altura cero al nivel del suelo y normalizamos la cuadrática."
        },
        {
          stepNumber: 5,
          label: "Aplicación de la fórmula general cuadrática",
          math: "t = \\frac{-(-4) \\pm \\sqrt{(-4)^2 - 4(1)(-10)}}{2(1)} = \\frac{4 \\pm \\sqrt{16 + 40}}{2} = \\frac{4 \\pm \\sqrt{56}}{2} = 2 \\pm \\sqrt{14}",
          deduction: "Descartamos la solución negativa t = 2 - √14 ≈ -1.74 s (tiempo anterior al lanzamiento)."
        },
        {
          stepNumber: 6,
          label: "Cálculo de la velocidad y rapidez de colisión",
          math: "t_{\\text{suelo}} = 2 + \\sqrt{14} \\approx 5.74 \\text{ s}; \\quad v(2+\\sqrt{14}) = -32(2 + \\sqrt{14}) + 64 = -32\\sqrt{14} \\approx -119.73 \\text{ ft/s}",
          deduction: "La velocidad es negativa porque el cuerpo se mueve hacia abajo. La rapidez es el valor absoluto: |v| = 32√14 ≈ 119.73 pies/s."
        }
      ],
      geometricInterpretation: "El movimiento parabólico en el plano tiempo-espacio muestra simetría temporal en la porción de vuelo libre por encima de los 160 pies (tarda 2 s en subir y 2 s en retornar a 160 pies a t = 4 s con velocidad -64 ft/s), para luego acelerar hasta el impacto a t ≈ 5.74 s.",
      conclusion: "El proyectil alcanza su cénit a los 2 s con 224 pies, e impacta el suelo a los 5.74 s con una rapidez de 119.73 pies/s (aproximadamente 131 km/h)."
    },
    proposedExercise: {
      statement: "Un dispositivo de rescate en montaña dispara una bengala vertical desde el suelo (s₀ = 0 m) con velocidad inicial de v₀ = 30 m/s. Su altitud tras t segundos sigue la ley cinemática s(t) = -5t² + 30t (asumiendo g ≈ 10 m/s²). Calcule paso a paso: (a) El instante en que la bengala alcanza su altura máxima y el valor de dicha altura, (b) La velocidad y aceleración instantánea en t = 4 s, e interprete su significado físico cotidiano.",
      everydayAnalogy: "Al lanzar una pelota hacia arriba, en el punto de máxima altura la velocidad es exactamente cero (la pelota parece flotar un milisegundo), pero la gravedad sigue tirando hacia abajo con la misma fuerza de aceleración (segunda derivada constante).",
      hint: "Derive s(t) para hallar v(t) = s'(t). Resuelva v(t) = 0 para el punto crítico de altura máxima. Luego halle la aceleración a(t) = v'(t) = s''(t) y evalúe en t = 4 s.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Deducción de las funciones de velocidad y aceleración instantáneas",
          math: "v(t) = s'(t) = \\frac{d}{dt}[-5t^2 + 30t] = -10t + 30 \\quad [\\text{m/s}]; \\quad a(t) = v'(t) = -10 \\quad [\\text{m/s}^2]",
          deduction: "La primera derivada proporciona la velocidad instantánea; la segunda derivada proporciona la aceleración gravitatoria constante."
        },
        {
          stepNumber: 2,
          label: "Determinación de la altura máxima (punto crítico v(t) = 0)",
          math: "-10t + 30 = 0 \\implies 10t = 30 \\implies t_{\\text{máx}} = 3\\text{ segundos}",
          deduction: "El objeto asciende desacelerando durante 3 segundos hasta que su velocidad se reduce a cero."
        },
        {
          stepNumber: 3,
          label: "Evaluación de la altura máxima alcanzada s(3)",
          math: "s(3) = -5(3)^2 + 30(3) = -5(9) + 90 = -45 + 90 = 45\\text{ metros}",
          deduction: "Sustituimos t = 3 s en la función de posición para obtener la cota superior del vuelo."
        },
        {
          stepNumber: 4,
          label: "Evaluación cinemática a los 4 segundos",
          math: "v(4) = -10(4) + 30 = -40 + 30 = -10\\text{ m/s}; \\quad a(4) = -10\\text{ m/s}^2",
          deduction: "El signo negativo de la velocidad (v = -10 m/s) indica que la bengala ya inició su descenso hacia el suelo. Como velocidad y aceleración tienen el mismo signo negativo, la rapidez del cuerpo va en aumento mientras cae."
        }
      ],
      finalAnswer: "Altura máxima: 45 m (a los 3 s). En t = 4 s: velocidad v = -10 m/s (en descenso a 10 m/s) y aceleración a = -10 m/s² constante hacia abajo."
    },
    reflectionQuestions: [
      {
        question: "¿Por qué en el instante de máxima altura t = 2 s la aceleración no es cero si la velocidad es idénticamente nula?",
        pedagogicalGoal: "Erradicar la persistente confusión entre el valor de una función (v = 0) y la tasa de cambio de esa función (a = dv/dt = -32 ft/s² ≠ 0).",
        promptToThink: "Si la aceleración fuese también cero en la cima, el objeto permanecería suspendido indefinidamente en el aire flotando en reposo."
      },
      {
        question: "¿Cómo se formula formalmente el criterio de la segunda derivada para clasificar máximos y mínimos relativos?",
        pedagogicalGoal: "Conectar la concavidad de la gráfica con la existencia de un extremo local.",
        promptToThink: "Si f'(c) = 0 y f''(c) < 0, la gráfica es cóncava hacia abajo, obligando al punto crítico a ser un pico máximo relativo."
      }
    ]
  },
  {
    id: 9,
    slideNumber: 9,
    title: "Cuestionario de Verificación Conceptual y Patrón de Corrección",
    subtitle: "Evaluación Formativa de Alto Nivel con Rúbrica Analítica y Desglose Epistémico",
    module: "Evaluación Socrática & Metacognición",
    conceptualContent: {
      thesis: "La evaluación en cálculo superior debe medir la comprensión de invariantes conceptuales, deducción rigurosa y detección de falacias lógicas, superando la simple ejecución memorística de tablas de fórmulas.",
      sections: [
        {
          heading: "Protocolo de Auto-Evaluación",
          paragraphs: [
            "Instrucciones: Lea detenidamente cada uno de los cuatro problemas planteados a continuación. Seleccione de forma independiente su respuesta fundamentada antes de desplegar el patrón oficial de corrección.",
            "Cada reactivo evalúa una trampa conceptual común documentada en la investigación educativa del cálculo diferencial."
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Matriz Pedagógica de Competencias Evaluadas",
      description: "Esquema matricial que asocia cada ítem del cuestionario con un nivel de comprensión analítica.",
      elementsToDraw: [
        "Nodo 1: Reactivo A → Continuidad vs Derivabilidad y Límites Simétricos.",
        "Nodo 2: Reactivo B → Naturaleza de la Tangencia en Puntos de Inflexión.",
        "Nodo 3: Reactivo C → Álgebra de Derivadas y Regla de Leibniz en Productos.",
        "Nodo 4: Reactivo D → Relación Signo de Velocidad vs Signo de Aceleración (Frenado vs Aceleración)."
      ],
      pedagogicalInsight: "Garantizar una evaluación transparente y constructiva orientada a la consolidación del rigor matemático."
    },
    stepByStepExample: {
      statement: "Ejemplo de análisis crítico: Análisis de la derivada simétrica f_s'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x-h)}{2h} aplicada a f(x) = |x| en x = 0.",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Evaluación de la derivada simétrica en el vértice",
          math: "f_s'(0) = \\lim_{h \\to 0} \\frac{|0+h| - |0-h|}{2h} = \\lim_{h \\to 0} \\frac{|h| - |-h|}{2h}",
          deduction: "Sustituimos en la definición del cociente simétrico central."
        },
        {
          stepNumber: 2,
          label: "Simplificación algebraica del numerador",
          math: "\\text{Puesto que } |-h| = |h| \\implies |h| - |h| = 0 \\quad \\text{para todo } h \\neq 0",
          deduction: "La resta en el numerador es exactamente cero antes del paso al límite."
        },
        {
          stepNumber: 3,
          label: "Cálculo del límite simétrico",
          math: "f_s'(0) = \\lim_{h \\to 0} \\frac{0}{2h} = \\lim_{h \\to 0} 0 = 0",
          deduction: "El límite simétrico existe y es igual a cero."
        }
      ],
      geometricInterpretation: "Aunque la derivada ordinaria f'(0) no existe para |x|, la derivada simétrica da 0 porque evalúa puntos a ambos lados de la 'V' a igual distancia, cancelando la asimetría.",
      conclusion: "Precaución teórica: La existencia de la derivada simétrica no garantiza la derivabilidad estándar de la función."
    },
    proposedExercise: {
      statement: "Determine si la función f(x) = x · \\sin(1/x) para x ≠ 0, con f(0) = 0, es continua y si es derivable en el punto de contacto x = 0 mediante la definición rigurosa de límites.",
      everydayAnalogy: "Imagine un resorte que vibra cada vez más rápido al comprimirse: las oscilaciones se aprietan infinitamente cerca del origen, atrapadas entre dos envolventes rectas y = x e y = -x.",
      hint: "Para la continuidad aplique el Teorema del Emparedado (Squeeze Theorem) con -|x| ≤ x·sin(1/x) ≤ |x|. Para la derivabilidad, examine el límite de [f(0+h) - f(0)]/h = sin(1/h) cuando h tiende a 0.",
      solutionSteps: [
        {
          stepNumber: 1,
          label: "Verificación de la continuidad en x = 0 mediante el Teorema del Emparedado",
          math: "-1 \\le \\sin\\left(\\frac{1}{x}\\right) \\le 1 \\implies -|x| \\le x \\sin\\left(\\frac{1}{x}\\right) \\le |x| \\implies \\lim_{x \\to 0} f(x) = 0 = f(0)",
          deduction: "Como los límites de los extremos son cero, la función es continua en el origen."
        },
        {
          stepNumber: 2,
          label: "Planteamiento del cociente de diferencias en x = 0",
          math: "\\lim_{h \\to 0} \\frac{f(0+h) - f(0)}{h} = \\lim_{h \\to 0} \\frac{h \\sin(1/h) - 0}{h} = \\lim_{h \\to 0} \\sin\\left(\\frac{1}{h}\\right)",
          deduction: "El factor h se cancela, dejando únicamente la función senoidal oscilante."
        },
        {
          stepNumber: 3,
          label: "Análisis de la existencia del límite",
          math: "\\lim_{h \\to 0} \\sin\\left(\\frac{1}{h}\\right) \\quad \\text{NO EXISTE (oscilación infinita en } [-1, 1]\\text{)}",
          deduction: "Conforme h se aproxima a cero, 1/h tiende a infinito y la función oscila infinitas veces entre -1 y 1 sin converger a ningún valor único finito."
        }
      ],
      finalAnswer: "f(x) es continua en x = 0, pero NO es derivable en x = 0 debido a la oscilación infinita de su pendiente."
    },
    reflectionQuestions: [
      {
        question: "¿Por qué muchas calculadoras gráficas utilizan la derivada numérica simétrica NDeriv con h = 0.001 y pueden engañar al usuario indicando falsamente que |x| es derivable en 0 con derivada 0?",
        pedagogicalGoal: "Comprender las limitaciones del cálculo computacional de diferencias finitas frente al rigor analítico.",
        promptToThink: "Las calculadoras ejecutan [f(0.001) - f(-0.001)] / 0.002 = [0.001 - 0.001]/0.002 = 0, enmascarando la esquina no derivable."
      }
    ],
    verificationQuestions: [
      {
        id: 1,
        question: "Considere la función f(x) = x · |x| definida en todo el eje real ℝ. ¿Es esta función derivable en el punto de unión x = 0?",
        options: [
          { key: "A", text: "No, porque contiene el factor valor absoluto |x| que posee una esquina en el origen." },
          { key: "B", text: "Sí, es derivable en x = 0 y su derivada vale f'(0) = 0." },
          { key: "C", text: "No, porque la función no es continua en x = 0." },
          { key: "D", text: "Sí, es derivable en x = 0 y su derivada vale f'(0) = 1." }
        ],
        correctKey: "B",
        rigorousExplanation: "Por definición de límite: f'(0) = lim_{h→0} [f(0+h) - f(0)] / h = lim_{h→0} [h·|h| - 0] / h = lim_{h→0} |h|. Como lim_{h→0} |h| = 0, el límite existe de forma bilateral y vale 0. El factor multiplicativo h 'suaviza' cuadráticamente la esquina del valor absoluto convirtiéndola en una parábola local suave f(x) = sgn(x)·x².",
        commonMisconception: "Creer que cualquier función que contenga la expresión |x| es automáticamente no derivable en x = 0 sin aplicar la definición fundamental de límite."
      },
      {
        id: 2,
        question: "Respecto a la recta tangente a una curva f(x) en un punto P(c, f(c)), ¿cuál de las siguientes afirmaciones es matemáticamente EXACTA y rigurosa?",
        options: [
          { key: "A", text: "La recta tangente es aquella recta que jamás cruza a la gráfica de f(x) de un lado al otro." },
          { key: "B", text: "La recta tangente puede atravesar transversalmente a la gráfica en el punto de tangencia c si c es un punto de inflexión donde cambia la concavidad." },
          { key: "C", text: "Una recta tangente siempre tiene pendiente positiva si la función es positiva en dicho punto." },
          { key: "D", text: "La recta tangente toca a la curva exactamente en un solo punto en todo su dominio real." }
        ],
        correctKey: "B",
        rigorousExplanation: "En puntos de inflexión como f(x) = x³ en x = 0, la recta tangente es y = 0. La curva pasa de estar por debajo de la tangente (para x < 0) a estar por encima de ella (para x > 0), atravesando la recta exactamente en el punto de contacto. La tangencia es una propiedad de aproximación lineal local de orden superior (f(x) - T(x) = o(x-c)), no una barrera impenetrable de un solo lado.",
        commonMisconception: "Heredar la definición geométrica euclidiana restringida al círculo creyendo que la tangente no puede cruzar la curva."
      },
      {
        id: 3,
        question: "Sean f y g dos funciones derivables en ℝ. Si se sabe que f(2) = 3, f'(2) = -1, g(2) = -4 y g'(2) = 5, ¿cuál es el valor exacto de la derivada del producto (f · g)'(2)?",
        options: [
          { key: "A", text: "(f · g)'(2) = (-1) · (5) = -5" },
          { key: "B", text: "(f · g)'(2) = (3)·(-4) = -12" },
          { key: "C", text: "(f · g)'(2) = 3(5) + (-4)(-1) = 15 + 4 = 19" },
          { key: "D", text: "(f · g)'(2) = 3(-1) + (-4)(5) = -3 - 20 = -23" }
        ],
        correctKey: "C",
        rigorousExplanation: "Aplicamos la regla del producto demostrada formalmente: (f · g)'(2) = f(2)·g'(2) + g(2)·f'(2). Sustituimos los valores correspondientes: (3)·(5) + (-4)·(-1) = 15 + 4 = 19.",
        commonMisconception: "Caer en el error histórico de Leibniz cometiendo la falacia (fg)' = f'g' = (-1)(5) = -5."
      },
      {
        id: 4,
        question: "Una partícula se desplaza en línea recta con función de posición s(t). En cierto instante t = t₁, se observa que su velocidad es v(t₁) = -15 m/s y su aceleración es a(t₁) = +6 m/s². ¿Qué le está sucediendo físicamente al movimiento de la partícula?",
        options: [
          { key: "A", text: "La partícula se mueve hacia la derecha aumentando su rapidez." },
          { key: "B", text: "La partícula se mueve hacia la izquierda y su rapidez está disminuyendo (se está frenando)." },
          { key: "C", text: "La partícula se mueve hacia la izquierda y su rapidez está aumentando (está acelerando)." },
          { key: "D", text: "La partícula está en reposo momentáneo." }
        ],
        correctKey: "B",
        rigorousExplanation: "La velocidad v(t₁) = -15 < 0 indica que la partícula viaja en el sentido negativo (hacia la izquierda). Puesto que la velocidad y la aceleración tienen signos opuestos (v < 0 y a > 0), el vector aceleración actúa en contra del movimiento, reduciendo la magnitud de la velocidad. La rapidez |v| decrece: d/dt [|v|²] = 2v·a = 2(-15)(+6) = -180 < 0. Por tanto, el cuerpo se está frenando.",
        commonMisconception: "Asumir falsamente que 'aceleración positiva (a > 0)' implica automáticamente que el objeto está aumentando su rapidez."
      }
    ]
  },
  {
    id: 10,
    slideNumber: 10,
    title: "Fundamentación Académica y Referencias Bibliográficas",
    subtitle: "Fuentes Clásicas y Contemporáneas en Formato Normativo APA 7ma Edición",
    module: "Cierre & Sustentación Bibliográfica",
    conceptualContent: {
      thesis: "El rigor instruccional de esta cátedra se sustenta en la literatura canónica del cálculo diferencial y el análisis matemático, contrastando enfoques pedagógicos clásicos (Stewart, Larson, Thomas, Purcell) con tratados estructurales y formativos de orden superior (Spivak, Apostol, Courant & John).",
      sections: [
        {
          heading: "Criterios Epistemológicos de Selección Bibliográfica",
          paragraphs: [
            "Las fuentes bibliográficas consultadas representan las obras de referencia internacional acreditadas para cursos universitarios de Cálculo I, Cálculo Infinitesimal y Análisis Real en programas de ciencias exactas, tecnología e ingeniería.",
            "Cada referencia incluye su descripción pedagógica sobre el tratamiento del cociente incremental, las demostraciones sin vacíos analíticos y la resolución gráfica de singularidades."
          ]
        }
      ]
    },
    visualRepresentation: {
      title: "Constelación de Linajes Epistémicos del Cálculo",
      description: "Diagrama genealógico de las corrientes de fundamentación del cálculo infinitesimal.",
      elementsToDraw: [
        "Rama A (Intuición Mecánica y Geometría): Newton, Leibniz, Euler → Stewart, Thomas, Larson.",
        "Rama B (Rigor Analítico ε-δ y Formalización): Cauchy, Weierstrass, Bolzano → Spivak, Apostol, Courant.",
        "Convergencia Central: La derivada como operador lineal en el análisis moderno."
      ],
      pedagogicalInsight: "Mostrar al estudiante cómo convergen la necesidad pragmática del cálculo como herramienta de modelado y la belleza incondicional del rigor formal axiomático."
    },
    stepByStepExample: {
      statement: "Guía de consulta bibliográfica recomendada según la necesidad pedagógica del estudiante:",
      algebraicSteps: [
        {
          stepNumber: 1,
          label: "Para comprensión intuitiva, aplicaciones en ingeniería y modelado visual",
          math: "\\text{Stewart (2020)} \\quad \\& \\quad \\text{Larson \\& Edwards (2022)}",
          deduction: "Exposición didáctica con riqueza gráfica cartesiana, resolución de problemas cinemáticos y amplias secuencias de práctica aplicada."
        },
        {
          stepNumber: 2,
          label: "Para demostraciones formales, análisis riguroso y teoría axiomática",
          math: "\\text{Spivak (2018)} \\quad \\& \\quad \\text{Apostol (2001)}",
          deduction: "Tratamiento fundacional de la derivada en ℝ con demostraciones rigurosas del Teorema del Valor Medio, regla de la cadena mediante Carathéodory y topología de intervalos."
        },
        {
          stepNumber: 3,
          label: "Para rigor histórico-conceptual y desarrollo clásico integral",
          math: "\\text{Purcell, Varberg \\& Rigdon (2007)} \\quad \\& \\quad \\text{Thomas, Weir \\& Hass (2018)}",
          deduction: "La referencia canónica que unifica 'dos problemas con el mismo tema' (tangente geométrica y velocidad instantánea) con notable claridad didáctica."
        }
      ],
      geometricInterpretation: "La consulta cruzada entre el enfoque intuitivo-geométrico y el enfoque formal axiomático garantiza el dominio integral de las matemáticas superiores.",
      conclusion: "El dominio del cálculo requiere armonizar la intuición visual con la solvencia formal analítica."
    },
    reflectionQuestions: [
      {
        question: "¿Por qué el cálculo infinitesimal requirió más de 150 años desde Newton y Leibniz hasta Cauchy y Weierstrass para alcanzar su formulación rigurosa actual con límites formales?",
        pedagogicalGoal: "Comprender la dificultad histórica intrínseca del concepto de 'infinitesimal' y por qué los estudiantes experimentan desafíos conceptuales similares a los de los pioneros matemáticos.",
        promptToThink: "Reflexione sobre las críticas de George Berkeley en 1734 ('los fantasmas de cantidades difuntas') que forzaron la creación de la definición épsilon-delta."
      }
    ],
    referencesAPA: [
      {
        citation: "Stewart, J., Clegg, D., & Watson, S. (2020). Calculus: Early transcendentals (9th ed.). Cengage Learning.",
        annotation: "Referencia insignia internacional de cálculo para ciencias e ingeniería. Capítulos 2 y 3: desarrollo minucioso de la tangente geométrica, tasas de cambio en ciencias naturales y sociales, y demostración exhaustiva de las reglas de derivación.",
        doiOrIsbn: "ISBN-13: 978-1337613927"
      },
      {
        citation: "Larson, R., & Edwards, B. H. (2022). Calculus (12th ed.). Cengage Learning.",
        annotation: "Destacado por su excepcional claridad didáctica y precisión visual. Presenta esquemas cartesianos con representaciones en color de familias de secantes y problemas de derivabilidad en puntos singulares.",
        doiOrIsbn: "ISBN-13: 978-0357749135"
      },
      {
        citation: "Thomas, G. B., Weir, M. D., & Hass, J. (2018). Thomas' calculus: Early transcendentals (14th ed.). Pearson Education.",
        annotation: "Texto fundacional que ha formado a generaciones de matemáticos e ingenieros. Destaca su análisis riguroso de la linealidad de operadores y su tratamiento de la velocidad como derivada vectorial.",
        doiOrIsbn: "ISBN-13: 978-0134439020"
      },
      {
        citation: "Purcell, E. J., Varberg, D., & Rigdon, S. E. (2007). Cálculo (9a ed., Trad. V. Ibarra). Pearson Educación.",
        annotation: "Obra clásica que formaliza 'Dos problemas con el mismo tema' (la pendiente de la recta tangente y la velocidad instantánea como manifestaciones idénticas del cociente diferencial).",
        doiOrIsbn: "ISBN-13: 978-9702609162"
      },
      {
        citation: "Spivak, M. (2018). Calculus (4th ed.). Publish or Perish.",
        annotation: "Tratado canónico de análisis matemático en una variable real. Rigor deductivo puro, demostraciones axiomáticas completas sin atajos algebraicos y tratamiento profundo de funciones patológicas.",
        doiOrIsbn: "ISBN-13: 978-0914098911"
      },
      {
        citation: "Apostol, T. M. (2001). Calculus: Cálculo con funciones de una variable, con una introducción al álgebra lineal (2a ed., Vol. 1). Editorial Reverté.",
        annotation: "Abordaje moderno que articula la derivada con la teoría de operadores lineales y las expansiones asintóticas locales de Taylor.",
        doiOrIsbn: "ISBN-13: 978-8429150025"
      },
      {
        citation: "Courant, R., & John, F. (1999). Introducción al cálculo y al análisis matemático (Vol. 1). Editorial Limusa.",
        annotation: "Perspectiva clásica germana de la Escuela de Gotinga, uniendo el rigor formal con la intuición física de los problemas variacionales.",
        doiOrIsbn: "ISBN-13: 978-9681806347"
      },
      {
        citation: "Boyer, C. B. (1959). The history of the calculus and its conceptual development. Dover Publications.",
        annotation: "Estudio historiográfico definitivo sobre la evolución de la idea de la derivada desde Zenón y Arquímedes hasta la formalización de Cauchy y Weierstrass.",
        doiOrIsbn: "ISBN-13: 978-0486605098"
      }
    ]
  }
];
