import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Components/Form'
import TodoList from './Components/TodoList';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  
  
  useEffect(() => {
    filterHandler();
    saveToLocal();
  }, [todos, status]);
  
  useEffect(() => {
    getLocalTodos();
  }, []);

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncomplete':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }

  const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
      <header>Hello React {inputText}</header> 
      <Form
         todos={todos}
         setTodos={setTodos}
         setInputText={setInputText}
         inputText={inputText}
         setStatus={setStatus}
       />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
