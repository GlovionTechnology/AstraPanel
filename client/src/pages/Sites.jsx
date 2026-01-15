import Layout from '../components/Layout';
import { Globe, Plus, Server, Calendar, Code, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { useSites } from '../hooks/useSites';
import { useNavigate } from 'react-router-dom';

const Sites = () => {
    const navigate = useNavigate();

    // 🎣 Hooks
    const { data: sites, isLoading, error } = useSites();

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Websites</h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your hosted websites</p>
                    </div>
                    <button 
                        onClick={() => navigate('/sites/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/30"
                    >
                        <Plus size={20} />
                        <span>Create Website</span>
                    </button>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="glass-effect rounded-xl p-12 text-center">
                        <Loader2 className="mx-auto mb-4 text-brand-500 animate-spin" size={48} />
                        <p className="text-gray-400">Loading websites...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="glass-effect rounded-xl p-6 border border-red-500/20">
                        <div className="flex items-center gap-3 text-red-400">
                            <AlertCircle size={24} />
                            <div>
                                <p className="font-semibold">Failed to load websites</p>
                                <p className="text-sm text-gray-400">{error.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && (!sites || sites.length === 0) && (
                    <div className="glass-effect rounded-xl p-12 text-center">
                        <Globe className="mx-auto mb-4 text-gray-600" size={64} />
                        <h3 className="text-xl font-bold text-gray-400 mb-2">No websites yet</h3>
                        <p className="text-gray-500 mb-6">Create your first website to get started</p>
                        <button 
                            onClick={() => navigate('/sites/new')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            <Plus size={20} />
                            <span>Create Your First Website</span>
                        </button>
                    </div>
                )}

                {/* Sites Table */}
                {!isLoading && sites && sites.length > 0 && (
                    <div className="glass-effect rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-800/50 border-b border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Domain
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Port
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            App
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {sites.map((site) => (
                                        <tr key={site.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-brand-500/10 rounded-lg">
                                                        <Globe size={20} className="text-brand-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">{site.domain_name}</p>
                                                        <p className="text-xs text-gray-500">Active</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Server size={16} className="text-gray-400" />
                                                    <span className="text-gray-300">{site.port}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Code size={16} className="text-gray-400" />
                                                    <div>
                                                        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-gray-300">
                                                            {site.app_type || 'PHP'}
                                                        </span>
                                                        {site.version && (
                                                            <p className="text-xs text-gray-500 mt-1">v{site.version}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Calendar size={16} />
                                                    <span className="text-sm">
                                                        {new Date(site.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="inline-flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-all">
                                                    <Trash2 size={16} />
                                                    <span className="text-sm">Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Sites;
