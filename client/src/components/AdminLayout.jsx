import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Server, Users, Activity, Settings, Shield, HardDrive, ArrowLeft, LogOut, Menu, X, UserCog, ChevronDown, Sun, Moon, ExternalLink, Cloud } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const adminMenuItems = [
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Activity, label: 'Events', path: '/admin/events' },
        { icon: Server, label: 'Instance', path: '/admin/instance' },
        { icon: HardDrive, label: 'Backups', path: '/admin/backups' },
        { icon: Shield, label: 'Security', path: '/admin/security' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
        { icon: Cloud, label: 'Hetzner', path: '/admin/hetzner' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex flex-col h-screen bg-slate-950">
            {/* Top Navbar - Full Width */}
            <header className="bg-slate-900 border-b border-slate-700 relative z-50">
                <div className="flex items-center justify-between h-full">
                    {/* Left Side - Logo and Mobile Menu */}
                    <div className="flex items-center gap-4 w-64 px-6 py-4 bg-slate-900 border-r border-slate-700 h-full">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg shadow-lg shadow-brand-500/30">
                                <Server size={20} className="text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-white">AstraPanel</h1>
                        </div>
                    </div>

                    {/* Right Side - Instance Info, Theme, Profile */}
                    <div className="flex items-center justify-between flex-1 px-6 py-4 h-full">
                        {/* Instance Information */}
                        <div className="hidden xl:flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 font-medium">IPv4 Public IP:</span>
                                <span className="text-white">5.75.188.61</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700/50"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 font-medium">OS:</span>
                                <span className="text-white">Ubuntu 22.04</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700/50"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 font-medium">Hostname:</span>
                                <span className="text-white">cloudpanel-demo</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700/50"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 font-medium">CPU:</span>
                                <span className="text-white">2</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700/50"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 font-medium">Memory:</span>
                                <span className="text-white">2 GB</span>
                            </div>
                        </div>

                        {/* Right Side - Theme Toggle, Profile */}
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="flex items-center justify-center w-10 h-10 glass-effect rounded-lg border border-slate-700/50 text-gray-400 hover:text-white hover:border-brand-500/50 transition-all"
                                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-8 bg-slate-700/50"></div>

                            {/* Profile Dropdown */}
                            <div className="relative z-50">
                                <button
                                    onClick={() => setProfileDropdown(!profileDropdown)}
                                    className="flex items-center gap-3 px-3 py-2 glass-effect rounded-lg border border-slate-700/50 hover:border-brand-500/50 transition-all"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/30">
                                        A
                                    </div>
                                    <span className="text-sm font-medium text-white hidden sm:block">Admin</span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {profileDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-lg rounded-lg border border-slate-700/50 shadow-2xl overflow-hidden z-[100]">
                                        {/* Admin Area */}
                                        <Link
                                            to="/admin/users"
                                            onClick={() => setProfileDropdown(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800/70 hover:text-white transition-all border-b border-slate-700/50"
                                        >
                                            <UserCog size={18} className="text-brand-400" />
                                            <span>Admin Area</span>
                                        </Link>
                                        
                                        <Link
                                            to="/settings"
                                            onClick={() => setProfileDropdown(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800/70 hover:text-white transition-all border-b border-slate-700/50"
                                        >
                                            <Settings size={18} />
                                            <span>Settings</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setProfileDropdown(false);
                                                handleLogout();
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Area with Sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Admin Sidebar - Desktop */}
                <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 border-r border-slate-700 shadow-2xl">
                    {/* Back to Sites */}
                    <div className="px-4 py-4 border-b border-slate-700">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-sm font-medium">Back to Sites</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {adminMenuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                    isActive(item.path)
                                        ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30'
                                        : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                                }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                        
                        {/* Support Link */}
                        <a
                            href="https://www.astrapanel.com/support"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800/50 hover:text-white rounded-lg transition-all"
                        >
                            <ExternalLink size={20} />
                            <span className="font-medium">Support</span>
                        </a>
                    </nav>
                </aside>

                {/* Mobile Sidebar */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
                        <aside className="w-64 h-full bg-slate-900 border-r border-slate-800/50" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg">
                                        <Server size={24} className="text-white" />
                                    </div>
                                    <h1 className="text-xl font-bold text-white">AstraPanel</h1>
                                </div>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="px-4 py-4 border-b border-slate-700">
                                <Link
                                    to="/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-all"
                                >
                                    <ArrowLeft size={16} />
                                    <span className="text-sm font-medium">Back to Sites</span>
                                </Link>
                            </div>

                            <nav className="px-4 py-6 space-y-2">
                                {adminMenuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                            isActive(item.path)
                                                ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
                                                : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                ))}
                            </nav>
                        </aside>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
