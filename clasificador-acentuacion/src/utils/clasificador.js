/**
 * Módulo clasificador de acentuación
 * Clasifica palabras en: agudas, graves (llanas) o esdrújulas
 */

import { dividirEnSilabas, detectarSilabaTonicaPosicion } from './silabas.js';

/**
 * Tipos de clasificación
 */
export const TIPOS = {
  AGUDA: 'aguda',
  GRAVE: 'grave',
  ESDRUJULA: 'esdrújula',
  SOBRESDRUJULA: 'sobresdrújula',
};

/**
 * Clasifica una palabra según su acentuación
 */
export const clasificarPalabra = (palabra) => {
  if (!palabra || typeof palabra !== 'string') {
    return null;
  }

  const silabas = dividirEnSilabas(palabra);
  const posicionTonica = detectarSilabaTonicaPosicion(palabra);

  if (silabas.length === 0 || posicionTonica === -1) {
    return null;
  }

  let tipo = '';

  switch (posicionTonica) {
    case 0: // Última sílaba
      tipo = TIPOS.AGUDA;
      break;
    case 1: // Penúltima sílaba
      tipo = TIPOS.GRAVE;
      break;
    case 2: // Antepenúltima sílaba
      tipo = TIPOS.ESDRUJULA;
      break;
    default: // Antes de la antepenúltima
      tipo = TIPOS.SOBRESDRUJULA;
      break;
  }

  return {
    palabra: palabra,
    tipo: tipo,
    silabas: silabas,
    silabaTonicaPosicion: posicionTonica,
    silabaTonicaIndice: silabas.length - 1 - posicionTonica,
  };
};

/**
 * Genera una explicación educativa para niños sobre la clasificación
 */
export const generarExplicacion = (resultado) => {
  if (!resultado) {
    return 'No se pudo analizar la palabra.';
  }

  const { tipo, silabas, silabaTonicaIndice } = resultado;
  const silabasUnidas = silabas.join('-');
  const silabaTonica = silabas[silabaTonicaIndice];

  let explicacion = '';
  let aprendizaje = '';

  switch (tipo) {
    case TIPOS.AGUDA:
      explicacion = `Es aguda porque la fuerza de voz cae en la última sílaba: ${silabasUnidas}. La sílaba tónica es "${silabaTonica}".`;
      aprendizaje = 'Las palabras agudas llevan tilde cuando terminan en vocal, "n" o "s".';
      break;

    case TIPOS.GRAVE:
      explicacion = `Es grave porque la fuerza de voz cae en la penúltima sílaba: ${silabasUnidas}. La sílaba tónica es "${silabaTonica}".`;
      aprendizaje = 'Las palabras graves llevan tilde cuando NO terminan en vocal, "n" o "s".';
      break;

    case TIPOS.ESDRUJULA:
      explicacion = `Es esdrújula porque la fuerza de voz cae en la antepenúltima sílaba: ${silabasUnidas}. La sílaba tónica es "${silabaTonica}".`;
      aprendizaje = 'Las palabras esdrújulas SIEMPRE llevan tilde.';
      break;

    case TIPOS.SOBRESDRUJULA:
      explicacion = `Es sobresdrújula porque la fuerza de voz cae antes de la antepenúltima sílaba: ${silabasUnidas}. La sílaba tónica es "${silabaTonica}".`;
      aprendizaje = 'Las palabras sobresdrújulas SIEMPRE llevan tilde.';
      break;

    default:
      explicacion = 'No se pudo clasificar la palabra.';
      aprendizaje = '';
  }

  return {
    explicacion,
    aprendizaje,
  };
};

/**
 * Verifica si la palabra tiene tilde
 */
export const tieneTilde = (palabra) => {
  return /[áéíóú]/i.test(palabra);
};

/**
 * Obtiene el análisis completo de una palabra
 */
export const analizarPalabra = (palabra) => {
  const clasificacion = clasificarPalabra(palabra);

  if (!clasificacion) {
    return {
      valida: false,
      mensaje: 'No se pudo analizar la palabra. Verifica que sea una palabra válida en español.',
    };
  }

  const { explicacion, aprendizaje } = generarExplicacion(clasificacion);

  return {
    valida: true,
    palabra: clasificacion.palabra,
    tipo: clasificacion.tipo,
    silabas: clasificacion.silabas,
    silabasTexto: clasificacion.silabas.join('-'),
    silabaTonica: clasificacion.silabas[clasificacion.silabaTonicaIndice],
    tieneTilde: tieneTilde(palabra),
    explicacion,
    aprendizaje,
  };
};
