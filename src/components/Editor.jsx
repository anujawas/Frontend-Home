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
        <DragDrop/>
      </div>
    </DndProvider>
  );
};
const Elements=[]
const EditorPicker = (props) => {
  const [element, setelement]=useState(Elements);
  
  const elementCreator=(type)=>{
    if(type=="button"){
      const button = React.createElement(
            "button",
           {className:"created-button"},
           "maa ka bhosda button"
        );
      setelement([button,...element]);
      Elements.push(button);
    }
    console.log(Elements);
  }
  return (
    <div className="editor-picker">
      <h4>
        {" "}
        Clicking these buttons should create new components on the canvas{" "}
      </h4>
      <button onClick={()=>elementCreator("button")}> Create a button </button>
      <button> Create a text input </button>
      <button> Create a dropdown </button>
      <button> Create a table </button>
    </div>
  );
};

const Editor = (props) => {
  return (
    <div className="editor">
      <CanvasDrag Elements={Elements}/>
      <EditorPicker />
    </div>
  );
};

export default Editor;
