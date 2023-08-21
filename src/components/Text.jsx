import React from "react";
import { useDrag } from "react-dnd";

function Text({ data, id }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "text",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <>
            <p
                ref={drag}
                style={{ border: isDragging ? "5px solid pink" : "0px" }}
                width="150px"
                data={data}
            >abc</p>
        </>


    );
}

export default Text;