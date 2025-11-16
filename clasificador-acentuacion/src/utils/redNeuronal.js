/**
 * Simulador de Red Neuronal para clasificación de acentuación
 * Genera probabilidades simuladas basadas en la clasificación real
 */

import { TIPOS } from './clasificador.js';

/**
 * Genera probabilidades simuladas para cada tipo de palabra
 * La clasificación correcta tendrá mayor probabilidad (85-95%)
 * Las otras categorías tendrán probabilidades menores que suman el resto
 */
export const generarProbabilidades = (tipoReal, palabra) => {
  // Probabilidad base para la clasificación correcta
  const probabilidadCorrecta = 85 + Math.random() * 10; // Entre 85% y 95%

  // Distribución del resto entre las otras categorías
  const probabilidadRestante = 100 - probabilidadCorrecta;

  // Inicializar probabilidades
  const probabilidades = {
    [TIPOS.AGUDA]: 0,
    [TIPOS.GRAVE]: 0,
    [TIPOS.ESDRUJULA]: 0,
  };

  // Asignar la mayor probabilidad a la clasificación correcta
  probabilidades[tipoReal] = probabilidadCorrecta;

  // Distribuir el resto entre las otras categorías
  const otrosTipos = Object.keys(probabilidades).filter(tipo => tipo !== tipoReal);

  if (otrosTipos.length === 2) {
    // Generar división aleatoria del resto
    const prob1 = Math.random() * probabilidadRestante;
    const prob2 = probabilidadRestante - prob1;

    probabilidades[otrosTipos[0]] = prob1;
    probabilidades[otrosTipos[1]] = prob2;
  }

  // Redondear a 1 decimal
  Object.keys(probabilidades).forEach(tipo => {
    probabilidades[tipo] = Math.round(probabilidades[tipo] * 10) / 10;
  });

  // Ajustar para que sume exactamente 100
  const suma = Object.values(probabilidades).reduce((a, b) => a + b, 0);
  const diferencia = 100 - suma;

  if (diferencia !== 0) {
    probabilidades[tipoReal] += diferencia;
    probabilidades[tipoReal] = Math.round(probabilidades[tipoReal] * 10) / 10;
  }

  return probabilidades;
};

/**
 * Simula el proceso de clasificación de una red neuronal
 * Incluye información adicional como "confianza" del modelo
 */
export const simularRedNeuronal = (tipoReal, palabra) => {
  const probabilidades = generarProbabilidades(tipoReal, palabra);
  const confianza = probabilidades[tipoReal];

  let nivelConfianza = '';
  if (confianza >= 90) {
    nivelConfianza = 'Muy alta';
  } else if (confianza >= 80) {
    nivelConfianza = 'Alta';
  } else if (confianza >= 70) {
    nivelConfianza = 'Media';
  } else {
    nivelConfianza = 'Baja';
  }

  return {
    probabilidades,
    confianza,
    nivelConfianza,
    tipoPredicho: tipoReal,
  };
};

/**
 * Genera un reporte detallado del análisis de la red neuronal
 */
export const generarReporteRedNeuronal = (simulacion) => {
  const { probabilidades, confianza, nivelConfianza, tipoPredicho } = simulacion;

  return {
    probabilidades: {
      aguda: `${probabilidades[TIPOS.AGUDA]}%`,
      grave: `${probabilidades[TIPOS.GRAVE]}%`,
      esdrújula: `${probabilidades[TIPOS.ESDRUJULA]}%`,
    },
    confianza: `${confianza}%`,
    nivelConfianza,
    clasificacion: tipoPredicho,
  };
};
