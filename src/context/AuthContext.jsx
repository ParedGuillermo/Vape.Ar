// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoggedIn(false);
  };

  const register = async (email, password, extraData) => {
    setLoading(true);

    // Crear usuario en auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      throw error;
    }

    const userId = data.user.id;

    // Insertar datos en tabla usuarios
    const { error: insertError } = await supabase.from("usuarios").insert([
      {
        id: userId,
        nombre: extraData.nombre || "", // obligatorio y no null
        correo: email,
        rol: extraData.rol || "usuario",
        nombre_local: extraData.nombre_local || null,
        provincia: extraData.provincia || null,
        ciudad: extraData.ciudad || null,
        tipo_productos: extraData.tipo_productos || null,
        telefono: extraData.telefono || null,
        avatar_url: extraData.avatar_url || null,
      },
    ]);

    setLoading(false);

    if (insertError) throw insertError;

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
