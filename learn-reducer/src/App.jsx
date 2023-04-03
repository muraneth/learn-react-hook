import React, { useState, useReducer } from "react";

import "./App.css";
import Todo from "./Todo";
import Todo2 from "./Todo2";
import { useReducerAsync } from "use-reducer-async";

export const TodoContext = React.createContext();

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}
async function getValue() {
  await new Promise((r) => setTimeout(r, 1000));
  return "xxxx";
}
function newTodo(todo) {
  return { id: Date.now(), name: todo, complete: false };
}

const asyncActionHandlers = {
  [SLEEP]:
    ({ dispatch }) =>
    async (action) => {
      await new Promise((r) => setTimeout(r, action.ms));
      const v = await getValue();
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name: v } });
    },
};

function App() {
  // const [todos, dispatch] = useReducer(reducer, []);

  const [todos, dispatch] = useReducerAsync(reducer, [], asyncActionHandlers);

  const [todo, setTodo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "SLEEP", payload: { name: todo } });
    setTodo("");
  }

  return (
    <TodoContext.Provider value={{ todoState: todos, todoDispatch: dispatch }}>
      <h1>Hello</h1>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </form>

        {/* {todos.map((item) => (
          <Todo key={item.id} todo={item} dispatch={dispatch} />
        ))} */}
        <Todo2 />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
