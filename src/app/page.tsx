import Navbar from "@/components/Navbar";
import Image from "next/image";
import CardNumber from '../components/CardNumber'
import 'chart.js/auto'; // Import Chart.js
import PieChart from '../components/PieChart'
import Line from '../components/Line'
import WorldMap from '../components/WorldMap'
import React, { createContext } from 'react';
import WorldGeoJSON from '../components/WorldGeoJSON'
export default function Home() {

  const data1 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  };

  const data2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: '# of Votes',
      data: [10, 20, 5, 8, 15],
      borderWidth: 1
    }]
  };


  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start h-1/6 ">
        <CardNumber number={100} label="Total Complaints" />
        <CardNumber number={50} label="Assigned" />
        <CardNumber number={75} label="Pending" />
        <CardNumber number={200} label="Resolved" />
      </div>


      <Line />

      <div className="flex justify-center items-start h-1/6"><PieChart data1={data1} data2={data2} /></div>

      <Line />

      <WorldMap data={WorldGeoJSON} />
    </>
  );
}
