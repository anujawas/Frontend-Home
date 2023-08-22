import React, { useState } from "react";
import "./Editor.css";
import CanvasDrag from "./GridwithDots";



const Editor = (props) => {
  const [seletedType, setSelectedType] = useState("");
  return (
    <div className="editor">
      <CanvasDrag seletedType={seletedType} setSelectedType={setSelectedType} />
    </div>
  );
};

export default Editor;
