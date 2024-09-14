import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  setTasks,
  toggleComplete,
  deleteTask,
  setFilter,
} from '../redux/tasksSlice';
import axios from 'axios';
import TaskInput from './TaskInput';  

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks.json');
        if (Array.isArray(response.data)) {
          dispatch(setTasks(response.data));
        } else {
          console.error('Fetched tasks are not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleSelectTask = (taskId: number) => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter((id) => id !== taskId)
        : [...prevSelectedTasks, taskId]
    );
  };

  const handleMarkCompleted = () => {
    selectedTasks.forEach((taskId) => dispatch(toggleComplete(taskId)));
    setSelectedTasks([]);
  };

  const handleMarkPending = () => {
    selectedTasks.forEach((taskId) => dispatch(toggleComplete(taskId)));
    setSelectedTasks([]);
  };

  const handleDeleteSelected = () => {
    selectedTasks.forEach((taskId) => dispatch(deleteTask(taskId)));
    setSelectedTasks([]);
  };

  const handleFilterChange = (newFilter: 'all' | 'completed' | 'pending') => {
    dispatch(setFilter(newFilter));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container tl-min-height">
      <TaskInput /> {/* Add TaskInput component here */}
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3>Task List</h3>
          <div>
            <button
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button
              className={`btn ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'} me-2`}
              onClick={() => handleFilterChange('completed')}
            >
              Completed
            </button>
            <button
              className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => handleFilterChange('pending')}
            >
              Pending
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 d-flex justify-content-start mb-3">
          <button
            className="btn btn-success me-2"
            onClick={handleMarkCompleted}
            disabled={selectedTasks.length === 0}
          >
            Mark Selected as Completed
          </button>
          <button
            className="btn btn-warning me-2"
            onClick={handleMarkPending}
            disabled={selectedTasks.length === 0}
          >
            Mark Selected as Pending
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteSelected}
            disabled={selectedTasks.length === 0}
          >
            Delete Selected
          </button>
        </div>
      </div>
      <table className="table table-bordered table-responsive">
        <thead className="table-light">
          <tr>
            <th>Select</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No tasks available.
              </td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleSelectTask(task.id)}
                  />
                </td>
                <td>{task.title}</td>
                <td>{task.completed ? 'Completed' : 'Pending'}</td>
                <td>
                  <button
                    onClick={() => dispatch(toggleComplete(task.id))}
                    className={`action-btn btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'} me-2`}
                  >
                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="action-delete btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
