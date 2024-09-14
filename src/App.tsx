import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return React.createElement(
    Router,
    null,
    React.createElement(
      'div',
      { className: 'app-container' },
      React.createElement(Header),
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: '/',
            element: React.createElement(TaskList),
          })
        )
      ),
      React.createElement(Footer)
    )
  );
};

export default App;
