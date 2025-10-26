import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function TaskListView({ tasks, deleteTask }) {
  return (
    <Container className="pt-4">
      <h2 className="mb-4 text-start fw-bold">Task List</h2>

      <div className="table-responsive">
        <Table className="modern-card-table">
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id} className={`task-card ${task.deleting ? 'fade-out' : ''}`}>
                  <td data-label="Task #">{index + 1}</td>
                  <td data-label="Title">{task.title}</td>
                  <td data-label="Description">{task.description}</td>
                  <td data-label="Priority">
                    <span
                      className={`badge ${
                        task.priority === 'High'
                          ? 'bg-danger'
                          : task.priority === 'Medium'
                          ? 'bg-warning text-dark'
                          : 'bg-success'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td data-label="Action">
                    <Button
                      variant="outline-danger"      
                      onClick={() => deleteTask(task.id)}
                    ><i class="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted no-tasks">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default TaskListView;
