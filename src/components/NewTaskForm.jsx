import { useState } from 'react';
import PropTypes from 'prop-types';


const NewTaskForm = ({ onTaskSubmit }) => {
  const [formData, setFormData] = useState('');

  const handleChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title: formData,
      isComplete: false,
    };

    console.log('Submitting new task:', newTask); // Debugging line

    onTaskSubmit(newTask); // Pass data to App for API call
    setFormData('');
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Task:</label>
      <input type="text" id="title" name="title" value={formData} onChange={handleChange} />
      <div>
        <input type="submit" value="Add task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = { onTaskSubmit: PropTypes.func.isRequired };

export default NewTaskForm;
