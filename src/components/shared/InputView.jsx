// components/shared/InputView.jsx
const InputView = ({ label, value }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded">
          {value || "-"}
        </div>
      </div>
    );
  };
  
  export default InputView;
  