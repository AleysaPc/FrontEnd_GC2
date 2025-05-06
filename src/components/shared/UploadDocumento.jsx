import React, { useState } from "react";
import {
  useDocumentoMutations,
  useTiposDocumentos,
} from "../../hooks/useEntities";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { ActionButton } from "./ActionButton";
import { FaTrash, FaPlus, FaSave, FaSpinner } from "react-icons/fa";
import { DocumentoApi } from "../../api/documento.api";

export default function UploadDocumentoFieldArray({
  value = [],
  onChange,
  idCorrespondencia,
}) {
  const documentos = Array.isArray(value) ? value : [];
  const { data, isLoading, error } = useTiposDocumentos(true);
  const tiposDocumento = Array.isArray(data?.data) ? data.data : [];

  const { crear: crearDocumento } = useDocumentoMutations();

  const [subiendoId, setSubiendoId] = useState(null); // 👈 controla estado de carga por documento

  const agregarDocumento = () => {
    onChange({
      target: {
        name: "documento",
        value: [
          ...documentos,
          {
            id: Date.now(),
            archivo: null,
            nombre_documento: "",
            id_tipo_documento: "",
          },
        ],
      },
    });
  };

  const eliminarDocumento = (id) => {
    onChange({
      target: {
        name: "documento",
        value: documentos.filter((doc) => doc.id !== id),
      },
    });
  };

  const manejarCambio = (id, campo, valor) => {
    const nuevos = documentos.map((doc) =>
      doc.id === id ? { ...doc, [campo]: valor } : doc
    );
    onChange({
      target: {
        name: "documento",
        value: nuevos,
      },
    });
  };

  const handleUpload = async (doc) => {
    if (!doc.archivo || !doc.nombre_documento || !doc.id_tipo_documento) {
      alert("Completa todos los campos antes de subir el documento.");
      return;
    }

    if (!idCorrespondencia) {
      alert("Primero debes registrar la correspondencia.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", doc.archivo);
    formData.append("nombre_documento", doc.nombre_documento);
    formData.append("id_tipo_documento", doc.id_tipo_documento);
    formData.append("id_correspondencia", idCorrespondencia);

    await request(DocumentoApi, "post", "/correspondencia/correspondencia_documento/", formData);

    try {
      await crearDocumento.mutateAsync(formData); // ✅ Enviar directamente formData
      alert("Documento subido con éxito.");
    } catch (error) {
      console.error("Error al subir documento:", error);
      alert("Hubo un error al subir el documento.");
    }
  };

  const opcionesTipo = tiposDocumento.map((tipo) => ({
    id: tipo.id_tipo_documento,
    nombre: tipo.nombre_tipo_documento,
  }));

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-4">Documentos</h3>

      <div className="grid grid-cols-5 gap-4 font-semibold text-sm border-b border-gray-300 pb-2 mb-3">
        <div>Archivo</div>
        <div>Nombre</div>
        <div>Tipo</div>
        <div>Eliminar</div>
        <div>Guardar</div>
      </div>

      {documentos.map((doc) => (
        <div key={doc.id} className="grid grid-cols-5 gap-4 items-center mb-4">
          <input
            type="file"
            onChange={(e) =>
              manejarCambio(doc.id, "archivo", e.target.files[0])
            }
            className="text-sm"
          />

          <InputField
            label=""
            name="nombre_documento"
            value={doc.nombre_documento}
            onChange={(e) =>
              manejarCambio(doc.id, "nombre_documento", e.target.value)
            }
          />

          <SelectField
            label=""
            name="id_tipo_documento"
            value={doc.id_tipo_documento}
            options={opcionesTipo}
            onChange={(e) =>
              manejarCambio(doc.id, "id_tipo_documento", e.target.value)
            }
            disabled={isLoading || error}
          />

          <ActionButton
            icon={FaTrash}
            label=""
            estilos="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            styleIcon="w-4 h-4"
            onClick={() => eliminarDocumento(doc.id)}
            disabled={subiendoId === doc.id}
          />

          <ActionButton
            icon={subiendoId === doc.id ? FaSpinner : FaSave}
            label=""
            estilos={`p-2 rounded text-white ${
              subiendoId === doc.id
                ? "bg-gray-500 cursor-wait animate-spin"
                : "bg-green-600 hover:bg-green-700"
            }`}
            styleIcon="w-4 h-4"
            onClick={() => handleUpload(doc)}
            disabled={subiendoId === doc.id}
          />
        </div>
      ))}

      <ActionButton
        icon={FaPlus}
        label="Agregar Documento"
        estilos="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded gap-2"
        onClick={agregarDocumento}
      />
    </div>
  );
}
