import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ViewDoctorListPage.module.css';

//components
import DoctorList from '../../../components/doctorList/doctorList'
import DoctorInfo from '../../../components/doctorInfo/doctorInfo'
import DoctorSearchBar from '../../../components/doctorSearchBar/doctorSearchBar';


import { useNavigate } from 'react-router-dom';

// Hooks
import { useFetch } from '../../../components/hooks/hook1';


const ViewDoctorList = () => {

    // Get All doctors.
    const [doctors, setDoctors] = useState([])
    // To store the clicked doctor
    const [doctorInfo , setDoctorInfo] = useState("")

    // For Search :
    const [doctorName, setDoctorName ] = useState('')
    const [doctorSpecialitySearch, setDoctorSpecialitySearch] = useState('')

    // For filtering :
    const [doctorSpecialityFilter, setDoctorSpecialityFilter] = useState([])
    const [selectedSpeciality , setSelectedSpeciality ] = useState('')
    
    // For Display :
    const [doctorsToBeDisplayed, setDoctorsToBeDisplayed] = useState([]);
    const [selectedDate, setSelectedDate] = useState('')

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hourlyRate, setHourlyRate] = useState("");

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

    /*
    useEffect(() => {
        if (doctorInfo !== "") {
            const stateInfo = {
                doctorInfo : doctorInfo,
            }
            navigate('/patient/ViewDoctorInfoPage', { state: stateInfo });
        }
    },[doctorInfo]);
    */
    

    useEffect(() => {
        const fetchAllDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/patient/doctorList', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("response : " , response)
                console.log("response data : ", response.data)
                if (response && response.data) {
                    //console.log("hi1");
                    setDoctors(response.data);
                    //console.log(doctors);
                    setDoctorsToBeDisplayed(response.data) //so that initially all doctors are displayed
                    //console.log("hi3");
  
                    //get unique doctor specialities to populate the filter ddl
                    const uniqueDoctorSpecialities = [...new Set(response.data.map(item => item.speciality))];
                    console.log("hi4");
                    console.log(uniqueDoctorSpecialities);
                
                    setDoctorSpecialityFilter(uniqueDoctorSpecialities);
                    console.log(uniqueDoctorSpecialities);

                }
            } catch (error) {
                throw new Error('Invalid response data');
            }
        };

        fetchAllDoctors();
    }, []);

    /*
    useEffect(() => {
        // Fetch data from an API or source
        fetch('http://localhost:5000/patient/doctorList/allDoctors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
        })
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
    */

     //search function
     // Searching 
    const handleSearchByName = (name) => {
        setDoctorName(name);
        const searchResult = doctors.filter((doctor) => doctor.name.toLowerCase().startsWith(name.toLowerCase()))
        setDoctorsToBeDisplayed(searchResult)
        setDoctorName("")
    }

    const handleSearchBySpeciality = (speciality) => {
        setDoctorSpecialitySearch(speciality);
        const searchResult = doctors.filter((doctor) => doctor.speciality.toLowerCase().startsWith(speciality.toLowerCase()))
        setDoctorsToBeDisplayed(searchResult)
    }

    const handleSearchByNameandSpeciality = (name,speciality) => {
        setDoctorName(name);
        setDoctorSpecialitySearch(speciality);
        const searchResult = doctors.filter((doctor) => (doctor.speciality.toLowerCase().startsWith(speciality.toLowerCase()) &&  (doctor.name.toLowerCase().startsWith(name.toLowerCase()))))
        setDoctorsToBeDisplayed(searchResult)
        setDoctorName("")
      
    }
    

    const handleClearSearch = () => {
        setDoctorsToBeDisplayed(doctors)
        setSelectedSpeciality();
        
    }

    
    const handleFilterBySpeciality = (event) => {
        setSelectedSpeciality(event.target.value)
    
        if (event.target.value === "") {
            setDoctorsToBeDisplayed(doctors);
        }
        else {
            const filterResult = doctors.filter((doctor) => doctor.speciality.toLowerCase().startsWith(event.target.value.toLowerCase()));
            setDoctorsToBeDisplayed(filterResult);
            if (!(document.getElementById("datePicked").value == "")){
                console.log(document.getElementById("datePicked").value)
                const resultFinal = filterResult.filter((doctor)=> doctor.availableTimeSlots.includes(document.getElementById("datePicked").value) )
                setDoctorsToBeDisplayed(resultFinal)
                console.log(resultFinal)
            } 
        }

        

    }

    function handleRowClick(doctor_username) {
        console.log("You clicked on a row")
        let doctor = null;
        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].username === doctor_username) {
                doctor = doctors[i];
                break;
            }
        }
        console.log(doctor)
        
        if (doctor !== null || doctor.value != 0) {
            setDoctorInfo(doctor);
        }

        if (doctor) {
            const stateInfo = {
                doctorInfo: doctor,
                hourly_rate: doctor.hourly_rate, // Include the hourly rate in the state object
            };
            setDoctorInfo(stateInfo);
            navigate('/patient/ViewDoctorInfoPage', { state: stateInfo });
        }
              
        
    }

    function handleDatePickerClick(event) {
        if (event.target && event.target.value){
           const selectedValue = event.target.value

        //console.log(event.target)
        console.log("Selected Date : " , selectedValue)

        const list = []

            for (let i = 0; i < doctors.length; i++) {
                for (let j = 0; j < doctors[i].availableTimeSlots.length; j++) {
                    let availableTimes = new Date(doctors[i].availableTimeSlots[j]);
                    const availableDate = availableTimes.toISOString().slice(0, 16)
                    

                    if (availableDate === selectedValue) {
                        list.push(doctors[i]);
                        break;
                    }
                        
                }
            }
            setDoctorsToBeDisplayed(list)

            if (!(document.getElementById("DDLSpeciality").value == "")){
                const resultFinal = list.filter((doctor)=> doctor.speciality == document.getElementById("DDLSpeciality").value )
                setDoctorsToBeDisplayed(resultFinal)
                console.log(resultFinal)
            }

    }

    }

    //Authenticate
    if (load) {
        return (<div>Loading</div>)
    }

    return (
        <>
            <h1 className={styles["list-title"]}>Doctors List</h1>
            <DoctorSearchBar onSearch={handleSearchByName} onSearch2={handleSearchBySpeciality} onSearch3={handleSearchByNameandSpeciality} onClear={handleClearSearch} handleDatePickerClick={handleDatePickerClick}  />
            
            <div className={styles["ddl-container"]}>
                <label className={styles["ddl-label"]}>Select Doctor Speciality:</label>
                <select className={styles["ddl-select"]} id = "DDLSpeciality" value={selectedSpeciality} onChange={handleFilterBySpeciality}>
                    <option value="">No filter</option>
                    {
                        doctorSpecialityFilter && doctorSpecialityFilter.map((speciality, index) => (
                            <option key={index} value={speciality}>
                                {speciality}
                            </option>
                        ))
                    }
                </select>
            </div>
                
            
            <br></br>
            <div>
                <label className={styles["ddl-label"]}>Availability :</label>
                <input id = "datePicked" className={styles["ddl-select"]}
                    type = "datetime-local"
                    name = "availability"
                    value = {selectedDate}
                    onChange = { (e) => {
                        setSelectedDate(e.target.value);
                        handleDatePickerClick(e)
                    }
                    }
                    required
                />
            </div>

            < div className={styles["result-container"]}>
                <table>
                    <thead>
                        <tr >
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Hourly Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                    {doctors &&
                            doctors.map((doctor) => (
                            <tr key={doctor._id} onClick={() => handleRowClick(doctor.username)}>
                                <td>{doctor.name}</td>
                                <td>{doctor.speciality}</td>
                                <td>{doctor.hourly_rate}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div >
        </>
    );
}


export default ViewDoctorList;