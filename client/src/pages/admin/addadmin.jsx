import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [showAddAdminPopup, setShowAddAdminPopup] = useState(false);

  const [newAdminData, setNewAdminData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/addremove/admin/');
      setAdmins(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching admin data.');
      setAdmins([]);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdminClick = () => {
    setShowAddAdminPopup(true);
  };

  const handlePopupClose = () => {
    setShowAddAdminPopup(false);
    // Optionally, clear the form data when the pop-up is closed
    setNewAdminData({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    });
    setError(null); // Clear any previous error messages
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData({
      ...newAdminData,
      [name]: value,
    });
  };

  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Request Payload:', newAdminData);
      // Check if required fields are present
      if (!newAdminData.username || !newAdminData.password ) {
        setError('Please fill in all required fields.');
        return;
      }
     console.log(newAdminData)
      const response = await axios.post('http://localhost:5000/admin/addremove/', newAdminData);
      console.log(response)
      if (response.data.success) {
        // Admin added successfully, close the pop-up and fetch admins again
        alert('Admin Added')
        handlePopupClose();
        fetchAdmins();
      } else {
        // Handle error scenario
        console.log(response.data.message)
        console.error('Adding admin failed');
        setError('Adding admin failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.message === 'Username already taken!') {
        setError('Username is already taken. Please choose a different username.');
      } else {
        setError(`An error occurred: ${error.message}`);
      }
    }
  };

  const handleRemoveAdmin = async (adminUsername) => {
    try {
      const response = await axios.delete(`http://localhost:5000/admin/addremove/removeAdmin/${adminUsername}`);
      console.log(response)
      if (response.status === 200) {
        // Admin removed successfully, fetch admins again
        alert('Admin removed');
        fetchAdmins();
      } else {
        // Handle error scenario
        console.error('Removing admin failed');
        setError('Removing admin failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Admin Table</h1>
      <button onClick={handleAddAdminClick}>Add Admin</button>
      {showAddAdminPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>
              &times;
            </span>
            <h2>Add Admin</h2>
            <form onSubmit={handleAddAdminSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={newAdminData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newAdminData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={newAdminData.firstName}
                  onChange={handleInputChange}
                  
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={newAdminData.lastName}
                  onChange={handleInputChange}
                  
                />
              </div>
              <button type="submit">Add Admin</button>
              <button type="button" onClick={handlePopupClose}>Cancel</button>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.username}</td>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>
                <button onClick={() => handleRemoveAdmin(admin.username)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;