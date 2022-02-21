import React, {useState} from 'react';
import {DndContext, DragOverlay} from '@dnd-kit/core';

import {Draggable} from './Draggable';
import { Droppable } from './Droppable';

export default function App() {
  const [items] = useState([1, 2, 3, 4, 5, null, null, null]);
  const [activeId, setActiveId] = useState(null);
  
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ul>
        {items.map((id, position) => {
          const draggableId = id && `draggable_${id}`,
            droppableId = `droppable_${position}`,
            draggable = (id &&
              <Draggable key={draggableId} id={draggableId}>
                {`Item ${id}`}
              </Draggable>) || <li key={`spacer_${position}`}>...</li>;
          return <Droppable id={droppableId} key={droppableId}>
            {draggable}
          </Droppable>;
        }
        )}
      </ul>
      
      <DragOverlay>
        {activeId
          ? <li>{`Item ${activeId.slice(-1)}`}</li>
          : null}
      </DragOverlay>
    </DndContext>
  );
  
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  
  function handleDragEnd(event) {
    if (event.over) {
      const source = items.indexOf(parseInt(activeId.slice(-1))),
        target = parseInt(event.over.id.slice(-1));
      items[source] = null;
      for (let i = 0; i < items.length; i++) {
        if (items[i] === null) {
          items[i] = items[target];
          break;
        }
      }
      items[target] = parseInt(activeId.slice(-1));
    }
    setActiveId(null);
  }
}
