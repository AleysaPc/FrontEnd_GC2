import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { ActionButton } from "./ActionButton";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useTiposDocumentos } from "../../hooks/useEntities";
import { useFormEntity } from "../../utils/useFormEntity";

export default function DocumentosFieldArray({ value = [], onChange }) {
  const documentos = Array.isArray(value) ? value : [];

  const { paraSelectsdestructuringYMap } = useFormEntity();

  const tiposDocumentoOptions = () =>
    paraSelectsdestructuringYMap(
      useTiposDocumentos,
      true, //maneja la logica de la paginacion
      "id_tipo_documento",
      "nombre_tipo_documento"
    );

  const agregarFila = () => {
    onChange({
      target: {
        name: "documento",
        value: [
          ...documentos,
          { archivo: null, nombre: "", tipo: "", id: Date.now() },
        ],
      },
    });
  };

  const eliminarFila = (id) => {
    onChange({
      target: {
        name: "documento",
        value: documentos.filter((doc) => doc.id !== id),
      },
    });
  };

  const manejarCambio = (id, campo, nuevoValor) => {
    const nuevosDocumentos = documentos.map((doc) =>
      doc.id === id ? { ...doc, [campo]: nuevoValor } : doc
    );

    onChange({
      target: {
        name: "documento",
        value: nuevosDocumentos,
      },
    });
  };

  const tiposDocumento = [
    { id: "PDF", nombre: "PDF" },
    { id: "Word", nombre: "Word" },
    { id: "Imagen", nombre: "Imagen" },
    { id: "Otro", nombre: "Otro" },
  ];

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-4">Documentos</h3>

      <div className="grid grid-cols-4 gap-4 font-semibold text-sm border-b border-gray-300 pb-2 mb-3">
        <div>Archivo</div>
        <div>Nombre del Documento</div>
        <div>Tipo de Documento</div>
        <div>Acción</div>
      </div>

      {documentos.map((doc) => (
        <div key={doc.id} className="grid grid-cols-4 gap-4 items-center mb-4">
          <div>
            <input
              type="file"
              onChange={(e) =>
                manejarCambio(doc.id, "archivo", e.target.files[0])
              }
              className="text-sm"
            />
          </div>

          <InputField
            label=""
            name="nombre"
            value={doc.nombre}
            onChange={(e) => manejarCambio(doc.id, "nombre", e.target.value)}
          />

          <SelectField
            name="tipo"
            value={doc.tipo}
            options={tiposDocumentoOptions()}
            onChange={(e) => manejarCambio(doc.id, "tipo", e.target.value)}
          />

          <ActionButton
            icon={FaTrash}
            label=""
            estilos="bg-red-500 hover:bg-red-600 text-white p-2 rounded justify-center"
            styleIcon="w-4 h-4"
            onClick={() => eliminarFila(doc.id)}
          />
        </div>
      ))}

      <ActionButton
        icon={FaPlus}
        label="Agregar Documento"
        estilos="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded gap-2"
        onClick={agregarFila}
      />
    </div>
  );
}
