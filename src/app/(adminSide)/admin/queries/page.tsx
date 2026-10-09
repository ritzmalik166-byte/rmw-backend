"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  resume: string;
  category: string;
  message: string;
  created_at: string;
}

const FormSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("/api/get-submissions");
        const data = await res.json();

        if (data.success) {
          setSubmissions(data.data);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const exportToExcel = () => {
    const formattedData = submissions.map((sub) => ({
      ID: sub.id,
      Name: sub.name,
      Email: sub.email,
      Phone: sub.phone,
      Resume: sub.resume,
      Category: sub.category,
      Message: sub.message,
      "Submitted On": new Date(sub.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "form_submissions.xlsx");
  };

  return (
    <div className="container py-5">
      <div className="bg-white p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Form Submissions</h2>
          <button className="btn btn-success" onClick={exportToExcel}>
            Export to Excel
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>File</th>
                  <th>Category</th>
                  <th>Message</th>
                  <th>Submitted On</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.id}</td>
                    <td>{sub.name}</td>
                    <td>{sub.email}</td>
                    <td>{sub.phone}</td>
                    <td>
                      {sub.resume ? (
                        <a
                          href={sub.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {sub.resume.split("/").pop()}
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td>{sub.category}</td>
                    <td>{sub.message}</td>
                    <td>{new Date(sub.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSubmissions;
