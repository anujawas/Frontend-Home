import React, { useState } from "react";
import "./Editor.css";
import CanvasDrag from "./GridwithDots";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./DragDrop";

const EditorCanvas = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor-canvas">
        <h4> Put the drag and drop interface over here! </h4>
        <DragDrop />
      </div>
    </DndProvider>
  );
};

const Editor = (props) => {
  const [elements, setElements] = useState([]);

  return (
    <div className="editor">
      <CanvasDrag element={elements} setElements={setElements} />
    </div>
  );
};

export default Editor;
