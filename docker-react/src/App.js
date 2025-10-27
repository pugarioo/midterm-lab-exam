import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './assets/logo.png';
import TaskListView from './components/TaskListView';
import AddTaskView from './components/AddTaskView';

function App() {
  const [tasks, setTasks] = useState([]);

  // FETCH ALL TASKS (GET)
  useEffect(() => {
    fetch('http://localhost:5000/tasks') // adjust port if backend uses different one
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  // ADD TASK (POST)
  const addTask = (taskDetails) => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskDetails),
    })
    .then(res => res.json())
    .then(newTask => setTasks([...tasks, newTask]))
    .catch(err => console.error('Error adding task:', err));
  };

  // DELETE TASK (DELETE)
  const deleteTask = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(err => console.error('Error deleting task:', err));
  };

  // UPDATE TASK (PUT)
  const updateTask = (taskId, updatedDetails) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDetails),
    })
    .then(res => res.json())
    .then(updatedTask => {
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    })
    .catch(err => console.error('Error updating task:', err));
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" fixed="top" className="rounded-0">
          <Container className="d-flex justify-content-around align-items-center">
            <Navbar.Brand>
              <i className="fa-solid fa-bars-progress me-2"></i>
              TaskFlow
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/add_task">Add Task</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<TaskListView tasks={tasks} deleteTask={deleteTask} />} />
            <Route path="/add_task" element={<AddTaskView addFunction={addTask} updateFunction={updateTask} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
