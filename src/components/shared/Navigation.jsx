import { ActionButton } from "./ActionButton";

export function Navigation({
  title,
  actions = [],
  subTitle = "",
  icon: Icon,
}) {
  return (
    <div
      className="
        bg-gradient-to-r
        from-teal-800
        to-teal-700
        rounded-lg
        shadow-md
        border
        border-teal-600/30
        mb-6
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6">
        {/* Título */}
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="bg-white/10 p-3 rounded-xl">
              <Icon className="w-7 h-7 text-white" />
            </div>
          )}

          <div>
            <h1 className="font-bold text-white text-2xl">
              {title}
            </h1>

            {subTitle && (
              <p className="text-teal-100 text-sm mt-1">
                {subTitle}
              </p>
            )}
          </div>
        </div>

        {/* Acciones */}
        {actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {actions.map((action, index) => (
              <ActionButton
                key={index}
                {...action}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}