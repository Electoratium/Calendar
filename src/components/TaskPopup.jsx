import React from 'react';
import propTypes from 'prop-types';

function TaskPopup (props) {
  const {onClose, saveTask} = props;
  const onSave = () => {
    const task = document.getElementById('task-input').value;
    saveTask(task);
    onClose();
  };

  if(props.isShow) {
    return (
      <div className="popup">
        <label htmlFor="task-input">Задача:</label>
          <input id="task-input" maxLength="100" autoComplete="off"/>
          <button className="btn success-btn" onClick={onSave}>Сохранить</button>
          <button className="btn cancel-btn" onClick={onClose}>Отмена</button>
      </div>
    )
  }
  return null;
}


TaskPopup.propTypes = {
  onClose: propTypes.func.isRequired,
  saveTask: propTypes.func.isRequired
};

export default TaskPopup;
