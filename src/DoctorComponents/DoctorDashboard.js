import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DoctorNavbar from "./DoctorNavbar";
import QueuedPatient from "./QueuedPatient";
import Infographics from "./Infographics";
import axios from "axios";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";


const DoctorDashboard = () => {
  const [dailyLog, setDailyLog] = useState()
  const [totalConsult, setTotalConsult] = useState(0)
  const [todayConsult, setTodayConsult] = useState(0)
  // const doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
  let doctorDetails;

  const { t } = useTranslation();
  const fetchTotalConsult = async () => {
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    //await axios.get(`http://localhost:9090/consultation/getAllConsultationsCount`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/consultation/totalConsultationByDoctor/${doctorDetails?.doctorId}`)
    .then((response) => {
      // console.log("totalCount",response.data)
      setTotalConsult(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const fetchTodayConsult = async() =>{
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/consultation/totalDailyConsultationByDoctor/${doctorDetails?.doctorId}`)
    .then((response) => {
      // console.log("todayConsult",response.data)
      setTodayConsult(response.data)
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  const fetchDailyLog = async () => {
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/doctorDailyLog/${doctorDetails?.doctorId}`)
      .then((response) => {
        setDailyLog(response.data)
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
    fetchTotalConsult()
    fetchTodayConsult()
    fetchDailyLog()
    fetchTotalConsult()
    fetchTodayConsult()
    fetchDailyLog()
  }, [])

  return (
    <div className='bg-blue-50 flex flex-col justify-evenly'>
      <div>
        <DoctorNavbar />
      </div>
      <div className='flex flex-row'>
        <div className='w-1/6 h-screen relative'>
          <QueuedPatient />
        </div>

        <div className="flex-grow flex flex-row p-8 justify-between h-screen">
          <div className="w-3/5 grid grid-rows-5">
            <div className="row-span-2 flex flex-row justify-between p-8 w-full space-x-6">
              <div className="w-1/2 p-4 h-3/5 border-t-4 border-blue-900 shadow-lg font-serif rounded-lg flex flex-col justify-evenly transition-transform duration-500 transform-gpu hover:scale-110">
                <p>{t("Total Consultations")}</p>
                <p className="text-5xl text-center">{totalConsult}</p>
              </div>
              <div className="w-1/2 p-4 h-3/5 border-t-4 border-blue-900 shadow-lg font-serif rounded-lg flex flex-col justify-evenly transition-transform duration-500 transform-gpu hover:scale-110">
                <p>{t("Today's Consultations")}</p>
                <p className="text-5xl text-center">{todayConsult}</p>

              </div>
            </div>
            <div className='row-span-3 h-4/5 w-full flex justify-center'>
              <Infographics />
            </div>
          </div>
          <div className='shadow-lg p-6 w-2/5 h-4/5 border-t-4 border-blue-900 rounded-lg mt-8'>
            <table className="table-auto w-full mx-auto">
              <caption className="caption-top font-serif text-2xl p-2 border-b-2 border-gray-700">
                {t("Daily Log")}
              </caption>
              <thead className='font-serif text-lg'>
                <tr>
                  <th>{t("Patient Id")}</th>
                  <th>{t("Observation")}</th>
                  <th>{t("Remarks")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='font-serif text-md text-center'>
                {dailyLog ? (
                  dailyLog.map((p, index) => (
                    <tr key={index} className='p-8'>
                      <td>{p.patientId}</td>
                      <td>{p.observation}</td>
                      <td>{p.remark}</td>
                      <td><FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#3ee302", }} /></td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard