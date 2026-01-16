import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { RotateCw, Save, AlertTriangle, X } from 'lucide-react';
import { TimezoneSelect } from '../../utils/timezones.jsx';

const Instance = () => {
    const [activeTab, setActiveTab] = useState('services');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [proftpdSettings, setProftpdSettings] = useState({
        masqueradeAddress: '5.75.188.61'
    });
    const [instanceSettings, setInstanceSettings] = useState({
        timezone: 'UTC'
    });

    // Dummy services data
    const services = [
        { name: 'MySQL', status: 'running' },
        { name: 'NGINX', status: 'running' },
        { name: 'PHP-FPM 7.4', status: 'running' },
        { name: 'PHP-FPM 8.0', status: 'running' },
        { name: 'PHP-FPM 8.1', status: 'running' },
        { name: 'PHP-FPM 8.2', status: 'running' },
        { name: 'Redis Server', status: 'running' },
        { name: 'Node.js', status: 'running' },
    ];

    const handleReboot = () => {
        setConfirmAction({
            type: 'reboot',
            title: 'Reboot Instance',
            message: 'Are you sure you want to reboot the instance? This will temporarily interrupt all services.',
            confirmText: 'Reboot',
            action: () => {
                console.log('Rebooting instance...');
                setShowConfirmModal(false);
            }
        });
        setShowConfirmModal(true);
    };

    const handleServiceRestart = (serviceName) => {
        setConfirmAction({
            type: 'restart',
            title: `Restart ${serviceName}`,
            message: `Are you sure you want to restart ${serviceName}? This may temporarily interrupt the service.`,
            confirmText: 'Restart',
            action: () => {
                console.log(`Restarting ${serviceName}...`);
                setShowConfirmModal(false);
            }
        });
        setShowConfirmModal(true);
    };

    const handleProftpdSubmit = (e) => {
        e.preventDefault();
        console.log('Saving Proftpd settings:', proftpdSettings);
    };

    const handleInstanceSubmit = (e) => {
        e.preventDefault();
        console.log('Saving Instance settings:', instanceSettings);
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Instance
                    </h1>
                    <button
                        onClick={handleReboot}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-white transition-all"
                    >
                        <RotateCw size={18} />
                        Reboot
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 border-b border-slate-700">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'services'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Services
                        </button>
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
                    </div>
                </div>

                {/* Services Tab */}
                {activeTab === 'services' && (
                    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-700/50">
                            <h2 className="text-lg font-semibold text-white">Services</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300" style={{width: '150px'}}>STATUS</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">SERVICE</th>
                                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300" style={{width: '200px'}}>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((service, index) => (
                                        <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm border border-green-700/50">
                                                    Running
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{service.name}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleServiceRestart(service.name)}
                                                    className="text-brand-400 hover:text-brand-300 transition-colors"
                                                >
                                                    Restart
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        {/* Proftpd Settings */}
                        <form onSubmit={handleProftpdSubmit}>
                            <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-700/50">
                                    <h2 className="text-lg font-semibold text-white">Proftpd Settings</h2>
                                </div>
                                <div className="p-6">
                                    <div className="max-w-xl">
                                        <label htmlFor="masqueradeAddress" className="block text-sm font-medium text-gray-300 mb-2">
                                            MasqueradeAddress <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="masqueradeAddress"
                                            value={proftpdSettings.masqueradeAddress}
                                            onChange={(e) => setProftpdSettings({...proftpdSettings, masqueradeAddress: e.target.value})}
                                            placeholder="8.8.8.8"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                        />
                                        <p className="mt-2 text-sm text-gray-400">
                                            MasqueradeAddress causes the server to display the network information for the specified IP address or DNS hostname to the client.
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 py-4 border-t border-slate-700/50 flex justify-end">
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

                        {/* Instance Settings */}
                        <form onSubmit={handleInstanceSubmit}>
                            <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-700/50">
                                    <h2 className="text-lg font-semibold text-white">Instance Settings</h2>
                                </div>
                                <div className="p-6">
                                    <div className="max-w-xl">
                                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                                            Timezone <span className="text-red-400">*</span>
                                        </label>
                                        <TimezoneSelect
                                            id="timezone"
                                            name="timezone"
                                            value={instanceSettings.timezone}
                                            onChange={(e) => setInstanceSettings({...instanceSettings, timezone: e.target.value})}
                                        />
                                        <p className="mt-2 text-sm text-gray-400">
                                            It's recommended to reboot the instance after changing the timezone.
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 py-4 border-t border-slate-700/50 flex justify-end">
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
                    </div>
                )}

                {/* Confirmation Modal */}
                {showConfirmModal && confirmAction && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-md w-full">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                                        <AlertTriangle size={20} className="text-red-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{confirmAction.title}</h3>
                                </div>
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <p className="text-gray-300">{confirmAction.message}</p>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmAction.action}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                        confirmAction.type === 'reboot' 
                                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                                    }`}
                                >
                                    <RotateCw size={16} />
                                    {confirmAction.confirmText}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Instance;
