import '../App.css';
import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
  const GRID_SIZE = 30; // Grid size
  const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  const INITIAL_FOOD = { x: 20, y: 10 }; // Initial food position
  const INITIAL_DIRECTION = 'RIGHT'; // Initial direction

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [dir, setDir] = useState(INITIAL_DIRECTION);

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
        setDir('UP');
        break;
      case 'ArrowDown':
        setDir('DOWN');
        break;
      case 'ArrowLeft':
        setDir('LEFT');
        break;
      case 'ArrowRight':
        setDir('RIGHT');
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
        newHead.y = (newHead.y - 1 + GRID_SIZE) % GRID_SIZE;
        break;
      case 'DOWN':
        newHead.y = (newHead.y + 1) % GRID_SIZE;
        break;
      case 'LEFT':
        newHead.x = (newHead.x - 1 + GRID_SIZE) % GRID_SIZE;
        break;
      case 'RIGHT':
        newHead.x = (newHead.x + 1) % GRID_SIZE;
        break;
      default:
        break;
    }
  
    newSnake.unshift(newHead); // Add the new head to the snake
    newSnake.pop(); // Remove the tail segment
  
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
  
      // Optionally, you can also grow the snake here
    } else {
      // If the food wasn't eaten, no need to change its position
      setFood(food);
    }
  };
  
  useEffect(() => {
    const gameLoop = setInterval(() => {
      updateSnakePosition();
      updateFoodPosition();
    }, 100); // Update every 100ms
  
    return () => clearInterval(gameLoop); // Clean up
  }, [snake, dir, updateSnakePosition, updateFoodPosition]);
  
  

  return (
    <div className='game-container' 
        tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}
         autoFocus
    >
      <div className="game-grid"> {/* Apply the game-grid class here */}
        {createGrid().map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, cellIndex) => (
              <div 
                key={cellIndex}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: cell === 0 ? 'white' : cell === 1 ? 'green' : 'red',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnakeGame;
