import React from 'react';
import shortid from 'shortid';
import propTypes from 'prop-types';

function Day (props) {
  const { showPopup, dayIndex, tasks } = props;

  return (
    <div onClick={ () => showPopup(dayIndex)}>
      <h5 className="day-index">{dayIndex + 1}</h5>
      {
        tasks.map( (task, index) => {
          return (
              <p className="task" key={shortid.generate()}>
                {`#${index + 1}. ${task}`}
              </p>
          );
        })
      }
    </div>
  );
}

Day.propTypes = {
  dayIndex: propTypes.number.isRequired,
  tasks: propTypes.array.isRequired,
  showPopup: propTypes.func.isRequired
};
export default Day;
