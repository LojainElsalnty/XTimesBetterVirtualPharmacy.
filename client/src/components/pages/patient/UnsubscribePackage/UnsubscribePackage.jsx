import React from 'react';

// Axios
import axios from 'axios';

// Styles
import './UnsubscribePackage.css';

// Hooks
import { useState, useEffect } from 'react';

// User Defined Hook
import { useAuth } from '../../../components/hooks/useAuth';

// React Router DOM
import { useNavigate } from 'react-router-dom';

function SubsPackagesList(){
  // const {accessToken} = useAuth();
  //const accessToken = sessionStorage.getItem('accessToken');

  // Define state to store the fetched data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subsPackages, setSubsPackages] = useState([]); // State for family members
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  //Authenticate part
  const accessToken = sessionStorage.getItem('accessToken');
  const [load, setLoad] = useState(true);
  const [username, setUsername] = useState('');
  
  
  useEffect(() => {
      if (username.length != 0) {
          setLoad(false);
      }
  }, [username]);
  async function checkAuthentication() {
      await axios({
          method: 'get',
          url: 'http://localhost:5000/authentication/checkAccessToken',
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
              'User-type': 'patient',
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
//Authenticate part

  useEffect(() => {
    
    //supposed to get it from the session
      axios ({
        method: 'get',
        url: 'http://localhost:5000/patient/Famsubs/Famsubs',
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
            'User-type': 'patient',
        },
      })
      .then((response) => {
        setSubsPackages(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

     
   
  }, []);



  const handleUnSubscribeClick = async (item) => {
   
    try {

        const apiUrl = 'http://localhost:5000/patient/Unsubscribe/un';
        const requestData = {
            patient_username:item.patient_username,
            package_name:item.package_name,
            id:item._id
          };
        //console.log(requestData);
  
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        
       
        if (response.ok) {
          const responseData = await response.json();
           window.location.reload();
          
          // setSubsPackages(responseData.data);
          //console.log('Success:', responseData);
        } 
        

      
      } catch (error) {
        console.error('Error:', error);
      }
  

  };

  

 
//loading 3ady lel data 
  if (loading) {
    return <div>Loading...</div>;
  }

  //Authenticate
  if (load) {
    return (<div>Loading</div>)
}

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div>
      <h3>Subscribed Package Details</h3>
      <table  className="data-table">
        <thead>
          <tr>
            
            <th className="table-header">Patient Name</th>
            <th className="table-header">Package Name</th>
            <th className="table-header">Status</th>
            <th className="table-header">Start Date</th>
            <th className="table-header">End Date</th>
            <th className="table-header">Unsubscribe</th>

           
           
          </tr>
        </thead>
        <tbody>
          {subsPackages.map((item) => (
            <tr key={item.patient_username}>

              <td className="table-cell">{item.patient_name}</td>
              <td className="table-cell">{item.package_name}</td>
              <td className="table-cell">{item.status}</td>
              <td className="table-cell">{formatDate(item.start_date)}</td>
              <td className="table-cell">{formatDate(item.end_date)}</td>

              
              <td className="table-cell">
        {item.status === 'subscribed' ? (
          <button onClick={() => handleUnSubscribeClick(item)}>Unsubscribe</button>
        ) : null}
      </td>
             
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
    </div>
  );
//}
}
export default SubsPackagesList;

function formatDate(dateString) {
    // Check if the input date string is valid
    if (!dateString) {
      return ''; // Return an empty string for invalid or missing dates
    }
  
    // Create a Date object from the date string
    const date = new Date(dateString);
  
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }



   
    