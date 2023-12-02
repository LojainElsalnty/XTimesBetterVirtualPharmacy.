import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

// React Router DOM
import { useNavigate } from 'react-router-dom';

const LinkPatientWithAnotherByEmail = () => {
    // const { accessToken } = useAuth();
    const accessToken = sessionStorage.getItem('accessToken');
    const [email, setEmail] = useState('');
    const [relation, setRelation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    async function checkAuthentication() {
        await axios({
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
            })
            .catch((error) => {
                navigate('/login');
            });
    }

    checkAuthentication();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        if (!email || !relation) {
            setError('Please fill in all of the required fields.');
            return;
        }

        const LinkedfamilyMember = {
            email,
            relation,
        };
        console.log(`LinkedMembers: ${LinkedfamilyMember.email}`);
        try {
            const response = await fetch('http://localhost:5000/patient/linkByEmail/linkByEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
                body: JSON.stringify(LinkedfamilyMember),

            });

            console.log(response);
            console.log(response.status);

            if (response.status === 201) {

                setIsSubmitted(true);
                setMessage('Family member successfully Linked!');
                setEmail('');
                setRelation('');

                const data = await response.json();

            } else if (response.status === 404) {
                //setMessage('Patient does not exist.');

                setError('Patient To Be Linked does not exist.');
            }
            else if (response.status === 400) {
                //setMessage('Patient does not exist.');

                setError('Patient is already Linked.');
            }
            else {

                setError('An error occurred while linking the family member.');
            }
        } catch (error) {
            console.log("There is an error");
            setError(error.message);
        }
    };
    return (
        <div>
            <h1>Link Patient To Be A Family Member</h1>
            <h2>By Email</h2>

            <form onSubmit={handleSubmit}>


                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                >
                    <option value="">Relation</option>
                    <option value="wife">Wife</option>
                    <option value="husband">Husband</option>
                    <option value="children">Children</option>
                </select>

                <button type="submit">Link</button>
            </form>
            {message && <p>{message}</p>}


            {error && (
                <div style={{ color: 'red' }}>{error}</div>
            )}
        </div>
    );
};

export default LinkPatientWithAnotherByEmail;
