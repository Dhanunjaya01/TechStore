import { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageUsers.css";

function ManageUsers() {
  const [search, setSearch] = useState("");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  function deleteUser(email) {
    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) return;

    const updatedUsers = users.filter((user) => user.email !== email);

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    window.location.reload();
  }

  return (
    <div className="manage-users-page">
      <div className="users-header">
        <Link to="/admin">
          <button className="back-btn">← Dashboard</button>
        </Link>

        <h1>Manage Users</h1>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table */}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>Customer</td>

                <td>
                  <span className="active-badge">Active</span>
                </td>

                <td className="action-buttons">
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="mobile-users">
        {filteredUsers.map((user, index) => (
          <div className="user-card" key={index}>
            <h3>{user.name}</h3>

            <p>📧 {user.email}</p>

            <p>👤 Customer</p>

            <span className="active-badge">Active</span>

            <button
              className="delete-btn"
              onClick={() => deleteUser(user.email)}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
