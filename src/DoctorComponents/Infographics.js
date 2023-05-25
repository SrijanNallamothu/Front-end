
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTranslation } from "react-i18next";


const Infographics = () => {
  let doctor
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    doctor = JSON.parse(localStorage.getItem("doctorDetails"))
    const fetchData = async () => {
      try {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/consultation/totalDateWiseConsultations/${doctor?.doctorId}`);
        const formattedData = response.data.map((d) => {
          return {
            name: d.dateOfConsultation,
            consultations: d.totalConsultations,
          };
        });
        setData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" bg-gradient-to-r border-t-4 border-blue-900 shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold font-serif mb-4">
        {t("Total Consultations")}
      </h2>
      {data.length > 0 ? (
        <LineChart width={500} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="consultations" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      ) : (
        <div>{t("Loading data...")}</div>
      )}
    </div>
  );
};

export default Infographics;
