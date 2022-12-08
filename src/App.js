import React, { useState,useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  
  // USE STATE
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  

 // run once when the app starts

 useEffect(() => {
  const getLocalTodos = () => {
    if(localStorage.getItem('todos')=== null){
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }

  }
  getLocalTodos();
}, []);

  //USE EFFECT
  useEffect(() => {
    const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed=== false))
        break;
        default:
          setFilteredTodos(todos);
          break;
    }
  }


  // SAVE TO LOCAL 
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }
  
    filterHandler();
    saveLocalTodos();
  }, [todos,status])
  
 
  

  return (
    <div className="App">
      <header>
        <h1>Monk's Todo List</h1>
      </header>
      <Form 
      todos={todos} 
      setTodos={setTodos} 
      inputText={inputText} 
      setInputText={setInputText} 
      setStatus={setStatus}
      />
      <TodoList 
      filteredTodos={filteredTodos}
      todos={todos} 
      setTodos={setTodos} 
      />
    </div>
  );
}

export default App;
