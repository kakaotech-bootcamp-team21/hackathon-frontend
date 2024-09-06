import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyBook from './MyBook';
import './App.css';
import Home from "./Home";
import Book from "./Book";
import Start from "./Start";
import List from "./List";
import Review from "./Review";


const App = () => {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/start" element={<Home />} />
            <Route path="/mybook" element={<MyBook />} />
            <Route path="/test" element={<MyBook />} />
            <Route path="/book" element={<Book />} />
            <Route path="/" element={<Start />} />
            <Route path="/list" element={<List />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;