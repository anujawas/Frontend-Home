import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = () => {
  const [, drag] = useDrag({
    type: 'DRAGGABLE_ELEMENT',
  });

  return (
    <div ref={drag} className="draggable-element">
      {/* Element content */}
    </div>
  );
};

export default DraggableElement;
