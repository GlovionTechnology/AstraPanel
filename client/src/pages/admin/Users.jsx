import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Mail, Globe, X, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TimezoneSelect } from '../../utils/timezones.jsx';

const Users = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        status: '1',
        role: 'ROLE_USER',
        timezone: 'UTC',
        sites: []
    });

    // Dummy data
    const users = [
        {
            id: 1,
            username: 'admin',
            email: 'admin@astrapanel.com',
            sites: 'All',
            role: 'Admin',
            status: 'Active'
        }
    ];

    const availableSites = [
        { id: 1, domain: 'www.domain.com' },
        { id: 2, domain: 'mynodeapp.com' },
        { id: 3, domain: 'static-site.com' },
        { id: 4, domain: 'python.site' },
        { id: 5, domain: 'reverse-proxy.com' }
    ];

    const generatePassword = () => {
        const length = 20;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setFormData({ ...formData, password });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setFormData({ 
            ...formData, 
            role, 
            sites: (role === 'ROLE_ADMIN' || role === 'ROLE_SITE_MANAGER') ? [] : formData.sites 
        });
    };

    const handleSiteToggle = (domain) => {
        const newSites = formData.sites.includes(domain)
            ? formData.sites.filter(s => s !== domain)
            : [...formData.sites, domain];
        setFormData({ ...formData, sites: newSites });
    };

    const handleSelectAllSites = (e) => {
        if (e.target.checked) {
            const allDomains = availableSites.map(site => site.domain);
            setFormData({ ...formData, sites: allDomains });
        } else {
            setFormData({ ...formData, sites: [] });
        }
    };

    const allSitesSelected = availableSites.length > 0 && formData.sites.length === availableSites.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adding user:', formData);
        setShowAddModal(false);
        // Reset form
        setFormData({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            status: '1',
            role: 'ROLE_USER',
            timezone: 'UTC',
            sites: []
        });
    };

    const openModal = () => {
        setShowAddModal(true);
        // Generate password on open if empty
        if (!formData.password) {
            const length = 20;
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            setFormData(prev => ({ ...prev, password }));
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">Users</h1>
                    <button 
                        onClick={openModal}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/30"
                    >
                        <Plus size={20} />
                        <span>Add User</span>
                    </button>
                </div>

                {/* Users Table */}
                <div className="glass-effect rounded-xl overflow-hidden">
                    <div className="border-b border-slate-700 px-6 py-4">
                        <h3 className="text-lg font-semibold text-white">Users</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">USER NAME</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">E-MAIL</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">SITES</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ROLE</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                                        <td className="px-6 py-4">
                                            <Link to={`/admin/users/edit/${user.id}`} className="text-brand-400 hover:text-brand-300 font-medium">
                                                {user.username}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{user.email}</td>
                                        <td className="px-6 py-4 text-gray-300">{user.sites}</td>
                                        <td className="px-6 py-4 text-gray-300">{user.role}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add User Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
                                <h3 className="text-xl font-semibold text-white">New User</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 space-y-6">
                                    {/* Row 1: Username & Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                                User Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                                E-Mail <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: First Name & Last Name */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                                First Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                                Last Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Password & Status */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                                Password <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={generatePassword}
                                                className="mt-2 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                                            >
                                                Generate new password
                                            </button>
                                        </div>
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                                                Status <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            >
                                                <option value="1">Active</option>
                                                <option value="0">Not Active</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 4: Role & Timezone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                                                Role <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleRoleChange}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            >
                                                <option value="ROLE_ADMIN">Admin</option>
                                                <option value="ROLE_USER">User</option>
                                                <option value="ROLE_SITE_MANAGER">Site Manager</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                                                Timezone <span className="text-red-400">*</span>
                                            </label>
                                            <TimezoneSelect
                                                id="timezone"
                                                name="timezone"
                                                value={formData.timezone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Sites Selection (Only for ROLE_USER) */}
                                    {formData.role === 'ROLE_USER' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                Sites <span className="text-red-400">*</span>
                                            </label>
                                            
                                            {/* Main Sites Container Box */}
                                            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                                                <div className="space-y-4">
                                                    {/* Select All */}
                                                    <div className="p-4 bg-slate-900/50 rounded-lg border-2 border-brand-500/30 hover:border-brand-500/50 transition-all">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                id="select-all-sites"
                                                                checked={allSitesSelected}
                                                                onChange={handleSelectAllSites}
                                                                className="w-4 h-4 text-brand-500 bg-slate-700 border-slate-600 rounded focus:ring-brand-500 focus:ring-2"
                                                            />
                                                            <label
                                                                htmlFor="select-all-sites"
                                                                className="ml-3 text-sm font-semibold text-brand-400 cursor-pointer"
                                                            >
                                                                Select All Sites
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Individual Sites */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {availableSites.map((site) => (
                                                            <div 
                                                                key={site.id} 
                                                                className="p-4 bg-slate-900/30 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-900/50 transition-all"
                                                            >
                                                                <div className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`site-${site.id}`}
                                                                        checked={formData.sites.includes(site.domain)}
                                                                        onChange={() => handleSiteToggle(site.domain)}
                                                                        className="w-4 h-4 text-brand-500 bg-slate-700 border-slate-600 rounded focus:ring-brand-500 focus:ring-2"
                                                                    />
                                                                    <label
                                                                        htmlFor={`site-${site.id}`}
                                                                        className="ml-3 text-sm text-gray-300 cursor-pointer"
                                                                    >
                                                                        {site.domain}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3 p-6 border-t border-slate-700 bg-slate-900/50">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                                    >
                                        <Save size={18} />
                                        Add User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Users;
