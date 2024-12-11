import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete }) => {
  const [complete, setComplete] = useState(isComplete);
  const [isRed, setIsRed] = useState(false);
  const buttonClass = complete ? 'tasks__item__toggle--completed' : '';
  const colorStyle = isRed ? {color: 'red'} : {};

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => {setComplete(!complete);
          setIsRed(!isRed);
        }}
        style={(colorStyle)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default Task;
