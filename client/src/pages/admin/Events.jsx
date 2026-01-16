import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Calendar, Clock } from 'lucide-react';

const Events = () => {
    const [dateRange, setDateRange] = useState({
        from: 'Jan 16, 2026 02:00:00',
        to: 'Jan 16, 2026 15:00:00'
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Dummy events data (empty for now)
    const events = [];

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Events
                    </h1>
                </div>

                {/* Events Card */}
                <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
                    {/* Card Header with Date Range Picker */}
                    <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Events</h2>
                        
                        {/* Date Range Picker */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:border-brand-500/50 transition-all"
                            >
                                <Calendar size={18} className="text-gray-400" />
                                <span className="text-sm">
                                    {dateRange.from} - {dateRange.to}
                                </span>
                            </button>

                            {/* Date Picker Dropdown (placeholder) */}
                            {showDatePicker && (
                                <div className="absolute right-0 mt-2 p-6 bg-slate-900/95 backdrop-blur-lg rounded-xl border border-slate-700/50 shadow-2xl z-50 min-w-[500px]">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* From Date */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    From
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                                />
                                            </div>
                                            
                                            {/* To Date */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    To
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                                            <button
                                                onClick={() => setShowDatePicker(false)}
                                                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => setShowDatePicker(false)}
                                                className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                        {events.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-full mb-4">
                                    <Clock size={32} className="text-gray-500" />
                                </div>
                                <p className="text-gray-400 text-lg">No events found.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">DATE</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">EVENT</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">USER</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">IP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((event, index) => (
                                            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                                                <td className="px-4 py-3 text-gray-300">{event.date}</td>
                                                <td className="px-4 py-3 text-gray-300">{event.event}</td>
                                                <td className="px-4 py-3 text-gray-300">{event.user}</td>
                                                <td className="px-4 py-3 text-gray-300">{event.ip}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Events;
