export function InputField({ label, ...props }) {
    return (
      <div>
        <label className="block text-gray-700 font-medium text-sm mb-2">
          {label}
        </label>
        <input
          {...props}
          className="w-full p-2 text-sm border border-gray-300 rounded"
        />
      </div>
    );
  }