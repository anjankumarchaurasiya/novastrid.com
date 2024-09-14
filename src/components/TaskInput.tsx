import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addTask } from '../redux/tasksSlice';

const TaskInput: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState<string>('');

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(addTask({ title, completed: false }));
      setTitle('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-end">
        <div className="col-12 col-md-6 p-0">
          <div className="d-flex justify-content-end">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="Enter task title"
            />
            <button
              className="btn btn-primary ms-2"
              onClick={handleAddTask}
              disabled={!title.trim()}
            >
              Add Task
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
