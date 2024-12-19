import { useState, useEffect } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';


const API_BASE_URL = 'http://127.0.0.1:5000/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(API_BASE_URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const onTaskSubmit = (newTasks) => {
    console.log('Sending new task:', newTasks);
    axios.post(API_BASE_URL, newTasks)
      .then((response) => {
        console.log('Response:', response.data);
        setTasks((tasks) => [(response.data), ...tasks]);
      })
      .catch(error => {
        console.error('Error adding task: ', error);
      });
  };


  const toggleComplete = (id) => {
    // console.log('toggleComplete');
    const task = tasks.find((task) => task.id === id);
    const url = `${API_BASE_URL}/${id}/${task.isComplete ? 'mark_incomplete' : 'mark_complete'}`;

    axios.patch(url)
      .then(() => {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
          )
        );
      })
      .catch(error => {
        console.error('Error toggling task completion: ', error);
      });
  };
  const deleteTask= (id) => {
    axios.delete(`${API_BASE_URL}/${id}`)
      .then(() => {
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
      })
      .catch(error => {
        console.error('Error deleting task: ', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<NewTaskForm onTaskSubmit={onTaskSubmit}/>}</div>
        <div>{<TaskList tasks={tasks} onToggleComplete={toggleComplete} onDeleteTask={deleteTask} />}</div>
      </main>
    </div>
  );
};

export default App;
