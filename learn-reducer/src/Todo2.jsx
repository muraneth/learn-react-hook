import React, { useContext } from "react";

import { ACTIONS, TodoContext } from "./App";

export default function Todo2() {
  const todoContext = useContext(TodoContext);
  console.log(todoContext);
  return (
    <div>
      {todoContext.todoState?.map((todo, index) => (
        <div>
          <span style={{ color: todo?.complete ? "#AAA" : "#000" }}>
            {todo?.name}
          </span>
          <button
            onClick={() =>
              todoContext.todoDispatch({
                type: ACTIONS.TOGGLE_TODO,
                payload: { id: todo.id },
              })
            }
          >
            Toggle
          </button>

          <button
            onClick={() =>
              todoContext.todoDispatch({
                type: ACTIONS.DELETE_TODO,
                payload: { id: todo.id },
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
