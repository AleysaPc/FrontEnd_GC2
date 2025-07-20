// src/components/BuscarDocumentos.jsx
import React, { useState } from 'react';
import { createApi } from '../../api/api.config'; // Asegúrate de que esta ruta es correcta

const ApiDocumento = createApi("documento");

const BuscarDocumentos = () => {
  const [consulta, setConsulta] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const buscar = async () => {
    if (!consulta.trim()) {
      setError('Por favor escribe una consulta.');
      return;
    }

    setCargando(true);
    setError('');
    try {
      const respuesta = await ApiDocumento.post('buscar_documentos_semanticos/', { consulta });

      if (respuesta.status !== 200) {
        throw new Error('Error al buscar documentos.');
      }

      setResultados(respuesta.data);
    } catch (err) {
      setError(err.message || 'Error inesperado.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Búsqueda Semántica de Documentos</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Escribe tu consulta aquí..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={buscar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {cargando && <p>Buscando documentos...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {resultados.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="font-semibold">Resultados:</h3>
          {resultados.map((doc) => (
            <div key={doc.id} className="p-3 border rounded shadow-sm bg-white">
              <p><strong>Nombre:</strong> {doc.nombre_documento}</p>
              <p><strong>Similitud:</strong> {(doc.similitud * 100).toFixed(2)}%</p>
              <p><strong>Extracto:</strong> {doc.texto_plano.slice(0, 120)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuscarDocumentos;
