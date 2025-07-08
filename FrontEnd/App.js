import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevos, setNuevos] = useState([]);

  const ipBackend = '192.168.1.72'; 

 const obtenerProductos = async (filtro, valor, ordenar) => {
  console.log('Filtrando:', filtro, valor, ordenar); 
  let url = `http://${ipBackend}:5000/productos`;
  let params = {};
  if (filtro && valor) {
    params.filtro = filtro;
    params.valor = valor;
  }
  if (ordenar) {
    params.ordenar = ordenar;
  }

  try {
    const res = await axios.get(url, { params });
    console.log('Respuesta:', res.data); 
    setProductos(res.data);
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
};

  const obtenerProductosNuevos = async () => {
    try {
      const res = await axios.get(`http://${ipBackend}:5000/productos/nuevos`);
      setNuevos(res.data);
    } catch (error) {
      console.error('Error al obtener productos nuevos:', error);
    }
  };

  useEffect(() => {
    obtenerProductos();  
    obtenerProductosNuevos();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{color:"red"}}> Carrito de Productos</h1>

      <div style={{ marginBottom: '15px' }}>
        <strong>Filtrar por condición: </strong>
        <button onClick={() => obtenerProductos('condicion', 'nuevo')}>Nuevo</button>{' '}
        <button onClick={() => obtenerProductos('condicion', 'de segunda mano')}>Segunda Mano</button>{' '}
        <button onClick={() => obtenerProductos('condicion', 'reacondicionado')}>Reacondicionado</button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Filtrar por localización: </strong>
        <button onClick={() => obtenerProductos('localizacion', 'Mexico')}>México</button>{' '}
        <button onClick={() => obtenerProductos('localizacion', 'USA')}>USA</button>{' '}
        <button onClick={() => obtenerProductos('localizacion', 'Canada')}>Canadá</button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Ordenar: </strong>
        <button onClick={() => obtenerProductos(null, null, 'precio_desc')}>Precio Mayor a Menor</button>{' '}
        <button onClick={() => obtenerProductos()}>Mostrar Todos</button>
      </div>

      <h2>Lista de Productos</h2>
      <ul>
        {productos.length === 0 && <li>No hay productos para mostrar.</li>}
        {productos.map((p) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> - ${p.precio} | {p.condicion} | {p.localizacion}
          </li>
        ))}
      </ul>

      <h2>5 Productos Más Nuevos</h2>
      <ul>
        {nuevos.length === 0 && <li>No hay productos nuevos para mostrar.</li>}
        {nuevos.map((p, i) => (
          <li key={i}>
            {p.nombre} - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
