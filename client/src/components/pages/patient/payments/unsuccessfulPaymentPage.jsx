// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

function UnsuccessPayment() {

    const [username, setUsername] = useState("");
    const [load, setLoad] = useState(false);
    const accessToken = sessionStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        if(username.length != 0) {
            setLoad(true);
        }
    }, [username]);

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

    if (!load) {
        return (<div>Loading</div>);
    }
    

    const handleSubmit = () => {
        window.location.href="http://localhost:5173/patient/";

    };

    return (
        <div className="Success Payment">
            <h2>Unsuccessful Payment</h2>
            <button onClick={() => handleSubmit()}>Proceed</button>
        </div>

    );

}

export default UnsuccessPayment; 