import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route: Agar koi '/' par aaye to Login par bhejo */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App
