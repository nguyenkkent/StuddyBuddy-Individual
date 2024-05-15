import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';

import Home from './components/pages/Home';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import PleaseLogin from './components/common/PleaseLogin';

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
import GroupChat from './components/pages/GroupChat';

import FirstTime from './components/pages/FirstTime';
import AddFriend from './components/pages/AddFriend';
import CreateNewGroup from './components/pages/CreateNewGroup';
import Profile from './components/pages/Profile';

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
                ) : <PleaseLogin />
              } />
              <Route path="/my-friends" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <MyFriends />
                ) : <PleaseLogin />
              } />
              <Route path="/my-groups" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <MyGroups />
                ) : <PleaseLogin />
              } />
              <Route path="/chats" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Chats />
                ) : <PleaseLogin />
              } />
              <Route path="/groupchat" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <GroupChat />
                ) : <PleaseLogin />
              } />              
              <Route path="/settings" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Settings />
                ) : <PleaseLogin />
              } />

              <Route path="/first-time" element={user?.isFirstTime ?? true ? <FirstTime /> : <Navigate to="/dashboard" />} />
              <Route path="/add-friend" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <AddFriend />
                ) : <PleaseLogin />
              } />
              <Route path="/create-group" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <CreateNewGroup />
                ) : <PleaseLogin />
              } />

              <Route path="/profile" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Profile />
                ) : <PleaseLogin />
              } />
              <Route path="/profile/:id" element={
                user ? (
                  user?.isFirstTime ? <Navigate to="/first-time" /> : <Profile />
                ) : <PleaseLogin />
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
