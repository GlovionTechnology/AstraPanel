import { useSystemStats } from '../hooks/useSystemStats';
import Layout from '../components/Layout';
import { Activity, Server, HardDrive, Cpu, TrendingUp, Zap, Database, Clock } from 'lucide-react';

const Dashboard = () => {
    const { data, isLoading, isError } = useSystemStats();

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                        <p className="text-slate-400">Loading system stats...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (isError) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-full">
                    <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 text-center">
                        <Server className="mx-auto mb-4 text-red-400" size={48} />
                        <h3 className="text-xl font-bold text-red-400 mb-2">Connection Error</h3>
                        <p className="text-slate-400">Unable to connect to backend server</p>
                    </div>
                </div>
            </Layout>
        );
    }

    const cpuPercentage = parseFloat(data.cpu) || 0;
    
    return (
        <Layout>
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 rounded-2xl p-6 shadow-2xl shadow-brand-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Administrator!</h1>
                            <p className="text-brand-100">Monitor your server performance in real-time</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 border border-white/20">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-white font-medium">All Systems Operational</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* CPU Card */}
                    <div className="glass-effect rounded-xl p-6 shadow-xl card-hover">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">CPU Usage</p>
                                <h3 className="text-3xl font-bold text-white">{data.cpu}%</h3>
                            </div>
                            <div className="p-3 bg-brand-500/10 rounded-lg border border-brand-500/20">
                                <Cpu className="text-brand-400" size={24} />
                            </div>
                        </div>
                        <div className="relative w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full transition-all duration-700 ease-out shadow-lg shadow-brand-500/50"
                                style={{ width: `${cpuPercentage}%` }}
                            ></div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                            <TrendingUp size={14} className="text-green-400" />
                            <span>Optimal performance</span>
                        </div>
                    </div>

                    {/* RAM Card */}
                    <div className="glass-effect rounded-xl p-6 shadow-xl card-hover">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Memory</p>
                                <h3 className="text-2xl font-bold text-white">{data.ram_used}</h3>
                                <p className="text-xs text-gray-500">of {data.ram_total}</p>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                <Activity className="text-green-400" size={24} />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                            <Zap size={14} className="text-green-400" />
                            <span>Real-time monitoring</span>
                        </div>
                    </div>

                    {/* Disk Card */}
                    <div className="glass-effect rounded-xl p-6 shadow-xl card-hover">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Storage</p>
                                <h3 className="text-3xl font-bold text-white">{data.disk_used}</h3>
                            </div>
                            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <HardDrive className="text-orange-400" size={24} />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                            <Database size={14} className="text-orange-400" />
                            <span>NVMe SSD</span>
                        </div>
                    </div>

                    {/* Server Info Card */}
                    <div className="glass-effect rounded-xl p-6 shadow-xl card-hover">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Platform</p>
                                <h3 className="text-xl font-bold text-white">{data.platform}</h3>
                            </div>
                            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <Server className="text-purple-400" size={24} />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={14} className="text-purple-400" />
                            <span>Uptime: {data.uptime}</span>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <div className="glass-effect rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Zap className="text-brand-400" size={20} />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-white transition-all flex items-center justify-between group border border-slate-700/50 hover:border-brand-500/50">
                                <span>Create New Website</span>
                                <span className="text-brand-400 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-white transition-all flex items-center justify-between group border border-slate-700/50 hover:border-brand-500/50">
                                <span>View All Sites</span>
                                <span className="text-brand-400 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-white transition-all flex items-center justify-between group border border-slate-700/50 hover:border-brand-500/50">
                                <span>Server Settings</span>
                                <span className="text-brand-400 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="glass-effect rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Activity className="text-green-400" size={20} />
                            System Status
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                <span className="text-gray-300">Database</span>
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/30">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                <span className="text-gray-300">Web Server</span>
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/30">Running</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                <span className="text-gray-300">API Service</span>
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/30">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
