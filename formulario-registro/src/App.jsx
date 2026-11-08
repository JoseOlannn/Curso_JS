import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: '',
    genero: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Usando un endpoint mock para simular una petición POST a través de HTTPS
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Datos enviados correctamente:', result);
        alert('Formulario enviado con éxito!');
        // Reiniciar formulario
        setFormData({
          nombre: '',
          apellido: '',
          correo: '',
          fechaNacimiento: '',
          genero: ''
        });
      } else {
        alert('Hubo un error al enviar el formulario.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión.');
    }
  };

  return (
    <div className="form-container">
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit} className="skeleton-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
            <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
          </select>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
