export const CheckBox = ({ label, checked, onChange, name, value, disabled, style }) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          name={name}
          value={value}
          disabled={disabled}
          style={style}
        />
        <span>{label}</span>
      </label>
    );
  };