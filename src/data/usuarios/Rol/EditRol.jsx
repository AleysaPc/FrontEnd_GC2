import { useRol} from "../../../hooks/useEntities";
import { useRolMutations } from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { FaBackspace, FaPencilAlt } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";

export default function EditRol() {
    const { paraSelectsdestructuringYMap } = useFormEntity();

     const logicaNegocio = {
        idUsuario: obtenerIdUser(),
      };

    const configuracionFormulario = (entidad) => ({
        name: entidad?.name || "",
        description: entidad?.description || "",
    });

    const paraEnvio = (formValues) => ({
        entityId: formValues.id,
        link: "/rolList",
    });

    const construirCampos = (formValues, manejarEntradas) => [
        {
            component: InputField,
            label: "Nombre",
            name: "name",
            required: true,
            formValue: formValues.name,
            onChange: manejarEntradas.handleInputChange,
        },
        {
            component: InputField,
            label: "Descripcion",
            name: "description",
            required: true,
            formValue: formValues.description,
            onChange: manejarEntradas.handleInputChange,
        },
    ];

    const paraNavegacion = {
        title: "Editar Rol",
        subTitle: "Formulario para editar un rol",
        icon: FaPencilAlt,
        actions: [
            {
                to: "/rolList",
                label: "Volver",
                icon: FaBackspace,
                estilos:
                    "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
            },
        ],
    };

    return (
        <EditEntity
            useEntityMutations={useRolMutations}
            useEntity={useRol}
            configForm={configuracionFormulario}
            paraEnvio={paraEnvio}
            construirCampos={construirCampos}
            paraNavegacion={paraNavegacion}
        />
    );
}