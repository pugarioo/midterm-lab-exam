import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import taskImage from "../assets/add-task.png";
import Alert from "react-bootstrap/Alert";

function AddTaskView({ addFunction }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isAdded, setIsAdded] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // track kung update or add mode
  const [taskId, setTaskId] = useState(null); // store id if updating

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: taskId ? taskId : Date.now(),
      title,
      description,
      priority,
    };

    //  kung may taskId, UPDATE; kung wala, ADD
    if (isUpdate) {
      fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then(() => {
          setIsAdded(true);
          setIsUpdate(false);
          setTaskId(null);
          setTitle("");
          setDescription("");
          setPriority("Low");
        })
        .catch((err) => console.error("Error updating task:", err));
    } else {
      addFunction(newTask); // from props (POST handled in App.js)
      setIsAdded(true);
      setTitle("");
      setDescription("");
      setPriority("Low");
    }
  };

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  return (
    <div className="container mt-5 h-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg w-50">
        <div className="text-center mb-4">
          <Image src={taskImage} width="80" alt="Add Task" />
          <h4 className="mt-2">{isUpdate ? "Update Task" : "Add New Task"}</h4>
        </div>

        {isAdded && (
          <Alert variant="success">
            {isUpdate ? "Task updated successfully!" : "Task added successfully!"}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
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
            {isUpdate ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskView;
