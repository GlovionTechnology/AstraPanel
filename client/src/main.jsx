import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. Manager Create karna
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Window switch karne par bar-bar reload na kare
            retry: 1, // Agar fail ho to bas 1 baar retry kare
        },
    },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Provider se Wrap karna */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
