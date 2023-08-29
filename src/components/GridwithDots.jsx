import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import buttonlogo from "./button_logo.png"
import { AiOutlineTable } from 'react-icons/ai'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import "./grid.css";
import { Button, Container } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const DraggableMenuItem = ({ id, left, top, type, children }) => {
  const [, drag] = useDrag({
    type,
    item: { id, left, top, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      {children}
    </div>
  );
};


const DraggableElement = ({ id, left, top, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
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
  if (type === "button") {
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
  } else if (type === "input") {
    return (
      <div className="input-container"
      >
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
  else if (type === "table") {
    return (
      <div className="draggable-element"
        id={id}
        ref={drag}
        style={{
          left: `${left}px`,
          top: `${top}px`,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
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

const DraggableLogo = ({ type }) => {

  return (
    <StyledPaper
      sx={{
        my: 1,
        mx: 'auto',
        p: 2,

      }}
    >
      <Grid container wrap="nowrap" spacing={2}>
        {(type === "button") ? <Grid item >
          <Avatar style={{ backgroundColor: "white", boxShadow: "0px 0px 2px 2px #B6D0E2" }} variant="rounded"><img src={buttonlogo} alt="Button Logo" /></Avatar>
        </Grid> : (type === "input") ? <Grid item>
          <Avatar style={{ backgroundColor: "white", boxShadow: "0px 0px 2px 2px #B6D0E2" }} variant="rounded"><h2 style={{ color: "black" }}>Aa</h2></Avatar>
        </Grid> : (type === "table") ? <Grid item>
          <Avatar style={{ backgroundColor: "white", boxShadow: "0px 0px 2px 2px #B6D0E2" }} variant="rounded" ><AiOutlineTable color="black" /></Avatar>
        </Grid> : <Grid item>
          <Avatar style={{ backgroundColor: "white", boxShadow: "0px 0px 2px 2px #B6D0E2" }} variant="rounded"><IoIosArrowDropdownCircle color="black" /></Avatar>
        </Grid>

        }
        <Grid style={{ marginLeft: "15px", display: "flex", flexDirection: "column", justifyContent: "left" }}>
          <h3 style={{ textAlign: "left", height: "3px" }}>{type}</h3>
          <Typography noWrap style={{ fontSize: "14px" }}>Double Click for {type} Component</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

function CanvasDrag({ selectedType, setSelectedType }) {
  const [elements, setElements] = useState({
    "button": [],
    "table": [],
    "input": [],
    "dropdown": []
  });
  const [details, setDetails] = useState({
    "button": [],
    "table": [],
    "input": [],
    "dropdown": []
  })
  const ele = JSON.parse(sessionStorage.getItem("elements"));
  const det = JSON.parse(sessionStorage.getItem("details"));
  useEffect(() => {
    if (ele) {
      setElements(ele)
      setDetails(det);
    }
  }, [])


  const handleDrop = (item, x, y) => {
    if (item.type === "button") {
      let doesExists = details["button"];
      if (doesExists[doesExists.length - 1] !== item.id) {
        setElements({
          "button": [...elements.button, { id: item.id, left: x, top: y, type: item.type }],
          "input": elements.input,
          "dropdown": elements.dropdown,
          "table": elements.table
        });
        details.button.push(item.id);
      } else {
        let data = elements.button;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === item.id) {
            data[i] = { id: item.id, left: x, top: y, type: item.type };
          }
        }
        setElements({
          "button": data,
          "input": elements.input,
          "dropdown": elements.dropdown,
          "table": elements.table
        })
      }
    } else if (item.type === "input") {
      let doesExists = details.input;
      if (doesExists[doesExists.length - 1] !== item.id) {
        setElements({
          "button": elements.button,
          "input": [...elements.input, { id: item.id, left: x, top: y, type: item.type }],
          "dropdown": elements.dropdown,
          "table": elements.table
        });
        details.input.push(item.id);
      } else {
        let data = elements.input;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === item.id) {
            data[i] = { id: item.id, left: x, top: y, type: item.type };
          }
        }
        setElements({
          "button": elements.button,
          "input": data,
          "dropdown": elements.dropdown,
          "table": elements.table
        })
      }
    } else if (item.type === "dropdown") {
      let doesExists = details.dropdown;
      if (doesExists[doesExists.length - 1] !== item.id) {
        setElements({
          "button": elements.button,
          "input": elements.input,
          "dropdown": [...elements.dropdown, { id: item.id, left: x, top: y, type: item.type }],
          "table": elements.table
        });
        details.dropdown.push(item.id);
      } else {
        let data = elements.dropdown;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === item.id) {
            data[i] = { id: item.id, left: x, top: y, type: item.type };
          }
        }
        setElements({
          "button": elements.button,
          "input": elements.input,
          "dropdown": data,
          "table": elements.table
        })
      }
    } else if (item.type === "table") {
      let doesExists = details.table;
      if (doesExists[doesExists.length - 1] !== item.id) {
        setElements({
          "button": elements.button,
          "input": elements.input,
          "dropdown": elements.dropdown,
          "table": [...elements.table, { id: item.id, left: x, top: y, type: item.type }]
        });
        details.table.push(item.id);
      } else {
        let data = elements.table;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === item.id) {
            data[i] = { id: item.id, left: x, top: y, type: item.type };
          }
        }
        setElements({
          "button": elements.button,
          "input": elements.input,
          "dropdown": elements.dropdown,
          "table": data
        })
      }
    }
    setCreateElement("")
  };
  const [createElement, setCreateElement] = useState("");
  const doubleclickHandle = (type) => {
    setCreateElement(type)
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>

        <div className="editor-canvas">
          <div className="canvas">
            <DropZone onDrop={handleDrop} elements={elements} details={details} />
          </div>
          {createElement === "button" ? <DraggableElement id={details.button[details.button.length - 1] + 1} left={100} top={100} type={createElement} /> :
            createElement === "input" ? <DraggableElement id={details.input[details.input.length - 1] + 1} left={100} top={100} type={createElement} /> :
              createElement === "table" ? <DraggableElement id={details.table[details.table.length - 1] + 1} left={100} top={100} type={createElement} /> :
                createElement === "dropdown" ? <DraggableElement id={details.dropdown[details.dropdown.length - 1] + 1} left={100} top={100} type={createElement} /> : ""
          }
        </div>
        <Box width={"350px"} height={"100%"} sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
          <div style={{ width: "100%", height: "20px" }}>
          </div>
          <Search style={{ border: "2px solid grey", borderRadius: "4px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search your component"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div style={{ height: "30px" }}></div>
          <h2 style={{ width: "100%", display: "flex", marginLeft: "2px" }}>
            Components
          </h2>
          <div onDoubleClick={() => doubleclickHandle("button")} >
            <DraggableMenuItem id={details.button[details.button.length - 1] + 1} top={100} left={100} type={"button"}>
              <DraggableLogo type={"button"} />
            </DraggableMenuItem>
          </div>
          <div onDoubleClick={() => doubleclickHandle("input")}>
            <DraggableMenuItem id={details.input[details.input.length - 1] + 1} top={100} left={100} type={"input"}>
              <DraggableLogo type={"input"} />
            </DraggableMenuItem>
          </div>
          <div onDoubleClick={() => doubleclickHandle("table")}>
            <DraggableMenuItem id={details.table[details.table.length - 1] + 1} top={100} left={100} type={"table"} >
              <DraggableLogo type={"table"} />
            </DraggableMenuItem>
          </div>
          <div onDoubleClick={() => doubleclickHandle("dropdown")}>
            <DraggableMenuItem id={details.dropdown[details.dropdown.length - 1] + 1} top={100} left={100} type={"dropdown"} >
              <DraggableLogo type={"dropdown"} />
            </DraggableMenuItem>
          </div>
        </Box>
      </DndProvider>

    </>
  );
}
function DropZone({ onDrop, elements, details }) {
  const canvasRef = useRef(null);
  const GRID_SIZE = 25;
  const [component, setComponent] = useState([...elements.button, ...elements.input, ...elements.table, ...elements.dropdown]);
  const [draggingElement, setDraggingElement] = useState(null);

  const handleMouseDown = (e) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    setDraggingElement({
      x: mouseX,
      y: mouseY,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingElement) return;

    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    const snappedX = Math.round(mouseX / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(mouseY / GRID_SIZE) * GRID_SIZE;

    setDraggingElement({
      x: snappedX,
      y: snappedY,
    });
  };

  const handleMouseUp = () => {
    if (draggingElement) {
      setComponent([...component, draggingElement]);
      setDraggingElement(null);
    }
  };



  const [, drop] = useDrop({
    accept: ["button", "input", "table", "dropdown"],
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      //console.log(item);
      if (offset) {
        const x = Math.round(offset.x / GRID_SIZE) * GRID_SIZE;
        const y = Math.round(offset.y / GRID_SIZE) * GRID_SIZE;
        onDrop(item, x, y);
      }
    },
  });
  sessionStorage.setItem("details", JSON.stringify(details));
  sessionStorage.setItem("elements", JSON.stringify(elements));
  return <Container maxWidth="xl" ref={drop} className="drop-zone dotted-background"
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}>
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
  </Container>;
}

export default CanvasDrag;
