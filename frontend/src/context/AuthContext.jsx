import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        const me = await getMe();
        setUser(me);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  const value = {
    user,
    loading,
    login: (data) => {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    },
    logout: () => {
      localStorage.removeItem('token');
      setUser(null);
    },
  };

  if (loading) {
    return <div className="centered">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

