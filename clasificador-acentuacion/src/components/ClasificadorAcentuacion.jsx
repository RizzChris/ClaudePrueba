import { useState } from 'react';
import { analizarPalabraCompleta, obtenerEjemplos } from '../utils/analizadorCompleto';
import './ClasificadorAcentuacion.css';

const ClasificadorAcentuacion = () => {
  const [palabra, setPalabra] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const handleAnalizar = (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);

    const analisis = analizarPalabraCompleta(palabra);

    if (!analisis.exito) {
      setError(analisis.mensaje);
      return;
    }

    setResultado(analisis);
  };

  const handleEjemplo = (tipo) => {
    const ejemplos = obtenerEjemplos();
    setPalabra(ejemplos[tipo]);
    setError('');
    setResultado(null);
  };

  const limpiar = () => {
    setPalabra('');
    setResultado(null);
    setError('');
  };

  const getColorTipo = (tipo) => {
    switch (tipo) {
      case 'aguda':
        return '#FF6B6B';
      case 'grave':
        return '#4ECDC4';
      case 'esdrújula':
        return '#FFD93D';
      default:
        return '#95E1D3';
    }
  };

  return (
    <div className="clasificador-container">
      <header className="header">
        <h1 className="titulo">🎯 Clasificador de Acentuación</h1>
        <p className="subtitulo">
          Aprende a identificar si una palabra es aguda, grave o esdrújula
        </p>
      </header>

      <div className="contenido">
        <form onSubmit={handleAnalizar} className="formulario">
          <div className="input-group">
            <input
              type="text"
              value={palabra}
              onChange={(e) => setPalabra(e.target.value)}
              placeholder="Escribe una palabra aquí..."
              className="input-palabra"
              autoFocus
            />
            <button type="submit" className="btn-analizar" disabled={!palabra.trim()}>
              Analizar 🔍
            </button>
          </div>
        </form>

        {error && (
          <div className="mensaje-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className="botones-ejemplo">
          <p className="texto-ejemplo">O prueba con un ejemplo:</p>
          <div className="ejemplos-grid">
            <button onClick={() => handleEjemplo('agudas')} className="btn-ejemplo btn-aguda">
              Palabra Aguda
            </button>
            <button onClick={() => handleEjemplo('graves')} className="btn-ejemplo btn-grave">
              Palabra Grave
            </button>
            <button onClick={() => handleEjemplo('esdrujulas')} className="btn-ejemplo btn-esdrujula">
              Palabra Esdrújula
            </button>
          </div>
        </div>

        {resultado && (
          <div className="resultado-container">
            <div className="resultado-header" style={{ backgroundColor: getColorTipo(resultado.clasificacion) }}>
              <h2 className="resultado-titulo">
                Palabra: {resultado.palabra}
              </h2>
              <div className="clasificacion-badge">
                {resultado.clasificacion.toUpperCase()}
              </div>
            </div>

            <div className="resultado-contenido">
              <div className="seccion">
                <h3 className="seccion-titulo">📝 Separación en Sílabas</h3>
                <div className="silabas-container">
                  {resultado.silabas.map((silaba, index) => (
                    <div
                      key={index}
                      className={`silaba ${silaba === resultado.silabaTonica ? 'silaba-tonica' : ''}`}
                    >
                      {silaba}
                    </div>
                  ))}
                </div>
                <p className="silabas-texto">
                  {resultado.silabasTexto}
                  {resultado.tieneTilde && ' ✓ (tiene tilde)'}
                </p>
              </div>

              <div className="seccion">
                <h3 className="seccion-titulo">💡 Explicación</h3>
                <p className="explicacion-texto">{resultado.explicacion}</p>
              </div>

              <div className="seccion">
                <h3 className="seccion-titulo">🧠 Análisis de la Red Neuronal</h3>
                <div className="probabilidades-container">
                  <div className="probabilidad-item">
                    <span className="probabilidad-label">Aguda:</span>
                    <div className="probabilidad-barra-container">
                      <div
                        className="probabilidad-barra aguda"
                        style={{ width: resultado.redNeuronal.probabilidades.aguda }}
                      />
                      <span className="probabilidad-valor">
                        {resultado.redNeuronal.probabilidades.aguda}
                      </span>
                    </div>
                  </div>

                  <div className="probabilidad-item">
                    <span className="probabilidad-label">Grave:</span>
                    <div className="probabilidad-barra-container">
                      <div
                        className="probabilidad-barra grave"
                        style={{ width: resultado.redNeuronal.probabilidades.grave }}
                      />
                      <span className="probabilidad-valor">
                        {resultado.redNeuronal.probabilidades.grave}
                      </span>
                    </div>
                  </div>

                  <div className="probabilidad-item">
                    <span className="probabilidad-label">Esdrújula:</span>
                    <div className="probabilidad-barra-container">
                      <div
                        className="probabilidad-barra esdrujula"
                        style={{ width: resultado.redNeuronal.probabilidades.esdrújula }}
                      />
                      <span className="probabilidad-valor">
                        {resultado.redNeuronal.probabilidades.esdrújula}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="confianza-info">
                  <p>
                    <strong>Confianza del modelo:</strong> {resultado.redNeuronal.confianza} ({resultado.redNeuronal.nivelConfianza})
                  </p>
                </div>
              </div>

              <div className="seccion aprendizaje-seccion">
                <h3 className="seccion-titulo">🎓 Aprendizaje</h3>
                <p className="aprendizaje-texto">{resultado.aprendizaje}</p>
              </div>
            </div>

            <button onClick={limpiar} className="btn-limpiar">
              Analizar otra palabra 🔄
            </button>
          </div>
        )}

        <div className="info-adicional">
          <h3 className="info-titulo">📚 Recuerda:</h3>
          <div className="info-grid">
            <div className="info-card card-aguda">
              <h4>Agudas</h4>
              <p>La fuerza de voz está en la <strong>última</strong> sílaba.</p>
              <p className="ejemplo-mini">Ejemplo: ca-fé, re-loj</p>
            </div>
            <div className="info-card card-grave">
              <h4>Graves</h4>
              <p>La fuerza de voz está en la <strong>penúltima</strong> sílaba.</p>
              <p className="ejemplo-mini">Ejemplo: ca-sa, ár-bol</p>
            </div>
            <div className="info-card card-esdrujula">
              <h4>Esdrújulas</h4>
              <p>La fuerza de voz está en la <strong>antepenúltima</strong> sílaba.</p>
              <p className="ejemplo-mini">Ejemplo: mú-si-ca, pá-ja-ro</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Proyecto educativo para aprender ortografía española 🇪🇸</p>
      </footer>
    </div>
  );
};

export default ClasificadorAcentuacion;
