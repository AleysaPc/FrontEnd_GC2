import { Link } from "react-router-dom";

export function ActionButton({
  type = "button",
  label,
  icon: Icon,
  estilos = "",
  styleIcon,
  onClick,
  disabled = false,
  to,
}) {
  const buttonClasses = `flex items-center transition duration-200 ${estilos}`;

  const content = (
    <>
      {Icon && <Icon className={`w-5 h-5 ${styleIcon}`}  />}
      {label}
    </>
  );

  return to ? (
    <Link to={to} className={buttonClasses}>
      {content}
    </Link>
  ) : (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}