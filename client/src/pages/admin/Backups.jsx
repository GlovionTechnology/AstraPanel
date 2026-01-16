import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Cloud, Save, Trash2, HardDrive } from 'lucide-react';

const Backups = () => {
    const [showAddProvider, setShowAddProvider] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState('');
    const [providerConfig, setProviderConfig] = useState({
        name: '',
        accessKey: '',
        secretKey: '',
        bucket: '',
        region: '',
        endpoint: ''
    });

    // Popular backup providers
    const providers = [
        { id: 'aws-s3', name: 'Amazon S3', icon: '🪣', color: 'from-orange-500 to-orange-600' },
        { id: 'google-drive', name: 'Google Drive', icon: '📁', color: 'from-blue-500 to-blue-600' },
        { id: 'dropbox', name: 'Dropbox', icon: '📦', color: 'from-blue-400 to-blue-500' },
        { id: 'backblaze', name: 'Backblaze B2', icon: '🔴', color: 'from-red-500 to-red-600' },
        { id: 'digitalocean', name: 'DigitalOcean Spaces', icon: '🌊', color: 'from-blue-600 to-blue-700' },
        { id: 'wasabi', name: 'Wasabi', icon: '🟢', color: 'from-green-500 to-green-600' },
        { id: 'azure', name: 'Microsoft Azure', icon: '☁️', color: 'from-blue-500 to-cyan-500' },
    ];

    // Configured providers (dummy data)
    const [configuredProviders, setConfiguredProviders] = useState([
        {
            id: 1,
            type: 'aws-s3',
            name: 'AWS S3 Backup',
            bucket: 'my-backup-bucket',
            region: 'us-east-1',
            status: 'active'
        }
    ]);

    const handleAddProvider = (providerId) => {
        setSelectedProvider(providerId);
        setShowAddProvider(true);
    };

    const handleSaveProvider = (e) => {
        e.preventDefault();
        console.log('Saving provider:', providerConfig);
        setShowAddProvider(false);
    };

    const handleDeleteProvider = (id) => {
        if (confirm('Are you sure you want to delete this backup provider?')) {
            setConfiguredProviders(configuredProviders.filter(p => p.id !== id));
        }
    };

    const getProviderInfo = (type) => {
        return providers.find(p => p.id === type);
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Remote Backups
                    </h1>
                    <p className="text-gray-400 mt-2">Configure cloud storage providers for automated backups</p>
                </div>

                {/* Configured Providers */}
                {configuredProviders.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Configured Providers</h2>
                        <div className="space-y-4">
                            {configuredProviders.map((provider) => {
                                const providerInfo = getProviderInfo(provider.type);
                                return (
                                    <div key={provider.id} className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                                        <div className="p-6 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${providerInfo?.color} flex items-center justify-center text-2xl shadow-lg`}>
                                                    {providerInfo?.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <span className="text-sm text-gray-400">
                                                            <strong>Bucket:</strong> {provider.bucket}
                                                        </span>
                                                        <span className="text-sm text-gray-400">
                                                            <strong>Region:</strong> {provider.region}
                                                        </span>
                                                        <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs border border-green-700/50">
                                                            Active
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteProvider(provider.id)}
                                                className="p-2 hover:bg-red-900/20 text-red-400 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Available Providers */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Add Backup Provider</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {providers.map((provider) => (
                            <button
                                key={provider.id}
                                onClick={() => handleAddProvider(provider.id)}
                                className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6 hover:border-brand-500/50 transition-all group"
                            >
                                <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${provider.color} flex items-center justify-center text-3xl shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                                    {provider.icon}
                                </div>
                                <h3 className="text-white font-semibold text-center group-hover:text-brand-400 transition-colors">
                                    {provider.name}
                                </h3>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Provider Modal */}
                {showAddProvider && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-slate-700">
                                <h2 className="text-2xl font-bold text-white">
                                    Configure {providers.find(p => p.id === selectedProvider)?.name}
                                </h2>
                            </div>
                            
                            <form onSubmit={handleSaveProvider}>
                                <div className="p-6 space-y-6">
                                    {/* Provider Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Configuration Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={providerConfig.name}
                                            onChange={(e) => setProviderConfig({...providerConfig, name: e.target.value})}
                                            placeholder="My Backup"
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    {/* Access Key */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Access Key <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={providerConfig.accessKey}
                                            onChange={(e) => setProviderConfig({...providerConfig, accessKey: e.target.value})}
                                            placeholder="Enter access key"
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    {/* Secret Key */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Secret Key <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={providerConfig.secretKey}
                                            onChange={(e) => setProviderConfig({...providerConfig, secretKey: e.target.value})}
                                            placeholder="Enter secret key"
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    {/* Bucket/Container Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Bucket Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={providerConfig.bucket}
                                            onChange={(e) => setProviderConfig({...providerConfig, bucket: e.target.value})}
                                            placeholder="my-backup-bucket"
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    {/* Region */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Region <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={providerConfig.region}
                                            onChange={(e) => setProviderConfig({...providerConfig, region: e.target.value})}
                                            placeholder="us-east-1"
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    {/* Endpoint (Optional) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Endpoint (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={providerConfig.endpoint}
                                            onChange={(e) => setProviderConfig({...providerConfig, endpoint: e.target.value})}
                                            placeholder="https://s3.amazonaws.com"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 border-t border-slate-700 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddProvider(false)}
                                        className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                                    >
                                        <Save size={18} />
                                        Save Configuration
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

export default Backups;
