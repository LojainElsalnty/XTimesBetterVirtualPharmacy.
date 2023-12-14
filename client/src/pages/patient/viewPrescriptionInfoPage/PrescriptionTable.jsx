import React, { useState, useEffect,useRef} from 'react';
import axios from 'axios';
import styles from './medicinalUsesDDL.module.css';
//import PrescriptionDetail from '../../../components/prescriptionFileDetails/prescriptionDetail';
import { useAuth } from '../../../components/hooks/useAuth';
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom';

const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionsToBeDisplay, setPrescriptionsToBeDisplay] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState([]);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);

  const detailsRef = useRef(null); // Create a ref
  const [filter, setFilter] = useState('all'); // Initialize with 'all' as no filter
  const [filterValue, setFilterValue] = useState(''); // Input value for doctor_username or visit_date
  const [showModal, setShowModal] = useState(false);

 //Authenticate part
 const accessToken = sessionStorage.getItem('accessToken');
 const [load, setLoad] = useState(true);
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const navigate = useNavigate();

 useEffect(() => {
  if (showModal && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [showModal]); // Dependency array includes showModal

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
             'User-type': 'patient',
         },
     })
         .then((response) => {
             console.log(response);
             setUsername(response.data.username);
             setPassword(response.data.password);
             //setLoad(false);
         })
         .catch((error) => {
             //setLoad(false);
             navigate('/login');

         });
 }
 const generatePDF = (prescription) => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: [310, 270]
  });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(19);
  doc.text('Prescription Details', pageWidth / 2, 20, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.text(`Prescription From Dr.${prescription.doctor_username}`, pageWidth / 2, 30, { align: 'center' });

  // Body
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');

  const bodyStartY = 40;
  // doc.text(`Doctor: ${prescription.doctor_username}`, 20, bodyStartY+10);
  doc.text(`Visit Date: ${prescription.visit_date}`, 20, bodyStartY + 10);
  doc.text(`Filled: ${prescription.filled ? 'Yes' : 'No'}`, 20, bodyStartY + 20);

  // Medicines Section
  doc.setFont(undefined, 'bold');
  doc.text('Medicines:', 20, bodyStartY + 30);
  doc.setFont(undefined, 'normal');

  prescription.medicines.forEach((medicine, index) => {
    const y = bodyStartY + 40 + (10 * index);
    doc.text(`- ${medicine.name}`, 30, y);
    doc.text(`Dosage: ${medicine.dosage}`, 80, y);
    doc.text(`Price: ${medicine.price}`, 230, y);
  });

  // Save the PDF
  doc.save(`prescription_${prescription.patient_username}.pdf`);
};


 const xTest = checkAuthentication();
//Authenticate part

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/patient/prescriptionDetails', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
        });

        if (response && response.data) {
          // console.log(response.data);
          // console.log(response.data[0].medicines);
          // console.log(response.data);
          // console.log(response.data.patient_username);
          setPrescriptions(response.data);
          setPrescriptionsToBeDisplay(response.data);
          // setSelectedPrescription(response.data.medicines);
         

        }
      } catch (error) {
        console.error('Error fetching prescription data:', error);
      }
    };

    fetchPrescriptionData();
  }, []); // Empty dependency array ensures the effect runs once on component mount

 const handleFilterClick = () => {
    // Apply the filter logic based on user input
    const filteredPrescriptions = prescriptions.filter((prescription) => {
      if (filter === 'filled') {
        return prescription.filled === true;
      } else if (filter === 'unfilled') {
        return prescription.filled === false;
      } else if (filter === 'doctor_username') {
        if (filterValue) {
          return prescription.doctor_username.toLowerCase().includes(filterValue.toLowerCase());
        }
      } else if (filter === 'visit_date') {
        if (filterValue) {
          return prescription.visit_date === filterValue;
        }
      }
      return true; // No filter
    });
    setPrescriptionsToBeDisplay(filteredPrescriptions);
    setFilterValue(''); // Clear the filter value after applying the filter
};
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSelectPrescription = (selectedPrescription) => {
    setSelectedPrescription(selectedPrescription);
    setSelectedPrescriptionId(selectedPrescription._id); // Set the selected ID
    setShowModal(true);
    // Scroll to the details section
    if (detailsRef && detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
};
const closePrescriptionModal = () => {
  setSelectedPrescription([]);
  setSelectedPrescriptionId(null); // Reset the selected ID
  setShowModal(false);
};

  

  const handleBuyClick = (prescriptionId) => {
    // const accessToken = sessionStorage.getItem('accessToken');
const accessToken = sessionStorage.getItem('accessToken'); // Retrieve the access token
// const pharmacyUrl = 'http://localhost:5174/patient/myPCart'; // Replace with the actual URL of the pharmacy app
// const redirectUrl = `${pharmacyUrl}?accessToken=${accessToken}`;
// window.location.href = redirectUrl; // Redirect to the pharmacy app with the access token

    window.location.href = `http://localhost:5174/patient/myPCart/${prescriptionId}?accessToken=${accessToken}`;
};

const isFilterEmpty = prescriptionsToBeDisplay.length === 0;

if (load) {
  return (<div>Loading</div>)
}

  return (
    <div className={styles.container}>
                  <br />
      <h1 className={styles.listTitle}>Prescription List</h1>
      <div className={styles.resultContainer}>
        <div className={styles.filterContainer}>
          <label htmlFor="filterSelect">Filter By: </label>
          <select id="filterSelect" value={filter} onChange={handleFilterChange}>
            <option value="all">No Filter</option>
            <option value="filled">Filled</option>
            <option value="unfilled">Unfilled</option>
            <option value="doctor_username">Doctor Username</option>
            <option value="visit_date">Visit Date</option>
          </select>
          &nbsp;&nbsp;
          {['doctor_username', 'visit_date'].includes(filter) && (
            <input
              type="text"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={`Enter ${filter === 'doctor_username' ? 'Doctor Username' : 'Visit Date'}`}
            />
          )}
          &nbsp;
          &nbsp;&nbsp;
          <button onClick={handleFilterClick}>Filter</button>
        </div> 
        <br />
        {isFilterEmpty ? (
          <p className={styles.noDataMessage}>No prescriptions found.</p>
        ) : (
<table className={styles.pharmacistTable}>
           <thead>
            <tr>
              {/* <th>Patient Username</th> */}
              <th className={styles.lightBlueText}>Doctor Username</th>

{/* <th>Doctor Username</th> */}
<th className={styles.lightBlueText}>Visit Date</th>
<th className={styles.lightBlueText}>Filled</th>
              {/* <th>Select</th> selecting a prescription */}
              {/* <th>Download As PDF</th> downloading prescription as pdf */}
              {/* <th>Buy</th> */}
            </tr>
          </thead>
          <tbody>
        {prescriptionsToBeDisplay.map((prescription) => (
          <tr key={prescription._id}>
            {/* <td>{prescription.patient_username}</td> */}
            <td>{prescription.doctor_username}</td>
            <td>{prescription.visit_date}</td>
            <td>{prescription.filled ? 'Filled' : 'Unfilled'}</td>
            <td>

            <button 
              className={styles.lightBlueButton}
 
            onClick={() => handleSelectPrescription(prescription)}>
                {selectedPrescriptionId === prescription._id ? 'Selected' : 'Select'}
            </button>
              </td>
            <td>
              <button 
                className={styles.lightBlueButton}
                onClick={() => generatePDF(prescription)}>Download</button>
            </td>
            <td>
            <button 
            className={styles.lightBlueButton}

            onClick={() => handleBuyClick(prescription._id)}>Buy</button>

                </td>
          </tr>
        ))}
      </tbody>
    </table>
           )}

  </div>
  {showModal && selectedPrescription && (
     <div className={styles.modal} ref={detailsRef}>
    <div className={styles.modalContent}>
      {/* <span className={styles.closeButton} onClick={closePrescriptionModal}>
        &times;
      </span> */}
      <br />

      <button 
      className={styles.closeButton} onClick={closePrescriptionModal}>
        Close
      </button>
      <div className={styles.additionalInfo}>
        <p>Selected Successfully</p>
      </div>
      <h2>Prescription Details</h2>
      <table className={styles.pharmacistTable}>
      <thead>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Price</th>
          </tr> 
        </thead>
        <tbody>
          {selectedPrescription.medicines.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.name}</td>
              <td>{medicine.dosage}</td>
              <td>{medicine.price}</td>
            </tr>
          ))}
                <br />
                <br />
                <br />

        </tbody>
      </table>
    </div>
    </div>
  )}
</div>
);
}
export default PrescriptionTable;