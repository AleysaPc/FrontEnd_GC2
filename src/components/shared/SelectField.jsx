export function SelectField({ label, name, value, onChange, options }) {
    return (
      <div>
        <label className="block text-gray-700 font-medium text-sm mb-2">{label}</label>
        <select
          name={name}
          value={value}
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
      </div>
    );
  }
  