import Layout from '../components/Layout';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">Settings</h1>

                <div className="glass-effect rounded-xl p-12 text-center">
                    <SettingsIcon className="mx-auto mb-4 text-gray-600" size={64} />
                    <h3 className="text-xl font-bold text-gray-400 mb-2">Settings Panel</h3>
                    <p className="text-gray-500">Configuration options coming soon</p>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
