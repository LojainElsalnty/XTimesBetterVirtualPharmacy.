/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
const FamilyView = () => {

    const [familyMembers, setFamilyMembers] = useState([]);

    const handleViewFamilyMembers = async () => {
        const response = await axios.get('http://localhost:5000/patient/viewFamilyMembers?username=NayeraMahran');
        const familyMembers = response.data;
        console.log(familyMembers);
        //console.log("familyMembers");

        // Check if the response data is empty
        if (familyMembers.length > 0) {
            setFamilyMembers(familyMembers);
        } else {
            // Display an error message
            alert('No family members found');
        }
    };

    return (
        <div>
            <h1>Family Members</h1>
            <button onClick={handleViewFamilyMembers}>View Family Members</button>

            {familyMembers.length > 0 && (
                <ul>
                    {familyMembers.map((member) => (
                        <li key={member._id}>
                            <h2>{member.name}</h2>
                            <p>Age: {member.age}</p>
                            <p>Relation: {member.relation}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FamilyView;*/
// RESTORE UP 

/*const FamilyView = () => {

    const [member, setMembers] = useState([]);
    //for display
    const [membersToBeDisplay, setMembersToBeDisplay] = useState([]);


    useEffect(() => {
        const fetchAllMembers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/patient/viewFamilyMembers', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response && response.data) {
                    setMembers(response.data);
                    setMembersToBeDisplay(response.data) //so that initially all medicines are displayed
                }
            } catch (error) {
                throw new Error('Invalid response data');
            }
        };

        fetchAllMembers();

    }, []);


    const handleViewFamilyMembers = async () => {
        const member3 = member.find(member => member.patient_username === "NayeraMahran");
        if (member3) {
            setMembersToBeDisplay(member3);
        }
    };*/



/*import { useEffect, useState } from "react";

const PatientHome = () => {
    const [familyMembers, setFamilyMembers] = useState(null)

    useEffect(() => {
        const getFamilyMembers = async () => {
            const response = await fetch('/patient/viewFamilyMembers')
            const json = await response.json()

            if (response.ok) {
                setFamilyMembers(json)
            }
        }

        getFamilyMembers()
    }, [])

    return (
        <div className="patientHome">
            <div className="familyMembers">
                {familyMembers && familyMembers.map((familymember) => (
                    <p key={familymember._id}>{familymember.name}</p>

                ))}

            </div>
        </div>
    )
}

export default PatientHome;*/
//import { useEffect, useState } from "react";

//function FamilyView() {
/*const [username, setUsername] = useState('');
const [patient, setPatient] = useState(null);
 
const handleUsernameChange = (event) => {
  setUsername(event.target.value);
};*/

/*const fetchFamilyMembers = async () => {
    try {
        const response = await fetch(`http://localhost:5000/patient/viewFamilyMembers`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error fetching family members:', error);
        // You can set an error state or display an error message to the user here.
    }
};

return (
    <div>
        <h2>Family Members</h2>
        <button onClick={fetchFamilyMembers}>Fetch Family Members</button>
        {patient && (
            <div>
                <h3>Family Members for {patient.username}</h3>
                <p>Name: {patient.name}</p>
                <p>Email: {patient.email}</p>
                <p>Date of Birth: {patient.dob}</p>
                <p>Gender: {patient.gender}</p>

            </div>

        )}
    </div>
);
}

export default FamilyView;*/
/*return (
       <div className="home">
           <h2>Family Members</h2>
       </div>
   )*/

/* <div>
 <h2>Family Members</h2>
 <button onClick={handleViewFamilyMembers}>View Family Members</button>
 {membersToBeDisplay.length > 0 && ( // conditional statement to render the list of family members only if the membersToBeDisplay state variable is not empty
     <div>
         <h3>Family Members for :{member3.patient_username}</h3>
         <p> Name: {membersToBeDisplay.name}</p>
         <p>Relation: {membersToBeDisplay.relation}</p>
     </div>
 )}
</div>*/

import React, { useState, useEffect } from 'react';

const FamilyView = () => {

    const [familyMembers, setFamilyMembers] = useState([]);
    const [showFamilyMembers, setShowFamilyMembers] = useState(false);

    useEffect(() => {
        const fetchFamilyMembers = async () => {
            const response = await fetch('http://localhost:5000/patient/viewFamilyMembers?username=NayeraMahran');
            console.log("anaaaaaaaaaaaa")
            const familyMembers = await response.json();

            if (response.ok) {
                setFamilyMembers(familyMembers);
            }

        };

        fetchFamilyMembers();
    }, []);

    const handleViewFamilyMembers = async () => {
        setShowFamilyMembers(true);
    };

    return (
        <div>
            <h1>Family Members</h1>
            <button onClick={handleViewFamilyMembers}>View Family Members</button>

            {showFamilyMembers &&

                familyMembers.map((member) => (
                    <p key={member._id}>
                        <h2>{member.name}</h2>
                        <p>Relation: {member.relation}</p>
                    </p>
                ))

            }

        </div>
    );
};

export default FamilyView;