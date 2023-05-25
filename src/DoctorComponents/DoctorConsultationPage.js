import React from 'react'
import DoctorNavbar from './DoctorNavbar'
import Prescription from './Prescription'
import DoctorVideocall from './DoctorVideocall'
import { useLocation } from 'react-router-dom'

const DoctorConsultationPage = () => {
  
  const { state } = useLocation()
  console.log("drConslt", state.appointmentId)
  const appId = state.appointmentId

  return (
    <div className='bg-blue-50 h-full'>
        <DoctorNavbar/>
        <div className='grid grid-cols-5 gap-4'>
          <div className='p-4' style={{ gridColumn: "1 / span 2" }}>
            <Prescription/>
          </div>
          <div className='p-4' style={{ gridColumn: "3 / span 3" }}>
            <DoctorVideocall value={appId}/>
          </div>
        </div>
    </div>
  )
}

export default DoctorConsultationPage