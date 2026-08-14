import { useState } from 'react';

// 1. Mostrar y ocultar texto
function ToggleText() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="card">
      <h3>1. Mostrar/Ocultar Texto</h3>
      <div className="flex-col">
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ocultar' : 'Mostrar'} Texto
        </button>
        {isVisible && <p className="result-text">Hola Mundo</p>}
      </div>
    </div>
  );
}

// 2. Cambiar color del fondo y texto (Modo Oscuro)
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);
  return (
    <div className={`card dark-mode-exercise ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <h3>2. Modo Oscuro Local</h3>
      <div className="flex-col">
        <button onClick={() => setIsDark(!isDark)}>
          Cambiar a {isDark ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
        <p className="mt-2">Este contenedor cambia de color de fondo y texto.</p>
      </div>
    </div>
  );
}

// 3. Contador con límites (0 a 10)
function CounterLimits() {
  const [count, setCount] = useState(0);

  const increment = () => { if (count < 10) setCount(count + 1); };
  const decrement = () => { if (count > 0) setCount(count - 1); };

  return (
    <div className="card">
      <h3>3. Contador con Límites (0-10)</h3>
      <div className="flex-col text-center">
        <p className="result-text" style={{ fontSize: '2rem' }}>{count}</p>
        <div className="flex-row" style={{ justifyContent: 'center' }}>
          <button onClick={decrement} disabled={count === 0}>- Restar</button>
          <button onClick={increment} disabled={count === 10}>Sumar +</button>
        </div>
      </div>
    </div>
  );
}

// 4. Semáforo
function TrafficLight() {
  const [color, setColor] = useState('red'); // red, yellow, green

  return (
    <div className="card">
      <h3>4. Semáforo</h3>
      <div className="traffic-light-container">
        <div className="traffic-light">
          <div className={`light red ${color === 'red' ? 'active' : ''}`}></div>
          <div className={`light yellow ${color === 'yellow' ? 'active' : ''}`}></div>
          <div className={`light green ${color === 'green' ? 'active' : ''}`}></div>
        </div>
        <div className="traffic-buttons">
          <button style={{ backgroundColor: 'var(--danger-color)' }} onClick={() => setColor('red')}>Rojo</button>
          <button style={{ backgroundColor: 'var(--warning-color)', color: '#000' }} onClick={() => setColor('yellow')}>Amarillo</button>
          <button style={{ backgroundColor: 'var(--success-color)' }} onClick={() => setColor('green')}>Verde</button>
        </div>
      </div>
    </div>
  );
}

// 5. Like a una publicación
function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="card">
      <h3>5. Botón de Like</h3>
      <div className="flex-col text-center">
        <button onClick={() => setLikes(likes + 1)} style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span>👍</span> Me Gusta
        </button>
        <p className="result-text">{likes} {likes === 1 ? 'like' : 'likes'}</p>
      </div>
    </div>
  );
}

// 6. Contador de Caracteres
function CharacterCount() {
  const [text, setText] = useState('');

  return (
    <div className="card">
      <h3>6. Contador de Caracteres</h3>
      <div className="flex-col">
        <input 
          type="text" 
          placeholder="Escribe algo..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="result-text">Caracteres: {text.length}</p>
      </div>
    </div>
  );
}

// 7. Juego Adivina el Número
function GuessNumber() {
  // Generar número inicial solo una vez
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 50) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const checkGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage('Por favor, ingresa un número válido.');
      return;
    }
    
    if (num === targetNumber) {
      setMessage('🎉 ¡Correcto! ¡Adivinaste el número!');
    } else if (num < targetNumber) {
      setMessage('Demasiado bajo 📉');
    } else {
      setMessage('Demasiado alto 📈');
    }
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 50) + 1);
    setGuess('');
    setMessage('');
  };

  return (
    <div className="card">
      <h3>7. Adivina el Número (1-50)</h3>
      <div className="flex-col">
        <input 
          type="number" 
          placeholder="Tu número..." 
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <div className="flex-row">
          <button onClick={checkGuess} style={{ flex: 1 }}>Adivinar</button>
          <button onClick={resetGame} style={{ backgroundColor: 'var(--text-muted)' }}>Reiniciar</button>
        </div>
        {message && <p className="result-text mt-2">{message}</p>}
      </div>
    </div>
  );
}

export { 
  ToggleText, 
  DarkModeToggle, 
  CounterLimits, 
  TrafficLight, 
  LikeButton, 
  CharacterCount, 
  GuessNumber 
};
