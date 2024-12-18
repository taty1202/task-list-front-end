import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.jsx';
import './App.css';

const API_URL = 'http://localhost:5000';

const App = () => {
  const [tasks, setTasks] = useState([
    // {id:1, title:'Mow the lawn', isComplete:false},
    // {id:2, title:'Cook the pasta', isComplete:true},
    // {id:3, title:'Walk the dog', isComplete:false},
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get tasks from API when component mounts
    axios.get(`${API_URL}/tasks`)
      .then((response) => {
        console.log('API response:', response);
        console.log('API data:', response.data);
        // Transform API data to match our frontend structure
        const transformedTasks = response.data(task => ({
          id: task.id,
          title: task.title,
          isComplete: task.completed_at !== null
        }));
        setTasks(transformedTasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setError('Failed to connect to API. Is your Flask server running on port 5000?');
      });
  }, []);

  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    const endpoint = task.isComplete ? 'mark_incomplete' : 'mark_complete';

    axios.patch(`${API_URL}/tasks/${id}/${endpoint}`)
      .then(() => {
        setTasks(tasks => tasks.map((task) =>
          task.id === id
            ? {...task, isComplete: !task.isComplete}
            : task
        ));
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        setError('Failed to update task. Is your API running?');
      });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Is your API running?');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        {error && (
          <div style={{ color: 'red', margin: '10px' }}>
            {error}
          </div>
        )}
        <div>
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
