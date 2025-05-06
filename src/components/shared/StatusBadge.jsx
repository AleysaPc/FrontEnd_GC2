export function StatusBadge({ isActive }) {
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs ${
          isActive ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
        }`}
      >
        {isActive ? "Activo" : "Inactivo"}
      </span>
    );
  }