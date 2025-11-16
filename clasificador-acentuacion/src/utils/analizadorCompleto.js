/**
 * Módulo integrador - Análisis completo de palabras
 * Combina clasificación + red neuronal + explicaciones
 */

import { analizarPalabra } from './clasificador.js';
import { simularRedNeuronal, generarReporteRedNeuronal } from './redNeuronal.js';

/**
 * Realiza un análisis completo de una palabra
 * Incluye clasificación, explicación y simulación de red neuronal
 */
export const analizarPalabraCompleta = (palabra) => {
  // Validar entrada
  if (!palabra || typeof palabra !== 'string' || palabra.trim() === '') {
    return {
      exito: false,
      mensaje: 'Por favor, ingresa una palabra válida.',
    };
  }

  // Limpiar la palabra
  const palabraLimpia = palabra.trim();

  // Validar que solo contenga letras
  if (!/^[a-záéíóúüñ]+$/i.test(palabraLimpia)) {
    return {
      exito: false,
      mensaje: 'La palabra debe contener solo letras del español.',
    };
  }

  // Analizar con el clasificador
  const analisis = analizarPalabra(palabraLimpia);

  if (!analisis.valida) {
    return {
      exito: false,
      mensaje: analisis.mensaje,
    };
  }

  // Simular red neuronal
  const simulacion = simularRedNeuronal(analisis.tipo, palabraLimpia);
  const reporte = generarReporteRedNeuronal(simulacion);

  // Retornar resultado completo
  return {
    exito: true,
    palabra: analisis.palabra,
    clasificacion: analisis.tipo,
    silabas: analisis.silabas,
    silabasTexto: analisis.silabasTexto,
    silabaTonica: analisis.silabaTonica,
    tieneTilde: analisis.tieneTilde,
    explicacion: analisis.explicacion,
    aprendizaje: analisis.aprendizaje,
    redNeuronal: {
      probabilidades: reporte.probabilidades,
      confianza: reporte.confianza,
      nivelConfianza: reporte.nivelConfianza,
    },
  };
};

/**
 * Ejemplos de palabras para ayudar a los usuarios
 */
export const EJEMPLOS = {
  agudas: ['café', 'reloj', 'camión', 'sofá', 'corazón', 'ciudad'],
  graves: ['casa', 'árbol', 'lápiz', 'mesa', 'computadora', 'fácil'],
  esdrujulas: ['música', 'pájaro', 'teléfono', 'película', 'brújula', 'sábado'],
};

/**
 * Obtiene un ejemplo aleatorio de cada tipo
 */
export const obtenerEjemplos = () => {
  const tipos = Object.keys(EJEMPLOS);
  const ejemplos = {};

  tipos.forEach(tipo => {
    const palabras = EJEMPLOS[tipo];
    const indice = Math.floor(Math.random() * palabras.length);
    ejemplos[tipo] = palabras[indice];
  });

  return ejemplos;
};
