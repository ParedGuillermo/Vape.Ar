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
        .eq('categoria', 'Testimonios')
        .order('creado_en', { ascending: false });

      if (error) {
        console.error('Error al cargar testimonios:', error.message);
      } else {
        const testimoniosConApodo = await Promise.all(
          data.map(async (testimonio) => {
            const { data: usuario, error: usuarioError } = await supabase
              .from('usuarios')
              .select('apodo')
              .eq('correo', testimonio.autor)
              .single();

            if (usuarioError) {
              console.error('Error al obtener apodo:', usuarioError.message);
            }

            return {
              ...testimonio,
              autor: usuario?.apodo || testimonio.autor,
            };
          })
        );

        setTestimonios(testimoniosConApodo);
      }
    };

    fetchTestimonios();
  }, []);

  const testimoniosResumidos = summary ? testimonios.slice(0, 1) : testimonios;

  return (
    <section className="max-w-3xl px-6 py-8 mx-auto rounded-lg bg-[#1a1a1a] shadow-[0_0_20px_4px_rgba(157,78,221,0.8)]">
      {showHeader && (
        <h2 className="mb-6 text-3xl font-bold text-center text-[#8e44ad] drop-shadow-[0_0_8px_rgba(157,78,221,0.9)]">
          Cambios de Vida
        </h2>
      )}

      <div className="space-y-6">
        {testimoniosResumidos.map((testimonio, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-[#222222] shadow-md hover:shadow-[0_0_15px_4px_rgba(157,78,221,0.8)] transition-shadow duration-300"
          >
            <p className="italic text-[#ccc]">“{testimonio.contenido}”</p>
            <p className="mt-2 font-semibold text-[#8e44ad]">— {testimonio.autor}</p>
          </div>
        ))}
      </div>

      {summary && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/casos-exito')}
            className="px-4 py-2 font-semibold rounded bg-[#2a7fff] text-[#121212] hover:bg-[#8e44ad] hover:text-[#eee] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8e44ad]"
            type="button"
          >
            Ver más testimonios
          </button>
        </div>
      )}
    </section>
  );
}
