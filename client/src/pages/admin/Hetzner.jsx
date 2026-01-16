import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Save, Loader2 } from 'lucide-react';

const Hetzner = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [loading, setLoading] = useState(false);
    
    // Settings Tab State
    const [apiToken, setApiToken] = useState('');
    const [automaticSnapshots, setAutomaticSnapshots] = useState(false);
    const [frequency, setFrequency] = useState('12');
    const [retentionPeriod, setRetentionPeriod] = useState('7');

    // Snapshots State
    const [snapshots, setSnapshots] = useState([]);
    const [loadingSnapshots, setLoadingSnapshots] = useState(true);

    const handleApiTokenSubmit = (e) => {
        e.preventDefault();
        console.log('Saving API Token:', apiToken);
    };

    const handleSnapshotsSettingsSubmit = (e) => {
        e.preventDefault();
        console.log('Saving Snapshots Settings:', {
            automaticSnapshots,
            frequency,
            retentionPeriod
        });
    };

    const handleCreateSnapshot = () => {
        console.log('Creating snapshot...');
    };

    // Simulate loading snapshots
    useState(() => {
        if (activeTab === 'snapshots') {
            setTimeout(() => {
                setLoadingSnapshots(false);
            }, 1500);
        }
    }, [activeTab]);

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Hetzner
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
                            onClick={() => setActiveTab('snapshots')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'snapshots'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Snapshots
                        </button>
                    </div>
                </div>

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        {/* API Token Section */}
                        <form onSubmit={handleApiTokenSubmit}>
                            <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                                {/* Card Header */}
                                <div className="px-6 py-4 border-b border-slate-700/50">
                                    <h2 className="text-lg font-semibold text-white">API Token</h2>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label htmlFor="apiToken" className="block text-sm font-medium text-gray-300 mb-2">
                                            API Token <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="apiToken"
                                            value={apiToken}
                                            onChange={(e) => setApiToken(e.target.value)}
                                            placeholder="9crEB30IharQZjZLa7DQEp1ktjysqYKoS24ClVZIxtrtQImooLgQImW5XOgiEmgZ"
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
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

                        {/* Snapshots Settings Section */}
                        <form onSubmit={handleSnapshotsSettingsSubmit}>
                            <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                                {/* Card Header */}
                                <div className="px-6 py-4 border-b border-slate-700/50">
                                    <h2 className="text-lg font-semibold text-white">Snapshots Settings</h2>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 space-y-6">
                                    {/* Toggle Switch */}
                                    <div>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={automaticSnapshots}
                                                onChange={(e) => setAutomaticSnapshots(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                                            <span className="ml-3 text-sm font-medium text-white">Enable Automatic Snapshots</span>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Frequency */}
                                        <div>
                                            <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-2">
                                                Frequency <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                id="frequency"
                                                value={frequency}
                                                onChange={(e) => setFrequency(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            >
                                                <option value="1">Every Hour</option>
                                                <option value="3">Every Three Hours</option>
                                                <option value="6">Every Six Hours</option>
                                                <option value="12">Every Twelve Hours</option>
                                                <option value="24">Once per Day</option>
                                            </select>
                                        </div>

                                        {/* Retention Period */}
                                        <div>
                                            <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-300 mb-2">
                                                Retention Period (Days) <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                id="retentionPeriod"
                                                value={retentionPeriod}
                                                onChange={(e) => setRetentionPeriod(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            >
                                                <option value="1">1</option>
                                                <option value="3">3</option>
                                                <option value="7">7</option>
                                                <option value="14">14</option>
                                                <option value="21">21</option>
                                                <option value="30">30</option>
                                            </select>
                                        </div>
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
                    </div>
                )}

                {/* Snapshots Tab */}
                {activeTab === 'snapshots' && (
                    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Snapshots</h2>
                            <button 
                                onClick={handleCreateSnapshot}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                            >
                                <Plus size={18} />
                                Create Snapshot
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                            {loadingSnapshots ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Loader2 size={48} className="text-brand-400 animate-spin mb-4" />
                                    <p className="text-gray-400">Loading...</p>
                                </div>
                            ) : snapshots.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-full mb-4">
                                        <Loader2 size={32} className="text-gray-500" />
                                    </div>
                                    <p className="text-gray-400 text-lg">No snapshots found</p>
                                    <p className="text-gray-500 text-sm mt-2">Create your first snapshot to get started</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-700">
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">NAME</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">SIZE</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">CREATED</th>
                                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {snapshots.map((snapshot) => (
                                                <tr key={snapshot.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                                                    <td className="px-6 py-4 text-gray-300">{snapshot.name}</td>
                                                    <td className="px-6 py-4 text-gray-300">{snapshot.size}</td>
                                                    <td className="px-6 py-4 text-gray-300">{snapshot.created}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-red-400 hover:text-red-300 transition-colors">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Hetzner;
