import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onToggleComplete, onDeleteTask }) => {
  // const [complete, setComplete] = useState(isComplete);
  // const [isRed, setIsRed] = useState(false);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  // const colorStyle = isRed ? {color: 'red'} : {};

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => {
        // console.log('hello');
          onToggleComplete(id)}
        }>
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={() => onDeleteTask(id)}>x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isOptional,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
