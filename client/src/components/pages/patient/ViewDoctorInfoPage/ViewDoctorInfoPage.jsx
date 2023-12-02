import React, { useEffect, useState } from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './viewDoctorInfoPage.module.css';

// Components
import doctorInfo from '../../../components/doctorInfo/doctorInfo';

// MUI Joy Components
import { Button, Typography } from '@mui/joy';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Hooks
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from '../../../components/hooks/hook1';

const ViewDoctorInfo = () => {
    const location = useLocation();
    console.log("Location :" + location)
    const doctor = location.state;
    console.log("Doctor :", doctor)
    const navigate = useNavigate();

    const selectedDoctorUsername = location.state.doctorInfo.username;
    const selectedDoctorName = location.state.doctorInfo.name;

    const [appointments, setAppointments] = useState([]);
    const [bookAppointment, setbookAppointment] = useState("")
    //const [doctorInfo , setDoctorInfo] = useState("")
    // const currentPatient = "ahmed";
    //const [username, setUsername] = useState("");
    const hourly_rate = doctor.hourly_rate;

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

    async function checkAuthentication() {
        await axios ({
            method: 'get',
            url: `http://localhost:5000/authentication/checkAccessToken`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
        .then((response) => {
            console.log(response);
            setUsername(response.data.username);
        })
        .catch((error) => {
          navigate('/login');
        });
    }

    checkAuthentication();

    useEffect(() => {
      if ( username !== "" && bookAppointment !== "" ) {
          const stateInfo = {
          doctorUsername: selectedDoctorUsername ,
          doctorName : selectedDoctorName,
          currentPatient : username ,
          bookAppointment : bookAppointment,
          hourly_rate : hourly_rate
        }
          navigate('/patient/BookAppointment', { state: stateInfo });
      }
    },[bookAppointment]);

    const getAvailableAppointments = async () => {
        const response = await fetch(`http://localhost:5000/patient/doctorList/DoctorAppointments?doctor_username=${selectedDoctorUsername}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            const formattedAppointments = data.map(appointment => {
              const dateTime = new Date(appointment); // Assuming appointment is a valid DateTime string
              const dateTimeCombined = dateTime.toLocaleDateString();
              const date = dateTime.toLocaleDateString('en-GB', { 
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

            const timeSlotBegin = dateTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }); // Format the time as needed

              const weekday = dateTime.toLocaleDateString('en-GB', {
                weekday: 'long',
            });

            const timeSlotEnd = new Date(dateTime.getTime() + (60 * 60 * 1000));
            const timeSlotEndFormatted = timeSlotEnd.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    });

            // Combine current and next hour time
            const combinedTime = `${timeSlotBegin} - ${timeSlotEndFormatted}`;

              return {
                  date,
                  combinedTime,
                  weekday, 
                  timeSlotBegin,
                  appointment
              };
          });
            setAppointments(formattedAppointments);

        } else {
            throw new Error('Error getting Doctor Appointments');
        }
    };

    useEffect(() => {
      getAvailableAppointments();
    }, []);

    console.log("Appointments : ", appointments)

    function handleBookingAppointments(appointment){
      setbookAppointment(appointment);
      console.log("book" , appointment)
      // setDoctorInfo(location.state);
      // console.log("doc info" , doctorInfo)
    }

    //Authenticate
    if (load) {
      return (<div>Loading</div>)
    }

    return (
      <div className={styles['patient-info-main-div']}>
        <div className={styles['patient-info-top-div']}>
          <div className={styles['patient-info-right-div']}>
            <div className={styles['patient-information-div']}>
              <Typography level="h1" component="h1">Dr. {doctor.doctorInfo.name}</Typography>
              <br />
              <div className={styles['patient-info-main-div']}>
                <div className={styles['doctor-info']}>
                  <Typography level="title-sm">Speciality: {doctor.doctorInfo.speciality}</Typography>
                  <br />
                  <Typography level="title-sm">Affiliation: {doctor.doctorInfo.affiliation}</Typography>
                  <br />
                  <Typography level="title-sm">Educational Background: {doctor.doctorInfo.educational_background}</Typography>
                  <br />
                  <Typography level="title-sm">Hourly Rate: {doctor.hourly_rate.toFixed(2)}</Typography>
                </div>
              </div>
            </div>
            <div className={styles['patient-settings-div']}>
              <Button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <h2>Available Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.weekday}</td>
                <td>{appointment.date}</td>
                <td>{appointment.combinedTime}</td>
                <td> 
                    <button onClick={()=> handleBookingAppointments(appointment)}>
                          Book Appointment
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    
}

export default ViewDoctorInfo