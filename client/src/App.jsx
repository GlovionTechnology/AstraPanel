import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sites from './pages/Sites';
import NewSite from './pages/sites/NewSite';
import CreateSite from './pages/sites/CreateSite';
import ManageSite from './pages/sites/ManageSite';
import Settings from './pages/Settings';

// Admin Pages
import Users from './pages/admin/Users';
import EditUser from './pages/admin/EditUser';
import Events from './pages/admin/Events';
import Instance from './pages/admin/Instance';
import Backups from './pages/admin/Backups';
import Security from './pages/admin/Security';
import AdminSettings from './pages/admin/Settings';
import Hetzner from './pages/admin/Hetzner';

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

        {/* Admin Pages */}
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/edit/:id" element={<EditUser />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/instance" element={<Instance />} />
        <Route path="/admin/backups" element={<Backups />} />
        <Route path="/admin/security" element={<Security />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/hetzner" element={<Hetzner />} />
      </Routes>
    </Router>
  );
}

export default App
