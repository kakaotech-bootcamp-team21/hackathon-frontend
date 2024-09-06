import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyBook from './MyBook';
import './App.css';
import Home from "./Home";
import Book from "./Book";
import Start from "./Start";
import List from "./List";
import Review from "./Review";
import Start2 from "./Start2";


const App = () => {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/start" element={<Home />} />
            {/*<Route path="/mybook" element={<MyBook />} />*/}
              <Route path="/mybook/:storyId" element={<MyBook />} /> {/* 동적 경로 설정 */}
            <Route path="/test" element={<MyBook />} />
            <Route path="/book" element={<Book />} />
            <Route path="/" element={<Start />} />
            <Route path="/list" element={<List />} />
            <Route path="/review" element={<Review />} />
            <Route path="/start2" element={<Start2 />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;