import React, { useState, useEffect } from 'react';
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

const viewMedicalHistory = () => {
    const [medicalHistoryRec, setMedicalHistoryRec] = useState([]);
    const [medicalHistoryUpload, setMedicalHistoryUpload] = useState(null);

    const navigate = useNavigate();

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

    const baseURL='http://localhost:5000/uploads/';
    let medicalHistoryURL = null;

    /*const fetchMedicalHistory = () => {
        const url = 'http://localhost:5000/patient/viewMedicalHistory';
      
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.medicalHistoryRecords);
            // Ensure that data is an object with medicalHistoryRecords property
            setMedicalHistoryRec(data.medicalHistoryRecords);
            if (data && Array.isArray(data.medicalHistoryRecords)) {
              setMedicalHistoryRec(data.medicalHistoryRecords);
            } 
            else {
             // console.error('Cannot view MedicalHistory:', data);
             return;
            }
          })
          .catch((error) => {
            console.error('Error viewing MedicalHistory:', error);
          });
      };*/
      const fetchMedicalHistory = () => {
        const url = 'http://localhost:5000/patient/viewMedicalHistory';
    
        fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': accessToken,
                },
            })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        // No medical history found, set an empty array
                        setMedicalHistoryRec([]);
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data && Array.isArray(data.medicalHistoryRecords)) {
                    setMedicalHistoryRec(data.medicalHistoryRecords);
                }
            })
            .catch((error) => {
                // Catching the error here prevents it from being logged to the console
                if (error.message !== 'No medical history found') {
                    console.error('Error viewing MedicalHistory:', error);
                }
            });
    };
    
    
      const handleFileInputChange = (e) => {
        const { files } = e.target;
        setMedicalHistoryUpload(files[0]);
      };
// Function to handle uploading a file
const uploadFile = async (e) => {
    e.preventDefault();
    console.log(medicalHistoryUpload);
    if(!medicalHistoryUpload){
        return alert('Please choose file');

    }
    const formData = new FormData();
    formData.append('medicalHistoryUpload', medicalHistoryUpload);

    const url = 'http://localhost:5000/patient/viewMedicalHistory';

    try {
        const response = await fetch(url,  {
            method: 'POST',
            headers: {
              'Authorization': accessToken,
            },
            body: formData
        });
        if (response.ok) {
            // Registration was successful, handle success scenario
            console.log('upload successful!');
            alert('upload successful!');
            //e.target.value= null;
            setMedicalHistoryUpload(null);
            //fetchMedicalHistory();
            window.location.reload();
            

        }else {
              throw new Error(`HTTP error! Status: ${response.status}`);
        }
            //return response.json();

    } catch (error) {
        console.error('Error uploading MedicalHistory:', error);
        alert('An error occurred:', error);
    }
 
}

// Function to handle deleting a file
const deleteFile = (medicalHistoryPath) => {
    //console.log(medicalHistoryPath);
    const confirmed = window.confirm('Are you sure you want to delete this medicalHistory file?');
    if (!confirmed) {
      return;
    }
    const url = `http://localhost:5000/patient/viewMedicalHistory/delete/${medicalHistoryPath}`;

    fetch(url, {
       method: 'GET',
       headers: {
        'Authorization': accessToken,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Fetch the updated Patient data again to reflect the changes
        alert(' Medical History File removed successfully');
        fetchMedicalHistory()
        //window.location.reload();
      })
      .catch((error) => {
        console.error('Error removing file:', error);
        alert('Error removing file ');
      });
  };

  useEffect(() => {
    fetchMedicalHistory();
  }, []);
    if (load) {
        return (<div>Loading</div>)
    }
    return(
        <div>
      <h1>Medical History</h1>
      <div>
          <label>Upload File</label>
          <input 
            type="file" 
            name="medicalHistoryUpload"
            accept=".pdf, .jpg, .jpeg, .png" 
            onChange={handleFileInputChange}
            required
          />
        
        <button onClick={(e) => uploadFile(e)}>
        Upload
        </button>
        </div>
      <table>
        <thead>
          <tr>
            <th>View File</th>
            <th>Delete</th>
          </tr>
        </thead>  
        <tbody>

        {medicalHistoryRec.length > 0 ? (
    medicalHistoryRec.map((record, index) => (
    <tr key={index}>
        <td><a href={baseURL + record} target="_blank" rel="noopener noreferrer">View Medical History </a></td>
            <td>
            <br />
             <button
                onClick={() => deleteFile(record)}
                  >
                Delete
             </button>
        </td>
     </tr>
     
    ))
    ) : (
      <tr>
        <td colSpan="2">No History to show </td>
      </tr>
    )}
        </tbody>
      </table>
    </div>
    );
    
}
export default viewMedicalHistory;