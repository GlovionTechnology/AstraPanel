import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

// 🔍 GET: Sites ki list fetch karna
export const useSites = () => {
    return useQuery({
        queryKey: ['sites'],
        queryFn: async () => {
            try {
                console.log('🔄 Fetching sites...');
                const response = await api.get('/sites/list');
                console.log('✅ Sites response:', response.data);
                return response.data.sites || response.data; // Backend might return {sites: []} or directly []
            } catch (error) {
                console.error('❌ Sites fetch error:', error.response?.data || error.message);
                throw error;
            }
        },
        refetchInterval: 5000, // Har 5 second mein refresh
        retry: 1,
    });
};

// ✏️ POST: Nayi site create karna
export const useCreateSite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (siteData) => {
            const response = await api.post('/sites/create', siteData);
            return response.data;
        },
        onSuccess: () => {
            // Site create hone ke baad list refresh karo
            queryClient.invalidateQueries({ queryKey: ['sites'] });
        },
    });
};
