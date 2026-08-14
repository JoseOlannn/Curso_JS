import { 
  ToggleText, 
  DarkModeToggle, 
  CounterLimits, 
  TrafficLight, 
  LikeButton, 
  CharacterCount, 
  GuessNumber 
} from './components/UseStateExercises';

import {
  WelcomeMessage,
  NameTitle,
  AgeCheck,
  EvenOddCounter,
  LocalStorageName,
  SimpleClock
} from './components/UseEffectExercises';

import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <h1 className="main-title">Prácticas de React</h1>
      
      <h2 className="section-title">
        Ejercicios con useState
      </h2>
      <div className="grid-container">
        <ToggleText />
        <DarkModeToggle />
        <CounterLimits />
        <TrafficLight />
        <LikeButton />
        <CharacterCount />
        <GuessNumber />
      </div>

      <h2 className="section-title">
        Ejercicios con useEffect
      </h2>
      <div className="grid-container">
        <WelcomeMessage />
        <NameTitle />
        <AgeCheck />
        <EvenOddCounter />
        <LocalStorageName />
        <SimpleClock />
      </div>

      <footer style={{ marginTop: '4rem', paddingBottom: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Desarrollado con React y Vite</p>
      </footer>
    </div>
  );
}

export default App;
