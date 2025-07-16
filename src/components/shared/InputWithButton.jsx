// components/shared/InputWithButton.jsx
export function InputWithButton({ label, name, value, onChange, buttonLabel, onButtonClick, placeholder }) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
        <div className="flex">
          <input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-grow p-2 text-sm border border-gray-300 rounded-l"
          />
          <button
            type="button"
            onClick={onButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-r"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    );
  }
  