const TextAreaField = ({ label, name, value, onChange, required = false, rows = 4 }) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-gray-700 font-semibold mb-2">{label}</label>}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={`Ingrese ${label?.toLowerCase()}`}
        />
      </div>
    );
  };
  
  export { TextAreaField };
  