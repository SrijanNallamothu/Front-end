import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
import axios from 'axios';

const PatientHistory = () => {
  // const patientDetails = JSON.parse(localStorage.getItem('patientDetails'));
  let patientDetails
  const [prescription, setPrescription] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const fetchPrescription = async () => {
    try {
      const jwtToken=localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prescription/getPrescriptionsPatient/${patientDetails?.patientId}`);
      setPrescription(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = async (id, date) => {
    try {
      const jwtToken=localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pdf/getPdf/${id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute("download", `${date}-prescription.pdf`);

      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = prescription.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(prescription.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <li key={number} className={`p-4 cursor-pointer ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`} onClick={() => setCurrentPage(number)}>
      {number}
    </li>
  ));

  useEffect(() => {
    patientDetails = JSON.parse(localStorage.getItem("patientDetails"))
    fetchPrescription();
  }, []);

  return (
    <div className="p-6 rounded-lg border-2 border-gray-200">
      <table className="table-auto w-full mx-auto">
        <caption className="caption-top font-serif text-2xl p-2 border-b-2">Prescriptions</caption>
        <thead className="font-serif text-lg">
          <tr>
            <th>Date</th>
            <th>Observation</th>
            <th>Remarks</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody className="font-serif text-md text-center">
          {currentItems.length > 0 ? (
            currentItems.map((p) => (
              <tr key={p.prescriptionId} className='bg-blue-50 border-2'>
                <td>{p.consultationDate}</td>
                <td>{p.observation}</td>
                <td>{p.remark}</td>
                <td className='p-2'>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                    onClick={() =>
                      downloadPDF(p.prescriptionId, p.consultationDate)
                    }
                  >
                    download pdf
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No prescriptions found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ul className="flex justify-center mt-4">
        {renderPageNumbers}
      </ul>
    </div>
  );
};

export default PatientHistory;
