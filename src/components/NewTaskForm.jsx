import { useState } from 'react';
import PropTypes from 'prop-types';
// import './NewTaskForm.css';

const NewTaskForm = ({ onTaskSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.title.trim() === '') return;

    onTaskSubmit(formData); // Pass data to App for API call
    setFormData({ title: '' });
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Task:</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

NewTaskForm.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
