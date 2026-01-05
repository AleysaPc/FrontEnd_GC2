import { useState } from "react";

export function InputField({
  label,
  type = "text",
  value,
  visible = true,
  className = "",
  placeholder,
  autoFocus = false,
  list,
  onKeyDown,
  labelPosition = "top", // 'top' o 'left', default arriba
  validate, // nueva prop opcional
  onChange, // tu handler externo
  ...props
}) {
  const [error, setError] = useState("");

  // Determinar valor del input según tipo
  const inputValue =
    type === "file" ? undefined : type === "number" ? value ?? "" : value ?? "";

  // Clases para animación y visibilidad
  const visibilityClasses = visible
    ? "max-h-40 opacity-100"
    : "max-h-0 opacity-0";

  // Clases de layout según labelPosition
  const containerClasses =
    labelPosition === "top" ? "flex flex-col" : "flex items-center space-x-2";

  // Manejar cambio de valor
  const handleChange = (e) => {
    onChange?.(e); // mantiene tu funcionalidad original

    if (validate) {
      const validationError = validate(e.target.value);
      setError(validationError || "");
    }
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${visibilityClasses} ${containerClasses} ${className}`}
    >
      {label && (
        <label
          className={`text-gray-700 font-medium text-sm ${
            labelPosition === "top" ? "mb-2" : ""
          }`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        autoFocus={autoFocus}
        list={list}
        onKeyDown={onKeyDown}
        onChange={handleChange} // reemplazamos por handleChange
        {...props}
        className={`p-2 text-sm border border-gray-300 rounded ${
          labelPosition === "left" ? "flex-1" : "w-full"
        }`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
