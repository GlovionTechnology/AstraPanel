import { useSystemStats } from '../hooks/useSystemStats';
import Layout from '../components/Layout';
import { Activity, Server, HardDrive, Cpu, TrendingUp, Zap, Database, Clock, Monitor, Cloud, MapPin, Globe, BarChart3 } from 'lucide-react';

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

                {/* System Information Grid */}
                <div className="glass-effect rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Monitor className="text-brand-400" size={20} />
                        System Information
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">Operating System</h4>
                            <p className="text-white font-medium">Ubuntu 22.04</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">Hostname</h4>
                            <p className="text-white font-medium font-mono text-sm">astrapanel-server</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">CPU</h4>
                            <p className="text-white font-medium">2 Cores</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">Memory</h4>
                            <p className="text-white font-medium">{data.ram_total}</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                                <Cloud size={12} />
                                Cloud
                            </h4>
                            <p className="text-white font-medium">AWS</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">Instance ID</h4>
                            <p className="text-white font-medium font-mono text-sm">i-0123456789</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                                <MapPin size={12} />
                                Region
                            </h4>
                            <p className="text-white font-medium">us-east-1</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                                <Globe size={12} />
                                IPv4 Public IP
                            </h4>
                            <p className="text-white font-medium font-mono text-sm">192.168.1.1</p>
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

                {/* Monitoring Section */}
                <div className="glass-effect rounded-xl overflow-hidden">
                    <div className="border-b border-slate-700 px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <BarChart3 className="text-brand-400" size={20} />
                            Monitoring
                        </h3>
                        <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                            <option value="30">Last 30 Minutes</option>
                            <option value="60">Last Hour</option>
                            <option value="180">Last 3 Hours</option>
                            <option value="360">Last 6 Hours</option>
                            <option value="720">Last 12 Hours</option>
                        </select>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* CPU Usage Chart */}
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-semibold text-white">CPU Usage</h4>
                                    <span className="text-xs text-gray-400">2 CPU</span>
                                </div>
                                <div className="h-48 flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-700/30">
                                    <div className="text-center">
                                        <Activity className="mx-auto mb-2 text-brand-400" size={32} />
                                        <p className="text-sm text-gray-400">Chart visualization</p>
                                        <p className="text-xs text-gray-500 mt-1">Real-time CPU monitoring</p>
                                    </div>
                                </div>
                            </div>

                            {/* Memory Usage Chart */}
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-semibold text-white">Memory Usage</h4>
                                    <span className="text-xs text-gray-400">{data.ram_total}</span>
                                </div>
                                <div className="h-48 flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-700/30">
                                    <div className="text-center">
                                        <Database className="mx-auto mb-2 text-green-400" size={32} />
                                        <p className="text-sm text-gray-400">Chart visualization</p>
                                        <p className="text-xs text-gray-500 mt-1">Real-time memory monitoring</p>
                                    </div>
                                </div>
                            </div>

                            {/* Disk Usage Chart */}
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-semibold text-white">Disk Usage</h4>
                                    <span className="text-xs text-gray-400">/ (40 GB)</span>
                                </div>
                                <div className="h-48 flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-700/30">
                                    <div className="text-center">
                                        <HardDrive className="mx-auto mb-2 text-orange-400" size={32} />
                                        <p className="text-sm text-gray-400">Chart visualization</p>
                                        <p className="text-xs text-gray-500 mt-1">Storage usage trends</p>
                                    </div>
                                </div>
                            </div>

                            {/* Load Average Chart */}
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-semibold text-white">Load Average</h4>
                                    <span className="text-xs text-gray-400">2 CPU</span>
                                </div>
                                <div className="h-48 flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-700/30">
                                    <div className="text-center">
                                        <TrendingUp className="mx-auto mb-2 text-purple-400" size={32} />
                                        <p className="text-sm text-gray-400">Chart visualization</p>
                                        <p className="text-xs text-gray-500 mt-1">1min, 5min, 15min averages</p>
                                    </div>
                                </div>
                            </div>
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
