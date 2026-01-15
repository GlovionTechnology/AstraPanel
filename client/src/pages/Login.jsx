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
        <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
                
                {/* Logo Section */}
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-indigo-600 rounded-full">
                        <Server size={32} />
                    </div>
                    <h1 className="mt-3 text-2xl font-bold">AstraPanel</h1>
                    <p className="text-slate-400 text-sm">Secure Hosting Control Panel</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 text-sm text-red-200 bg-red-900/50 border border-red-500 rounded">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    
                    {/* Username Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="w-full p-2.5 pl-10 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-indigo-500 text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full p-2.5 pl-10 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-indigo-500 text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 font-bold text-white transition bg-indigo-600 rounded hover:bg-indigo-700"
                    >
                        Access Control Panel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
