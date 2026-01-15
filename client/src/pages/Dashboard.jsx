import { useSystemStats } from '../hooks/useSystemStats'; // Humara naya Hook
import { Activity, Server, HardDrive, Cpu } from 'lucide-react';

const Dashboard = () => {
    // TanStack Query ka Jadoo ✨
    // isLoading: Jab tak pehla data na aa jaye
    // isError: Agar server band ho
    // data: Asli maal
    const { data, isLoading, isError } = useSystemStats();

    // 1. Loading State
    if (isLoading) {
        return (
            <div className="h-screen bg-slate-900 flex items-center justify-center text-white">
                <p className="text-xl animate-pulse">Connecting to AstraPanel Core...</p>
            </div>
        );
    }

    // 2. Error State
    if (isError) {
        return (
            <div className="h-screen bg-slate-900 flex items-center justify-center text-red-400">
                <p>⚠️ Server se contact nahi ho pa raha. Backend check karein.</p>
            </div>
        );
    }

    // 3. Main Dashboard UI
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Server className="text-indigo-500" /> System Dashboard
            </h1>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* CPU Card */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-400">CPU Load</h3>
                        <Cpu className="text-blue-400" />
                    </div>
                    <p className="text-4xl font-bold text-white">{data.cpu}%</p>
                    <div className="w-full bg-slate-700 h-2 mt-4 rounded-full">
                        <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${data.cpu}%` }}
                        ></div>
                    </div>
                </div>

                {/* RAM Card */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-400">RAM Usage</h3>
                        <Activity className="text-green-400" />
                    </div>
                    <p className="text-2xl font-bold">{data.ram_used} / {data.ram_total}</p>
                    <p className="text-xs text-slate-500 mt-2">Real-time Memory</p>
                </div>

                {/* Disk Card */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-400">Disk Usage</h3>
                        <HardDrive className="text-orange-400" />
                    </div>
                    <p className="text-4xl font-bold">{data.disk_used}</p>
                    <p className="text-xs text-slate-500 mt-2">NVMe SSD Storage</p>
                </div>

                {/* OS Info Card */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-400">Server Info</h3>
                        <Server className="text-purple-400" />
                    </div>
                    <p className="text-lg font-bold">{data.platform}</p>
                    <p className="text-sm text-slate-400">Uptime: {data.uptime}</p>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
