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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-purple-100">
      <h1 className="mb-6 text-3xl font-bold">Registrarse</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-5 p-6 bg-white rounded shadow"
      >
        <input
          type="email"
          placeholder="Correo electrónico"
          className="p-3 text-base border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-3 text-base border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="p-3 text-base border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        {errorMsg && <p className="text-center text-red-600">{errorMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="p-3 text-lg text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>

      {/* Botón para ir a Login */}
      <button
        onClick={() => navigate("/login")}
        className="mt-6 text-purple-700 underline hover:text-purple-900"
        type="button"
      >
        ¿Ya tenés cuenta? Iniciar sesión
      </button>
    </div>
  );
}
