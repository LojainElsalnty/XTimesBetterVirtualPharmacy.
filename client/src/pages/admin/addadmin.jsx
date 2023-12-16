import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './addadmin.module.css';
import searchIcon from '../../assets/img/searchicon.png';

const AdminTable = () => {

  //Authenticate part
  const accessToken = sessionStorage.getItem('accessToken');
  const [load, setLoad] = useState(true);
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');

  console.log(accessToken);
  useEffect(() => {
    if (username.length != 0) {
      setLoad(false);
    }
  }, [username]);
  async function checkAuthentication() {
    await axios({
      method: 'get',
      url: 'http://localhost:8000/authentication/checkAccessToken',
      headers: {
        "Content-Type": "application/json",
        'Authorization': accessToken,
        'User-type': 'admin',
      },
    })
      .then((response) => {
        console.log(response);
        setUsername(response.data.username);
        //setLoad(false);
      })
      .catch((error) => {
        //setLoad(false);
        navigate('/login');

      });
  }

  const xTest = checkAuthentication();



  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
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
      const response = await axios.get('http://localhost:8000/admin/addremove/admin/');
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
      if (!newAdminData.username || !newAdminData.password) {
        setError('Please fill in all required fields.');
        return;
      }
      console.log(newAdminData)
      const response = await axios.post('http://localhost:8000/admin/addremove/', newAdminData);
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
      const response = await axios.delete(`http://localhost:8000/admin/addremove/removeAdmin/${adminUsername}`);
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
  const handleUsernameChange = (event) => {
    setSearchUsername(event.target.value);
  };

  const fetchSelectedAdmin = () => {
    // Check if a username is entered
    if (searchUsername.trim() === '') {
      console.log('Please enter a username.');
      return;
    }

    // Filter admins based on the entered username
    const selectedAdmin = admins.find((admin) => admin.username === searchUsername);

    if (selectedAdmin) {
      // Display information for the selected admin
      setSelectedAdmin(selectedAdmin);
      console.log("Selected Admin:", selectedAdmin);
      // You can update the state or perform any other action as needed
    } else {
      console.log('No admin found for the entered username.');
      // Handle the case where no admin is found
      setSelectedAdmin(null); // Clear selected admin state
    }
  };
  if (load) {
    return (<div>Loading</div>)
  }
  return (
    <div>
      <h1>Admins List</h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          Enter Admin Username:
          <input
            type="text"
            value={searchUsername}
            onChange={handleUsernameChange}
          />
          <button className={styles['find-button']} onClick={fetchSelectedAdmin}>
            <br />
            <img src={searchIcon} alt="Search" style={{ width: '25px', height: '25px' }} />
            <br />
          </button>
        </label>
      </div>

      {selectedAdmin && (
        <div>
          <h3>Admin Information for {selectedAdmin.username}</h3>
          <table className={styles.pharmacistTable}>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedAdmin._id}>
                <td>{selectedAdmin.username}</td>
                <td>{selectedAdmin.firstName}</td>
                <td>{selectedAdmin.lastName}</td>
                <td>
                  <button onClick={() => handleRemoveAdmin(selectedAdmin.username)} style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', cursor: 'pointer' }}>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button onClick={handleAddAdminClick} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 12px', cursor: 'pointer' }}> Add Admin</button>

      {showAddAdminPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>
              &times;
            </span>
            <h2>Add Admin</h2>
            <form onSubmit={handleAddAdminSubmit}>
              <div>
                <label style={{ display: 'block' }}>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={newAdminData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block' }}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newAdminData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block' }}>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={newAdminData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label style={{ display: 'block' }}>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={newAdminData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '8px 12px', cursor: 'pointer', marginRight: '10px' }}>Add Admin</button>
  <button type="button" onClick={handlePopupClose} style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', cursor: 'pointer' }}>Cancel</button><br />
              {error && <p>{error}</p>}
              <br />
            </form>
          </div>
        </div>
      )}

      <table className={styles.pharmacistTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.username}</td>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>
                <button onClick={() => handleRemoveAdmin(admin.username)} style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', cursor: 'pointer' }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;