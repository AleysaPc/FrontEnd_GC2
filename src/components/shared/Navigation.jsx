import { ActionButton } from "./ActionButton";

export function Navigation({ title, actions = [], subTitle = "", icon: Icon }) {
  return (
    <div className="flex flex-col" style={{ backgroundColor: 'rgba(10, 89, 92, 0.9)' }}>

      <div className="flex justify-between rounded-lg p-4">
        {/* Enlace al listado */}
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-7 h-7 text-white" />}
          <div>
            <h1 className="font-bold text-white text-xl">{title}</h1>
            {subTitle && <p className="text-white text-lg">{subTitle}</p>}
          </div>
        </div>

        {/* Botones de acciones */}
        <div className="flex items-center text-sm gap-3">
          {actions.map((action, index) => (
            <ActionButton key={index} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}
