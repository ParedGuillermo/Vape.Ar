// src/pages/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      alert("Registrado con éxito! Por favor, confirma tu email antes de iniciar sesión.");
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Registrarse</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-5 bg-white p-6 rounded shadow"
      >
        <input
          type="email"
          placeholder="Correo electrónico"
          className="p-3 border rounded text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-3 border rounded text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="p-3 border rounded text-base"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white p-3 rounded text-lg hover:bg-purple-700 transition"
        >
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
