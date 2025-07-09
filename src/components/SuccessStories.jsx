import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function SuccessStories({ summary = false, showHeader = true }) {
  const navigate = useNavigate();
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    const fetchTestimonios = async () => {
      const { data, error } = await supabase
        .from('entradas_blog')
        .select('titulo, contenido, autor')
        .eq('categoria', 'Testimonios') // Filtramos por categoría 'Testimonios'
        .order('creado_en', { ascending: false });

      if (error) {
        console.error('Error al cargar testimonios:', error.message);
      } else {
        // Obtenemos los apodos directamente desde la tabla 'usuarios'
        const testimoniosConApodo = await Promise.all(data.map(async (testimonio) => {
          const { data: usuario, error: usuarioError } = await supabase
            .from('usuarios')
            .select('apodo')
            .eq('correo', testimonio.autor) // Suponiendo que 'autor' es el correo
            .single();

          if (usuarioError) {
            console.error('Error al obtener apodo:', usuarioError.message);
          }

          return {
            ...testimonio,
            autor: usuario?.apodo || testimonio.autor, // Si no tiene apodo, mostramos el correo
          };
        }));
        
        setTestimonios(testimoniosConApodo);
      }
    };

    fetchTestimonios();
  }, []);

  const testimoniosResumidos = summary ? testimonios.slice(0, 1) : testimonios;

  return (
    <section className="max-w-3xl px-6 py-8 mx-auto bg-white rounded-lg shadow-md">
      {showHeader && (
        <h2 className="mb-6 text-3xl font-bold text-center text-purple-800">Casos de Éxito</h2>
      )}

      <div className="space-y-6">
        {testimoniosResumidos.map((testimonio, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="italic text-gray-800">“{testimonio.contenido}”</p>
            <p className="mt-2 font-semibold">— {testimonio.autor}</p>
          </div>
        ))}
      </div>

      {summary && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/casos-exito')}
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
            type="button"
          >
            Ver más testimonios
          </button>
        </div>
      )}
    </section>
  );
}
