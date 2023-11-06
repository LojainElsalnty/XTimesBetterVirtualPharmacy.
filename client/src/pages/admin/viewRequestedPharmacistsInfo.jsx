import React, { useEffect, useState } from 'react';
// import { acceptPharmacist,rejectPharmacist } from '../../../../server/controllers/admin/viewReqPharmacistsInfo';


function viewRequestedPharmacistsInfo() {

  const [requestedPharmacists, setRequestedPharmacists] = useState([]);
  const fetchRequestedPharmacists = () => {
    const url = 'http://localhost:5000/admin/viewREQPharmacists';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setRequestedPharmacists(data);

        } else {
          console.error('Cannot view requested Pharmacists:', data);
        }
      })
      .catch((error) => {
        console.error('Error viewing pharmacist information:', error);
      });
  };

  const acceptPharmacist = (pharmacistId) => {
    const url = `http://localhost:5000/admin/viewREQPharmacists/accept/${pharmacistId}`;

    fetch(url, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated doctor data again to reflect the changes
       fetchRequestedPharmacists();
        alert('Pharmacist request is accepted successfully');

      })
      .catch((error) => {
        console.error('Error accepting pharmacist:', error);
        alert('Error accepting pharmacist');

      });
  };

  // Function to handle rejecting a doctor
  const rejectPharmacist = (pharmacistId) => {
    const url = `http://localhost:5000/admin/viewREQPharmacists/reject/${pharmacistId}`;
  
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated doctor data again to reflect the changes
       fetchRequestedPharmacists();
        alert('Pharmacist request is rejected successfully');

      })
      .catch((error) => {
        console.error('Error rejecting pharmacist:', error);
        alert('Error rejecting pharmacist');

      });
  };
  

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
              <td>
      <button onClick={() => acceptPharmacist(pharmacist._id)}>Accept</button>
      <br       />
      <button onClick={() => rejectPharmacist(pharmacist._id)}>Reject</button>
    </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default viewRequestedPharmacistsInfo;