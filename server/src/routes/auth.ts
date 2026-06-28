import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../constants";
import type { StoredUser, LoginBody, PublicUser, JwtPayload, AuthenticatedRequest } from "../types";
import { requireAuth } from "../middleware/auth";

export const users: StoredUser[] = [];

export async function initUsers(): Promise<void> {
  const passwordHash = await bcrypt.hash("password123", 10);
  users.push({
    id: "1",
    username: "admin",
    email: "admin@dashboard.com",
    passwordHash,
  });
}

const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body as LoginBody;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  const user = users.find((u) => u.username === username);

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const payload: JwtPayload = { sub: user.id, username: user.username };
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const publicUser: PublicUser = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  res.json({ accessToken, user: publicUser });
});

router.get(
  "/me",
  requireAuth,
  (req: AuthenticatedRequest, res: Response): void => {
    const jwtUser = req.user;
    if (!jwtUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = users.find((u) => u.id === jwtUser.sub);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const publicUser: PublicUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    res.json(publicUser);
  },
);

export default router;
