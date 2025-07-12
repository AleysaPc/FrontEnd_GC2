export default function InstitucionList() {
    const useFields = () => [
      { key: "index", label: "#" },  
      { key: "razon_social", label: "Razon Social" },
      { key: "direccion", label: "Direccion" },
      { key: "telefono", label: "Telefono" },
      { key: "fecha_fundacion", label: "Fecha Fundacion" },
      { key: "acciones", label: "Acciones" },
    ];   

    const entityData = {
        title: "Gestión de Instituciones",
        subTitle: "Listado de instituciones",
        loadingMessage: "Cargando instituciones...",
        errorMessage: "Error al obtener las instituciones",
        fetchDataHook: useInstituciones,
        all_data: false, // true para obtener todos los datos, false para paginación
        itemKey: "id_institucion", //Debe ser igual al modelo
        entityFields: useFields,
        clavesBusqueda: ["razon_social"],
        actions: [
            {
                to: "/createInstitucion",
                label: "Crear",
                estilos:
                    "bg-red-800 hover:bg-red-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
            },
        ],
    };
    return <EntityList entityData={entityData} />;
}