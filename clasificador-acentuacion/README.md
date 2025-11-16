# 🎯 Clasificador de Acentuación en Español

Aplicación web educativa diseñada para ayudar a niños de primaria a identificar correctamente si una palabra es **aguda**, **grave** o **esdrújula**.

## 📋 Descripción

Este proyecto combina reglas ortográficas del español con un simulador de red neuronal para proporcionar:

- ✅ Clasificación automática de palabras
- 📊 Análisis de probabilidades
- 💡 Explicaciones educativas claras
- 🎨 Interfaz amigable y colorida

## 🚀 Características Principales

### 1. División Silábica Inteligente
- Separa palabras en sílabas siguiendo las reglas del español
- Identifica diptongos, hiatos y grupos consonánticos
- Detecta la sílaba tónica automáticamente

### 2. Clasificación de Acentuación
- **Agudas**: Acento en la última sílaba
- **Graves (Llanas)**: Acento en la penúltima sílaba
- **Esdrújulas**: Acento en la antepenúltima sílaba

### 3. Simulador de Red Neuronal
- Genera probabilidades para cada tipo de palabra
- Muestra nivel de confianza del análisis
- Visualización con barras de progreso

### 4. Interfaz Educativa
- Diseñada específicamente para niños
- Ejemplos interactivos
- Explicaciones simples y claras
- Retroalimentación visual

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de interfaz de usuario
- **Vite**: Herramienta de construcción rápida
- **JavaScript ES6+**: Lógica de la aplicación
- **CSS3**: Estilos y animaciones

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio
cd clasificador-acentuacion

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 🎮 Uso

1. **Ingresar una palabra**: Escribe cualquier palabra en español en el campo de entrada
2. **Analizar**: Haz clic en el botón "Analizar 🔍"
3. **Ver resultados**: La aplicación mostrará:
   - División en sílabas
   - Clasificación (aguda/grave/esdrújula)
   - Explicación educativa
   - Probabilidades del análisis
   - Regla de acentuación aplicable

### Ejemplos Rápidos

Puedes probar ejemplos predefinidos haciendo clic en:
- **Palabra Aguda**: café, reloj, camión
- **Palabra Grave**: casa, árbol, lápiz
- **Palabra Esdrújula**: música, pájaro, teléfono

## 📁 Estructura del Proyecto

```
clasificador-acentuacion/
├── src/
│   ├── components/
│   │   ├── ClasificadorAcentuacion.jsx    # Componente principal
│   │   └── ClasificadorAcentuacion.css    # Estilos del componente
│   ├── utils/
│   │   ├── silabas.js                     # División silábica
│   │   ├── clasificador.js                # Lógica de clasificación
│   │   ├── redNeuronal.js                 # Simulador de red neuronal
│   │   └── analizadorCompleto.js          # Integración de módulos
│   ├── App.jsx                            # Componente raíz
│   ├── App.css                            # Estilos globales
│   ├── index.css                          # Estilos base
│   └── main.jsx                           # Punto de entrada
├── public/                                # Archivos públicos
├── package.json                           # Dependencias
├── vite.config.js                         # Configuración de Vite
└── README.md                              # Este archivo
```

## 🎓 Reglas de Acentuación

### Palabras Agudas
- La sílaba tónica es la **última**
- Llevan tilde cuando terminan en vocal, "n" o "s"
- Ejemplos: café, camión, compás

### Palabras Graves (Llanas)
- La sílaba tónica es la **penúltima**
- Llevan tilde cuando NO terminan en vocal, "n" o "s"
- Ejemplos: árbol, lápiz, difícil

### Palabras Esdrújulas
- La sílaba tónica es la **antepenúltima**
- **SIEMPRE** llevan tilde
- Ejemplos: música, teléfono, pájaro

## 🧪 Módulos Principales

### `silabas.js`
Contiene la lógica para dividir palabras en sílabas:
- `dividirEnSilabas(palabra)`: Separa una palabra en sílabas
- `detectarSilabaTonicaPosicion(palabra)`: Identifica la posición de la sílaba tónica

### `clasificador.js`
Clasifica palabras según su acentuación:
- `clasificarPalabra(palabra)`: Determina el tipo de palabra
- `generarExplicacion(resultado)`: Crea explicaciones educativas
- `analizarPalabra(palabra)`: Análisis completo

### `redNeuronal.js`
Simula el comportamiento de una red neuronal:
- `generarProbabilidades(tipo, palabra)`: Calcula probabilidades
- `simularRedNeuronal(tipo, palabra)`: Simulación completa

### `analizadorCompleto.js`
Integra todos los módulos:
- `analizarPalabraCompleta(palabra)`: Análisis integral
- `obtenerEjemplos()`: Proporciona ejemplos aleatorios

## 🎨 Características de la Interfaz

- **Diseño Responsive**: Se adapta a móviles y tablets
- **Colores Educativos**: Diferentes colores para cada tipo de palabra
- **Animaciones Suaves**: Transiciones agradables
- **Feedback Visual**: Barras de progreso y tarjetas informativas
- **Accesibilidad**: Diseño claro y legible

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Linting
npm run lint         # Verifica código con ESLint
```

## 🤝 Contribuciones

Este es un proyecto académico para ayudar a niños de primaria. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

## 👨‍💻 Autor

Proyecto académico desarrollado para apoyar la enseñanza de ortografía española.

## 🙏 Agradecimientos

- Reglas ortográficas basadas en la Real Academia Española (RAE)
- Diseñado pensando en estudiantes de primaria
- Interfaz inspirada en principios de UX educativa

---

**¡Disfruta aprendiendo ortografía española! 🇪🇸**
