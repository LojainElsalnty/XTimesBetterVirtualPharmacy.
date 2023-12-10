import React, { useState, useEffect } from 'react';

function RemovePharmacist() {
  const [pharmacists, setPharmacists] = useState([]);
  const [pharmacistInfo, setPharmacistInfo] = useState({
    username: ''
  });

  useEffect(() => {
    fetchPharmacists();
  }, []);

  const fetchPharmacists = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/addremove/gett/');
      const data = await response.json();
      setPharmacists(data);
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacistInfo({ ...pharmacistInfo, [name]: value });
  };

  const handleRemovePharmacist = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/addremove/removePharmacist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        console.log('Pharmacist removed', data);
        alert('Pharmacist removed');
        fetchPharmacists(); // Refresh the pharmacist list after removal
      } else {
        console.error('Can not remove pharmacist', data);
        alert('Can not remove pharmacist');
      }
    } catch (error) {
      console.error('Error removing pharmacist', error);
      alert('An error occurred while removing the pharmacist');
    }
  };

  return (
    <div>
      <h2>Pharmacists List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pharmacists.map((pharmacist) => (
            <tr key={pharmacist.username}>
              <td>{pharmacist.name}</td>
              <td>{pharmacist.username}</td>
              <td>{pharmacist.email}</td>
              <td>
                <button onClick={() => handleRemovePharmacist(pharmacist.username)}style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', cursor: 'pointer' }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RemovePharmacist;