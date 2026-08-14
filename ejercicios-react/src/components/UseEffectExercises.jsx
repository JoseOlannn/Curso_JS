import { useState, useEffect } from 'react';

// 1. Mensaje de bienvenida inicial
function WelcomeMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Esto se ejecuta solo una vez al montar el componente
    setMessage('¡Bienvenido! Este componente acaba de iniciar.');
  }, []);

  return (
    <div className="card">
      <h3>1. Mensaje al Iniciar</h3>
      <div className="flex-col">
        <p className="result-text" style={{ color: 'var(--success-color)' }}>{message}</p>
      </div>
    </div>
  );
}

// 2. Input cambia el Título de la página
function NameTitle() {
  const [name, setName] = useState('');

  useEffect(() => {
    // Cambia el título del documento cada vez que cambia 'name'
    document.title = name ? `Hola, ${name}!` : 'Ejercicios React';
    
    // Limpieza al desmontar
    return () => {
      document.title = 'Ejercicios React';
    };
  }, [name]);

  return (
    <div className="card">
      <h3>2. Actualizar Título Documento</h3>
      <div className="flex-col">
        <input 
          type="text" 
          placeholder="Escribe tu nombre..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mt-2 text-muted">Mira la pestaña del navegador 👆</p>
      </div>
    </div>
  );
}

// 3. Detectar mayoría de edad
function AgeCheck() {
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (age === '') {
      setStatus('');
      return;
    }
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) {
      setStatus('Introduce una edad válida');
    } else if (ageNum >= 18) {
      setStatus('Eres Mayor de Edad 🍺');
    } else {
      setStatus('Eres Menor de Edad 🧃');
    }
  }, [age]);

  return (
    <div className="card">
      <h3>3. Mayoría de Edad (Efecto)</h3>
      <div className="flex-col">
        <input 
          type="number" 
          placeholder="Tu edad..." 
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <p className="result-text">{status}</p>
      </div>
    </div>
  );
}

// 4. Contador Par o Impar
function EvenOddCounter() {
  const [count, setCount] = useState(0);
  const [type, setType] = useState('Par');

  useEffect(() => {
    if (count % 2 === 0) {
      setType('Par');
    } else {
      setType('Impar');
    }
  }, [count]);

  return (
    <div className="card">
      <h3>4. Par o Impar (Efecto)</h3>
      <div className="flex-col text-center">
        <p className="result-text" style={{ fontSize: '2rem' }}>{count}</p>
        <p className="result-text" style={{ color: 'var(--primary-color)' }}>Es un número: {type}</p>
        <div className="flex-row" style={{ justifyContent: 'center', marginTop: '10px' }}>
          <button onClick={() => setCount(count - 1)}>-1</button>
          <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
      </div>
    </div>
  );
}

// 5. Guardar en LocalStorage
function LocalStorageName() {
  // Inicializamos leyendo de localStorage
  const [savedName, setSavedName] = useState(() => {
    return localStorage.getItem('miNombreGuardado') || '';
  });

  useEffect(() => {
    // Guardamos en localStorage cada vez que cambia el estado
    localStorage.setItem('miNombreGuardado', savedName);
  }, [savedName]);

  return (
    <div className="card">
      <h3>5. Guardar en LocalStorage</h3>
      <div className="flex-col">
        <input 
          type="text" 
          placeholder="Nombre persistente..." 
          value={savedName}
          onChange={(e) => setSavedName(e.target.value)}
        />
        <p className="mt-2 text-muted">Recarga la página y este valor se mantendrá.</p>
      </div>
    </div>
  );
}

// 6. Reloj Sencillo
function SimpleClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Es crucial limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // Array vacío = se ejecuta solo al montar

  return (
    <div className="card">
      <h3>6. Reloj en Tiempo Real</h3>
      <div className="flex-col">
        <div className="clock-display">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export {
  WelcomeMessage,
  NameTitle,
  AgeCheck,
  EvenOddCounter,
  LocalStorageName,
  SimpleClock
};
