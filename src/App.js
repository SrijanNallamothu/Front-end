
import React,{ Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'
import DoctorDashboard from './DoctorComponents/DoctorDashboard';
import DoctorConsultationPage from './DoctorComponents/DoctorConsultationPage';
import DoctorProfile from './DoctorComponents/DoctorProfile';
// import Prescription from './DoctorComponents/Prescription';
// import DoctorVideocall from './DoctorComponents/DoctorVideocall';
import PatientDashboard from './PatientComponent/PatientDashboard';
import PatientRegistration from './PatientComponent/PatientRegistration';
import PatientWaitingRoom from './PatientComponent/PatientWaitingRoom';
// import FollowUp from './PatientComponent/FollowUp';
// import MyCalender from './PatientComponent/Calender'
// import Appointment from './PatientComponent/Appointment';
// import PatientHistory from './PatientComponent/PatientHistory';
import PatientUpdateProfile from './PatientComponent/PatientUpdateProfile';
import PatientVideoCallPage from './PatientComponent/PatientVideoCallPage';
// import FileUpload from './PatientComponent/FileUpload';

// import Appp from './PatientComponent/Appp';

const App = () => {

  // let jwtToken
  const jwtToken = localStorage.getItem("jwtToken")

  const ProtectedRoute = ({ children }) => {
    if (jwtToken === null) {         //user is fetched from localStorage
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }
  // useEffect(() => {
  //   jwtToken = localStorage.getItem("jwtToken")
  // })

  return (
    <div>
      <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/*                 Doctor Components               */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/consultationpage" element={<ProtectedRoute><DoctorConsultationPage /></ProtectedRoute>} />
          <Route path="/doctor/profile" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />
          {/* <Route path="/doctor/prescription" element={<Prescription />} />  isko htana h baad me */}
          {/* <Route path = "/doctor/videocall" element = { <DoctorVideocall/> } />   isko htana h baad me */}

          {/*                 Patient Components               */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path='/register' element={<PatientRegistration />} />
          <Route path='/patient/waitingroom' element={<ProtectedRoute><PatientWaitingRoom /></ProtectedRoute>} />
          {/* <Route path='/patient/followUp' element={<FollowUp />} />   isko htana h baad me */}
          {/* <Route path='/calender' element={<MyCalender />} />           isko htana h */}
          {/* <Route path='/app' element={<Appointment />} />       htana h */}
          {/* <Route path='/history' element={<PatientHistory />} />   htana h */}
          <Route path='/patient/updateProfile' element={<ProtectedRoute><PatientUpdateProfile /></ProtectedRoute>} />
          <Route path='/patient/patientVideoCall' element={<ProtectedRoute><PatientVideoCallPage /></ProtectedRoute>} />
          {/* <Route path='/file' element={<FileUpload />} /> */}
        </Routes>
      </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
