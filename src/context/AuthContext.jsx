import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient"; // ajusta path según tu estructura

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // para manejar la carga inicial

  useEffect(() => {
    // Obtener usuario actual al cargar la app
    const session = supabase.auth.getSession();

    session.then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    // Escuchar cambios de sesión (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    );

    // Cleanup
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Función para login (email + password)
  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) throw error;
    setUser(data.user);
    setIsLoggedIn(true);
  };

  // Función para logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoggedIn(false);
  };

  // Función para registro
  const register = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) throw error;
    // Nota: usuario aún debe confirmar su email antes de login real
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
