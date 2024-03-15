import React, { useState, useEffect } from "react";
import './App.css';

function NodeGrid() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const generateNodes = () => {
    const nodes = [];
    const gridSize = 8; // Change this value to adjust the grid size

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        nodes.push(
          <div
            key={`${i}-${j}`}
            className="node"
            style={{
              transform: `rotate(${calculateRotation(i, j)}deg)`
            }}
          ></div>
        );
      }
    }

    return nodes;
  };

  const calculateRotation = (i, j) => {
    const nodeCenterX = i * 25 + 12.5; // Adjusted for node width (10px) and gap (5px)
    const nodeCenterY = j * 25 + 12.5; // Adjusted for node height (5px) and gap (5px)

    const deltaX = cursorPosition.x - nodeCenterX;
    const deltaY = cursorPosition.y - nodeCenterY;

    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  return (
    <div className='container'>
      <div className='nodeContainer'>
        {generateNodes()}
      </div>
    </div>
  );
}

export default NodeGrid;
