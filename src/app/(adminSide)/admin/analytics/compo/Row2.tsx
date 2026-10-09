"use client";
import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";

type TravelPath = {
  from: string;
  to: string;
  value: number;
};

interface ROWDATA {
  setDuration: (val: string) => void;
  setQueryType: (val: string) => void;
  userTravelPath: Record<string, number> | null;
}

function Row2({ setDuration, setQueryType, userTravelPath }: ROWDATA) {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Process user travel path data
  const processedTravelData = useMemo(() => {
    if (!userTravelPath) return [];

    const paths: TravelPath[] = [];

    // Convert the object to an array of paths
    Object.entries(userTravelPath).forEach(([key, value]) => {
      // Split keys like "HomeToBlogs" into "Home" and "Blogs"
      const from = key
        .replace(/To([A-Z])/g, (match, p1) => ` → ${p1}`)
        .split(" → ")[0];
      const to = key
        .replace(/To([A-Z])/g, (match, p1) => ` → ${p1}`)
        .split(" → ")[1];

      if (from && to) {
        paths.push({ from, to, value });
      }
    });

    // Sort by value in descending order
    return paths.sort((a, b) => b.value - a.value);
  }, [userTravelPath]);

  // User travel chart options
  const getTravelChartOption = () => {
    // Take top 10 paths for better visualization
    const topPaths = processedTravelData.slice(0, 10);

    return {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        data: topPaths.map((path) => `${path.from} → ${path.to}`),
        textStyle: {
          fontSize: isMobile ? 9 : 11,
        },
      },
      series: [
        {
          name: "User Travel Paths",
          type: "pie",
          radius: isMobile ? ["40%", "70%"] : ["50%", "80%"],
          center: isMobile ? ["40%", "50%"] : ["40%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: isMobile ? 12 : 14,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: topPaths.map((path, index) => ({
            value: path.value,
            name: `${path.from} → ${path.to}`,
            itemStyle: {
              color: [
                "#5470c6",
                "#91cc75",
                "#fac858",
                "#ee6666",
                "#73c0de",
                "#3ba272",
                "#fc8452",
                "#9a60b4",
                "#ea7ccc",
                "#6e7079",
              ][index % 10],
            },
          })),
        },
      ],
    };
  };

  // Custom select component for time range
  const TimeRangeSelect = () => {
    return (
      <div className="relative inline-block ">
        <select
          className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={timeRange}
          onChange={(e) => {
            setTimeRange(e.target.value);
            setQueryType("User Travel Paths");
            setDuration(e.target.value);
          }}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 6 Month">Last 6 Months</option>
          <option value="Last 1 Year">Last 1 Year</option>
        </select>
      </div>
    );
  };

  // Table view for user travel paths
  const TravelPathsTable = () => {
    return (
      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-emerald-100 to-emerald-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">
                From
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">
                To
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Sessions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {processedTravelData.slice(0, 10).map((path, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white hover:bg-emerald-50" : "bg-gray-50 hover:bg-emerald-50"}`}
              >
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{path.from}</td>
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{path.to}</td>
                <td className="px-5 py-3 text-sm font-bold text-emerald-600">
                  {path.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full px-4 sm:px-5 md:px-6 pb-6">
      <div className="w-full">
        {/* User Travel Paths */}
        <div className="w-full bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-3 md:mb-0">
              <div className="p-3 bg-emerald-100 rounded-xl mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              User Travel Paths
            </h2>
            <TimeRangeSelect />
          </div>
          <ReactECharts
            option={getTravelChartOption()}
            style={{ height: isMobile ? "300px" : "400px", width: "100%" }}
            opts={{ renderer: "svg" }}
          />

          {/* Table view for better readability */}
          <TravelPathsTable />

          <div className="mt-6 text-sm">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              <p className="text-center font-medium text-emerald-700">
                Shows how users navigate between pages on your website
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Row2;
