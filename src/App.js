import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyBook from './MyBook';
import './App.css';

const Home = () => (
    <div className="home">
      <h1>Welcome to the Magic Storybook</h1>
      <Link to="/mybook">Go to Storybook</Link>
    </div>
);

const App = () => {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mybook" element={<MyBook />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;