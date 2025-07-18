import React from "react";

export const MultipleInputs = ({ value = [], onChange }) => {
  const handleChange = (index, field, fieldValue) => {
    const nuevosDocumentos = [...value];
    nuevosDocumentos[index] = {
      ...nuevosDocumentos[index],
      [field]: fieldValue,
    };
    onChange({ target: { name: "documentos", value: nuevosDocumentos } });
  };

  const handleAdd = () => {
    onChange({
      target: {
        name: "documentos",
        value: [...value, { archivo: null, nombre_documento: "" }],
      },
    });
  };

  const handleRemove = (index) => {
    const nuevosDocumentos = value.filter((_, i) => i !== index);
    onChange({ target: { name: "documentos", value: nuevosDocumentos } });
  };

  return (
    <div className="space-y-4">
      {Array.isArray(value) &&
        value.map((doc, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-sm space-y-2"
          >
            {/* Nombre del documento */}
            <div>
              <label className="block font-medium">Nombre del documento:</label>
              <input
                type="text"
                value={doc.nombre_documento || ""}
                onChange={(e) =>
                  handleChange(index, "nombre_documento", e.target.value)
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
                placeholder="Ej: Contrato, Informe..."
              />
            </div>

            {/* Archivo actual (si existe como string/URL) */}
            {doc.archivo && typeof doc.archivo === "string" && (
              <div>
                <span className="block text-sm text-gray-700">Documento actual:</span>
                <a
                  href={doc.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ver documento
                </a>
              </div>
            )}

            {/* Input para subir nuevo archivo */}
            <div>
              <label className="block font-medium">
                {doc.archivo && typeof doc.archivo === "string"
                  ? "Cambiar documento"
                  : "Subir documento"}
              </label>
              <input
                type="file"
                onChange={(e) =>
                  handleChange(index, "archivo", e.target.files[0])
                }
                className="w-full"
                accept=".pdf,.doc,.docx"
              />
            </div>

            {/* Eliminar */}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-600 hover:underline"
            >
              Eliminar documento
            </button>
          </div>
        ))}

      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        + Adjuntar documento
      </button>
    </div>
  );
};
