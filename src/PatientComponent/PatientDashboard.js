import React, { useEffect, useState } from 'react'
import PatientNavbar from './PatientNavbar'
import Appointment from './Appointment'
import PatientHistory from './PatientHistory'
import Calender from './Calender'
import flow from '../components/images/FLOW (1).png'

const PatientDashboard = () => {

  // const patient = JSON.parse(localStorage.getItem("patientDetails"))
  let patient
  const [viewHistory, setViewHistory] = useState(false)

  const handleToggle = () => {
    setViewHistory(!viewHistory)
  }

  useEffect(() => {
    patient = JSON.parse(localStorage.getItem("patientDetails"))
    // console.log("dashboard",patient)
  })
  return (
    <div className='bg-blue-50 w-full'>
      <PatientNavbar/>
      <div className='flex flex-row p-4 space-x-6 w-full'>
        <div className='w-1/6'>
          <div><img src={flow} alt='steps' className='w-full h-full object-cover rounded-md' /></div>
        </div>
        <div className='w-5/6 flex flex-row p-2 justify-between'>
          <div className='flex flex-col w-2/3 p-2'>
            <div><Appointment /></div>
            <div className='p-2 relative z-0 w-full group'>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={viewHistory}
                    onChange={handleToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-xl font-serif text-white dark:text-blue-950">
                    View History
                  </span>
                </label>
              </div>
              {viewHistory && (
                <div>
                  <PatientHistory />
                </div>
              )}
            </div>
          </div>
          <div className='w-1/3 mt-2'>
            <h4 className='text-center text-xl font-serif font-bold'>Follow Up</h4>
            <div><Calender /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard