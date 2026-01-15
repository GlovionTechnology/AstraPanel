import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sites from './pages/Sites';
import NewSite from './pages/sites/NewSite';
import CreateSite from './pages/sites/CreateSite';
import ManageSite from './pages/sites/ManageSite';
import Settings from './pages/Settings';

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
        
        {/* Sites Pages */}
        <Route path="/sites" element={<Sites />} />
        <Route path="/sites/new" element={<NewSite />} />
        <Route path="/sites/create" element={<CreateSite />} />
        <Route path="/sites/:domain/manage" element={<ManageSite />} />
        
        {/* Settings Page */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App
