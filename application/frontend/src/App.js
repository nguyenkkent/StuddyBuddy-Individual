import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';

import Home from './components/pages/Home';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';

import Ashley from './components/profiles/Ashley';
import Brenden from './components/profiles/Brenden';
import Kent from './components/profiles/Kent';
import Nhan from './components/profiles/Nhan';
import Pierre from './components/profiles/Pierre';
import Yuquan from './components/profiles/Yuquan';

import AboutUs from './components/pages/AboutUs';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';

import Dashboard from './components/pages/Dashboard';
import MyFriends from "./components/pages/MyFriends";
import MyGroups from "./components/pages/MyGroups";
import Chats from "./components/pages/Chats";
import Settings from "./components/pages/Settings";

import FirstTime from './components/pages/FirstTime';
import Profile from './components/pages/Profile';
import CreateNewGroup from './components/pages/CreateNewGroup';

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App-main-wrapper">
          <Sidebar />
          <div className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/ashley" element={<Ashley />} />
              <Route path="/brenden" element={<Brenden />} />
              <Route path="/kent" element={<Kent />} />
              <Route path="/nhan" element={<Nhan />} />
              <Route path="/pierre" element={<Pierre />} />
              <Route path="/yuquan" element={<Yuquan />} />

              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/register" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Navigate to="/dashboard" />
                ) : <Registration />
              } />
              <Route path="/login" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Navigate to="/dashboard" />
                ) : <Login />
              } />

              <Route path="/dashboard" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Dashboard />
                ) : <Navigate to="/register" />
              } />
              <Route path="/my-friends" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <MyFriends />
                ) : <Navigate to="/register" />
              } />
              <Route path="/my-groups" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <MyGroups />
                ) : <Navigate to="/register" />
              } />
              <Route path="/chats" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Chats />
                ) : <Navigate to="/register" />
              } />
              <Route path="/settings" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Settings />
                ) : <Navigate to="/register" />
              } />

              <Route path="/first-time" element={user?.isFirstTime ?? true ? <FirstTime /> : <Navigate to="/dashboard" />} />
              <Route path="/create-group" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <CreateNewGroup />
                ) : <Navigate to="/register" />
              } />

              <Route path="/profile" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Profile />
                ) : <Navigate to="register" />
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
