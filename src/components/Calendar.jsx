import React, { Component, Fragment } from 'react';
import moment from 'moment';
import shortid from 'shortid';
import _ from 'lodash';

import TaskPopup from './TaskPopup';
import Day from './Day';
import './Calendar.css';


const monthActions = {
    prev: 'PREV_MONTH',
    curr: 'CURRENT_MONTH',
    next: 'NEXT_MONTH'
  },
  months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    const {month, year, daysTask} = this.insertMonth(monthActions.curr);

    this.state = {
      daysTask,
      month,
      year,
      isShowPopup: false,
      editedDay: null
    };
  }
  insertMonth = (action, monthIndex = null, year = null) => {
    const dateFormat = 'YYYY MM';
    let daysTask, nmbDays, days, currYearMonths;
    if (action === monthActions.prev) {
      daysTask = this.state.daysTask;
      nmbDays = moment(`${year} ${monthIndex + 1}`, dateFormat).daysInMonth();
    }
    else if (action === monthActions.next) {
      daysTask = this.state.daysTask;
      nmbDays = moment(`${year} ${monthIndex + 1}`, dateFormat).daysInMonth();
    }
    else {
      const currDate = moment();
      year = currDate.year();
      monthIndex = currDate.month() + 1;
      nmbDays = currDate.daysInMonth();
    }

    days = new Array(nmbDays).fill([]);
    //already setted months if present
    currYearMonths = daysTask ? daysTask[year] : {};

    daysTask = {
      ...daysTask,
      [year]: {
        ...currYearMonths,
        [monthIndex]: days
      }
    };

    return {
      month: monthIndex,
      year,
      daysTask
    };
  }
  renderMonth = () => {
    const {month, year, daysTask} = this.state,
      {onShowPopupForm} = this;

    //if changing state become async because of big chunk of data
    if(!daysTask[year]) {
        return <p>In loading process....</p>;
    }
    return (
      <>
        {daysTask[year][month].map( (dayTasks, index) => <Day showPopup={onShowPopupForm} key={shortid.generate()} dayIndex={index} tasks={dayTasks} />)}
      </>
    );
  };
  onShowPopupForm = (dayIndex) => {
    this.setState({isShowPopup: true, editedDay: dayIndex});
  }
  onClosePopupForm = () => {
    this.setState({isShowPopup: false});
  }
  onSavePopupForm = (newTask) => {
    this.setState((state, props) => {
      let { month, year, editedDay, daysTask } = state,
        newDaytasks = [...daysTask[year][month][editedDay], newTask];
      daysTask[year][month][editedDay] = newDaytasks;

      return {
        daysTask
      }
    });
  }
  changeMonth = (e) => {
    const {insertMonth} = this;
    const button = e.currentTarget,
      action = button.getAttribute('data-action');

    this.setState( (state) => {
      const {month, year, daysTask} = state;
      let monthIndex, newYear, newTasksState;

      if(action === monthActions.prev) {
        monthIndex = month - 1 < 0 ? 11 : month - 1;
        newYear = month - 1 < 0 ? year - 1 : year;
        // insert month data if task data doesn't contain this month or / and year
        if(!daysTask.hasOwnProperty(year) || !daysTask[year].hasOwnProperty(monthIndex)) {
          newTasksState = insertMonth(monthActions.prev, monthIndex, newYear);
        }
        else {
          newTasksState = {
            month: monthIndex,
            year: newYear
          };
        }
      }
      else if (action === monthActions.next) {
        monthIndex = month + 1 > 11 ? 0 : month + 1;
        newYear = month + 1 > 11 ? year + 1 : year;
        if(!daysTask.hasOwnProperty(year) || !daysTask[year].hasOwnProperty(monthIndex)) {
          newTasksState = insertMonth(monthActions.next, monthIndex, newYear);
        }
        else {
          newTasksState = {
            month: monthIndex,
            year: newYear
          };
        }
      }
      else {
        // set current month by default (from 0 to 11)
        const currDate = moment(),
          year = currDate.year(),
          monthIndex = currDate.month() + 1;

        newTasksState = {
          month: monthIndex,
          year: year
        };
      }

      return {
        ...newTasksState
      };
    });

  }

  shouldComponentUpdate(nextProps, nextState) {
    const {month, daysTask, isShowPopup} = this.state,
      isTaskEqual = _.isEqual(daysTask, nextState.daysTask);

    return month !== nextState.month || !isTaskEqual || isShowPopup !== nextState.isShowPopup;
  }

  render () {
    const {isShowPopup, month, year} = this.state,
      {renderMonth, onClosePopupForm, onSavePopupForm, changeMonth} = this;

    return (
      <section id="calendar-container">
        <h4>{`${months[month - 1]}, ${year}`}</h4>
        <TaskPopup isShow={isShowPopup} onClose={onClosePopupForm} saveTask={onSavePopupForm} />
        <nav className="nav-month">
           <button data-action={monthActions.prev} onClick={changeMonth}>Назад</button>
           <button data-action={monthActions.curr} onClick={changeMonth}>Сегодня</button>
           <button data-action={monthActions.next} onClick={changeMonth}>Вперед</button>
        </nav>
        <div className="days-container">
          { renderMonth() }
        </div>
      </section>
    );
  }
}
