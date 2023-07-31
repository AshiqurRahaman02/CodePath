
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Sign';
import Questions from './pages/Questions';
import Question from './pages/Question';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/question/:id" element={<Question />} />
      </Routes>
    </Router>
  );
};

export default App;
