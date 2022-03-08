import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken, setUnauthorizedHandler } from '../api/http';

const STORAGE_KEY = 'invoice-lite.auth';

const AuthContext = createContext(null);

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = readStoredAuth();
    setAuthToken(stored?.token ?? null);
    return stored;
  });

  const signIn = useCallback((response) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
    setAuthToken(response.token);
    setAuth(response);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthToken(null);
    setAuth(null);
  }, []);

  // An expired or revoked token comes back as 401: drop it so RequireAuth
  // sends the user to the login page.
  useEffect(() => {
    setUnauthorizedHandler(signOut);
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  const value = useMemo(
    () => ({ user: auth?.user ?? null, token: auth?.token ?? null, signIn, signOut }),
    [auth, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
