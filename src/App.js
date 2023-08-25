import React from 'react';
import SnakeGame from './components/SnakeGame.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Snake Game</h1>
      </header>
      <SnakeGame />
      <footer className="App-footer">
        <h1>Thanks for playing my game!</h1>
        <h3>More coming soon...</h3>
      </footer>
    </div>
  );
}

export default App;
