import React, { useState } from "react";

const dummyUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "recruiter",
    companyName: "Tech Corp",
  },
  {
    _id: "2",
    name: "Alice Smith",
    email: "alice@company.com",
    role: "company",
    companyName: "Design Studio",
  },
  {
    _id: "3",
    name: "Bob Johnson",
    email: "bob@startup.com",
    role: "recruiter",
    companyName: "StartupX",
  },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(dummyUsers);

  const handleApprove = (id) => {
    // Dummy approve action
    setUsers(users.filter((user) => user._id !== id));
    alert("User approved successfully!");
  };

  const handleReject = (id) => {
    // Dummy reject action
    setUsers(users.filter((user) => user._id !== id));
    alert("User rejected!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Pending Users</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No pending users
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 capitalize">{user.role}</td>
                  <td className="border px-4 py-2">{user.companyName || "-"}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
