
"use client";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast"; // Import toast

const CareerForm = () => {
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if captcha is verified
    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    try {
      // First upload the resume
      const resumeUploaded = await uploadResume(resumeFile);
      if (!resumeUploaded.success) {
        toast.error("Resume upload failed: " + resumeUploaded.error);
        return;
      }

      // Add the resume path to the form data
      formData.append("resumePath", resumeUploaded.filePath);
      formData.delete("resume"); // Remove the actual file from formData

      // Now submit the form with the resume path
      const formSubmitted = await submitFormFields(formData);
      if (!formSubmitted.success) {
        toast.error("Form submission failed: " + formSubmitted.error);
        return;
      }

      toast.success("Form submitted successfully!");
      form.reset();
      setCaptchaToken(null);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  // Function to handle form field submission (e.g., name, email, etc.)
  const submitFormFields = async (formData: FormData) => {
    try {
      formData.append("etype", "career");
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        body: formData,
      });
      // console.log("form: ", formData);

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error submitting form fields:", error);
      return { success: false, error: "Failed to submit form fields" };
    }
  };

  // Function to handle resume upload
  const uploadResume = async (resumeFile: File) => {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile); // Append the resume file

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error uploading resume:", error);
      return { success: false, error: "Failed to upload resume" };
    }
  };

  // Handle captcha verification
  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  return (
    <div
      className="bg-light py-5"
      style={{ paddingTop: "100px", marginTop: "75px" }}
    >
      <div className="container">
        <div
          className="bg-white p-5 rounded shadow-lg mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <h1 style={{ 
            fontSize: "2.5rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#333"
          }}>
            Join Our Team
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email A"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <input
                  name="phone"
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <select name="category" className="form-select" required>
                  <option value="" disabled selected>
                    Applying For...
                  </option>
                  <option value="uiux">UI/UX Designer</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="marketing">Marketing Executive</option>
                  {/* <!-- Newly Added Options --> */}
                  <option value="content-creator-lifestyle">Content Creator Lifestyle</option>
                  <option value="video-editor-cgi">Video Editor - CGI Specialist</option>
                  <option value="social-media-executive-spoc">Social Media Executive Spoc</option>
                  <option value="md-personal-secretary">Managing Director's Personal Secretary</option>
                  <option value="senior-video-editors">Senior Video Editors</option>
                  <option value="full-stack-developer">Full Stack Developer</option>
                  <option value="ai-video-generation-artist">AI Video Generation Artist</option>
                  <option value="sales-executive-media-agency">Sales Executive - Media Agency</option>
                  <option value="media-sales-manager">Media Sales Manager</option>
                  <option value="media-influencer-coordinator">Media Influencer Coordinator</option>
                  <option value="seo-executive">SEO Executive</option>
                  <option value="seo-intern">SEO Intern</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted">Upload Resume</label>
              <input
                name="resume"
                type="file"
                className="form-control border border-warning"
                required
              />
            </div>

            <div className="mb-4">
              <textarea
                className="form-control"
                name="message"
                rows={4}
                placeholder="Your Message or Query"
              ></textarea>
            </div>

            <div className="mb-4 text-center">
              <HCaptcha
                sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
                onVerify={handleCaptchaVerify}
                ref={captchaRef}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-2 fw-semibold text-white"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;