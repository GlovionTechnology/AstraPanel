import { useQuery } from '@tanstack/react-query';
import api from '../api/axios'; // Humara Secure Axios

// Ye function actual data layega
const fetchStats = async () => {
    const { data } = await api.get('/system/stats');
    return data;
};

// Custom Hook
export const useSystemStats = () => {
    return useQuery({
        queryKey: ['system-stats'], // Unique ID is data ke liye
        queryFn: fetchStats, // Kaunsa function chalana hai
        
        // 🔥 MAGIC SETTINGS (Live Streaming)
        refetchInterval: 2000, // Har 2 second mein data refresh hoga (Real-time feel)
        staleTime: 1000, // 1 second tak purana data fresh maano
    });
};
