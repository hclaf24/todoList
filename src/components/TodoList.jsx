import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TodoList = ({ todoList, setTodoList, toggleCompleted, menuOptions }) => {
  const [navState, setNavState] = useState("All");

  const handleNavState = (button) => {
    setNavState(button);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedList = [...todoList];
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    setTodoList(reorderedList);  // Update global state
  };
  
  const clearCompleted = () => {
    // Remove completed items by filtering out items that are not completed
    const activeTodos = todoList.filter(item => !item.completed);
    setTodoList(activeTodos);
  };

  let allTotal, activeTotal, completedTotal = 0;
  
  let filteredList = todoList;
  allTotal = filteredList.length;
  if (navState === "Active") {
    filteredList = todoList.filter((item) => !item.completed);
    activeTotal = filteredList.length;
  } else if (navState === "Completed") {
    filteredList = todoList.filter((item) => item.completed);
    completedTotal = filteredList.length;
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {filteredList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <li className='todoContainer'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        cursor: "grab"
                      }}
                    >
                      <TodoItem
                        item={item}
                        toggleCompleted={toggleCompleted}
                        menuOptions={menuOptions}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <div className='nav'>
        {navState === "All" && (
          <span>{allTotal} items total</span>
        )}
        {navState === "Active" && (
          <span>{activeTotal} items left</span>
        )}
        {navState === "Completed" && (
          <span>{completedTotal} items completed</span>
        )}
        <div>
          <button onClick={() => handleNavState('All')} className={navState === 'All' ? 'active' : ''}>All</button>
          <button onClick={() => handleNavState('Active')} className={navState === 'Active' ? 'active' : ''}>Active</button>
          <button onClick={() => handleNavState('Completed')} className={navState === 'Completed' ? 'active' : ''}>Completed</button>
        </div>
        <button className='clearCompleted' onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
