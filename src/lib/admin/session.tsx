import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * PROTOTYPE ONLY — there is no real authentication here.
 * Any credentials are accepted and the "session" lives in localStorage so the
 * demo survives a refresh.
 * // TODO: replace with a real auth provider before any production use.
 */

export type AdminRole = "Director" | "Editor" | "Viewer";

export const ADMIN_ROLES: AdminRole[] = ["Director", "Editor", "Viewer"];

export const ROLE_SUMMARY: Record<AdminRole, string> = {
  Director: "Full control. Only role that can create users and assign roles.",
  Editor: "Create and edit content. Cannot manage users or delete records.",
  Viewer: "Read only. Can browse every content manager but change nothing.",
};

export type AdminSession = {
  email: string;
  name: string;
  role: AdminRole;
};

type AdminContextValue = {
  ready: boolean;
  session: AdminSession | null;
  role: AdminRole;
  signIn: (email: string, role: AdminRole) => void;
  signOut: () => void;
  setRole: (role: AdminRole) => void;
  can: {
    edit: boolean;
    create: boolean;
    delete: boolean;
    manageUsers: boolean;
  };
};

const STORAGE_KEY = "fabluxe.admin.session";

const AdminContext = createContext<AdminContextValue | null>(null);

function nameFromEmail(email: string) {
  const handle = email.split("@")[0] ?? "admin";
  return handle
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw) as AdminSession);
    } catch {
      /* ignore malformed prototype state */
    }
    setReady(true);
  }, []);

  const value = useMemo<AdminContextValue>(() => {
    const persist = (next: AdminSession | null) => {
      setSession(next);
      try {
        if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        else window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    };

    const role: AdminRole = session?.role ?? "Viewer";

    return {
      ready,
      session,
      role,
      signIn: (email, nextRole) =>
        persist({ email, name: nameFromEmail(email), role: nextRole }),
      signOut: () => persist(null),
      setRole: (nextRole) => persist(session ? { ...session, role: nextRole } : null),
      can: {
        edit: role === "Director" || role === "Editor",
        create: role === "Director" || role === "Editor",
        delete: role === "Director",
        manageUsers: role === "Director",
      },
    };
  }, [ready, session]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminProvider>");
  return ctx;
}
