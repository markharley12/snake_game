import '../App.css';
import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
  const GRID_SIZE = 30; // Grid size
  const INITIAL_SNAKE = [
    { x: 0, y: 10 },
    { x: -1, y: 10 },
    { x: -2, y: 10 },
  ];
  const INITIAL_FOOD = { x: 20, y: 10 }; // Initial food position
  const INITIAL_DIRECTION = 'RIGHT'; // Initial direction
  const INITIAL_SCORE = 0; // Initial direction

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [dir, setDir] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(INITIAL_SCORE);
  const [isGameOver, setIsGameOver] = useState(false);

  const createGrid = () => {
    let grid = Array.from({ length: 30 }, () => Array(30).fill(0));
    snake.forEach((segment) => {
      grid[segment.y][segment.x] = 1;
    });
    grid[food.y][food.x] = 2;
    return grid;
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (dir != 'DOWN'){
          setDir('UP');
        }
        break;
      case 'ArrowDown':
        if (dir != 'UP'){
          setDir('DOWN');
        }
        break;
      case 'ArrowLeft':
        if (dir != 'RIGHT'){
          setDir('LEFT');
        }
        break;
      case 'ArrowRight':
        if (dir != 'LEFT'){
          setDir('RIGHT');
        }
        break;
      default:
        break;
    }
  };

  const updateSnakePosition = () => {
    const newSnake = snake.map((segment) => ({ ...segment })); // Clone the snake
    let newHead = { ...newSnake[0] }; // Clone the head of the snake
  
    // Update the new head's position based on the current direction
    switch (dir) {
      case 'UP':
        newHead.y = newHead.y - 1;
        if (newHead.y < 0) {
          gameOver();
          return;
        }
        break;
      case 'DOWN':
        newHead.y = newHead.y + 1;
        if (newHead.y >= GRID_SIZE) {
          gameOver();
          return;
        }
        break;
      case 'LEFT':
        newHead.x = newHead.x - 1;
        if (newHead.x < 0) {
          gameOver();
          return;
        }
        break;
      case 'RIGHT':
        newHead.x = newHead.x + 1;
        if (newHead.x >= GRID_SIZE) {
          gameOver();
          return;
        }
        break;
      default:
        break;
    }

    // Check for collision with body
    for (let i = 1; i < newSnake.length; i++) { // Start from 1 to skip the head
      if (newSnake[i].x === newHead.x && newSnake[i].y === newHead.y) {
        gameOver();  // Call reset game function if collision is detected
        return;  // Exit the function early
      }
    }
  
    newSnake.unshift(newHead); // Add the new head to the snake
    if (newHead.x !== food.x || newHead.y !== food.y) {
      newSnake.pop(); // Remove the tail segment
    }
  
    setSnake(newSnake); // Update the snake state
  };
  
  const updateFoodPosition = () => {
    // Get the snake's head position
    const snakeHead = snake[0];
  
    // Check if the head's position matches the food's position
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      // Generate random coordinates for the new food position
      const newFoodX = Math.floor(Math.random() * GRID_SIZE);
      const newFoodY = Math.floor(Math.random() * GRID_SIZE);
  
      // Update the food's position
      setFood({ x: newFoodX, y: newFoodY });

      // Update the score
      setScore(score + 10);
  
      // Optionally, you can also grow the snake here
    } else {
      // If the food wasn't eaten, no need to change its position
      setFood(food);
    }
  };

  const gameOver = () => {
    setIsGameOver(true);
  };

  const resetGame = () => {
    setScore(0);
    setSnake(INITIAL_SNAKE);
    setDir(INITIAL_DIRECTION);
    setIsGameOver(false);
  };
  
  useEffect(() => {
    const gameLoop = setInterval(() => {
      updateSnakePosition();
      updateFoodPosition();
    }, 100); // Update every 100ms
  
    return () => clearInterval(gameLoop); // Clean up
  }, [snake, dir, updateSnakePosition, updateFoodPosition]);
  
  

  return (
    <div className='game-container' tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} autoFocus>
      <div className="score-board" style={{backgroundColor: 'orange'}}>
        Score: {score}
      </div>
      { isGameOver ? (
        <div>
        <div className="game-over-screen">
          <h1 style={{ fontSize: 80, }}>Game Over!</h1>
          <button style={{ height: 250, width: 250, fontSize: 50, }} onClick={() => resetGame()}>Restart!</button>
        </div>
        <div className="game-grid" style={{display: 'centre' , alignItems: 'center' }}> {/* Apply the game-grid class here */}
        {createGrid().map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', justifyContent: 'centre' }}>
            {row.map((cell, cellIndex) => (
              <div 
                key={cellIndex}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: cell === 0 ? 'grey' : cell === 1 ? 'green' : 'red',
                }}
              />
            ))}
          </div>
          ))}
        </div>
        </div>
      ) : (
      <div className="game-grid" style={{display: 'centre' , alignItems: 'center' }}> {/* Apply the game-grid class here */}
        {createGrid().map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', justifyContent: 'centre' }}>
            {row.map((cell, cellIndex) => (
              <div 
                key={cellIndex}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: cell === 0 ? 'grey' : cell === 1 ? 'green' : 'red',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default SnakeGame;
