import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { TimezoneSelect } from '../../utils/timezones.jsx';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data - replace with API call
  const [formData, setFormData] = useState({
    userName: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    password: '',
    status: '1',
    role: 'ROLE_ADMIN',
    timezone: 'Asia/Kolkata'
  });

  const [selectedSites, setSelectedSites] = useState([]);

  const sites = [
    { id: 1, domain: 'example.com' },
    { id: 2, domain: 'demo.com' },
    { id: 3, domain: 'test.com' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData(prev => ({
      ...prev,
      role
    }));
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SITE_MANAGER') {
      setSelectedSites([]);
    }
  };

  const handleSiteToggle = (domain) => {
    setSelectedSites(prev =>
      prev.includes(domain)
        ? prev.filter(s => s !== domain)
        : [...prev, domain]
    );
  };

  const generatePassword = () => {
    const length = 20;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to save user
    console.log('Saving user:', formData, 'Sites:', selectedSites);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      // API call to delete user
      navigate('/admin/users');
    }
  };

  const showSiteSelection = formData.role === 'ROLE_USER';

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              {formData.firstName} {formData.lastName}
            </h1>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-slate-700/50">
              <h2 className="text-lg font-semibold text-white">
                {formData.firstName} {formData.lastName}
              </h2>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              {/* Row 1: Username & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
                    User Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 2: First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 3: Password & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Leave empty to keep current password"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="mt-2 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Generate new password
                  </button>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                    Status <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="1">Active</option>
                    <option value="0">Not Active</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Role & Timezone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                    Role <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleRoleChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="ROLE_ADMIN">Admin</option>
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_SITE_MANAGER">Site Manager</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                    Timezone <span className="text-red-400">*</span>
                  </label>
                  <TimezoneSelect
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Sites Selection (Only for ROLE_USER) */}
              {showSiteSelection && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Sites <span className="text-red-400">*</span>
                  </label>
                  <div className="space-y-2 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    {sites.map(site => (
                      <div key={site.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`site-${site.id}`}
                          checked={selectedSites.includes(site.domain)}
                          onChange={() => handleSiteToggle(site.domain)}
                          className="w-4 h-4 text-brand-500 bg-slate-700 border-slate-600 rounded focus:ring-brand-500 focus:ring-2"
                        />
                        <label
                          htmlFor={`site-${site.id}`}
                          className="ml-3 text-sm text-gray-300 cursor-pointer"
                        >
                          {site.domain}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors border border-red-600/30"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg transition-all shadow-lg shadow-brand-500/20"
                >
                  <Save size={18} />
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditUser;
