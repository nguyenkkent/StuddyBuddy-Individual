import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';

import Ashley from './components/profiles/Ashley';
import Brenden from './components/profiles/Brenden';
import Kent from './components/profiles/Kent';
import Nhan from './components/profiles/Nhan';
import Pierre from './components/profiles/Pierre';
import Yuquan from './components/profiles/Yuquan';

import Registration from './components/Registration';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Dashboard from './components/Dashboard';

import Chats from "./components/Chats";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ashley" element={<Ashley />} />
          <Route path="/brenden" element={<Brenden />} />
          <Route path="/kent" element={<Kent />} />
          <Route path="/nhan" element={<Nhan />} />
          <Route path="/pierre" element={<Pierre />} />
          <Route path="/yuquan" element={<Yuquan />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chats" element={<Chats />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
