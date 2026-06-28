import "dotenv/config";
import express from "express";
import cors from "cors";
import { PORT, ALLOWED_ORIGINS } from "./constants";
import authRouter, { initUsers } from "./routes/auth";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/auth", authRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

initUsers()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Failed to initialize server:", err.message);
    process.exit(1);
  });
