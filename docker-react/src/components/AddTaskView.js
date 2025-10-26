import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';
import taskImage from '../assets/add_task.png';
import Alert from 'react-bootstrap/Alert';

function AddTaskView({ addFunction }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
    };

    setIsAdded(true);

    addFunction(newTask); 
    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {  
        setIsAdded(false);
      }, 2000);
    }
  }, [isAdded]);
  
  return (
    <div className="container mt-5 h-100 d-flex justify-content-center align-items-center">
      
      <form className="card p-4 shadow-sm w-50" onSubmit={handleSubmit}>
        <h2 className="text-start mb-4 fw-bold">Add New Task</h2>
        <div className="mb-3">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="7"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Task
        </button>

        <Alert show={isAdded} variant="success" className="mt-3">Task successfully added!</Alert>
      </form>
      <div className="p-4 w-50 h-75">
        <Image src={taskImage} className="h-100 w-100"></Image>
      </div>
    </div>


  );
}

export default AddTaskView;
