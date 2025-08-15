import { useFormEntity } from "../../../utils/useFormEntity";
import { InputField } from "../../../components/shared/InputField";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import  CreateEntity from "../../../components/shared/CreateEntity";
import { FaPlus, FaBackspace } from "react-icons/fa";
import { useDepartamentoMutations } from "../../../hooks/useEntities";
import { useDepartamentos } from "../../../hooks/useEntities";

export default function CreateDepartament() {
    const { paraSelectsdestructuringYMap } = useFormEntity();
  
    const configuracionFormulario = {
        nombre: "",
        sigla: "",
        estado: true,
    }
    const paraEnvio = (formValues) => ({
        link: "/departamentList",
    });

    const construirCampos = (formValues, manejarEntradas) => [
        {
            component: InputField,
            label: "Nombre",
            name: "nombre",
            required: true,
            onChange: manejarEntradas.handleInputChange,
        },
        {
            component: InputField,
            label: "Sigla",
            name: "sigla",
            required: true,
            onChange: manejarEntradas.handleInputChange,
        },
        {
            component: ToggleSwitch,
            label: "Estado",
            name: "estado",
            checked: formValues.estado,
            onChange: manejarEntradas.handleToggleChange("estado"),
        },
    ]
    const paraNavegacion = {
        title : "Crear Departamento",
        subTitle : "Formulario para crear departamento",
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
            useEntityMutations={useDepartamentoMutations}
            useEntity={useDepartamentos}
            configForm={configuracionFormulario}
            paraEnvio={paraEnvio}
            construirCampos={construirCampos}
            paraNavegacion={paraNavegacion}
        />
    );
}
