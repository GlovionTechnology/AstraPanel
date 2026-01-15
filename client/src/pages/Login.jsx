import { useState } from 'react';
import api from '../api/axios'; // Updated: Using centralized axios
import { useNavigate } from 'react-router-dom';
import { Lock, User, Server } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Backend se baat kar rahe hain (Port 3000)
            const response = await api.post('/auth/login', { // Updated: Using centralized api
                username,
                password
            });

            // Agar login successful hua:
            // 1. Token save karo
            localStorage.setItem('token', response.data.token);
            // 2. Dashboard par jao
            navigate('/dashboard');

        } catch (err) {
            // Agar error aaya (jaise galat password)
            setError('Invalid Username or Password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="w-full max-w-md p-8 space-y-6 glass-effect rounded-2xl shadow-2xl">
                
                {/* Logo Section */}
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl shadow-lg shadow-brand-500/30">
                        <Server size={32} />
                    </div>
                    <h1 className="mt-3 text-2xl font-bold text-white">AstraPanel</h1>
                    <p className="text-gray-400 text-sm">Secure Hosting Control Panel</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 text-sm text-red-200 bg-red-900/30 border border-red-500/50 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    
                    {/* Username Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="w-full p-2.5 pl-10 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-brand-500 text-white placeholder-gray-500 transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full p-2.5 pl-10 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-brand-500 text-white placeholder-gray-500 transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 font-bold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50"
                    >
                        Access Control Panel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
