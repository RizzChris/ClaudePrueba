# 📚 Ejemplos de Uso

Este documento muestra ejemplos de cómo usar el clasificador de acentuación.

## Usando la Interfaz Web

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre tu navegador en `http://localhost:5173`

3. Ingresa una palabra y haz clic en "Analizar"

## Ejemplos de Palabras por Tipo

### Palabras Agudas
- **café**: ca-fé (tilde porque termina en vocal)
- **camión**: ca-mión (tilde porque termina en n)
- **compás**: com-pás (tilde porque termina en s)
- **reloj**: re-loj (sin tilde porque termina en j)
- **ciudad**: ciu-dad (sin tilde porque termina en d)
- **sofá**: so-fá (tilde porque termina en vocal)

### Palabras Graves (Llanas)
- **casa**: ca-sa (sin tilde porque termina en vocal)
- **árbol**: ár-bol (tilde porque NO termina en vocal, n, s)
- **lápiz**: lá-piz (tilde porque NO termina en vocal, n, s)
- **mesa**: me-sa (sin tilde porque termina en vocal)
- **fácil**: fá-cil (tilde porque NO termina en vocal, n, s)
- **computadora**: com-pu-ta-do-ra (sin tilde porque termina en vocal)

### Palabras Esdrújulas
- **música**: mú-si-ca (SIEMPRE llevan tilde)
- **pájaro**: pá-ja-ro (SIEMPRE llevan tilde)
- **teléfono**: te-lé-fo-no (SIEMPRE llevan tilde)
- **película**: pe-lí-cu-la (SIEMPRE llevan tilde)
- **brújula**: brú-ju-la (SIEMPRE llevan tilde)
- **sábado**: sá-ba-do (SIEMPRE llevan tilde)

## Usando los Módulos en JavaScript

### Ejemplo 1: Análisis Completo

\`\`\`javascript
import { analizarPalabraCompleta } from './utils/analizadorCompleto';

const resultado = analizarPalabraCompleta('música');

console.log(resultado);
// {
//   exito: true,
//   palabra: 'música',
//   clasificacion: 'esdrújula',
//   silabas: ['mú', 'si', 'ca'],
//   silabasTexto: 'mú-si-ca',
//   silabaTonica: 'mú',
//   tieneTilde: true,
//   explicacion: 'Es esdrújula porque la fuerza de voz cae...',
//   aprendizaje: 'Las palabras esdrújulas SIEMPRE llevan tilde.',
//   redNeuronal: {
//     probabilidades: { aguda: '5.2%', grave: '3.1%', esdrújula: '91.7%' },
//     confianza: '91.7%',
//     nivelConfianza: 'Muy alta'
//   }
// }
\`\`\`

### Ejemplo 2: Solo División Silábica

\`\`\`javascript
import { dividirEnSilabas } from './utils/silabas';

const silabas = dividirEnSilabas('computadora');
console.log(silabas);
// ['com', 'pu', 'ta', 'do', 'ra']
\`\`\`

### Ejemplo 3: Solo Clasificación

\`\`\`javascript
import { clasificarPalabra } from './utils/clasificador';

const clasificacion = clasificarPalabra('café');
console.log(clasificacion);
// {
//   palabra: 'café',
//   tipo: 'aguda',
//   silabas: ['ca', 'fé'],
//   silabaTonicaPosicion: 0,
//   silabaTonicaIndice: 1
// }
\`\`\`

### Ejemplo 4: Simulación de Red Neuronal

\`\`\`javascript
import { simularRedNeuronal } from './utils/redNeuronal';

const simulacion = simularRedNeuronal('grave', 'árbol');
console.log(simulacion);
// {
//   probabilidades: {
//     aguda: 4.3,
//     grave: 89.2,
//     esdrújula: 6.5
//   },
//   confianza: 89.2,
//   nivelConfianza: 'Alta',
//   tipoPredicho: 'grave'
// }
\`\`\`

## Casos Especiales

### Monosílabos
```javascript
analizarPalabraCompleta('sol');
// Monosílabos son tratados como agudos
```

### Palabras con Diptongo
```javascript
analizarPalabraCompleta('cuaderno');
// cua-der-no (diptongo 'ua' en primera sílaba)
```

### Palabras con Hiato
```javascript
analizarPalabraCompleta('país');
// pa-ís (hiato porque la 'í' tiene tilde)
```

## Validaciones

El sistema valida:
- ✅ Que la entrada sea una palabra válida
- ✅ Que contenga solo letras del español
- ✅ Que no esté vacía

### Ejemplos de Validación

```javascript
// Entrada inválida
analizarPalabraCompleta('123');
// { exito: false, mensaje: 'La palabra debe contener solo letras...' }

// Entrada vacía
analizarPalabraCompleta('');
// { exito: false, mensaje: 'Por favor, ingresa una palabra válida.' }

// Entrada válida
analizarPalabraCompleta('niño');
// { exito: true, ... }
```

## Reglas Implementadas

El clasificador implementa las siguientes reglas de la RAE:

1. **Agudas**: Llevan tilde cuando terminan en vocal, n o s
2. **Graves**: Llevan tilde cuando NO terminan en vocal, n o s
3. **Esdrújulas**: SIEMPRE llevan tilde
4. **Diptongos**: Vocal débil + vocal fuerte (o viceversa) sin tilde en la débil
5. **Hiatos**: Vocal débil con tilde + cualquier otra vocal
6. **Grupos consonánticos**: bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, tr se mantienen juntos

---

**Nota**: Este es un proyecto educativo. Algunos casos muy específicos de la lengua española pueden requerir análisis manual.
