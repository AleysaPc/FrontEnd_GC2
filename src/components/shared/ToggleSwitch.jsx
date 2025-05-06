export function ToggleSwitch({ label, checked, onChange }) {
    return (
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-700 pe-5">{label}</label>
        <div
          role="switch"
          aria-checked={checked}
          className={`relative w-11 h-5 flex items-center rounded-full p-1 cursor-pointer ${
            checked ? "bg-green-500" : "bg-red-400"
          }`}
          onClick={() => onChange(!checked)}
        >
          <div
            className={`w-3 h-3 bg-gray-200 rounded-full shadow-md transform duration-300 ${
              checked ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
        <span className="ml-3 text-sm text-gray-700">{checked ? "Activo" : "Inactivo"}</span>
      </div>
    );
  }
  