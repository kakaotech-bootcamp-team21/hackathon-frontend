import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyBook from './MyBook';
import './App.css';
import Home from "./Home";
import Book from "./Book";


const App = () => {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mybook" element={<MyBook />} />
            <Route path="/test" element={<MyBook />} />
            <Route path="/book" element={<Book />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;