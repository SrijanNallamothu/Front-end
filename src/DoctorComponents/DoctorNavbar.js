import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import WhiteLogo from "../components/images/whiteLogo.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import axios from 'axios';

const DoctorNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const doctor = JSON.parse(localStorage.getItem("doctorDetails"))
 const [doctor,setDoctor] = useState("")
  const [selectedOption, setSelectedOption] = useState("Select Language");
  const drLogout = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/doctor/Doctorlogout/${doctor?.doctorId}`)
      .then((response) => {
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logOut = async () => {
    await drLogout()
    localStorage.removeItem("doctorDetails")
    localStorage.removeItem("DrPatientId")
    localStorage.removeItem("jwtToken")
    window.location.href = "/"
  }


  function handleDropdownChange(event) {
    setSelectedOption(event.target.value);
    console.log(`User selected ${event.target.value}`);
    i18next.changeLanguage(event.target.value);
    localStorage.setItem("language", event.target.value);
  }
  const { t } = useTranslation();

  useEffect(() => {
     setDoctor(JSON.parse(localStorage.getItem("doctorDetails")))
  }, [])
  return (
    <nav className="bg-blue-900 border-blue-600 dark:bg-blue-900 top-0 w-full z-20 left-0 dark:border-blue-600">
      <div className="max-w-full mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between h-16">
          <div className="flex-shrink-0 flex items-center p-4">
            <a href='/doctor'><img src={WhiteLogo} alt="logo" className="w-auto h-9" /></a>
          </div>
          <div className="flex flex-row items-center justify-end">
            <div className="relative flex flex-row items-center justify-end space-x-4">
              {/* <div>
                <a
                  href="/doctor"
                  className="text-white font-medium font-serif hover:text-blue-200"
                >
                  {t("Home")}
                </a>
              </div> */}
              <li className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500">
                <select value={selectedOption} onChange={handleDropdownChange}>
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                </select>
              </li>


              <div><a href='/doctor' className='text-white font-medium font-serif hover:text-blue-200'>{t("Home")}</a></div>
              <div className='text-white font-medium font-serif'>Dr.{doctor?.firstName}</div>

              <div>
                <button
                  className="py-2 rounded inline-flex items-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FontAwesomeIcon icon={faCircleUser} className='fa-xl' style={{ color: "#ffffff" }} />
                  <svg className={`fill-current h-4 w-4 ml-0 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
                  </svg>
                </button>
              </div>
              {isOpen && (
                <div className="overflow-hidden z-10 absolute top-8 right-0 mt-2 w-36 rounded-sm shadow-lg">
                  <div className="rounded-md bg-blue-50 shadow-xs">

                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <a
                        href="/doctor/profile"
                        className="block px-4 py-2 text-sm font-serif font-medium text-gray-700 hover:bg-blue-200 hover:text-gray-900"
                        role="menuitem"
                      >
                        {t("Update Profile")}
                      </a>
                      <button
                        className="w-full block px-4 py-2 text-sm font-serif font-medium text-gray-700 hover:bg-red-400 hover:text-gray-900"
                        role="menuitem"
                        onClick={logOut}
                      >
                        {t("Logout")}
                      </button>

                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DoctorNavbar