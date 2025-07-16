export function SelectField({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  isLoading = false,
  error = null
}) {
    return (
      <div>
        <label className="block text-gray-700 font-medium text-sm mb-2">{label}</label>
        {error && (
          <div className="text-red-500 text-sm mb-2">Error al cargar datos</div>
        )}
        {isLoading ? (
          <div className="text-sm text-gray-500">Cargando...</div>
        ) : (
          <select
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Selecciona una opción</option>
            {options.map(({ id, nombre }) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }