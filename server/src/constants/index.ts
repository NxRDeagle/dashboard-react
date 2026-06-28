export const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

export const JWT_SECRET =
  process.env.JWT_SECRET ?? "dashboard-dev-secret-change-in-production";

export const JWT_EXPIRES_IN = "24h";

export const ALLOWED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:8081",
];
