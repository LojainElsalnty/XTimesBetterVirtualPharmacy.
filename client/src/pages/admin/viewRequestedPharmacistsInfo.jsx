import React, { useEffect, useState } from 'react';

// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';
import styles from './viewReq.module.css'; // Make sure to import your stylesheet
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function ViewRequestedPharmacistsInfo() {
  const [requestedPharmacists, setRequestedPharmacists] = useState([]);
  //const accessToken = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
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
      else if (filter === 'onhold') {
        return doctor.status === 'onhold';

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
    setCurrentPage(1); // Reset to the first page when the filter changes

  };
  const xTest = checkAuthentication();

  const fetchRequestedPharmacists = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/viewREQPharmacists', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': accessToken
        }
      });
      // Sort by descending order of creation (most recent first)
      const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRequestedPharmacists(sortedData);
      applyFilter(sortedData); // Apply the filter to sorted data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchRequestedPharmacists();
  }, [accessToken, navigate]);

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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPharmacists = filteredPharmacists.slice(indexOfFirstItem, indexOfLastItem);


  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    const totalItems = filteredPharmacists.length;
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    setCurrentPage(currentPage < maxPage ? currentPage + 1 : maxPage);
  };

  return (
    <div>
      <br />
      <h1>Requested Pharmacists List</h1>
      <br />
      <div>
        <label htmlFor="filterSelect">Filter By Status: </label>
        <select id="filterSelect" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="onhold">Onhold</option>

        </select>
        &nbsp;
      </div>

      &nbsp;
      &nbsp;
      {filteredPharmacists.length > 0 ? (

        <table className={styles.pharmacistTable}>
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
            {currentPharmacists.map(pharmacist => (
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
                  <button className={styles.AcceptBtn}
                    onClick={() => acceptPharmacist(pharmacist._id)}
                    disabled={pharmacist.status === 'accepted' || pharmacist.status === 'rejected'}
                  >
                    Accept
                  </button>
                  <br />
                  <br />
                  <button className={styles.RejectBtn}
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
      ) : (
        <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '20px', color: '#89CFF0' }}>
          No Pharmacists Requests found matching the selected criteria.
        </div>)}
      <div style={{ margin: '20px' }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}  // Adds space to the right of the 'Prev' button
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredPharmacists.length}
        >
          <ChevronRightIcon />
        </button>
        &nbsp; Page {currentPage}
      </div>
    </div>

  );

}


export default ViewRequestedPharmacistsInfo;


