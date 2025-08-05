import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Income from './pages/dashboard/Income';
import Home from './pages/dashboard/Home';
import Expense from './pages/dashboard/Expense';
import UserProvider from './context/Usercontext';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<Signup />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },
        }} />
    </UserProvider>
  )
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Navigate to={'/dashboard'} />
  ) : (
    <Navigate to={'/login'} />
  )
};
