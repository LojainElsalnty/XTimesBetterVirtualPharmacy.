import React from 'react';
import{Routes, Route, BrowserRouter} from 'react-router-dom'
import AddAdmin from './pages/admin/addadmin';
import RemovePharmacist from './pages/admin/removepharmacist';
import RemovePatient from './pages/admin/removepatient';
//import './pages/admin/addadmin.module.css';


// Styles
import './App.css'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/admin/addadmin" element={<AddAdmin/>}/>
        <Route path="/admin/removepharmacist" element={<RemovePharmacist/>}/>
        <Route path="/admin/removepatient" element={<RemovePatient/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;