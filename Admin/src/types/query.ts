import type { ID } from "./common";

export type Query = {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: { id: ID; name: string };
  timeline: { id: ID; action: string; actor: string; at: string }[];
  createdAt: string;
};
