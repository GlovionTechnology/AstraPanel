import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Trash2, Shield, Save, RefreshCw } from 'lucide-react';

const Security = () => {
    const [activeTab, setActiveTab] = useState('firewall');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddRuleModal, setShowAddRuleModal] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState(null);
    
    // Basic Auth State
    const [basicAuthEnabled, setBasicAuthEnabled] = useState(false);
    const [basicAuthCredentials, setBasicAuthCredentials] = useState({
        userName: '',
        password: ''
    });

    // Add Firewall Rule State
    const [newRule, setNewRule] = useState({
        type: '22',
        portRange: '22',
        sourceChoice: '',
        source: '',
        description: ''
    });

    const ruleTypes = [
        { value: '22', label: 'SSH/SFTP' },
        { value: '20-21', label: 'FTP' },
        { value: '49152-65534', label: 'ProFTPD Passive Ports' },
        { value: '9200', label: 'Elasticsearch' },
        { value: '3306', label: 'MYSQL' },
        { value: '80', label: 'HTTP' },
        { value: '443', label: 'HTTPS' },
        { value: '8443', label: 'AstraPanel' },
        { value: 'custom', label: 'Custom' },
    ];

    const sourceChoices = [
        { value: '', label: 'Custom' },
        { value: '0.0.0.0/0', label: 'Anywhere-IPv4' },
        { value: '::/0', label: 'Anywhere-IPv6' },
        { value: '27.5.160.91', label: 'My IP' },
    ];

    // Dummy firewall rules data
    const [firewallRules, setFirewallRules] = useState([
        { id: 1, type: 'SSH/SFTP', portRange: '22', ipVersion: 'ipv4', source: '0.0.0.0/0', description: '' },
        { id: 2, type: 'SSH/SFTP', portRange: '22', ipVersion: 'ipv6', source: '::/0', description: '' },
        { id: 3, type: 'HTTPS', portRange: '443', ipVersion: 'ipv4', source: '0.0.0.0/0', description: '' },
        { id: 4, type: 'HTTPS', portRange: '443', ipVersion: 'ipv6', source: '::/0', description: '' },
        { id: 5, type: 'HTTP', portRange: '80', ipVersion: 'ipv4', source: '0.0.0.0/0', description: '' },
        { id: 6, type: 'HTTP', portRange: '80', ipVersion: 'ipv6', source: '::/0', description: '' },
        { id: 7, type: 'AstraPanel', portRange: '8443', ipVersion: 'ipv4', source: '0.0.0.0/0', description: '' },
        { id: 8, type: 'AstraPanel', portRange: '8443', ipVersion: 'ipv6', source: '::/0', description: '' },
    ]);

    const handleDeleteClick = (rule) => {
        setRuleToDelete(rule);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (ruleToDelete) {
            setFirewallRules(firewallRules.filter(r => r.id !== ruleToDelete.id));
            setShowDeleteModal(false);
            setRuleToDelete(null);
        }
    };

    const generatePassword = () => {
        const length = 20;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setBasicAuthCredentials({...basicAuthCredentials, password});
    };

    const handleBasicAuthToggle = () => {
        const newState = !basicAuthEnabled;
        setBasicAuthEnabled(newState);
        if (newState && !basicAuthCredentials.password) {
            generatePassword();
        }
    };

    const handleBasicAuthSubmit = (e) => {
        e.preventDefault();
        console.log('Saving Basic Auth:', basicAuthCredentials);
    };

    const handleTypeChange = (value) => {
        const portRange = value === 'custom' ? '' : value;
        setNewRule({...newRule, type: value, portRange});
    };

    const handleSourceChoiceChange = (value) => {
        setNewRule({...newRule, sourceChoice: value, source: value});
    };

    const handleAddRuleSubmit = (e) => {
        e.preventDefault();
        const ipVersion = newRule.source.includes(':') ? 'ipv6' : 'ipv4';
        const typeLabel = ruleTypes.find(t => t.value === newRule.type)?.label || 'Custom';
        const newFirewallRule = {
            id: firewallRules.length + 1,
            type: typeLabel,
            portRange: newRule.portRange,
            ipVersion,
            source: newRule.source,
            description: newRule.description
        };
        setFirewallRules([...firewallRules, newFirewallRule]);
        setShowAddRuleModal(false);
        setNewRule({
            type: '22',
            portRange: '22',
            sourceChoice: '',
            source: '',
            description: ''
        });
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Security
                    </h1>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 border-b border-slate-700">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setActiveTab('firewall')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'firewall'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Firewall
                        </button>
                        <button
                            onClick={() => setActiveTab('basicauth')}
                            className={`px-6 py-3 font-medium transition-all ${
                                activeTab === 'basicauth'
                                    ? 'text-brand-400 border-b-2 border-brand-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Basic Auth
                        </button>
                    </div>
                </div>

                {/* Firewall Tab */}
                {activeTab === 'firewall' && (
                    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Rules</h2>
                            <button 
                                onClick={() => setShowAddRuleModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                            >
                                <Plus size={18} />
                                Add Rule
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">TYPE</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">PORT RANGE</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">IP VERSION</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">SOURCE</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">DESCRIPTION</th>
                                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300" style={{width: '200px'}}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {firewallRules.map((rule) => (
                                        <tr key={rule.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                                            <td className="px-6 py-4">
                                                <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
                                                    {rule.type}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{rule.portRange}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-slate-800/50 text-gray-300 rounded text-sm">
                                                    {rule.ipVersion}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 font-mono text-sm">{rule.source}</td>
                                            <td className="px-6 py-4 text-gray-400">{rule.description || '-'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteClick(rule)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Basic Auth Tab */}
                {activeTab === 'basicauth' && (
                    <form onSubmit={handleBasicAuthSubmit}>
                        <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                            {/* Card Header */}
                            <div className="px-6 py-4 border-b border-slate-700/50">
                                <h2 className="text-lg font-semibold text-white">Basic Auth</h2>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-6">
                                {/* Toggle Switch */}
                                <div>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={basicAuthEnabled}
                                            onChange={handleBasicAuthToggle}
                                            className="sr-only peer"
                                        />
                                        <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                                        <span className="ml-3 text-sm font-medium text-white">Enable Basic Auth</span>
                                    </label>
                                    <p className="mt-2 text-sm text-gray-400">
                                        Basic Auth in front of AstraPanel adds an extra layer of security.
                                    </p>
                                </div>

                                {/* Credentials Fields */}
                                {basicAuthEnabled && (
                                    <div className="space-y-4 pt-4 border-t border-slate-700/50">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Username */}
                                            <div>
                                                <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
                                                    User Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="userName"
                                                    value={basicAuthCredentials.userName}
                                                    onChange={(e) => setBasicAuthCredentials({...basicAuthCredentials, userName: e.target.value})}
                                                    required
                                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                                />
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Password <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="password"
                                                    value={basicAuthCredentials.password}
                                                    onChange={(e) => setBasicAuthCredentials({...basicAuthCredentials, password: e.target.value})}
                                                    required
                                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={generatePassword}
                                                    className="mt-2 text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
                                                >
                                                    <RefreshCw size={14} />
                                                    Generate new password
                                                </button>
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
                                )}
                            </div>
                        </div>
                    </form>
                )}

                {/* Add Firewall Rule Modal */}
                {showAddRuleModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-700">
                                <h3 className="text-xl font-semibold text-white">Add Firewall Rule</h3>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleAddRuleSubmit}>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-12 gap-4">
                                        {/* Type */}
                                        <div className="col-span-3">
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                                                Type <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                id="type"
                                                value={newRule.type}
                                                onChange={(e) => handleTypeChange(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            >
                                                {ruleTypes.map(type => (
                                                    <option key={type.value} value={type.value}>{type.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Port Range */}
                                        <div className="col-span-2">
                                            <label htmlFor="portRange" className="block text-sm font-medium text-gray-300 mb-2">
                                                Port Range <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="portRange"
                                                value={newRule.portRange}
                                                onChange={(e) => setNewRule({...newRule, portRange: e.target.value})}
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>

                                        {/* Source Choice */}
                                        <div className="col-span-3">
                                            <label htmlFor="sourceChoice" className="block text-sm font-medium text-gray-300 mb-2">
                                                Source
                                            </label>
                                            <select
                                                id="sourceChoice"
                                                value={newRule.sourceChoice}
                                                onChange={(e) => handleSourceChoiceChange(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            >
                                                {sourceChoices.map(choice => (
                                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Source */}
                                        <div className="col-span-4">
                                            <label htmlFor="source" className="block text-sm font-medium text-gray-300 mb-2">
                                                Source <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="source"
                                                value={newRule.source}
                                                onChange={(e) => setNewRule({...newRule, source: e.target.value})}
                                                placeholder="IP or CIDR"
                                                required
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="max-w-md">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            value={newRule.description}
                                            onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                                            placeholder="Optional description"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddRuleModal(false)}
                                        className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                                    >
                                        <Plus size={16} />
                                        Add Rule
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && ruleToDelete && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-md w-full">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                                        <Trash2 size={20} className="text-red-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Delete Firewall Rule</h3>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <p className="text-gray-300">
                                    Are you sure you want to delete the firewall rule for <strong className="text-white">{ruleToDelete.type}</strong> on port <strong className="text-white">{ruleToDelete.portRange}</strong> ({ruleToDelete.ipVersion})?
                                </p>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Security;
