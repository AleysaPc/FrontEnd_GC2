import { InputField } from "../../components/shared/InputField";
import { useInstitucionMutations } from "../../hooks/useEntities";
import { FaBackspace, FaPlus } from "react-icons/fa";
import { obtenerIdUser } from "../../utils/auth";
import CreateEntity from "../../components/shared/CreateEntity";
import { useInstitucion } from "../../hooks/useEntities";

export default function CreateInstitucion() {
    
    const logicaNegocio = {
        idUsuario: obtenerIdUser(),
    };

    const configuracionFormulario = {
    razon_social: "",
    direccion: "",
    telefono: "",
    fecha_fundacion: "",   
    }
    const paraEnvio = (formValues) => ({
        link: -1,
    });

    const construirCampos = (formValues, manejarEntradas) => [
        {
            component: InputField,
            label: "Razon Social",
            name: "razon_social",
            required: true,
            onChange: manejarEntradas.handleInputChange,
        },
        {
            component: InputField,
            label: "Direccion",
            name: "direccion",
            required: true,
            onChange: manejarEntradas.handleInputChange,
        },
        {
            component: InputField,
            label: "Telefono",
            name: "telefono",
            required: true,
            onChange: manejarEntradas.handleInputChange,
        },
        {
            component: InputField,
            label: "Fecha Fundacion",
            name: "fecha_fundacion",
            required: true,
            onChange: manejarEntradas.handleInputChange,
        },
    ]

    const paraNavegacion = {
        title : "Crear Institucion",
        subTitle : "Formulario para crear institucion",
        icon : FaPlus,
        actions : [
            {
                to : -1,
                label : "Volver",
                icon : FaBackspace,
                estilos : "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
            },
        ]
    }
    return (
        <CreateEntity
            useEntityMutations={useInstitucionMutations}
            useEntity={useInstitucion}
            configForm={configuracionFormulario}
            paraEnvio={paraEnvio}
            construirCampos={construirCampos}
            paraNavegacion={paraNavegacion}
        />
    );
}