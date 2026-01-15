import Layout from '../../components/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useCreateSite } from '../../hooks/useSites';
import { AlertCircle, CheckCircle, Loader2, Plus, ArrowLeft, RefreshCw, Eye, EyeOff } from 'lucide-react';

const CreateSite = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const siteType = searchParams.get('type') || 'php';
    
    const [formData, setFormData] = useState({
        domain_name: '',
        app_type: getAppTypeFromId(siteType),
        version: getDefaultVersion(siteType),
        app_port: getDefaultPort(siteType),
        proxy_url: '',
        site_user: '',
        site_user_password: generatePassword(),
        // WordPress specific
        site_title: '',
        admin_username: 'admin',
        admin_password: generatePassword(),
        admin_email: '',
        multisite: 'no',
    });

    function generatePassword() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < 20; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    const createSite = useCreateSite();
    const [showSitePassword, setShowSitePassword] = useState(false);
    const [showAdminPassword, setShowAdminPassword] = useState(false);

    function getAppTypeFromId(id) {
        const mapping = {
            'php': 'PHP',
            'wordpress': 'WordPress',
            'nodejs': 'Node.js',
            'static': 'Static',
            'python': 'Python',
            'proxy': 'Reverse Proxy',
        };
        return mapping[id] || 'PHP';
    }

    function getDefaultVersion(id) {
        const defaults = {
            'php': '8.2',
            'nodejs': '20.0',
            'python': '3.11',
            'wordpress': '8.2',
        };
        return defaults[id] || '';
    }

    function getDefaultPort(id) {
        const defaults = {
            'nodejs': '3000',
            'python': '8090',
        };
        return defaults[id] || '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await createSite.mutateAsync({
                domain_name: formData.domain_name,
                app_type: formData.app_type,
                version: formData.version,
                app_port: formData.app_port,
                proxy_url: formData.proxy_url,
                site_user: formData.site_user,
                site_user_password: formData.site_user_password,
                ...(formData.app_type === 'WordPress' && {
                    site_title: formData.site_title,
                    admin_username: formData.admin_username,
                    admin_password: formData.admin_password,
                    admin_email: formData.admin_email,
                    multisite: formData.multisite,
                }),
            });
            
            // Success: Navigate back to sites list
            setTimeout(() => {
                navigate('/sites');
            }, 1500);
        } catch (err) {
            console.error('Site creation failed:', err);
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/sites/new')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Change Site Type</span>
                </button>

                {/* Header */}
                <div className="glass-effect rounded-xl p-8">
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Create {formData.app_type} Site
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Configure your new {formData.app_type} application
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Domain Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Domain Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.domain_name}
                                onChange={(e) => setFormData({ ...formData, domain_name: e.target.value })}
                                placeholder={formData.app_type === 'WordPress' ? 'www.domain.com' : 'example.com'}
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                            />
                        </div>

                        {/* WordPress Site Title */}
                        {formData.app_type === 'WordPress' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Site Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.site_title}
                                    onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                                    placeholder="My WordPress Site"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                />
                            </div>
                        )}

                        {/* PHP/WordPress Version */}
                        {(formData.app_type === 'PHP' || formData.app_type === 'WordPress') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    PHP Version
                                </label>
                                <select
                                    value={formData.version}
                                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                >
                                    <option value="7.4">PHP 7.4</option>
                                    <option value="8.0">PHP 8.0</option>
                                    <option value="8.1">PHP 8.1</option>
                                    <option value="8.2">PHP 8.2</option>
                                    <option value="8.3">PHP 8.3</option>
                                </select>
                            </div>
                        )}

                        {/* Other App Versions */}
                        {formData.app_type !== 'Static' && formData.app_type !== 'Reverse Proxy' && formData.app_type !== 'PHP' && formData.app_type !== 'WordPress' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    {formData.app_type} Version
                                </label>
                                <select
                                    value={formData.version}
                                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                >
                                    {formData.app_type === 'Node.js' && (
                                        <>
                                            <option value="18.0">Node 18 LTS</option>
                                            <option value="20.0">Node 20 LTS</option>
                                            <option value="21.0">Node 21 Current</option>
                                        </>
                                    )}
                                    {formData.app_type === 'Python' && (
                                        <>
                                            <option value="3.9">Python 3.9</option>
                                            <option value="3.10">Python 3.10</option>
                                            <option value="3.11">Python 3.11</option>
                                            <option value="3.12">Python 3.12</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        )}

                        {/* App Port for Node.js and Python */}
                        {(formData.app_type === 'Node.js' || formData.app_type === 'Python') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    App Port
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.app_port}
                                    onChange={(e) => setFormData({ ...formData, app_port: e.target.value })}
                                    placeholder={formData.app_type === 'Node.js' ? '3000' : '8090'}
                                    min="1"
                                    max="65535"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                />
                            </div>
                        )}

                        {/* Reverse Proxy URL */}
                        {formData.app_type === 'Reverse Proxy' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Reverse Proxy Url
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.proxy_url}
                                    onChange={(e) => setFormData({ ...formData, proxy_url: e.target.value })}
                                    placeholder="http://127.0.0.1:8000"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                />
                            </div>
                        )}

                        {/* Site User */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Site User
                            </label>
                            <p className="text-xs text-gray-500 mb-2">The main SSH User for the site.</p>
                            <input
                                type="text"
                                required
                                value={formData.site_user}
                                onChange={(e) => setFormData({ ...formData, site_user: e.target.value })}
                                placeholder="site-user"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                            />
                        </div>

                        {/* Site User Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Site User Password *
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type={showSitePassword ? "text" : "password"}
                                        required
                                        value={formData.site_user_password}
                                        onChange={(e) => setFormData({ ...formData, site_user_password: e.target.value })}
                                        className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-mono text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSitePassword(!showSitePassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showSitePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, site_user_password: generatePassword() })}
                                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all flex items-center gap-2"
                                >
                                    <RefreshCw size={18} />
                                    <span className="hidden sm:inline">Generate</span>
                                </button>
                            </div>
                        </div>

                        {/* WordPress Admin Fields */}
                        {formData.app_type === 'WordPress' && (
                            <>
                                <div className="border-t border-slate-700 pt-5">
                                    <h3 className="text-lg font-semibold text-white mb-4">WordPress Admin</h3>
                                </div>

                                {/* Admin Username */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Admin User Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.admin_username}
                                        onChange={(e) => setFormData({ ...formData, admin_username: e.target.value })}
                                        placeholder="admin"
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                    />
                                </div>

                                {/* Admin Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Admin Password
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type={showAdminPassword ? "text" : "password"}
                                                required
                                                value={formData.admin_password}
                                                onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
                                                className="w-full px-4 py-3 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-mono text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowAdminPassword(!showAdminPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                            >
                                                {showAdminPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, admin_password: generatePassword() })}
                                            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all flex items-center gap-2"
                                        >
                                            <RefreshCw size={18} />
                                            <span className="hidden sm:inline">Generate</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Admin Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Admin E-Mail
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.admin_email}
                                        onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
                                        placeholder="john.doe@domain.com"
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                    />
                                </div>

                                {/* Multisite */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Multisite
                                    </label>
                                    <select
                                        value={formData.multisite}
                                        onChange={(e) => setFormData({ ...formData, multisite: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* Error Message */}
                        {createSite.isError && (
                            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                                <AlertCircle size={20} className="text-red-400" />
                                <p className="text-sm text-red-400">
                                    {createSite.error?.response?.data?.error || 'Failed to create website'}
                                </p>
                            </div>
                        )}

                        {/* Success Message */}
                        {createSite.isSuccess && (
                            <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                                <CheckCircle size={20} className="text-green-400" />
                                <p className="text-sm text-green-400">Website created successfully! Redirecting...</p>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/sites')}
                                className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createSite.isPending}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {createSite.isPending ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={20} />
                                        <span>Create Website</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreateSite;
