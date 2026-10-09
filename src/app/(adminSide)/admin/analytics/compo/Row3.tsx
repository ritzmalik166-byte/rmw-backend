"use client";
import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";

type TimeFilter =
  | "7 days"
  | "30 days"
  | "6 months"
  | "12 months"
  | "all"
  | string;
type DrilldownKey =
  | "Google"
  | "Facebook"
  | "Twitter"
  | "Direct"
  | "Other"
  | string;



export interface DeviceInfoItem {
  totalPhones?: number;
  totalTablets?: number;
  totalDekstopDevices?: number;
  overAllPercentage: number;
}

export interface PageActivityData {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

export interface UserPageActivity {
  [url: string]: PageActivityData;
}

interface ROWDATA {
  setDuration: (val: string) => void;
  setQueryType: (val: string) => void;
  devicesData: DeviceInfoItem[] | null;
  userRefferalSources: Record<string, number> | null;
  userPageActivity: UserPageActivity | null;
}

function Row3({
  setDuration,
  setQueryType,
  devicesData,
  userRefferalSources,
  userPageActivity,
}: ROWDATA) {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [currentData, setCurrentData] = useState<DrilldownKey | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [timeFilter2, setTimeFilter2] = useState<TimeFilter>("all");
  
  // Pagination state for page activity table
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Prepare device data for pie chart
  const getDeviceData = () => {
    if (!devicesData) return [];
    
    const deviceData = [];
    
    if (devicesData[0]?.totalPhones !== undefined) {
      deviceData.push({
        value: devicesData[0].totalPhones,
        name: "Mobiles",
        itemStyle: { color: "#ffc658" }
      });
    }
    
    if (devicesData[1]?.totalTablets !== undefined) {
      deviceData.push({
        value: devicesData[1].totalTablets,
        name: "Tablets",
        itemStyle: { color: "#82ca9d" }
      });
    }
    
    if (devicesData[2]?.totalDekstopDevices !== undefined) {
      deviceData.push({
        value: devicesData[2].totalDekstopDevices,
        name: "Desktop",
        itemStyle: { color: "#8884d8" }
      });
    }
    
    return deviceData;
  };

  // Prepare referral data for bar chart - dynamic approach
  const getReferralData = () => {
    if (!userRefferalSources) return [];
    
    // Convert the object to an array and sort by value (descending)
    const sortedSources = Object.entries(userRefferalSources)
      .sort((a, b) => b[1] - a[1]);
    
    // Take top 10 sources and group the rest as "Other"
    const topSources = sortedSources.slice(0, 10);
    const otherSources = sortedSources.slice(10);
    
    const otherCount = otherSources.reduce((sum, [, count]) => sum + count, 0);
    
    // Prepare data for chart
    const chartData = topSources.map(([source, count], index) => ({
      value: count,
      name: source.charAt(0).toUpperCase() + source.slice(1),
      itemStyle: { color: getColorForIndex(index) }
    }));
    
    // Add "Other" category if there are remaining sources
    if (otherCount > 0) {
      chartData.push({
        value: otherCount,
        name: "Other",
        itemStyle: { color: "#ffbb28" }
      });
    }
    
    return chartData;
  };

  // Helper function to generate colors for chart items
  const getColorForIndex = (index: number) => {
    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe",
      "#00c49f", "#ff6b6b", "#339af0", "#51cf66", "#fcc419"
    ];
    return colors[index % colors.length];
  };

  // Prepare page activity data for table
  const getPageActivityData = () => {
    if (!userPageActivity) return [];
    
    return Object.entries(userPageActivity)
      .map(([path, data]) => ({
        path,
        activeUsers: Math.round((data.hours * 3600 + data.minutes * 60 + data.seconds) / 60), // Estimate users based on time
        timeSpent: data.formatted,
        avgTime: data.formatted // Using same value for simplicity
      }))
      .sort((a, b) => b.activeUsers - a.activeUsers); // Sort by active users descending
  };

  // Get paginated page activity data
  const getPaginatedPageActivityData = () => {
    const allData = getPageActivityData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allData.slice(startIndex, endIndex);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(getPageActivityData().length / itemsPerPage);

  // Pie chart options for user devices
  const pieOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#333",
      },
    },
    series: [
      {
        name: "User Devices",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        startAngle: 180,
        endAngle: 360,
        data: getDeviceData(),
        label: {
          show: true,
          formatter: "{b}: {c} ({d}%)",
          color: "#333",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    ],
  };

  // Bar chart options for referral sources
  const barOption = {
    title: {
      text: "User Referral Sources",
      textStyle: {
        color: "#333",
      },
      left: "center",
    },
    xAxis: {
      type: 'category',
      data: getReferralData().map(item => item.name),
      axisLabel: {
        color: "#333",
        interval: 0,
        rotate: 30, // Rotate labels for better fit
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#333",
      },
    },
    series: [
      {
        type: "bar",
        data: getReferralData(),
        universalTransition: {
          enabled: true,
          divideShape: "clone",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c} users",
    },
    grid: {
      bottom: '20%' // Add space for rotated labels
    },
  };



  // Get current table data based on selected time filter
  // const currentTableData = tableDataByPeriod[timeFilter];

  useEffect(() => {
    if (pieChartRef.current) {
      const pieChart = echarts.init(pieChartRef.current);
      pieChart.setOption(pieOption);

      const handleResize = () => {
        pieChart.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        pieChart.dispose();
      };
    }
  }, [devicesData, pieOption]);

  useEffect(() => {
    if (barChartRef.current) {
      const barChart = echarts.init(barChartRef.current);
      barChart.setOption(barOption);

      // Add click event for drilldown
      barChart.off("click");
      barChart.on("click", function (params) {
        if (!isDrilldown) {
          setIsDrilldown(true);
          setCurrentData(params.name as DrilldownKey);
        }
      });

      const handleResize = () => {
        barChart.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        barChart.dispose();
      };
    }
  }, [userRefferalSources, isDrilldown, currentData, barOption]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-5 md:px-6 pb-6 text-gray-800 overflow-x-hidden">
      {/* Chart 1: User Devices Pie Chart */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="w-full lg:w-1/3 bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <div className="p-3 bg-pink-100 rounded-xl mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              User Devices
            </h2>
          </div>
          <div ref={pieChartRef} className="h-64 md:h-80"></div>
        </div>

        {/* Chart 2: User Referral Bar Chart */}
        <div className="w-full lg:w-2/3 bg-gradient-to-br from-white to-violet-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <div className="p-3 bg-violet-100 rounded-xl mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              Referral Sources
            </h2>
            <div className="flex items-center">
              <label htmlFor="timeFilter" className="mr-2 text-sm font-semibold text-gray-700">
                Period:
              </label>
              <select
                id="timeFilter"
                value={timeFilter2}
                onChange={(e) => {
                  setTimeFilter2(e.target.value);
                  setDuration(e.target.value);
                  setQueryType("User Referral Sources");
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 font-medium"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 6 Month">Last 6 Months</option>
                <option value="Last 1 Year">Last 12 Months</option>
                <option value="All Time">All Time</option>
              </select>
            </div>
          </div>
          <div ref={barChartRef} className="h-64 md:h-80"></div>
        </div>
      </div>

      {/* Table: User Page Activity */}
      <div className="w-full bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-lg overflow-x-auto border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            User Page Activity
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="timeFilter" className="mr-2 text-sm font-semibold text-gray-700">
                Period:
              </label>
              <select
                id="timeFilter"
                value={timeFilter}
                onChange={(e) => {
                  setTimeFilter(e.target.value);
                  setDuration(e.target.value);
                  setQueryType("User Page Activity");
                  setCurrentPage(1); // Reset to first page when changing time filter
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-medium"
              >
                <option value="7 days">Last 7 Days</option>
                <option value="30 days">Last 30 Days</option>
                <option value="6 months">Last 6 Months</option>
                <option value="12 months">Last 12 Months</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="itemsPerPage" className="mr-2 text-sm font-semibold text-gray-700">
                Rows:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-medium"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100 to-orange-50">
                <th className="px-5 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Link Path</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Users</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Time Spent</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Average Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {getPaginatedPageActivityData().length > 0 ? (
                getPaginatedPageActivityData().map((row, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white hover:bg-orange-50" : "bg-gray-50 hover:bg-orange-50"}`}
                  >
                    <td className="px-5 py-3 text-sm font-medium text-gray-800">{row.path}</td>
                    <td className="px-5 py-3 text-sm font-medium text-gray-800">{row.activeUsers}</td>
                    <td className="px-5 py-3 text-sm font-medium text-gray-800">{row.timeSpent}</td>
                    <td className="px-5 py-3 text-sm font-bold text-orange-600">{row.avgTime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-500 font-medium">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-700">
              Showing <span className="text-orange-600">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-orange-600">{Math.min(currentPage * itemsPerPage, getPageActivityData().length)}</span> of{' '}
              <span className="text-orange-600">{getPageActivityData().length}</span> entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-300 transition-all"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 font-bold rounded-lg transition-all ${
                      currentPage === pageNum
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-300 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Row3;