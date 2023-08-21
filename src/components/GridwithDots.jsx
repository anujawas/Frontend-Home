import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./grid.css"; // You can create your own CSS file for styling
import { mergeRefs } from "react-merge-refs";


const DraggableElement = ({ id, left, top }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "box-drag",
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
let a=0;
  return (
    
    <div
      id={id}
      ref={drag}
      className="draggable-element"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={(e)=>console.log(e.target)}
    >
      Button
    </div>
  );
};

function CanvasDrag() {
  const [elements, setElements] = useState([]);

  const handleDrop = (item, x, y) => {
    setElements((prevElements) => [
      { id: elements.length+1, left: x, top: y },
    ]);
    console.log(document.getElementById('0').remove());

  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor-canvas">
        <div className="canvas">
          <DropZone onDrop={handleDrop} elements={elements} />
          <DraggableElement id={0} left={100} top={100} />
        </div>
      </div>

    </DndProvider>
  );
}
function DropZone({ onDrop, elements }) {

  const [, drop] = useDrop({
    accept: "box-drag",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        const x = offset.x;
        const y = offset.y;
        onDrop(item, x, y);
      }
    },
  });
  // drop(drag(ref));
  return <div ref={drop} className="drop-zone">
    {elements.map((element) => (
            <DraggableElement
              id={element.id}
              left={element.left}
              top={element.top}
            />
          ))}
  </div>;

}

export default CanvasDrag;
