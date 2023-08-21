import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Code from "./components/Code";

const App = () => {
  const [showCode, setShowCode] = useState(false)
  function getCSS(element) {
    var css_data = '';
    var css_obj = getComputedStyle(element);
    for (var i = 0; i < css_obj.length; i++) {
      css_data +=
        css_obj[i] + ':' + css_obj
          .getPropertyValue(css_obj[i])
        + ';<br>';
    }
    return css_data
  }
  if (showCode) {
    var code = "";
    const ele = JSON.parse(sessionStorage.getItem("elements"));
    for (let i = 0; i < ele.button.length; i++) {
      code += getCSS(document.getElementById(ele.button[i].id));
    }
    for (let i = 0; i < ele.input.length; i++) {
      code += getCSS(document.getElementById(ele.input[i].id));
    }
    for (let i = 0; i < ele.table.length; i++) {
      code += getCSS(document.getElementById(ele.table[i].id));
    }
    for (let i = 0; i < ele.dropdown.length; i++) {
      code += getCSS(document.getElementById(ele.dropdown[i].id));
    }
  }
  return (
    <div className="App">
      <Header showCode={showCode} setShowCode={setShowCode} />
      {showCode ? <Code data={code} /> : <Editor />}
    </div>
  );
};

export default App;
