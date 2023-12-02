import React, { useState, useEffect } from 'react';
import styles from './scheduleFollowUpPage.module.css'
// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

const ScheduleFollowUp = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [followUpDateTime, setFollowUpDateTime] = useState('');
    const [showFollowUpSection, setShowFollowUpSection] = useState(false);
    //const [username, setUsername] = useState(""); 

    const [showTable, setShowTable] = useState(false);
    const [scheduledFollowUps, setScheduled] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);

    // const currentUser = "iaitchison1";
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
                'User-type': 'doctor',
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

    const getPastAppointments = async () => {
        const response = await fetch(`http://localhost:5000/doctor/appointments/pastAppointments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setAppointments(data);
        } else {
            throw new Error('Error filtering appointments by status');
        }
    };

    const createFollowUp = async (patientUsername, appointmentTime, followUpTime) => {
        const followUpData = {
            doctor_username: username,
            patient_username: patientUsername,
            appointmentDateTime: appointmentTime,
            followUpDateTime: followUpTime,
        };
    
        try {
            const response = await fetch('http://localhost:5000/doctor/appointments/scheduleFollowUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(followUpData),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Follow-up created:', result);
                return { success: true };
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                console.log("error", errorData)
                if (errorData.message === 'Duplicate follow-up appointment found') {
                    return { success: false, message: 'You already sent a follow-up request with the same date and time' };
                } else if (errorData.message === "Appointment date and time are in the past") {
                    return { success: false, message: 'Follow-up date is in the past' };
                } else {
                    return { success: false, message: 'Unknown error' };
                }
            }
        } catch (error) {
            console.error('Network error:', error.message);
            return { success: false, message: 'Network error' };
        }
    };

    // function to get past appointments
    const getScheduledFollowUp = async (currentUser) => {
        const response = await fetch(`http://localhost:5000/patient/appointment/FollowUpRequested`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setAppointments(data);
        } else {
            throw new Error('Error filtering appointments by status');
        }
    };
    
    

    useEffect(() => {
        getPastAppointments();
    }, []);

    const handleScheduleFollowUp = (patientUsername, appointmentTime) => {
        setSelectedAppointment({ patientUsername, appointmentTime });
        setShowFollowUpSection(true);
    };

    const handleFollowUpDateTimeChange = (e) => {
        setFollowUpDateTime(e.target.value);
    };

    const handleCreateFollowUp = async () => {
        const { patientUsername, appointmentTime } = selectedAppointment;
        const result = await createFollowUp(patientUsername, appointmentTime, followUpDateTime);
        setSelectedAppointment(null);
        setShowFollowUpSection(false);
    
        if (result.success) {
            window.alert("Appointment Successfully added");
        } else {
            if (result.message === 'You already sent a follow-up request with the same date and time') {
                window.alert(result.message);
            } else if (result.message === 'Follow-up date is in the past') {
                window.alert(result.message);
            }
        }
    
        setFollowUpDateTime('');
    };
    
    const getScheduledAppointments = async (currentUser) => {
        const response = await fetch(`http://localhost:5000/doctor/appointments/FollowUpRequested`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setScheduled(data);
            //console.log("data data", data)
        } else {
            throw new Error('Error filtering appointments by status');
        }
    };
    const handleShowFollowUpBtn = async (event) => {
        const currentUser = username
        console.log(username)
        await getScheduledAppointments(username);
        setShowAppointments(true);
    };

    //Authenticate
    if (load) {
        return (<div>Loading</div>)
    }    

    // Render the component
    return (
        <div>
            <h2>Schedule Follow Up Appointment</h2>
            <button className={styles['button-schedule']}  onClick={() => {
                                handleShowFollowUpBtn();
                                setShowTable(!showTable);
                            }}> My Scheduled Follow Ups</button>
            <br/>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Follow Up</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment._id}>
                            <td>{appointment.patient_username}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</td>
                            <td>{appointment.time}</td>
                            <td>
                                <button className={styles['button-schedule']}
                                    onClick={() => handleScheduleFollowUp(appointment.patient_username, appointment.time)}
                                >
                                    Schedule a Follow Up
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <br/>
            <br/>
            {showTable && 
                            <table>
                            <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Patient</th>
                                <th>Follow Up Date</th>
                                <th>Appointment Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                                {scheduledFollowUps &&
                                    scheduledFollowUps.map((followUp) => (
                                        <tr key={followUp._id}>
                                            <td>{followUp.doctor_username}</td>
                                            <td>{followUp.patient_username}</td>
                                            <td>{followUp.followUpDateTime}</td>
                                            <td>{followUp.appointmentDateTime}</td>
                                            <td>{followUp.status}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        }
            {showFollowUpSection && (
                <div className={styles['div-schedule']}>
                    <h2>Follow Up Details</h2>
                    <h4 >Patient : </h4>
                    <p> {selectedAppointment.patientUsername}</p>
                    <h4>Appointment Time:</h4>
                    <p> {selectedAppointment.appointmentTime}</p>
                    <h2>Enter Follow Up Date and Time</h2>
                    <br/>
                    <input
                        type="datetime-local"
                        value={followUpDateTime}
                        onChange={handleFollowUpDateTimeChange}
                    />
                    <br/>
                    <br/>
                    <button className={styles['button-schedule']} onClick={handleCreateFollowUp}>Submit Follow Up</button>
                </div>
            )}
        </div>
    );
};

export default ScheduleFollowUp;
