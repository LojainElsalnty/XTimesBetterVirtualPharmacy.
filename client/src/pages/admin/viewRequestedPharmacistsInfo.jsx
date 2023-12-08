import React, { useEffect, useState } from 'react';

// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';


function ViewRequestedPharmacistsInfo() {
  const [requestedPharmacists, setRequestedPharmacists] = useState([]);
  //const accessToken = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [filteredPharmacists, setfilteredPharmacists] = useState([]);
  const [filter, setFilter] = useState('all');
  //new part
  const accessToken = sessionStorage.getItem('accessToken');
  const [load, setLoad] = useState(true);
  const [username, setUsername] = useState('');
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
  const applyFilter = () => {
    const filtered = requestedPharmacists.filter(doctor => {
      if (filter === 'accepted') {
        return doctor.status === 'accepted';
      } else if (filter === 'rejected') {
        return doctor.status === 'rejected';
      }
      return true; // No filter or 'all' filter selected
    });
    setfilteredPharmacists(filtered);
  };
  
  useEffect(() => {
    applyFilter();
  }, [requestedPharmacists, filter]); // Reapply filter when doctors list or filter changes
  
const handleFilterChange = (event) => {
  setFilter(event.target.value);
};
  const xTest = checkAuthentication();

  const fetchRequestedPharmacists = () => {
    const url = 'http://localhost:8000/admin/viewREQPharmacists';

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
    const confirmed = window.confirm('Are you sure you want to accept this pharmacist request?');
    if (!confirmed) {
      return;
    }
    const url = `http://localhost:8000/admin/viewREQPharmacists/accept/${pharmacistId}`;

    fetch(url, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated pharmacist data again to reflect the changes
        fetchRequestedPharmacists();
        alert('Pharmacist request is accepted successfully');
      })
      .catch((error) => {
        console.error('Error accepting pharmacist:', error);
        alert('Error accepting pharmacist');
      });
  };
  const showConfirmAcceptDialog = () => {
    setConfirmAcceptDialog(true);
  };

  // Function to hide the confirmation dialog
  const hideConfirmAcceptDialog = () => {
    setConfirmAcceptDialog(false);
  };
  // Function to handle rejecting a doctor
  const rejectPharmacist = (pharmacistId) => {
    const confirmed = window.confirm('Are you sure you want to reject this pharmacist request?');
    if (!confirmed) {
      return;
    }
    const url = `http://localhost:8000/admin/viewREQPharmacists/reject/${pharmacistId}`;

    fetch(url, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated pharmacist data again to reflect the changes
        fetchRequestedPharmacists();
        alert('Pharmacist request is rejected successfully');
      })
      .catch((error) => {
        console.error('Error rejecting pharmacist:', error);
        alert('Error rejecting pharmacist');
      });
  };


  useEffect(() => {
    const url = `http://localhost:8000/admin/viewREQPharmacists`
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

  if (load) {
    return (<div>Loading</div>)
  }

  return (
    <div>
      <h1>Requested Pharmacists List</h1>
      <div>
  <label htmlFor="filterSelect">Filter By Status: </label>
  <select id="filterSelect" value={filter} onChange={handleFilterChange}>
    <option value="all">All</option>
    <option value="accepted">Accepted</option>
    <option value="rejected">Rejected</option>
  </select>
  &nbsp;
</div>
&nbsp;
&nbsp;
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Hourly Rate</th>
            <th>Affiliation</th>
            <th>Educational Background</th>
            <th>National ID</th>
            <th>Working License</th>
            <th>Pharmacy Degree</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPharmacists.map((pharmacist) => (
            <tr key={pharmacist._id}>
              <td>{pharmacist.name}</td>
              <td>{pharmacist.username}</td>
              <td>{pharmacist.email}</td>
              <td>{pharmacist.dob}</td>
              <td>{pharmacist.hourly_rate}</td>
              <td>{pharmacist.affiliation}</td>
              <td>{pharmacist.educational_background}</td>
              <td><a href={`http://localhost:8000/uploads/${pharmacist.nationalID.name}`} target="_blank" rel="noopener noreferrer">View National ID </a></td>
              <td><a href={`http://localhost:8000/uploads/${pharmacist.workingLicense.name}`} target="_blank" rel="noopener noreferrer">View Working License </a></td>
              <td><a href={`http://localhost:8000/uploads/${pharmacist.pharmacyDegree.name}`} target="_blank" rel="noopener noreferrer">View Pharmacy Degree </a></td>

              <td>{pharmacist.status}</td>
              <td>
                {/* <button onClick={() => acceptPharmacist(pharmacist._id)} disabled={pharmacist.status === 'accepted'}>
                Accept
                </button>              
                <br />
                <br />
                {pharmacist.status !== 'accepted' && (
                 <button onClick={() => rejectPharmacist(pharmacist._id)}>Reject</button> */}
                <button
                  onClick={() => acceptPharmacist(pharmacist._id)}
                  disabled={pharmacist.status === 'accepted' || pharmacist.status === 'rejected'}
                >
                  Accept
                </button>
                <br />
                <button
                  onClick={() => rejectPharmacist(pharmacist._id)}
                  disabled={pharmacist.status === 'accepted' || pharmacist.status === 'rejected'}
                >
                  Reject
                </button>

              </td>
            </tr>
          ))}
          

        </tbody>
      </table>
    </div>
  );

}


export default ViewRequestedPharmacistsInfo;