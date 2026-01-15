import { Database } from 'lucide-react';

const DatabasesTab = ({ domain }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Database className="text-brand-400" size={24} />
                <h2 className="text-xl font-bold text-white">Database Management</h2>
            </div>
            
            <div className="text-center py-12">
                <Database className="mx-auto mb-4 text-gray-600" size={48} />
                <p className="text-gray-400">Database management will be added here</p>
                <p className="text-sm text-gray-500 mt-2">Domain: {domain}</p>
            </div>
        </div>
    );
};

export default DatabasesTab;
