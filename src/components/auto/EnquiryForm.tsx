"use client";

import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

function EnquiryForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: 'Select a service',
        message: '',
    });

    // Services list
    const services = [
        'Select a service',
        'Digital Marketing',
        'Print Advertising',
        'Radio Advertising',
        'Creative Services',
        'Content Marketing',
        'Web Development',
        'Celebrity Endorsements',
        'Influencer Marketing',
    ];

    // Auto-open after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear error message when user starts typing
        if (submitStatus === 'error') {
            setSubmitStatus('idle');
            setErrorMessage('');
        }
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            setErrorMessage('Please enter your name');
            setSubmitStatus('error');
            return false;
        }

        if (!formData.phone.trim()) {
            setErrorMessage('Please enter your phone number');
            setSubmitStatus('error');
            return false;
        }

        if (!formData.email.trim()) {
            setErrorMessage('Please enter your email address');
            setSubmitStatus('error');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Please enter a valid email address');
            setSubmitStatus('error');
            return false;
        }

        if (!formData.service || formData.service === 'Select a service') {
            setErrorMessage('Please select a service');
            setSubmitStatus('error');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        // Concatenate service with message
        let finalMessage = formData.message.trim() || 'Enquiry from website';
        if (formData.service && formData.service !== 'Select a service') {
            finalMessage = `[Service: ${formData.service}] ${finalMessage}`;
        }

        // Prepare enquiry data
        const enquiryData = {
            etype: 'ContactUs',
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: finalMessage,
        };

        try {
            const response = await axios.post('/api/system-settings/contact-enquiry', enquiryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setSubmitStatus('success');
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    service: 'Select a service',
                    message: '',
                });
                // Close form after 2 seconds
                setTimeout(() => {
                    setIsOpen(false);
                    setSubmitStatus('idle');
                }, 2000);
            } else {
                setErrorMessage(response.data.error || 'Failed to submit enquiry. Please try again.');
                setSubmitStatus('error');
            }
        } catch (error: any) {
            console.error('Enquiry submission error:', error);
            setErrorMessage(
                error.response?.data?.error || 'Due to internal server errors your enquiry couldn\'t be sent. Please try again.'
            );
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setSubmitStatus('idle');
        setErrorMessage('');
    };

    if (!isOpen) return null;

    return (
        <>
            <link
                title="Montserrat and Poppins"
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
            <div className="relative w-[92vw] sm:w-full max-w-md sm:max-w-2xl my-2 sm:my-0 max-h-[82dvh] sm:max-h-[95dvh] bg-white rounded-xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-all duration-200 p-2 z-10 hover:bg-gray-100 rounded-full"
                    aria-label="Close form"
                >
                    <IoMdClose className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Header */}
                <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-3 sm:pb-6 border-b-2 border-[#0F1640]">
                    <h2 className="text-[#0F1640] text-xl sm:text-3xl font-bold mb-1 sm:mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get In Touch</h2>
                    <p className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>Fill out the form below and we'll get back to you</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-4 sm:px-8 py-3 sm:py-6">
                    {/* First Row: Name and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {/* Name Field */}
                        <div>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Name*"
                                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 rounded-none outline-none focus:border-[#0F1640] transition-all bg-transparent text-gray-900 placeholder:text-gray-400"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                required
                            />
                        </div>

                        {/* Phone Field */}
                        <div>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="Phone*"
                                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 rounded-none outline-none focus:border-[#0F1640] transition-all bg-transparent text-gray-900 placeholder:text-gray-400"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                required
                            />
                        </div>
                    </div>

                    {/* Second Row: Email and Service */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Email*"
                                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 rounded-none outline-none focus:border-[#0F1640] transition-all bg-transparent text-gray-900 placeholder:text-gray-400"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                required
                            />
                        </div>

                        {/* Service Select */}
                        <div>
                            <select
                                id="service"
                                value={formData.service}
                                onChange={(e) => handleInputChange('service', e.target.value)}
                                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 rounded-none outline-none focus:border-[#0F1640] transition-all bg-transparent text-gray-900 cursor-pointer appearance-none"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                required
                            >
                                {services.map((service, index) => (
                                    <option key={index} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Third Row: Message */}
                    <div className="mb-4 sm:mb-6">
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Message (Optional)"
                            rows={3}
                            className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 rounded-none outline-none focus:border-[#0F1640] transition-all bg-transparent text-gray-900 placeholder:text-gray-400 resize-none"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        />
                    </div>

                    {/* Error Message */}
                    {submitStatus === 'error' && errorMessage && (
                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-4">
                            <p className="text-sm text-red-600 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{errorMessage}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg mb-4">
                            <p className="text-sm text-green-600 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Thank you for your enquiry! We'll get back to you soon. 😊
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 sm:py-4 bg-[#0F1640] text-white rounded-lg font-semibold hover:bg-[#0d1333] transition-all duration-300 cursor-pointer touch-manipulation active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0F1640] flex items-center justify-center gap-2 shadow-lg"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            'Submit Enquiry'
                        )}
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

export default EnquiryForm;
