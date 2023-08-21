import React, { useState } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import Text from "./Text";
// import Button from "./components/Button";
// import Table from "./components/Table";
import "./grid.css";

const PictureList = [
    {
        id: 1,
        url:
            "https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj",
    },

];
const NameList = [
    {
        id: 1,
        data: "Ayush"
    },
    {
        id: 2,
        data: "Ayush ka beta"
    },
    {
        id: 3,
        data: "Ayush ke bete ka chacha"
    },
    {
        id: 4,
        data: "Ayush ke bete ka pada"
    },

];

function DragDrop() {
    const [board, setBoard] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id) => {
        const pictureList = PictureList.filter((picture) => id === picture.id);
        setBoard((board) => [...board, pictureList[0]]);
    };
    return (
        <div>
            <div className="Pictures">
                {PictureList.map((picture) => {
                    return <Picture url={picture.url} id={picture.id} />;
                })}
            </div>
            <div className="Board" ref={drop}>
                {board.map((picture) => {
                    return <Picture url={picture.url} id={picture.id} />;
                })}
            </div>



            <Text />
        </div>
    );
}

export default DragDrop;