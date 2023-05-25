
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const QueuedPatient = () => {
    const [count, setCount] = useState(0);
      const doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
    // let doctorDetails
    const [queuedPt, setQueuedPt] = useState([]);
    const [isRotating, setIsRotating] = useState(false);
    var appointmentId;
    const navigate = useNavigate();
    const { t } = useTranslation();
    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }
    const handleClick = async () => {
        setIsRotating(true);
        await fetchQueuePt();
        await timeout(1000);
        handleAnimationEnd();
    };


    const handleAnimationEnd = () => {
        setIsRotating(false);
    }

    const fetchQueuePt = async () => {
        const jwtToken = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/appointment/getAllAppointments/${doctorDetails?.departmentName}`)
            .then((response) => {
                setQueuedPt(response.data);
                // console.log(queuedPt);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deletePt = async () => {
        const jwtToken = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
        // console.log("inside deletePt", appointmentId);
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/appointment/deleteAppointment/${appointmentId}`)
            .then((response) => {
                // console.log("Delete successful");
                setCount(count + 1);
                console.log("appID_dr", appointmentId)
                navigate(`/doctor/consultationpage`, { state: { appointmentId } });
            })
            .catch((error) => {
                console.log(`Error: ${error.message}`);
                console.error("There was an error!", error);
            })
    }

    useEffect(() => {
        // doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
        fetchQueuePt()
    }, [count])

    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 font-serif sm:px-2 sm:py-2 md:px-4 md:py-8 items-center justify-center float-right shadow-lg shadow-blue-500 shadow-opacity-70'>
            <div className='flex flex-row items-center space-x-2 px-8'>
                <h2 className='py-2 text-md'>{t("Queued Patients")}</h2>
                <button onClick={handleClick}>
                    <FontAwesomeIcon icon={faArrowsRotate} className={`text-gray-600 ${isRotating ? "animate-spin" : ""}`} />
                </button>
            </div>
            <div className='border-b-2 border-gray-500'></div>
            {queuedPt.length ? (
                queuedPt.map((p, index) => {
                    return (
                        <div key={index} className='px-2 py-2 flex flex-row items-center justify-evenly '>
                            {t("Patient Id")} : {p.patientId}
                            <button key = {index}
                                className="menu-item bg-green-400 hover:bg-green-600 rounded-lg px-2"
                                onClick={() => {
                                    appointmentId = p.appointmentId;
                                    localStorage.setItem("DrPatientId", p.patientId);
                                    // console.log("appointmentId: ", appointmentId);
                                    deletePt();
                                }}
                                disabled={index === 1}
                            >
                                {t("Accept")}
                            </button>
                        </div>
                    );
                })
            ) : (
                <h1>{t("No Patients Waiting")}</h1>
            )}
        </div>
    )
}


export default QueuedPatient