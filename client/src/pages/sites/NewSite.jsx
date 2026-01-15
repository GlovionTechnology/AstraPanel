import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NewSite = () => {
    const navigate = useNavigate();

    const siteTypes = [
        {
            id: 'php',
            title: 'Create a PHP Site',
            description: 'Traditional PHP application with Apache/Nginx',
            image: '/images/php.svg',
            color: 'from-purple-500 to-purple-600',
            shadowColor: 'shadow-purple-500/30',
        },
        {
            id: 'wordpress',
            title: 'WordPress',
            description: 'Popular CMS for blogs and websites',
            image: '/images/wordpress.svg',
            color: 'from-blue-500 to-blue-600',
            shadowColor: 'shadow-blue-500/30',
        },
        {
            id: 'nodejs',
            title: 'Node.js',
            description: 'JavaScript runtime for backend applications',
            image: '/images/nodejs.svg',
            color: 'from-green-500 to-green-600',
            shadowColor: 'shadow-green-500/30',
        },
        {
            id: 'static',
            title: 'Static HTML',
            description: 'Simple HTML/CSS/JS static website',
            image: '/images/html_css_js.svg',
            color: 'from-orange-500 to-orange-600',
            shadowColor: 'shadow-orange-500/30',
        },
        {
            id: 'python',
            title: 'Python',
            description: 'Django, Flask or FastAPI application',
            image: '/images/python.svg',
            color: 'from-yellow-500 to-yellow-600',
            shadowColor: 'shadow-yellow-500/30',
        },
        {
            id: 'proxy',
            title: 'Create a Reverse Proxy',
            description: 'Proxy requests to another server',
            image: '/images/reverse_proxy.svg',
            color: 'from-red-500 to-red-600',
            shadowColor: 'shadow-red-500/30',
        },
    ];

    const handleSelectType = (typeId) => {
        // Navigate to form with selected type
        navigate(`/sites/create?type=${typeId}`);
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-3">
                        What kind of site would you like to create?
                    </h1>
                    <p className="text-gray-400">
                        Choose the type of application you want to deploy
                    </p>
                </div>

                {/* Site Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {siteTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleSelectType(type.id)}
                            className="glass-effect rounded-xl p-6 text-left hover:scale-105 transition-all duration-300 group border border-slate-700 hover:border-slate-600"
                        >
                            {/* Image/Icon */}
                            <div className="mb-4 flex justify-center">
                                <div className="w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <img 
                                        src={type.image} 
                                        alt={type.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                                {type.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-4">
                                {type.description}
                            </p>

                            {/* Arrow */}
                            <div className="flex items-center gap-2 text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Get Started</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/sites')}
                        className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Sites
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default NewSite;
