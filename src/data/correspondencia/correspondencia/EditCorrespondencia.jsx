import { InputField } from "../../../components/shared/InputField"
import { SelectField } from "../../../components/shared/SelectField";
import EditEntity from "../../../components/shared/EditEntity";
import { useCorrespondenciaMutations, useUsers, useContactos, useCorrespondencia } from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import {  obtenerIdUser } from "../../../utils/auth";
import { use } from "react";

export default function editCorrespondencia() {

  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const contactoOptions = ()  => //Modelo 2
    paraSelectsdestructuringYMap(
      useContactos,
      true, //maneja la logica de la paginacion
      "id_contacto",
      "nombre_completo",
      
    );
    
  const opcionesTipo = [
    { id: "enviado", nombre: "Enviado" },
    { id: "recibido", nombre: "Recibido" },
  ];
  
  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "borrador", nombre: "Borrador" },
    { id: "en revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },

  ];

  const configuracionFormulario = (entidad) => ({ //Modelo 3 - Correspondencia
    tipo: entidad?.data?.tipo || "", //El signo de interrogacion es para evitar errores de undefined
    fecha_registro: entidad?.data?.fecha_registro || "", //El signo de interrogacion es para evitar errores de undefined
    referencia: entidad?.data?.referencia || "",
    descripcion: entidad?.data?.descripcion || "",
    paginas: entidad?.data?.paginas || "",
    prioridad: entidad?.data?.prioridad || "",
    estado: entidad?.data?.estado || "",
    comentario: entidad?.data?.comentario || "",
    documento: entidad?.data?.documento || "",
    contacto: entidad?.data?.contacto || "", //Es el nombre del FK que tiene conectado con la correspondencia
 });

  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuario: logicaNegocio.idUsuario,
    comentario: formValues.comentario,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_correspondencia, //del modelo correspondencia
    link: "/correspondenciaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [ //formValues es para el manejo de los estados

    {
      component : SelectField,
      label : "Tipo",
      name : "tipo",
      options : opcionesTipo,
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
        component : InputField,
        label : "Fecha de Registro",
        name : "fecha_registro",
        required : true,
        onChange : manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Referencia",
      name: "referencia",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component : InputField,
      label : "Descripción",
      name : "descripcion",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : InputField,
      label : "Paginas",
      name : "paginas",
      type : "number",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : SelectField,
      label : "Prioridad",
      name : "prioridad",
      options : opcionPrioridad,
      onChange : manejarEntradas.handleInputChange,
      required : true,
    },
    {
      component : SelectField,
      label : "Estado",
      name : "estado",
      options : opcionEstado,
      onChange : manejarEntradas.handleInputChange,
      required : true,
    },
    {
      component : InputField,
      label : "Comentario",
      name : "comentario",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : SelectField,
      label : "Contacto",
      name : "contacto", //Hace referencia al modelo correspondencia
      options : contactoOptions(),
      onChange : manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: "/editUsuario",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addCategory",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/categoryList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
        
    },
    {
      component: InputField,
      label: "Documento",
      name: "documento",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
      required: false,
    },

  ]; 
  
  const paraNavegacion = {
    title : "Editar Correspondencia",
    subTitle : "Formulario para editar correspondencia",
    icon : FaPlus,
    actions : [
        {
            to : "/correspondenciaList",
            label : "Volver",
            icon : FaBackspace,
            estilos : "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
        },
    ]

  }
  
  return (
    <EditEntity
        useEntityMutations={useCorrespondenciaMutations}
        useEntity={useCorrespondencia}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
    />

  );
}
