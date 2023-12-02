import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFamilyMember = () => {

    const [name, setName] = useState('');
    const [national_id, setnational_id] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [relation, setRelation] = useState('');
    const [patient_username, setpatient_username] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        if (!name || !national_id || !age || !gender || !relation || !patient_username) {
            setError('Please fill in all of the required fields.');

            return;
        }

        const familyMember = {
            name,
            national_id,
            age,
            gender,
            relation,
            patient_username,
        };
        try {
            const response = await fetch('http://localhost:5000/patient/addFamilyMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(familyMember),

            });

            console.log(response);

            if (response.status === 201) {

                setIsSubmitted(true);
                setMessage('Family member successfully added!');
                setName('');
                setnational_id('');
                setAge('');
                setGender('');
                setRelation('');
                setpatient_username('');

                const data = await response.json();
                if (data.length === 0) {
                    setMessage('No Patient found with this username');
                }
                //window.location.href = '/success';
            } else if (response.status === 404) {
                //setMessage('Patient does not exist.');

                setError('Patient does not exist.');
            }
            else {

                setError('An error occurred while adding the family member.');
            }
        } catch (error) {
            console.log("There is an error");
            setError(error.message);
        }
    };
    return (
        <div>
            <h1>Add Family Member</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="National ID"
                    value={national_id}
                    onChange={(e) => setnational_id(e.target.value)}
                />

                <input
                    type="Number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                >
                    <option value="">Relation</option>
                    <option value="wife">Wife</option>
                    <option value="husband">Husband</option>
                    <option value="children">Children</option>
                </select>

                <input
                    type="text"
                    placeholder="Patient Username"
                    value={patient_username}
                    onChange={(e) => setpatient_username(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}


            {error && (
                <div style={{ color: 'red' }}>{error}</div>
            )}
        </div>
    );
};

export default AddFamilyMember;
/*import React, { useState, useEffect } from 'react';

import axios from 'axios';

const AddFamilyMember = () => {

    const [name, setName] = useState('');
    const [national_id, setnational_id] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [relation, setRelation] = useState('');
    const [patient_username, setpatient_username] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setMessage('');
        setError('');

        if (!name || !national_id || !age || !gender || !relation || !patient_username) {
            setError('Please fill in all of the required fields.');
            return;
        }
        const patient = await patientModel.find({ username: patient_username });
        if (patient.length === 0) {

            setError('PATIENT NOT FOUND');
            return;

        }


        const familyMember = {
            name,
            national_id,
            age,
            gender,
            relation,
            patient_username,
        };
        try {
            const response = await fetch('http://localhost:5000/patient/addFamilyMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(familyMember),
            });

            if (response.status === 201) {
                const data = await response.json();
                if (data.length === 0) {
                    setError('No Patient found with this username');
                }
                window.location.href = '/success';
            } else if (response.status === 404) {
                setError('No Patient found with this username');
            }
            else {
                setError('An error occurred while adding the family member.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Add Family Member</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="National ID"
                    value={national_id}
                    onChange={(e) => setnational_id(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />



                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    class="dropdown-button"
                >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>



                <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                >
                    <option value="">Relation</option>
                    <option value="wife">Wife</option>
                    <option value="husband">Husband</option>
                    <option value="children">Children</option>
                </select>

                <input
                    type="text"
                    placeholder="Patient Username"
                    value={patient_username}
                    onChange={(e) => setpatient_username(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>

            {error && (
                <div style={{ color: 'red' }}>{error}</div>
            )}
        </div>
    );
};

export default AddFamilyMember;*/

/*import React, { useState, useEffect } from 'react';

import axios from 'axios';

const AddFamilyMember = () => {

    const [name, setName] = useState('');
    const [national_id, setnational_id] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [relation, setRelation] = useState('');
    const [patient_username, setpatient_username] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async () => {
        setMessage('');
        setError('');

        if (!name || !national_id || !age || !gender || !relation || !patient_username) {
            setError('Please fill in all of the required fields.');
            return;
        }
        const patient = await patientModel.find({ username: patient_username });
        if (patient.lenght === 0) {

            setError('PATIENT NOT FOUND');
            return;

        }


        const familyMember = {
            name,
            national_id,
            age,
            gender,
            relation,
            patient_username,
        };
        try {
            const response = await fetch('http://localhost:5000/patient/addFamilyMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(familyMember),
            });

            if (response.status === 201) {
                const data = await response.json();
                if (data.length === 0) {
                    setError('No Patient found with this username');
                }
                window.location.href = '/success';
            } else if (response.status === 404) {
                setError('No Patient found with this username');
            }
            else {
                setError('An error occurred while adding the family member.');
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div>
            <h1>Add Family Member</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="National ID"
                    value={national_id}
                    onChange={(e) => setnational_id(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />



                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    class="dropdown-button"
                >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>



                <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                >
                    <option value="" >Relation</option>
                    <option value="wife">Wife</option>
                    <option value="husband">Husband</option>
                    <option value="children">Children</option>
                </select>

                <input
                    type="text"
                    placeholder="Patient Username"
                    value={patient_username}
                    onChange={(e) => setpatient_username(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>



            {error && (
                <div style={{ color: 'red' }}>{error}</div>
            )}
        </div>
    );
};

export default AddFamilyMember;*/