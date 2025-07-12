import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState(""); // obligatorio
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telefono, setTelefono] = useState(""); // nuevo campo
  const [esVendedor, setEsVendedor] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Campos extras para vendedores
  const [nombreLocal, setNombreLocal] = useState("");
  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombre.trim()) {
      setErrorMsg("Por favor, ingresá tu nombre completo.");
      return;
    }

    if (!telefono.trim()) {
      setErrorMsg("Por favor, ingresá tu número de teléfono.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    if (esVendedor) {
      if (!nombreLocal.trim() || !provincia.trim() || !ciudad.trim()) {
        setErrorMsg("Por favor, completá todos los campos para vendedores");
        return;
      }
    }

    setLoading(true);
    try {
      await register(email, password, {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        rol: esVendedor ? "vendedor" : "usuario",
        nombre_local: nombreLocal.trim(),
        provincia: provincia.trim(),
        ciudad: ciudad.trim(),
      });
      alert(
        "Registrado con éxito! Por favor, confirma tu email antes de iniciar sesión."
      );
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.message || "Error al registrar usuario.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 pb-20 bg-gradient-to-b from-very-dark-bg to-dark-bg font-poppins text-light-gray">
      <h1 className="mb-6 text-3xl font-extrabold text-center sm:text-4xl text-electric-blue drop-shadow-neon">
        {esVendedor ? "Registrarse como Vendedor" : "Registrarse como Usuario"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-5 p-6 border-4 shadow-lg sm:p-8 bg-very-dark-bg rounded-xl border-neon-pink"
        noValidate
      >
        <label htmlFor="nombre" className="sr-only">
          Nombre completo
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Nombre completo"
          className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="telefono" className="sr-only">
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          placeholder="Teléfono"
          className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />

        <label htmlFor="email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password" className="sr-only">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <label htmlFor="confirmPassword" className="sr-only">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        {esVendedor && (
          <>
            <input
              type="text"
              placeholder="Nombre de tu local"
              className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
              value={nombreLocal}
              onChange={(e) => setNombreLocal(e.target.value)}
              required={esVendedor}
            />
            <input
              type="text"
              placeholder="Provincia"
              className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              required={esVendedor}
            />
            <input
              type="text"
              placeholder="Ciudad"
              className="p-3 text-base border border-gray-700 rounded-lg sm:text-lg bg-very-dark-bg focus:outline-none focus:ring-2 focus:ring-violet-neon text-light-gray"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required={esVendedor}
            />
          </>
        )}

        {errorMsg && (
          <p role="alert" className="font-semibold text-center text-red-500 select-none">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="p-3 text-lg font-semibold transition sm:text-xl text-very-dark-bg bg-electric-blue rounded-xl hover:bg-violet-neon focus:outline-none focus:ring-2 focus:ring-violet-neon disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (esVendedor ? "Registrando vendedor..." : "Registrando...") : (esVendedor ? "Crear cuenta vendedor" : "Crear cuenta usuario")}
        </button>
      </form>

      <button
        onClick={() => setEsVendedor(!esVendedor)}
        className="w-full max-w-md p-3 mt-6 font-semibold text-center transition rounded-xl bg-dark-gray hover:bg-violet-neon text-violet-neon hover:text-dark-bg"
        type="button"
      >
        {esVendedor ? "Registrarme como usuario normal" : "Registrarme como vendedor"}
      </button>

      <button
        onClick={() => navigate("/login")}
        className="mt-4 font-semibold underline text-violet-neon hover:text-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue"
        type="button"
      >
        ¿Ya tenés cuenta? Iniciar sesión
      </button>
    </div>
  );
}
