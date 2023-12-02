import React, { useEffect } from 'react';

import axios from 'axios';
import './ViewAllDrs.css';


// Components
import { useNavigate } from 'react-router-dom';

// Hooks
import { useFetch } from '../../../components/hooks/useFetch';
import { useState } from 'react';

function ViewAllDrs(){


//function App() {
  // Define state to store the fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from an API or source
    fetch('http://localhost:5000/patient/allDoctors?patient_username=NayeraMahran')
      .then((response) => response.json())
      .then((data) => {
        setData(data.doctorsresult);
        console.log(data.doctorsresult);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  // useEffect(() => {
  //   // Make a GET request to your API endpoint
  //   axios.get('http://localhost:5000/patient/allDoctors?patient_username=NayeraMahran') // Replace with your API endpoint
  //     .then((response) => {
  //       // Set the fetched data to the sta
  //       console.log(response);
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <div>
      <h3>Doctors Info</h3>
      <table  className="data-table">
        <thead>
          <tr>
            
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">hourly_rate</th>
            <th className="table-header">speciality</th>

            {/* Add more table headers as needed */}

           
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>

              <td className="table-cell">{item.name}</td>
              <td className="table-cell">{item.email}</td>
              <td className="table-cell">{item.hourly_rate}</td>
              <td className="table-cell">{item.speciality}</td>
              {/* Add more table cells for additional data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
//}
}
export default ViewAllDrs;



   
    