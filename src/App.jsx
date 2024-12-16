import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState([
    {id:1, title:'Mow the lawn', isComplete:false},
    {id:2, title:'Cook the pasta', isComplete:true},
    {id:3, title:'Walk the dog', isComplete:false},
  ]);
  const toggleComplete = (id) => {
    // console.log('toggleComplete');
    setTasks(tasks => tasks.map((task) => task.id === id ? {...task, isComplete: !task.isComplete} :task));
  };
  const deleteTask= (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} onToggleComplete={toggleComplete} onDeleteTask={deleteTask} />}</div>
      </main>
    </div>
  );
};

export default App;
