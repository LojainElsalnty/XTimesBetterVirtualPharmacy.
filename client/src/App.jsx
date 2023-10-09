import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import PharmacistView from './pages/pharmacist/pharmacistView.jsx'

// Styles
import './App.css'
import PatientView from './pages/patient/patientView.jsx';
import MedicineAdd from './pages/medicine/medicineAdd.jsx';
import MedicineEdit from './pages/medicine/madicineEdit.jsx';

function App() {

  return (
    <div className='App'>
   <BrowserRouter>
   <div className="pages">
      <Routes>
      <Route  
        path = "/"
        element = {<MedicineEdit/>}
        />
      <Route  
        path = "/"
        element = {<MedicineAdd/>}
        />
      
      
      
        
         <Route  
        path = "/"
        element = {<PatientView/>}
        />
        <Route
         path = "/"
         element = {<PharmacistView/>}
        />
      
      </Routes>
   </div>
   </BrowserRouter>
    
   </div>
  )
}

export default App
