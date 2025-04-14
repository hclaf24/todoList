import { useState, useEffect } from 'react'
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [todoList, setTodoList] = useState(() => JSON.parse(localStorage.getItem("todoList")) || []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);

    return () => {
      document.body.classList.remove("dark", "light");
    };
  }, [darkMode]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      //check if the current todo is empty or only white space
      return;
    }
    // remove extra whitespace
    todo["text"] = todo["text"].replace(/\s+/g, " ");
    setTodoList([...todoList, todo]);
  };

  const toggleCompleted = (todoId) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const deleteTodo = (e, todoId) => {
    e.stopPropagation();
    setTodoList((oldTodos) =>
      oldTodos.filter((todo) => todo.id !== todoId)
    );
  };

  return (
    <>
      <div className={darkMode ? "dark" : "light"}>
        <header>
          <h1>Todo</h1>
          <button onClick={() => setDarkMode(!darkMode)} />
        </header>
        <main>
          <NewTodo onSubmit={addTodo} />
          <TodoList todoList={todoList} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} setTodoList={setTodoList} />
        </main>
      </div>

    </>
  )
}

export default App
