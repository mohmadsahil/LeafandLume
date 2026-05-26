import type { ID } from "./common";

export type Role = "Super Admin" | "Admin" | "Product Manager" | "SEO Manager" | "Support Staff";

export type Permission = {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

export type User = {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  status: "active" | "inactive" | "invited";
  twoFactor: boolean;
  lastLogin?: string;
  createdAt: string;
  sessions: {
    id: ID;
    device: string;
    location: string;
    ip: string;
    lastActive: string;
  }[];
};

export type ActivityLog = {
  id: ID;
  user: { id: ID; name: string; avatar?: string };
  action: string;
  target: string;
  meta?: string;
  ip: string;
  at: string;
};
