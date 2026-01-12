import { useState } from "react";

export function InputField({ label, type = "text", value, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative">
      <label className="block text-gray-700 font-medium text-sm mb-2">
        {label}
      </label>

      <input
        type={inputType}
        {...props}
        className={`w-full p-2 text-sm border border-gray-300 rounded ${
          isPassword ? "pr-10" : ""
        }`}
        value={type === "file" ? undefined : value}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? "🔓" : "🔒"}
        </button>
      )}
    </div>
  );
}
