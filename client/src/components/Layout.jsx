import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Server, LayoutDashboard, Globe, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Globe, label: 'Websites', path: '/sites' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-slate-950">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 border-r border-slate-800">
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                        <Server size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">AstraPanel</h1>
                        <p className="text-xs text-slate-400">Control Panel</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                isActive(item.path)
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="px-4 py-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-950 hover:text-red-300 rounded-lg transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
                    <aside className="w-64 h-full bg-slate-900 border-r border-slate-800" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                                    <Server size={24} className="text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-white">AstraPanel</h1>
                            </div>
                            <button onClick={() => setSidebarOpen(false)}>
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <nav className="px-4 py-6 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        isActive(item.path)
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar */}
                <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-slate-400 hover:text-white"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Page Title */}
                        <h2 className="text-xl font-semibold text-white hidden lg:block">
                            {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
                        </h2>

                        {/* User Info */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">Administrator</p>
                                <p className="text-xs text-slate-400">admin@astrapanel.com</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
