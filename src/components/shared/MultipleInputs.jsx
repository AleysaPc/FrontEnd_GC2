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
      {value.map((doc, index) => (
        <div key={index} className="border p-4 rounded-md shadow-sm space-y-2">
          {/* Campo: Nombre del documento */}
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

          {/* Campo: Archivo */}
          <div>
            <label className="block font-medium">Archivo:</label>
            <input
              type="file"
              onChange={(e) =>
                handleChange(index, "archivo", e.target.files[0])
              }
              className="w-full"
            />
          </div>

          {/* Botón: Eliminar */}
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-600 hover:underline"
          >
            Eliminar documento
          </button>
        </div>
      ))}

      {/* Botón: Agregar otro documento */}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 text-blue-600 hover:underline"
      >
        + Agregar otro documento
      </button>
    </div>
  );
};
