import React, { useEffect, useState } from 'react';


function viewRequestedPharmacistsInfo() {

  const [requestedPharmacists, setRequestedPharmacists] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/admin/viewREQPharmacists`
    // Make an HTTP PATCH request to send the data to the backend using the requestBody
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }

    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);

      }
      return response.json();
    }).then((data) => {


      if (data.length > 0) {
        console.log('Requested Pharmacist:', data);
        setRequestedPharmacists(data);

      } else {
        console.error('Can not view requested pharmacists:', data);
        alert('Cannot view requested pharmacists')


      }
    })
      .catch((error) => {
        console.error('Error viewing pharmacists information : ', error);
        console.log('This Requested pharmacists does not exist');
        alert('This Requested pharmacist does not exist')
      });
  }, []);
  return (
    <div>
      <h1>Requested Pharmacists List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Hourly Rate</th>
            <th>Affiliation</th>
            <th>Educational Background</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requestedPharmacists.map((pharmacist) => (
            <tr key={pharmacist._id}>
              <td>{pharmacist.name}</td>
              <td>{pharmacist.username}</td>
              <td>{pharmacist.email}</td>
              <td>{pharmacist.password}</td>
              <td>{pharmacist.dob}</td>
              <td>{pharmacist.hourly_rate}</td>
              <td>{pharmacist.affiliation}</td>
              <td>{pharmacist.educational_background}</td>
              <td>{pharmacist.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default viewRequestedPharmacistsInfo;