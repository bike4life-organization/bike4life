import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export interface User {
  email: string
  username: string
  emailVerified: boolean
  createdAt: Date
  password?: string
  avatar?: string
  _id?: string
}
