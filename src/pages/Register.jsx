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
      setErrorMsg(error.message || "Error al registrar usuario.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-very-dark-bg font-poppins text-light-gray">
      <h1 className="mb-6 text-3xl font-extrabold text-center text-electric-blue">Registrarse</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-5 p-6 shadow-lg bg-dark-gray rounded-xl"
        noValidate
      >
        <label htmlFor="email" className="sr-only">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          className="p-3 text-base border border-gray-700 rounded bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          aria-invalid={errorMsg ? "true" : "false"}
        />

        <label htmlFor="password" className="sr-only">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          className="p-3 text-base border border-gray-700 rounded bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          aria-invalid={errorMsg ? "true" : "false"}
        />

        <label htmlFor="confirmPassword" className="sr-only">Confirmar contraseña</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          className="p-3 text-base border border-gray-700 rounded bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          aria-invalid={errorMsg ? "true" : "false"}
        />

        {errorMsg && (
          <p role="alert" className="font-semibold text-center text-red-500">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="p-3 text-lg font-semibold transition text-very-dark-bg bg-electric-blue rounded-xl hover:bg-violet-neon focus:outline-none focus:ring-2 focus:ring-violet-neon disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>

      {/* Botón para ir a Login */}
      <button
        onClick={() => navigate("/login")}
        className="mt-6 font-semibold underline text-violet-neon hover:text-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue"
        type="button"
      >
        ¿Ya tenés cuenta? Iniciar sesión
      </button>
    </div>
  );
}
