import React, { useState } from 'react';
import './grid.css'; // You can create your own CSS file for styling
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './DragDrop';

const GridWithDots = () => {
  const gridSize = 100;
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;

    const snappedX = Math.round((offsetX / boundingRect.width) * gridSize) / gridSize;
    const snappedY = Math.round((offsetY / boundingRect.height) * gridSize) / gridSize;

    setElementPosition({ x: snappedX, y: snappedY });
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <DragDrop/>
    <div className="editor-canvas" onMouseMove={handleMouseMove}>
      <div className="dot-grid">
        {Array.from({ length: gridSize * gridSize }, (_, index) => (
          <div className="dot" key={index}></div>
        ))}
        <div
          className="element"
          style={{
            left: `${elementPosition.x * 100}%`,
            top: `${elementPosition.y * 100}%`,
          }}
        ></div>
      </div>
    </div>
    </DndProvider>
  );
};

export default GridWithDots;
