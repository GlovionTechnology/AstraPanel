import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
    Settings, 
    Server, 
    Database, 
    Shield, 
    Lock, 
    Terminal, 
    FolderOpen, 
    Clock, 
    FileText,
    Globe,
    User,
    ExternalLink
} from 'lucide-react';

// Import tab components
import SettingsTab from './manage/SettingsTab';
import VhostTab from './manage/VhostTab';
import DatabasesTab from './manage/DatabasesTab';
import SSLTab from './manage/SSLTab';
import SecurityTab from './manage/SecurityTab';
import SSHFTPTab from './manage/SSHFTPTab';
import FileManagerTab from './manage/FileManagerTab';
import CronJobsTab from './manage/CronJobsTab';
import LogsTab from './manage/LogsTab';

const ManageSite = () => {
    const { domain } = useParams();
    const [activeTab, setActiveTab] = useState('settings');

    const tabs = [
        { id: 'settings', name: 'Settings', icon: Settings },
        { id: 'vhost', name: 'Vhost', icon: Server },
        { id: 'databases', name: 'Databases', icon: Database },
        { id: 'ssl', name: 'SSL/TLS', icon: Lock },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'sshftp', name: 'SSH/FTP', icon: Terminal },
        { id: 'filemanager', name: 'File Manager', icon: FolderOpen },
        { id: 'cronjobs', name: 'Cron Jobs', icon: Clock },
        { id: 'logs', name: 'Logs', icon: FileText },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'settings':
                return <SettingsTab domain={domain} />;
            case 'vhost':
                return <VhostTab domain={domain} />;
            case 'databases':
                return <DatabasesTab domain={domain} />;
            case 'ssl':
                return <SSLTab domain={domain} />;
            case 'security':
                return <SecurityTab domain={domain} />;
            case 'sshftp':
                return <SSHFTPTab domain={domain} />;
            case 'filemanager':
                return <FileManagerTab domain={domain} />;
            case 'cronjobs':
                return <CronJobsTab domain={domain} />;
            case 'logs':
                return <LogsTab domain={domain} />;
            default:
                return <SettingsTab domain={domain} />;
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand-500/10 rounded-xl">
                        <Globe size={28} className="text-brand-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{domain}</h1>
                        <p className="text-gray-400 text-sm">Manage website settings and configuration</p>
                    </div>
                </div>

                {/* Site Info Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-effect rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Domain</h3>
                        <div className="flex items-center gap-2">
                            <a 
                                href={`https://${domain}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-brand-400 transition-colors flex items-center gap-2"
                            >
                                {domain}
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                    
                    <div className="glass-effect rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Site User</h3>
                        <div className="text-white font-mono">{domain.replace(/\./g, '_')}</div>
                    </div>
                    
                    <div className="glass-effect rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">IP Address</h3>
                        <div className="text-white font-mono">192.168.1.100</div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="glass-effect rounded-xl p-2">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                                            : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="glass-effect rounded-xl p-6">
                    {renderTabContent()}
                </div>
            </div>
        </Layout>
    );
};

export default ManageSite;
