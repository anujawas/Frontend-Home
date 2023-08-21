import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./grid.css";


const DraggableElement = ({ id, left, top, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "box-drag",
    item: { id, left, top, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [data, setData] = useState([
    { id: 1, name: "John Doe", age: 30, country: "USA" },
    { id: 2, name: "Jane Smith", age: 25, country: "Canada" },
    { id: 3, name: "Michael Johnson", age: 40, country: "UK" },
    // Add more data rows here
  ]);

  const addRow = () => {
    var name = window.prompt("Enter the name for new row")
    var country = window.prompt("Enter the country for new row")
    const newRow = { id: data.length + 1, name: name, age: 0, country: country };
    setData([...data, newRow]);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    // Add more options here
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  if (type === "Button") {
    return (
      <button
        id={id}
        ref={drag}
        className="draggable-element custom-button"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        Button
      </button>
    );
  } else if (type === "Input") {
    return (
      <div className="input-container">

        <input id={id}
          ref={drag}
          className="draggable-element custom-input"
          style={{
            left: `${left}px`,
            top: `${top}px`,
            opacity: isDragging ? 0.5 : 1,
          }}
          placeholder="Enter Your Input"
          color="black"
        />
      </div>
    )
  }
  else if (type === "Table") {
    return (
      <div className="draggable-element"
        id={id}
        ref={drag}
        style={{
          left: `${left}px`,
          top: `${top}px`,
          opacity: isDragging ? 0.5 : 1,
        }}>
        <table className="custom-table"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button onClick={addRow}>Add Row</button>
        </div>
      </div>
    );
  } else if (type === "dropdown") {
    return (
      <div className="draggable-element"
        id={id}
        ref={drag}
        style={{
          left: `${left}px`,
          top: `${top}px`,
          opacity: isDragging ? 0.5 : 1,
        }}>
        <div className="dropdown-container">
          <select
            className="custom-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }

};
export { DraggableElement };

function CanvasDrag() {
  const [elements, setElements] = useState({
    "button": [],
    "table": [],
    "input": [],
    "dropdown": []
  });
  const ele = JSON.parse(sessionStorage.getItem("elements"));
  useEffect(() => {
    if (ele) {
      setElements(ele)
    }
  }, [])
  const handleDrop = (item, x, y) => {
    console.log(item, x, y);
    if (item.type === "Button") {
      const data = {
        "button": [{ id: item.id, left: x, top: y, type: item.type }],
        "input": elements.input,
        "dropdown": elements.dropdown,
        "table": elements.table
      }
      setElements(data);
    } else if (item.type === "Input") {
      const data = {
        "button": elements.button,
        "input": [{ id: item.id, left: x, top: y, type: item.type }],
        "dropdown": elements.dropdown,
        "table": elements.table
      }
      setElements(data);
    } else if (item.type === "Table") {
      const data = {
        "button": elements.button,
        "input": elements.input,
        "dropdown": elements.dropdown,
        "table": [{ id: item.id, left: x, top: y, type: item.type }]
      }
      setElements(data);
    } else if (item.type === "dropdown") {
      const data = {
        "button": elements.button,
        "input": elements.input,
        "dropdown": [{ id: item.id, left: x, top: y, type: item.type }],
        "table": elements.table
      }
      setElements(data);
    }
    setCreateElement("")
  };
  const [createElement, setCreateElement] = useState("");
  const doubleclickHandle = (type) => {
    console.log(type);
    setCreateElement(type)
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="editor-canvas">
          <div className="canvas">
            <DropZone onDrop={handleDrop} elements={elements} />
            <DraggableElement id={0} left={100} top={100} type={createElement} />
          </div>
        </div>

      </DndProvider>
      <div className="editor-picker">
        <h4>
          {" "}
          Clicking these buttons should create new components on the canvas{" "}
        </h4>
        <button onDoubleClick={() => doubleclickHandle("Button")}> Create a button </button>
        <button onDoubleClick={() => doubleclickHandle("Input")}> Create a text input </button>
        <button onDoubleClick={() => doubleclickHandle("dropdown")}> Create a dropdown </button>
        <button onDoubleClick={() => doubleclickHandle("Table")}> Create a table </button>
      </div>
    </>
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
  console.log(elements);
  return <div ref={drop} className="drop-zone">
    {elements.button.map((element) => (
      <DraggableElement
        key={element.id}
        id={element.id}
        left={element.left}
        top={element.top}
        type={element.type}
      />
    ))}
    {elements.input.map((element) => (
      <DraggableElement
        key={element.id}
        id={element.id}
        left={element.left}
        top={element.top}
        type={element.type}
      />
    ))}
    {elements.table.map((element) => (
      <DraggableElement
        key={element.id}
        id={element.id}
        left={element.left}
        top={element.top}
        type={element.type}
      />
    ))}
    {elements.dropdown.map((element) => (
      <DraggableElement
        key={element.id}
        id={element.id}
        left={element.left}
        top={element.top}
        type={element.type}
      />
    ))}
  </div>;
}

export default CanvasDrag;
