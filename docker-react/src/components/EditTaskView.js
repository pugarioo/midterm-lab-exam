import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function EditTaskView({ tasks, updateTask }) {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();
  const taskToEdit = tasks.find(task => task.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(parseInt(id), formData);
    navigate('/'); // Redirect back to home
  };

  if (!taskToEdit) {
    return <h2 className="text-center mt-5">Task not found!</h2>;
  }

  return (
    <Container className="mt-5 pt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Edit Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>{' '}
          <Button variant="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EditTaskView;
