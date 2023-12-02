import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

// React Router DOM
import { useNavigate } from 'react-router-dom';

const ContractView = () => {
    // const {accessToken} = useAuth();
    const accessToken = sessionStorage.getItem('accessToken');
    const [contract, setContract] = useState([]);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);
    const navigate = useNavigate();

    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: `http://localhost:5000/authentication/checkAccessToken`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'doctor',
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

    useEffect(() => {
        const fetchContract = async () => {
            const response = await fetch('http://localhost:5000/doctor/viewContract/viewContract', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
            });
            // console.log("anaaaaaaaaaaaa")
            const contract = await response.json();

            if (response.ok) {
                setContract(contract);
            }

        };

        fetchContract();
    }, []);


    const handleAcceptContract = async () => {
        if (!accepted) {
            const response = await fetch('http://localhost:5000/doctor/acceptContract/acceptContract', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
            });
            // console.log("anaaaaaaaaaaaa")
            //  const newcontract = await response.json();

            if (response.ok) {
                console.log("accepted");
                setAccepted(true);
                window.location.reload();
            }
            else {
                // Handle any errors from the backend
                console.error('Error accepting contract:', response.statusText);
            }
        }

    };
    const handleRejectContract = async () => {
        if (!rejected) {
            const response = await fetch('http://localhost:5000/doctor/rejectContract/rejectContract', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
            });
            // console.log("anaaaaaaaaaaaa")
            //  const newcontract = await response.json();

            if (response.ok) {
                console.log("rejected");
                setRejected(true);
                window.location.reload();
            }
            else {
                // Handle any errors from the backend
                console.error('Error accepting contract:', response.statusText);
            }
        }

    };
    // const handleAcceptContract = async () => {
    //     setShowContract(true);
    // };

    return (
        <div>
            <h1>Contract</h1>


            {contract.map((Contract) => (
                <p key={Contract._id}>
                    <h2>{Contract.doctorName}</h2>
                    <p>Employment Date: {Contract.employmentDate}</p>
                    <p>Termination Date: {Contract.terminationDate}</p>
                    <p>Doctor Fees: {Contract.doctorFees}</p>
                    <p>Markup Rate: {Contract.markupRate}</p>
                    <p>Status: {Contract.status}</p>

                    {(Contract.accepted !== true || Contract.status == "Pending") && (
                        <button onClick={handleAcceptContract}>Accept Contract</button>
                    )}
                    {(Contract.accepted == true || Contract.status == "Pending") && (
                        <button onClick={handleRejectContract}>Reject Contract</button>
                    )}
                </p>

            ))

            }




        </div>
    );
};

export default ContractView;