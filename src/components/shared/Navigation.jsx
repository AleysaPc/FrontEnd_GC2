import { ActionButton } from "./ActionButton";

export function Navigation({ title, actions = [], subTitle = "", icon: Icon }) {
  return (
    <div className="flex flex-col bg-gray-700">
      <div className="flex justify-between rounded-lg p-4">
        {/* Enlace al listado */}
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-7 h-7 text-white" />}
          <div>
            <h1 className="font-bold text-base text-white">{title}</h1>
            {subTitle && <p className="text-white text-sm">{subTitle}</p>}
          </div>
        </div>

        {/* Botones de acciones */}
        <div className="flex items-center text-sm gap-3">
          {actions.map(({ to, label, icon, estilos }, index) => (
            <ActionButton
              key={index}
              to={to}
              label={label}
              icon={icon}
              estilos={estilos}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
