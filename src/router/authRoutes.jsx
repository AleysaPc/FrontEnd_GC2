import { lazy } from "react";

const Login = lazy(() => import("../pages/auth/Login"));
const PasswordResetRequest = lazy(() => import("../pages/auth/PasswordResetRequest"));
const PasswordReset = lazy(() => import("../pages/auth/PasswordReset"));

export const authRoutes = [
  { path: "/", element: <Login /> },
  { path: "/request/password_reset", element: <PasswordResetRequest /> },
  { path: "/password-reset/:token", element: <PasswordReset /> },
];
