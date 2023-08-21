import React, { useRef, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./grid.css"; // You can create your own CSS file for styling
// import { mergeRefs } from "react-merge-refs";
// import {ReactSession} from 'react-client-session';


const DraggableElement = ({ id, left, top }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "box-drag",
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  let a = 0;
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
      onClick={(e) => console.log(e.target)}
    >
      Button
    </div>
  );
};
export { DraggableElement };

function CanvasDrag() {
  const [elements, setElements] = useState([]);
  const ele = JSON.parse(sessionStorage.getItem("elements"));

  console.log(ele, "aabb");

  useEffect(() => {
    if (ele) {
      setElements(ele)
    }
  }, [])
  const handleDrop = (item, x, y) => {
    setElements((prevElements) => [
      { id: elements.length + 1, left: x, top: y },
    ]);
    if (document.getElementById('0')) {
      const parent = document.getElementsByClassName("canvas")[0];
      const child = document.getElementById('0');
      parent.removeChild(child);
    }
    // { (document.getElementById('0')) ? document.getElementById('0').remove() : }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor-canvas">
        <div className="canvas">
          <DropZone onDrop={handleDrop} elements={elements} />
          {(elements.length === 0) ? <DraggableElement id={0} left={100} top={100} /> : ""}
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
  // console.log(elements);\
  sessionStorage.setItem("elements", JSON.stringify(elements));
  console.log(sessionStorage.getItem("elements"), "first checkpoint");
  console.log(elements);
  return <div ref={drop} className="drop-zone">
    {elements.map((element) => (
      <DraggableElement
        key={element.id}
        id={element.id}
        left={element.left}
        top={element.top}
      />
    ))}
  </div>;
}

export default CanvasDrag;
