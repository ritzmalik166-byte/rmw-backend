// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Monitor, Home } from 'lucide-react';
// import Link from 'next/link';

// interface ServiceData {
//     [key: string]: any;
// }

// function Page() {
//     const [data, setData] = useState<ServiceData[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await axios.get('/api/update-service-ai-data');
//                 const responseData = response.data.data[0];

//                 if (responseData && responseData.rows) {
//                     setData(responseData.rows);
//                 } else if (Array.isArray(responseData)) {
//                     setData(responseData);
//                 } else {
//                     setData([]);
//                 }
//             } catch (err: any) {
//                 console.error('Error fetching service AI data:', err);
//                 setError(err.response?.data?.message || 'Failed to fetch data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);


//     useEffect(() => {
//         async function updateData() {
//             if (data.length > 0) {
//                 for (let i = 0; i < data.length; i++) {
//                     let obj = data[i];
//                     let newS33Para = obj.s2para.split("—").join(", ");
//                     console.log('this is obj id ', obj.id, 'and this is new s3para ', newS33Para);
//                     const res = await axios.patch(`/api/update-service-ai-data/${obj.id}`, { s3para: newS33Para });
//                     console.log("this is response ", res);
//                 }
//             }
//         }
//         updateData();
//     }, [data]);

//     return (
//         <div className="bg-[#EEEEEE] min-h-screen p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 md:gap-12">
//             {/* Header */}
//             <div className="flex items-center justify-between flex-wrap gap-4">
//                 <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
//                     <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
//                     AI Data Update
//                 </h1>
//             </div>

//             {/* Breadcrumb */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm text-sm sm:text-base">
//                 <h1 className="text-[#2955B3] flex items-center gap-2">
//                     <Home className="w-4 h-4" />
//                     <Link href="/" title="Home" target="_blank" className="hover:underline">Home</Link>
//                 </h1>
//                 <span className="text-[#ACACAC] font-bold">/</span>
//                 <h1 className="text-[#838383] flex items-center gap-2">
//                     <Monitor className="w-4 h-4" />
//                     AI Data Update
//                 </h1>
//             </div>

//             {/* Content Card */}
//             <div className="bg-white p-6 sm:p-8 rounded-md shadow-md flex flex-col gap-4 md:gap-6">
//                 {loading && (
//                     <div className="flex items-center justify-center py-12">
//                         <div className="text-lg text-[#838383]">Loading data...</div>
//                     </div>
//                 )}

//                 {error && (
//                     <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                         <p className="text-red-600 font-semibold">Error:</p>
//                         <p className="text-red-500">{error}</p>
//                     </div>
//                 )}

//                 {!loading && !error && (
//                     <>
//                         <div className="flex items-center justify-between flex-wrap gap-4">
//                             <h2 className="text-2xl sm:text-3xl font-semibold text-[#222222]">
//                                 Service AI Data
//                             </h2>
//                             <div className="text-sm text-[#838383]">
//                                 Total Records: {data.length}
//                             </div>
//                         </div>

//                         {data.length === 0 ? (
//                             <div className="text-center py-12 text-[#838383]">
//                                 No data available
//                             </div>
//                         ) : (
//                             <div className="overflow-x-auto">
//                                 <table className="w-full border-collapse">
//                                     <thead>
//                                         <tr className="bg-[#F5F5F5] border-b-2 border-[#E0E0E0]">
//                                             {data.length > 0 && Object.keys(data[0]).map((key) => (
//                                                 <th
//                                                     key={key}
//                                                     className="px-4 py-3 text-left text-sm font-semibold text-[#222222] uppercase"
//                                                 >
//                                                     {key}
//                                                 </th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {data.map((row, index) => (
//                                             <tr
//                                                 key={index}
//                                                 className="border-b border-[#E0E0E0] hover:bg-[#F9F9F9] transition-colors"
//                                             >
//                                                 {Object.values(row).map((value: any, cellIndex) => (
//                                                     <td
//                                                         key={cellIndex}
//                                                         className="px-4 py-3 text-sm text-[#555555]"
//                                                     >
//                                                         {value !== null && value !== undefined
//                                                             ? String(value)
//                                                             : '-'}
//                                                     </td>
//                                                 ))}
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Page;
