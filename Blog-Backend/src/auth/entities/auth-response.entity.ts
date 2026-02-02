import { AuthUser } from "../types/auth-user.type";

export interface AuthResponse {

  accessToken: string;

  refreshToken: string;

  user: AuthUser;

  message?: string;
}