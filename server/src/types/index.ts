import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

export interface PublicUser {
  id: string;
  username: string;
  email: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface LoginBody {
  username: string;
  password: string;
}
