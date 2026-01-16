import { useState } from 'react';
import { Globe, User, Server, Eye, EyeOff, RefreshCw, Trash2, ExternalLink, Zap } from 'lucide-react';

const SettingsTab = ({ domain }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [pageSpeedEnabled, setPageSpeedEnabled] = useState(false);
    const [formData, setFormData] = useState({
        rootDirectory: domain,
        siteUser: domain.replace(/\./g, '_'),
        password: '',
        sshKeys: '',
        appVersion: '8.3',
        appPort: '3000',
        // PHP Settings
        phpVersion: '8.2',
        memoryLimit: '512 MB',
        maxExecutionTime: '1m',
        maxInputTime: '1m',
        maxInputVars: '10000',
        postMaxSize: '64 MB',
        uploadMaxFilesize: '64 MB',
        additionalConfig: `date.timezone=UTC;
display_errors=off;`,
        pageSpeedSettings: `pagespeed RewriteLevel CoreFilters;
pagespeed EnableFilters remove_quotes;
pagespeed DisableFilters prioritize_critical_css;
pagespeed EnableFilters recompress_images;
pagespeed EnableFilters responsive_images,resize_images;
pagespeed EnableFilters lazyload_images;
pagespeed EnableFilters sprite_images;
pagespeed EnableFilters insert_dns_prefetch;
pagespeed EnableFilters hint_preload_subresources;
pagespeed EnableFilters collapse_whitespace;
pagespeed EnableFilters dedup_inlined_images;
pagespeed EnableFilters inline_preview_images,resize_mobile_images;
pagespeed HttpCacheCompressionLevel 0;
pagespeed FetchHttps enable;
location ~ "^/pagespeed_static/" { }
location ~ "^/ngx_pagespeed_beacon$" { }
location ~ "\\.pagespeed\\.([a-z]\\.)?[a-z]{2}\\.[^.]{10}\\.[^.]+" {
  add_header "" "";
}`,
        deleteConfirmation: ''
    });

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 20; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData({ ...formData, password });
    };

    const handleSaveDomainSettings = (e) => {
        e.preventDefault();
        // TODO: API call to save domain settings
        console.log('Saving domain settings:', formData);
    };

    const handleSaveUserSettings = (e) => {
        e.preventDefault();
        // TODO: API call to save user settings
        console.log('Saving user settings:', formData);
    };

    const handleSaveAppSettings = (e) => {
        e.preventDefault();
        // TODO: API call to save app settings
        console.log('Saving app settings:', formData);
    };

    const handleSavePageSpeed = (e) => {
        e.preventDefault();
        // TODO: API call to save PageSpeed settings
        console.log('Saving PageSpeed settings:', formData.pageSpeedSettings);
    };

    const handlePurgeCache = () => {
        // TODO: API call to purge cache
        console.log('Purging PageSpeed cache');
    };

    const handleDeleteSite = (e) => {
        e.preventDefault();
        if (formData.deleteConfirmation === domain) {
            // TODO: API call to delete site
            console.log('Deleting site:', domain);
        }
    };

    return (
        <div className="space-y-6">
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
                    <div className="text-white font-mono">{formData.siteUser}</div>
                </div>
                
                <div className="glass-effect rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">IP Address</h3>
                    <div className="text-white font-mono">192.168.1.100</div>
                </div>
            </div>

            {/* Domain Settings Card */}
            <div className="glass-effect rounded-xl overflow-hidden">
                <div className="border-b border-slate-700 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">Domain Settings</h3>
                </div>
                <form onSubmit={handleSaveDomainSettings} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Domain Name
                            </label>
                            <input
                                type="text"
                                value={domain}
                                disabled
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-gray-400"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Root Directory
                            </label>
                            <input
                                type="text"
                                value={formData.rootDirectory}
                                onChange={(e) => setFormData({ ...formData, rootDirectory: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                /home/{formData.siteUser}/htdocs/{formData.rootDirectory}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* Site User Settings Card */}
            <div className="glass-effect rounded-xl overflow-hidden">
                <div className="border-b border-slate-700 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">Site User Settings</h3>
                </div>
                <form onSubmit={handleSaveUserSettings} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Site User
                            </label>
                            <input
                                type="text"
                                value={formData.siteUser}
                                disabled
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-gray-400"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="****************"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={generatePassword}
                                className="text-sm text-brand-400 hover:text-brand-300 mt-1 flex items-center gap-1"
                            >
                                <RefreshCw size={14} />
                                Generate new password
                            </button>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            SSH Keys
                        </label>
                        <textarea
                            value={formData.sshKeys}
                            onChange={(e) => setFormData({ ...formData, sshKeys: e.target.value })}
                            rows="5"
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                            placeholder="Paste SSH public keys here..."
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* PHP Settings Card */}
            <div className="glass-effect rounded-xl overflow-hidden">
                <div className="border-b border-slate-700 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">PHP Settings</h3>
                </div>
                <form onSubmit={handleSaveAppSettings} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                PHP Version
                            </label>
                            <select
                                value={formData.phpVersion}
                                onChange={(e) => setFormData({ ...formData, phpVersion: e.target.value })}
                                className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="7.4">PHP 7.4</option>
                                <option value="8.0">PHP 8.0</option>
                                <option value="8.1">PHP 8.1</option>
                                <option value="8.2">PHP 8.2</option>
                                <option value="8.3">PHP 8.3</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                memory_limit
                            </label>
                            <select
                                value={formData.memoryLimit}
                                onChange={(e) => setFormData({ ...formData, memoryLimit: e.target.value })}
                                className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="64 MB">64 MB</option>
                                <option value="128 MB">128 MB</option>
                                <option value="512 MB">512 MB</option>
                                <option value="768 MB">768 MB</option>
                                <option value="1 GB">1 GB</option>
                                <option value="2 GB">2 GB</option>
                                <option value="3 GB">3 GB</option>
                                <option value="4 GB">4 GB</option>
                                <option value="5 GB">5 GB</option>
                                <option value="6 GB">6 GB</option>
                                <option value="7 GB">7 GB</option>
                                <option value="8 GB">8 GB</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Sets the maximum amount of memory that a script is allowed to allocate.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                max_execution_time
                            </label>
                            <select
                                value={formData.maxExecutionTime}
                                onChange={(e) => setFormData({ ...formData, maxExecutionTime: e.target.value })}
                                className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="15s">15 sec</option>
                                <option value="30s">30 sec</option>
                                <option value="45s">45 sec</option>
                                <option value="1m">1 min</option>
                                <option value="2m">2 min</option>
                                <option value="3m">3 min</option>
                                <option value="4m">4 min</option>
                                <option value="5m">5 min</option>
                                <option value="10m">10 min</option>
                                <option value="15m">15 min</option>
                                <option value="30m">30 min</option>
                                <option value="45m">45 min</option>
                                <option value="1h">1 hour</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Sets the maximum time a script is allowed to run before it is terminated by the parser.
                            </p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                max_input_time
                            </label>
                            <select
                                value={formData.maxInputTime}
                                onChange={(e) => setFormData({ ...formData, maxInputTime: e.target.value })}
                                className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="15s">15 sec</option>
                                <option value="30s">30 sec</option>
                                <option value="45s">45 sec</option>
                                <option value="1m">1 min</option>
                                <option value="2m">2 min</option>
                                <option value="3m">3 min</option>
                                <option value="4m">4 min</option>
                                <option value="5m">5 min</option>
                                <option value="10m">10 min</option>
                                <option value="15m">15 min</option>
                                <option value="30m">30 min</option>
                                <option value="45m">45 min</option>
                                <option value="1h">1 hour</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Sets the maximum time a script is allowed to parse input data, like POST and GET.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                max_input_vars
                            </label>
                            <select
                                value={formData.maxInputVars}
                                onChange={(e) => setFormData({ ...formData, maxInputVars: e.target.value })}
                                className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                                <option value="5000">5000</option>
                                <option value="10000">10000</option>
                                <option value="20000">20000</option>
                                <option value="50000">50000</option>
                                <option value="100000">100000</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Sets the limit of the number of inputs for posting forms.
                            </p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                post_max_size
                            </label>
                            <select
                                value={formData.postMaxSize}
                                onChange={(e) => setFormData({ ...formData, postMaxSize: e.target.value })}
                                className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="2 MB">2 MB</option>
                                <option value="4 MB">4 MB</option>
                                <option value="8 MB">8 MB</option>
                                <option value="16 MB">16 MB</option>
                                <option value="32 MB">32 MB</option>
                                <option value="64 MB">64 MB</option>
                                <option value="128 MB">128 MB</option>
                                <option value="256 MB">256 MB</option>
                                <option value="512 MB">512 MB</option>
                                <option value="1 GB">1 GB</option>
                                <option value="2 GB">2 GB</option>
                                <option value="3 GB">3 GB</option>
                                <option value="4 GB">4 GB</option>
                                <option value="5 GB">5 GB</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Maximum size of POST data that PHP will accept.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            upload_max_filesize
                        </label>
                        <select
                            value={formData.uploadMaxFilesize}
                            onChange={(e) => setFormData({ ...formData, uploadMaxFilesize: e.target.value })}
                            className="w-full md:max-w-md px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                            <option value="2 MB">2 MB</option>
                            <option value="4 MB">4 MB</option>
                            <option value="8 MB">8 MB</option>
                            <option value="16 MB">16 MB</option>
                            <option value="32 MB">32 MB</option>
                            <option value="64 MB">64 MB</option>
                            <option value="128 MB">128 MB</option>
                            <option value="256 MB">256 MB</option>
                            <option value="512 MB">512 MB</option>
                            <option value="1 GB">1 GB</option>
                            <option value="2 GB">2 GB</option>
                            <option value="3 GB">3 GB</option>
                            <option value="4 GB">4 GB</option>
                            <option value="5 GB">5 GB</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            The maximum size of an uploaded file.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Additional Configuration Directives
                        </label>
                        <textarea
                            value={formData.additionalConfig}
                            onChange={(e) => setFormData({ ...formData, additionalConfig: e.target.value })}
                            rows="4"
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                            placeholder="date.timezone=UTC;&#10;display_errors=off;"
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* PageSpeed Card */}
            <div className="glass-effect rounded-xl overflow-hidden">
                <div className="border-b border-slate-700 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={pageSpeedEnabled}
                                onChange={(e) => setPageSpeedEnabled(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                        </label>
                        <div className="flex items-center gap-2">
                            <Zap className="text-brand-400" size={20} />
                            <h3 className="text-lg font-semibold text-white">PageSpeed</h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handlePurgeCache}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all text-sm"
                    >
                        Purge Cache
                    </button>
                </div>
                <form onSubmit={handleSavePageSpeed} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Settings
                        </label>
                        <textarea
                            value={formData.pageSpeedSettings}
                            onChange={(e) => setFormData({ ...formData, pageSpeedSettings: e.target.value })}
                            rows="10"
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* Delete Site Card */}
            <div className="glass-effect rounded-xl overflow-hidden border border-red-500/20">
                <div className="border-b border-slate-700 px-6 py-4 bg-red-900/10">
                    <h3 className="text-lg font-semibold text-red-400">Delete Site</h3>
                </div>
                <div className="p-6">
                    <p className="text-gray-400 mb-4">
                        Deleting a site will permanently remove all site files, databases, users, and configs, and they will be non-recoverable.
                    </p>
                    <button
                        type="button"
                        data-bs-toggle="modal"
                        onClick={() => {
                            const modal = document.getElementById('delete-site-modal');
                            if (modal) {
                                modal.style.display = 'block';
                            }
                        }}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all inline-flex items-center gap-2"
                    >
                        <Trash2 size={18} />
                        Delete Site
                    </button>
                </div>
            </div>

            {/* Delete Modal */}
            <div 
                id="delete-site-modal"
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden overflow-y-auto"
                style={{ display: 'none' }}
                onClick={(e) => {
                    if (e.target.id === 'delete-site-modal') {
                        e.target.style.display = 'none';
                        setFormData({ ...formData, deleteConfirmation: '' });
                    }
                }}
            >
                <div className="min-h-screen px-4 flex items-center justify-center py-8">
                    <div className="glass-effect rounded-xl max-w-md w-full border border-red-500/20">
                        <div className="border-b border-slate-700 px-6 py-4">
                            <h3 className="text-xl font-semibold text-white">Delete Site</h3>
                        </div>
                        <form onSubmit={handleDeleteSite} className="p-6">
                        <p className="text-gray-400 mb-4">
                            Deleting a site will permanently remove all site files, databases, users, and configs, and they will be non-recoverable.
                        </p>
                        <p className="text-gray-400 mb-4">
                            To confirm deletion, type <strong className="text-white">{domain}</strong> into the field.
                        </p>
                        <input
                            type="text"
                            value={formData.deleteConfirmation}
                            onChange={(e) => setFormData({ ...formData, deleteConfirmation: e.target.value })}
                            placeholder={domain}
                            className="w-full px-4 py-3 bg-slate-900 border border-red-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
                        />
                        <div className="flex justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    document.getElementById('delete-site-modal').style.display = 'none';
                                    setFormData({ ...formData, deleteConfirmation: '' });
                                }}
                                className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={formData.deleteConfirmation !== domain}
                                className={`px-6 py-2.5 rounded-lg transition-all ${
                                    formData.deleteConfirmation === domain
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Delete Site
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;
