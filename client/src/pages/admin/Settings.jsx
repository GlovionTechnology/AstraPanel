import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Save, Trash2 } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [showAddServerModal, setShowAddServerModal] = useState(false);
    
    // General Settings State
    const [customDomain, setCustomDomain] = useState('demo.astrapanel.com');

    // Database Servers State
    const [databaseServers, setDatabaseServers] = useState([
        { id: 1, host: '127.0.0.1', engine: 'MySQL 8.0.31', port: '3306', active: true }
    ]);

    // Add Database Server Form State
    const [newServer, setNewServer] = useState({
        host: '',
        userName: '',
        password: '',
        port: '3306',
        certificate: ''
    });

    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        console.log('Saving custom domain:', customDomain);
    };

    const handleAddServerSubmit = (e) => {
        e.preventDefault();
        const serverData = {
            id: databaseServers.length + 1,
            host: newServer.host,
            engine: 'MySQL 8.0.31', // This would come from detection
            port: newServer.port,
            active: true
        };
        setDatabaseServers([...databaseServers, serverData]);
        setShowAddServerModal(false);
        setNewServer({
            host: '',
            userName: '',
            password: '',
            port: '3306',
            certificate: ''
        });
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Settings
                    </h1>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 border-b border-slate-700">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'general'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('database')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'database'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Database Servers
                        </button>
                    </div>
                </div>

                {/* General Tab */}
                {activeTab === 'general' && (
                    <form onSubmit={handleGeneralSubmit}>
                        <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                            {/* Card Header */}
                            <div className="px-6 py-4 border-b border-slate-700/50">
                                <h2 className="text-lg font-semibold text-white">AstraPanel Custom Domain</h2>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-6">
                                <div>
                                    <label htmlFor="domainName" className="block text-sm font-medium text-gray-300 mb-2">
                                        Domain Name
                                    </label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-4 py-3 bg-slate-800/50 border border-r-0 border-slate-700 rounded-l-lg text-gray-400">
                                            https://
                                        </span>
                                        <input
                                            type="text"
                                            id="domainName"
                                            value={customDomain}
                                            onChange={(e) => setCustomDomain(e.target.value)}
                                            placeholder="cp.domain.com"
                                            className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">
                                        A DNS record pointing to this server is required to issue a Let's Encrypt Certificate.
                                    </p>
                                </div>

                                {/* Save Button */}
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                                    >
                                        <Save size={18} />
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {/* Database Servers Tab */}
                {activeTab === 'database' && (
                    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Database Servers</h2>
                            <button 
                                onClick={() => setShowAddServerModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                            >
                                <Plus size={18} />
                                Add Database Server
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">HOST</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">ENGINE</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">PORT</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">ACTIVE</th>
                                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-300">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {databaseServers.map((server) => (
                                        <tr key={server.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                                            <td className="px-6 py-4">
                                                <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
                                                    {server.host}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{server.engine}</td>
                                            <td className="px-6 py-4 text-gray-300">{server.port}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-300">
                                                    {server.active ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-400">
                                                -
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Add Database Server Modal */}
                {showAddServerModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-700">
                                <h3 className="text-xl font-semibold text-white">Add Database Server</h3>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleAddServerSubmit}>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Host */}
                                        <div>
                                            <label htmlFor="host" className="block text-sm font-medium text-gray-300 mb-2">
                                                Host <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="host"
                                                value={newServer.host}
                                                onChange={(e) => setNewServer({...newServer, host: e.target.value})}
                                                placeholder="IP or DNS Name"
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>

                                        {/* User Name */}
                                        <div>
                                            <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
                                                User Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="userName"
                                                value={newServer.userName}
                                                onChange={(e) => setNewServer({...newServer, userName: e.target.value})}
                                                placeholder="admin"
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                                Password <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={newServer.password}
                                                onChange={(e) => setNewServer({...newServer, password: e.target.value})}
                                                placeholder="****************"
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>

                                        {/* Port */}
                                        <div>
                                            <label htmlFor="port" className="block text-sm font-medium text-gray-300 mb-2">
                                                Port <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="port"
                                                value={newServer.port}
                                                onChange={(e) => setNewServer({...newServer, port: e.target.value})}
                                                placeholder="3306"
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Certificate */}
                                    <div>
                                        <label htmlFor="certificate" className="block text-sm font-medium text-gray-300 mb-2">
                                            Certificate
                                        </label>
                                        <textarea
                                            id="certificate"
                                            value={newServer.certificate}
                                            onChange={(e) => setNewServer({...newServer, certificate: e.target.value})}
                                            rows={8}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddServerModal(false)}
                                        className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                                    >
                                        <Plus size={16} />
                                        Add Database Server
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

export default Settings;
