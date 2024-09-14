import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setFilter } from '../redux/tasksSlice';
 
const TaskFilter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.tasks.filter);

  return (
    <div className="task-filter">
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={filter === 'all' ? 'active' : ''}
      >
        All
      </button>
      <button
        onClick={() => dispatch(setFilter('completed'))}
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
      <button
        onClick={() => dispatch(setFilter('pending'))}
        className={filter === 'pending' ? 'active' : ''}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
