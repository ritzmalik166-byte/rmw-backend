"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [chartData, setChartData] = useState([]);
  const [activeChart, setActiveChart] = useState("desktop");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get-visit-data");
        setChartData(res.data);
      } catch (err) {
        console.error("Failed to fetch visitors data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Visitor Overview</h2>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeChart === "desktop"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveChart("desktop")}
        >
          Desktop
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeChart === "mobile"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveChart("mobile")}
        >
          Mobile
        </button>
      </div>

      <div className="w-full h-80 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={activeChart} fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
