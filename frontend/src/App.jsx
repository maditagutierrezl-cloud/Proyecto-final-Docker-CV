import React, { useEffect, useState } from 'react';

function App() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/cv')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCvData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al conectar con el backend:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando CV...</div>;
  }

  if (!cvData || !cvData.personal) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>No se pudieron cargar los datos del servidor.</div>;
  }

  const { personal, formacion } = cvData;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {/* Sección Personal */}
      <div style={{ borderBottom: '2px solid #eee', paddingBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        
        {/* FOTO DE PERFIL */}
        {personal.foto && (
          <img 
            src={personal.foto} 
            alt={`${personal.nombre} ${personal.apellido}`} 
            style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0066cc' }} 
          />
        )}

        <div>
          {/* NOMBRE Y APELLIDO */}
          <h1 style={{ margin: '0 0 5px 0', color: '#333' }}>{personal.nombre} {personal.apellido}</h1>
          <h3 style={{ margin: '0 0 5px 0', color: '#0066cc' }}>{personal.profesion}</h3>
          
          {/* CIUDAD */}
          {personal.ciudad && (
            <p style={{ margin: '0 0 10px 0', color: '#777', fontWeight: 'bold' }}>📍 {personal.ciudad}</p>
          )}

          <p style={{ color: '#555', lineHeight: '1.5', margin: 0 }}>{personal.descripcion}</p>
        </div>
      </div>
      
      {/* Sección Formación Académica */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Formación Académica</h2>
        <ul style={{ paddingLeft: '20px' }}>
          {formacion && formacion.map((item) => (
            <li key={item.id} style={{ marginBottom: '12px', color: '#444' }}>
              <strong>{item.titulo}</strong> — {item.institucion} <em>({item.anio})</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;