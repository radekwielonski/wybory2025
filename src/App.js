import React from 'react';
import './App.css';
import ElectionCalculator from './ElectionCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kalkulator różnicy między pierwszą a drugą turą w wyborach prezydenckich</h1>
      </header>
      <main>
        <ElectionCalculator />
      </main>
    </div>
  );
}

export default App;
