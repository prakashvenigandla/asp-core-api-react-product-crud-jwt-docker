import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import AuthService from './services/AuthService';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      const user = AuthService.getUserFromToken(token);
      setUser(user);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const token = await AuthService.login(email, password);
      const user = AuthService.getUserFromToken(token);
      setUser(user);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <Router>
      <header>
        <nav>
          {user ? (
            <>
              <span style={{ marginLeft: '10px' }}>Welcome, {user.email}</span>
              <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
              <Link to="/" style={{ marginLeft: '10px' }}>Product List</Link>
            </>
          ) : (
            <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/login" element={<Login login={login} replace/>} />
        <Route path="/" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
        <Route path="/delete/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
