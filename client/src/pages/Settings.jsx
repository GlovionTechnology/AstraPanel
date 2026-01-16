import { useState } from 'react';
import Layout from '../components/Layout';
import { Save, Shield } from 'lucide-react';
import { TimezoneSelect } from '../utils/timezones.jsx';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [formData, setFormData] = useState({
        username: 'john.doe',
        email: 'john.doe@astrapanel.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '',
        timezone: 'UTC'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving settings:', formData);
    };

    const handleEnableMFA = () => {
        console.log('Enabling Two-Factor Authentication');
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Account
                    </h1>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 border-b border-slate-700">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'settings'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'security'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Security
                        </button>
                    </div>
                </div>

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <form onSubmit={handleSubmit}>
                        <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                            {/* Card Header */}
                            <div className="px-6 py-4 border-b border-slate-700/50">
                                <h2 className="text-lg font-semibold text-white">Settings</h2>
                            </div>

                            {/* Card Body */}
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
                                            disabled
                                            className="w-full px-4 py-3 bg-slate-800/30 border border-slate-700 rounded-lg text-gray-400 cursor-not-allowed"
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

                                {/* Row 3: Password & Timezone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="********************"
                                            autoComplete="new-password"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
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
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 py-4 border-t border-slate-700/50 flex justify-end bg-slate-900/30">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                                >
                                    <Save size={18} />
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-4 border-b border-slate-700/50">
                            <h2 className="text-lg font-semibold text-white">Two-Factor Authentication</h2>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 space-y-6">
                            <p className="text-gray-300 leading-relaxed">
                                Two-Factor authentication adds an extra layer of security to your account. Whenever you sign in, you'll need to enter both your password and also a security code.
                            </p>
                            <button
                                onClick={handleEnableMFA}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                            >
                                <Shield size={18} />
                                Enable Two-Factor Authentication
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Settings;
