/**
 * Módulo para división silábica en español
 * Implementa las reglas ortográficas del español para dividir palabras en sílabas
 */

const vocales = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü'];
const vocalesDebiles = ['i', 'u', 'í', 'ú'];
const vocalesFuertes = ['a', 'e', 'o', 'á', 'é', 'ó'];

/**
 * Verifica si un carácter es una vocal
 */
const esVocal = (letra) => {
  return vocales.includes(letra.toLowerCase());
};

/**
 * Verifica si un carácter es una vocal débil
 */
const esVocalDebil = (letra) => {
  return vocalesDebiles.includes(letra.toLowerCase());
};

/**
 * Verifica si un carácter es una vocal fuerte
 */
const esVocalFuerte = (letra) => {
  return vocalesFuertes.includes(letra.toLowerCase());
};

/**
 * Verifica si un carácter es una consonante
 */
const esConsonante = (letra) => {
  return /[bcdfghjklmnñpqrstvwxyz]/i.test(letra);
};

/**
 * Divide una palabra en sílabas siguiendo las reglas del español
 */
export const dividirEnSilabas = (palabra) => {
  if (!palabra || typeof palabra !== 'string') {
    return [];
  }

  const palabraLimpia = palabra.toLowerCase().trim();
  const silabas = [];
  let silabaActual = '';

  for (let i = 0; i < palabraLimpia.length; i++) {
    const letra = palabraLimpia[i];
    const siguiente = palabraLimpia[i + 1];
    const siguiente2 = palabraLimpia[i + 2];

    silabaActual += letra;

    // Regla 1: Vocal + consonante + vocal = separar
    if (esVocal(letra) && esConsonante(siguiente) && esVocal(siguiente2)) {
      // Excepciones para grupos consonánticos inseparables
      const grupoConsonantico = siguiente + siguiente2;
      const inseparables = ['ch', 'll', 'rr'];

      if (!inseparables.includes(grupoConsonantico)) {
        // Verificar si es un grupo consonántico que va junto (bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, tr)
        const gruposJuntos = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'tr'];
        const proximoGrupo = palabraLimpia[i + 1] + palabraLimpia[i + 2];

        if (!gruposJuntos.includes(proximoGrupo)) {
          silabas.push(silabaActual);
          silabaActual = '';
        }
      }
    }
    // Regla 2: Vocal + consonante + consonante + vocal
    else if (esVocal(letra) && esConsonante(siguiente) && esConsonante(siguiente2)) {
      const grupoCC = siguiente + siguiente2;
      const gruposJuntos = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'tr', 'ch', 'll', 'rr'];

      // Si NO es un grupo que va junto, separar después de la primera consonante
      if (!gruposJuntos.includes(grupoCC)) {
        silabaActual += siguiente;
        silabas.push(silabaActual);
        silabaActual = '';
        i++; // Saltar la consonante que ya agregamos
      }
    }
    // Regla 3: Diptongos y hiatos
    else if (esVocal(letra) && esVocal(siguiente)) {
      // Verificar si tiene tilde (rompe diptongo)
      const tieneTilde = siguiente === 'á' || siguiente === 'é' || siguiente === 'í' ||
                         siguiente === 'ó' || siguiente === 'ú';

      // Vocal débil + vocal débil = diptongo (van juntas)
      // Vocal fuerte + vocal débil sin tilde = diptongo (van juntas)
      // Vocal débil sin tilde + vocal fuerte = diptongo (van juntas)
      // Vocal fuerte + vocal fuerte = hiato (se separan)
      // Vocal débil con tilde + cualquier vocal = hiato (se separan)

      const hayDiptongo = (
        (esVocalDebil(letra) && esVocalDebil(siguiente) && !tieneTilde) ||
        (esVocalFuerte(letra) && esVocalDebil(siguiente) && !tieneTilde) ||
        (esVocalDebil(letra) && esVocalFuerte(siguiente) && !tieneTilde)
      );

      if (!hayDiptongo) {
        silabas.push(silabaActual);
        silabaActual = '';
      }
    }
  }

  // Agregar la última sílaba
  if (silabaActual) {
    silabas.push(silabaActual);
  }

  return silabas.filter(s => s.length > 0);
};

/**
 * Detecta la posición de la sílaba tónica (0 = última, 1 = penúltima, 2 = antepenúltima)
 */
export const detectarSilabaTonicaPosicion = (palabra) => {
  const silabas = dividirEnSilabas(palabra);

  if (silabas.length === 0) return -1;

  // Buscar tilde explícita
  for (let i = 0; i < silabas.length; i++) {
    if (/[áéíóú]/i.test(silabas[i])) {
      return silabas.length - 1 - i; // Devolver posición desde el final
    }
  }

  // Aplicar reglas si no hay tilde
  const palabraLimpia = palabra.toLowerCase().trim();
  const ultimaLetra = palabraLimpia[palabraLimpia.length - 1];

  // Si termina en vocal, n o s -> grave (penúltima sílaba)
  if (esVocal(ultimaLetra) || ultimaLetra === 'n' || ultimaLetra === 's') {
    return 1; // Penúltima
  }

  // Si termina en consonante (excepto n, s) -> aguda (última sílaba)
  return 0; // Última
};

/**
 * Obtiene el índice de la sílaba tónica
 */
export const obtenerIndiceSilabaAtonica = (palabra) => {
  const silabas = dividirEnSilabas(palabra);
  const posicion = detectarSilabaTonicaPosicion(palabra);

  if (posicion === -1 || silabas.length === 0) return -1;

  return silabas.length - 1 - posicion;
};
