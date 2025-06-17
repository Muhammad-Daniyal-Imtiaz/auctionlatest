'use client';

import { useState, useEffect } from 'react';
import supabase from '@/app/Supabase/config';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phone && user.phone.includes(searchTerm)) ||
    (user.address_city && user.address_city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle delete user
  const handleDelete = async (clerkId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const { error } = await supabase.from('users').delete().eq('clerk_id', clerkId);
        if (error) throw error;
        fetchUsers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Handle save edited user
  const handleSave = async () => {
    if (!editingUser) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          username: editingUser.username,
          role: editingUser.role,
          reward_points: editingUser.reward_points,
          tier: editingUser.tier,
          phone: editingUser.phone,
          address_street: editingUser.address_street,
          address_city: editingUser.address_city,
          address_state: editingUser.address_state,
          address_zip: editingUser.address_zip,
          address_country: editingUser.address_country,
          updated_at: new Date().toISOString(),
        })
        .eq('clerk_id', editingUser.clerk_id);

      if (error) throw error;

      setIsModalOpen(false);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle input change for edit form
  const handleInputChange = (e) => {
    if (!editingUser) return;

    const { name, value } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: value,
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100 text-purple-600 flex items-center justify-center">
      <div className="text-xl font-light tracking-wider">Loading users...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-wider mb-8 border-b border-gray-300 pb-4 text-gray-900">
  Users / Customers
</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users by email, username, phone, or city..."
              className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
  <tr>
    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-900 uppercase tracking-wider">Email</th>
    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-900 uppercase tracking-wider">Username</th>
    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-900 uppercase tracking-wider">Role</th>
    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-900 uppercase tracking-wider">Points</th>
    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-900 uppercase tracking-wider">Tier</th>
    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-900 uppercase tracking-wider">Phone</th>
    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-900 uppercase tracking-wider">City</th>
    <th className="px-6 py-4 text-right text-lg font-extrabold text-gray-900 uppercase tracking-wider">Actions</th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-100">
  {filteredUsers.length > 0 ? (
    filteredUsers.map((user) => (
      <tr key={user.clerk_id} className="hover:bg-gray-100 transition-colors duration-150">
        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-800">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-800">{user.username || '-'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-800">
          <span className="px-2 py-1 rounded-full text-sm bg-gray-200 text-gray-900 font-bold">
            {user.role || 'user'}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-800">{user.reward_points || '0'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-800">
          <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-900 font-bold">
            {user.tier || 'none'}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-800">{user.phone || '-'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-800">{user.address_city || '-'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
          <button
            onClick={() => handleEdit(user)}
            className="mr-3 text-blue-600 hover:text-blue-800 transition-colors font-bold"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(user.clerk_id)}
            className="text-red-600 hover:text-red-800 transition-colors font-bold"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={8} className="px-6 py-8 text-center text-base text-gray-500 font-semibold">
        No users found matching your search
      </td>
    </tr>
  )}
</tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light tracking-wider text-purple-600">EDIT USER PROFILE</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editingUser.username || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Role</label>
                    <select
                      name="role"
                      value={editingUser.role || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="authenticated">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Reward Points</label>
                    <input
                      type="number"
                      name="reward_points"
                      value={editingUser.reward_points || 0}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Tier</label>
                    <select
                      name="tier"
                      value={editingUser.tier || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="">None</option>
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editingUser.phone || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address_street"
                      value={editingUser.address_street || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="address_city"
                      value={editingUser.address_city || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="address_state"
                        value={editingUser.address_state || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">ZIP</label>
                      <input
                        type="text"
                        name="address_zip"
                        value={editingUser.address_zip || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="address_country"
                      value={editingUser.address_country || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}