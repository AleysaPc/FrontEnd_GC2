// src/components/shared/AlertaReloj.jsx
import React from "react";

export function AlertaReloj({ count, onClick }) {
  return (
    <div
      style={{ position: "relative", cursor: "pointer" }}
      onClick={onClick}
      aria-label="Alertas de recordatorio"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="text-white-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="32"
        height="32"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-sm w-6 h-6 flex items-center justify-center font-bold">
          {count}
        </span>
      )}
    </div>
  );
}