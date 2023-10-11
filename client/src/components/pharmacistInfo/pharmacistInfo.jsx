import React, { useEffect, useState } from 'react';

// import styles from './pharmacistInfo.module.css'


const pharmacistInfo = ({ pharmacist }) => {
    
    return (
        <tr>
           
            <td>{pharmacist.username}</td>
            <td>{pharmacist.name}</td>
            <td>{pharmacist.email}</td>
            <td>{pharmacist.password}</td>
            <td>{pharmacist.dob}</td>
            <td>{pharmacist.hourly_rate}</td>
            <td>{pharmacist.affiliation}</td>
            <td>{pharmacist.educational_background}</td>
            <td>{pharmacist.status}</td>
            
            
        </tr>
    )
}

export default pharmacistInfo;