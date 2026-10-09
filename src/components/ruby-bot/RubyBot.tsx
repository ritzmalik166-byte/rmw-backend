"use client";
import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    DEFAULT_CONTACT_COUNTRY,
    SORTED_CONTACT_COUNTRIES,
    validateContactPhone,
    type CountryEntry,
} from '@/lib/contactPhoneValidation';
import { IoMdClose } from 'react-icons/io';
import { FiMic, FiMicOff, FiSend } from 'react-icons/fi';
import axios from 'axios';
import { RubyContext } from '@/ruby-context/ruby.context';
import uniqueIdGenerator from '@/helper/unique_id_generator';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    isFirstInSequence?: boolean;
}

interface QuickReply {
    id: string;
    text: string;
}

function RubyBot() {
    const context = useContext(RubyContext);
    if (!context) {
        throw new Error('RubyBot must be used within RubyProvider');
    }
    const { isRubyOpen, setIsRubyOpen } = context;
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello 👋 I'm Ruby.\nWelcome to Ritz Media World.\n\nIf you're exploring our services, campaigns, or capabilities,\nI'm here to help you 😊",
            sender: 'bot',
            timestamp: new Date(),
            isFirstInSequence: true,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [selectedService, setSelectedService] = useState<string>('Select a service');
    const [isTyping, setIsTyping] = useState(false);
    const [showEnquiryButton, setShowEnquiryButton] = useState(false);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
    const [uniqueId, setUniqueId] = useState<string | null>(null);

    useEffect(() => {
        const saved_id: string | null = localStorage.getItem('RMW_RUBY_BOT_ID');
        if (!saved_id) {
            const new_id = uniqueIdGenerator();
            localStorage.setItem('RMW_RUBY_BOT_ID', new_id);
            setUniqueId(new_id);
        } else {
            setUniqueId(saved_id);
        }
    }, []);

    const [enquiryForm, setEnquiryForm] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [enquiryPhoneCountry, setEnquiryPhoneCountry] =
        useState<CountryEntry>(() => DEFAULT_CONTACT_COUNTRY);
    const [quickReplies] = useState<QuickReply[]>([
        { id: '1', text: 'Get Started' },
        { id: '2', text: 'Learn More' },
        { id: '3', text: 'Contact Sales' },
    ]);

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

    // Keywords for service-related queries
    const serviceKeywords = [
        'service', 'services', 'what do you do', 'what do you offer', 'what you do', 'what you offer',
        'what can you', 'what are your', 'tell me about', 'tell me more', 'list', 'details', 'offerings',
        'how can you help', 'help me with', 'your company', 'about ritz', 'about you',
        'all service', 'complete service', 'show me', 'available service'
    ];

    // Keywords for contact/pricing queries
    const contactKeywords = [
        'contact', 'price', 'pricing', 'cost', 'charge', 'charges', 'quote', 'quotation', 'hire', 'project',
        'call', 'email', 'interested', 'talk', 'budget', 'estimate', 'how much', 'rate', 'fees', 'package'
    ];

    // Function to detect keywords in message
    const detectKeywords = (text: string): boolean => {
        const lowerText = text.toLowerCase();
        const allKeywords = [...serviceKeywords, ...contactKeywords];
        return allKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
    };
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const recognitionRef = useRef<any>(null);
    const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(true);
    const [isPanelMounted, setIsPanelMounted] = useState(false);
    const [isPanelActive, setIsPanelActive] = useState(false);
    const clearSilenceTimer = () => {
        if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
        }
    };

    const stopSpeechRecognition = () => {
        clearSilenceTimer();
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        } else {
            setIsListening(false);
        }
    };

    const resetSilenceTimer = () => {
        clearSilenceTimer();
        silenceTimeoutRef.current = setTimeout(() => {
            stopSpeechRecognition();
        }, 5000);
    };

    // Smooth open / close panel animation (delay active state so CSS transition runs)
    useEffect(() => {
        if (isRubyOpen) {
            setIsPanelMounted(true);
            setIsPanelActive(false);
            const openTimer = window.setTimeout(() => setIsPanelActive(true), 80);
            return () => window.clearTimeout(openTimer);
        }

        setIsPanelActive(false);
        const closeTimer = window.setTimeout(() => setIsPanelMounted(false), 450);
        return () => window.clearTimeout(closeTimer);
    }, [isRubyOpen]);

    // Initialize audio on mount
    useEffect(() => {
        const audio = new Audio('/msg-receive.mp3');
        audio.preload = 'auto';
        audio.volume = 0.7;
        audioRef.current = audio;

        // Try to load the audio
        try {
            audio.load();
        } catch (error) {
            console.log('Audio load failed:', error);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const SpeechRecognitionCtor =
            typeof window !== 'undefined'
                ? (
                    (window as typeof window & {
                        SpeechRecognition?: new () => any;
                        webkitSpeechRecognition?: new () => any;
                    }).SpeechRecognition ||
                    (window as typeof window & {
                        SpeechRecognition?: new () => any;
                        webkitSpeechRecognition?: new () => any;
                    }).webkitSpeechRecognition
                )
                : undefined;

        if (!SpeechRecognitionCtor) {
            setIsSpeechSupported(false);
            return;
        }

        const recognition = new SpeechRecognitionCtor();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        (recognition as any).onstart = () => {
            setIsListening(true);
            resetSilenceTimer();
        };

        recognition.onresult = (event: any) => {
            let transcript = '';
            for (let i = 0; i < event.results.length; i += 1) {
                transcript += event.results[i][0].transcript;
            }

            setInputValue(transcript.trimStart());
            resetSilenceTimer();
        };

        (recognition as any).onerror = () => {
            stopSpeechRecognition();
        };

        (recognition as any).onend = () => {
            clearSilenceTimer();
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            clearSilenceTimer();
            recognition.stop();
            recognitionRef.current = null;
        };
    }, []);

    const handleSpeechToggle = () => {
        if (!isSpeechSupported || !recognitionRef.current) return;
        if (isListening) {
            stopSpeechRecognition();
            return;
        }

        recognitionRef.current.start();
        inputRef.current?.focus();
    };

    const playNotificationSound = () => {
        try {
            if (audioRef.current) {
                // Reset to start and play
                audioRef.current.currentTime = 0;
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            // Audio is playing
                        })
                        .catch((error) => {
                            console.log('Audio play failed:', error);
                            // Try to create a new audio instance if the current one fails
                            const newAudio = new Audio('/msg-receive.mp3');
                            newAudio.volume = 0.7;
                            newAudio.play().catch((err) => {
                                console.log('Retry audio play failed:', err);
                            });
                        });
                }
            } else {
                // Create audio element if it doesn't exist
                const audio = new Audio('/msg-receive.mp3');
                audio.volume = 0.7;
                audioRef.current = audio;
                audio.play().catch((error) => {
                    console.log('Audio play failed:', error);
                });
            }
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleChatting = async (message: { user_message: string, bot_reply: string }) => {
        const response = await axios.post('/api/chatting', {
            message: message,
        });
        return response.data;
    };

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        // Concatenate selected service with message if service is selected
        let finalMessage = messageText;
        if (selectedService && selectedService !== 'Select a service') {
            finalMessage = `[Service: ${selectedService}] ${messageText}`;
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            text: messageText, // Display original message without service prefix
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');

        // Check for keywords in user message
        if (detectKeywords(messageText)) {
            setShowEnquiryButton(true);
        }

        // Show typing indicator
        setTimeout(() => {
            setIsTyping(true);

            // Call API to get bot response with concatenated message
            axios.post('https://api.ritzmediaworld.in/api/v1/chat', {
                message: finalMessage,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then((response) => {
                    // After API response, display the message
                    setTimeout(() => {
                        const botResponseText = response.data.answer || "I'm sorry, I couldn't process that. Please try again.";
                        const botResponse: Message = {
                            id: Date.now().toString(),
                            text: botResponseText,
                            sender: 'bot',
                            timestamp: new Date(),
                        };
                        const user_conversations = {
                            user_message: messageText,
                            bot_reply: botResponseText,
                            user_id: uniqueId
                        }
                        handleChatting(user_conversations);
                        setMessages((prev) => [...prev, botResponse]);
                        setIsTyping(false);

                        // Check for keywords in bot response
                        if (detectKeywords(botResponseText)) {
                            setShowEnquiryButton(true);
                        }

                        // Play notification sound when bot replies (with small delay to ensure message is rendered)
                        setTimeout(() => {
                            playNotificationSound();
                        }, 100);
                    }, 500); // Small delay after API response
                })
                .catch((error) => {
                    console.error('Error fetching bot response:', error);
                    // Show error message if API fails
                    setTimeout(() => {
                        const botResponse: Message = {
                            id: Date.now().toString(),
                            text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                            sender: 'bot',
                            timestamp: new Date(),
                        };
                        setMessages((prev) => [...prev, botResponse]);
                        setIsTyping(false);
                    }, 500);
                });
        }, 500);
    };

    const handleQuickReply = (reply: QuickReply) => {
        handleSendMessage(reply.text);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEnquiryFormChange = (field: string, value: string) => {
        setEnquiryForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmitEnquiry = async () => {
        // Validate form
        if (!enquiryForm.name.trim() || !enquiryForm.phone.trim() || !enquiryForm.email.trim()) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: "Please fill in all required fields (Name, Phone, Email)",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            return;
        }

        const nationalDigits = enquiryForm.phone.replace(/\D/g, "");
        const phoneResult = validateContactPhone(
            nationalDigits,
            enquiryPhoneCountry,
        );
        if (!phoneResult.ok) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: phoneResult.error,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(enquiryForm.email)) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: "Please enter a valid email address",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            return;
        }

        // Set loading state
        setIsSubmittingEnquiry(true);

        // Prepare message with selected service if applicable
        let enquiryMessage = enquiryForm.message.trim() || "Enquiry from Ruby Chatbot";
        if (selectedService && selectedService !== 'Select a service') {
            enquiryMessage = `[Service: ${selectedService}] ${enquiryMessage}`;
        }

        // Prepare enquiry data
        const enquiryData = {
            etype: "ContactUs",
            name: enquiryForm.name.trim(),
            phone: phoneResult.e164,
            email: enquiryForm.email.trim(),
            message: enquiryMessage,
        };

        try {
            const response = await axios.post('/api/system-settings/contact-enquiry', enquiryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                // Show success message
                const successMessage: Message = {
                    id: Date.now().toString(),
                    text: "Thank you for your enquiry! We'll get back to you soon. 😊",
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, successMessage]);

                // Reset form and close
                setEnquiryForm({ name: '', phone: '', email: '', message: '' });
                setEnquiryPhoneCountry(DEFAULT_CONTACT_COUNTRY);
                setShowEnquiryForm(false);
                setShowEnquiryButton(false);
            } else {
                // Show error message
                const errorMessage: Message = {
                    id: Date.now().toString(),
                    text: response.data.error || "Failed to submit enquiry. Please try again.",
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            }
        } catch (error: any) {
            console.error('Enquiry submission error:', error);
            // Show error message
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: error.response?.data?.error || "Due to internal server errors your enquiry couldn't be sent. Please try again.",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            // Reset loading state
            setIsSubmittingEnquiry(false);
        }
    };

    const handleCloseEnquiryForm = () => {
        setShowEnquiryForm(false);
        setEnquiryForm({ name: '', phone: '', email: '', message: '' });
        setEnquiryPhoneCountry(DEFAULT_CONTACT_COUNTRY);
    };

    if (!isPanelMounted) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 md:right-16 z-50 flex items-end sm:items-start justify-center sm:justify-end p-0 sm:p-4 transition-opacity duration-500 ease-out ${
                isPanelActive
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isPanelActive}
        >
            <div
                className={`w-full h-full sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-8rem)] sm:rounded-xl bg-white shadow-2xl flex flex-col sm:max-w-[calc(100vw-2rem)] relative will-change-transform transition-[transform,opacity] duration-700 ease-out ${
                    isPanelActive
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-10 scale-90 opacity-0 sm:translate-y-8"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
            >
                    {/* Header */}
                    <div className="bg-[#bc8429] px-3 sm:px-4 py-2.5 sm:py-3 sm:rounded-t-xl flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 overflow-hidden  bg-white rounded-full flex items-center justify-center">
                                    <img src="/ruby-logo3.jpg" alt="Ritz Media World" title="Ritz Media World" className="w-[100%] h-[100%] object-cover" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-[#19d408]"></div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-white font-semibold text-xs sm:text-sm leading-tight">Ruby</h2>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] sm:text-xs text-white/90">Online Now</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsRubyOpen(false)}
                                className="text-white/90 cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:rotate-[360deg] p-1.5 sm:p-1 touch-manipulation"
                                aria-label="Close chat"
                            >
                                <IoMdClose className="w-5 h-5 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className={`flex-1 overflow-y-auto bg-white px-3 sm:px-4 py-3 sm:py-4 space-y-2 sm:space-y-3 relative ${!showEnquiryForm ? 'pb-14 sm:pb-6' : ''}`}>
                        {messages.map((message, index) => {
                            const isFirstInSequence =
                                index === 0 ||
                                messages[index - 1].sender !== message.sender ||
                                message.isFirstInSequence;

                            if (message.sender === 'bot') {
                                return (
                                    <div key={message.id} className="flex items-start gap-2">
                                        {isFirstInSequence && (
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 border border-[#001697] bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                                                <img src="/ruby-logo3.jpg" alt="Ritz Media World" title="Ritz Media World" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                        )}
                                        {!isFirstInSequence && <div className="w-5 sm:w-6"></div>}
                                        <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]">
                                            <div
                                                className="bg-[#f3f4f6] text-[#1f2937] px-3 sm:px-4 py-2 sm:py-2.5 rounded-3xl rounded-bl-md text-xs sm:text-sm leading-relaxed whitespace-pre-line"
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={message.id} className="flex justify-end">
                                        <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]">
                                            <div className="bg-[#001697] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-3xl rounded-br-md text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex items-start gap-2">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 border border-[#001697] bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                                    <img src="/ruby-logo3.jpg" alt="Ritz Media World" title="Ritz Media World" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]">
                                    <div className="bg-[#f3f4f6] text-[#1f2937] px-3 sm:px-4 py-2 sm:py-2.5 rounded-3xl rounded-bl-md text-xs sm:text-sm leading-relaxed">
                                        <div className="flex gap-1.5 items-center py-1">
                                            <span className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />

                        {/* Permanent Enquiry Form Button - Fixed position right side in chat history */}
                        {!showEnquiryForm && (
                            <div className="w-full flex justify-end items-end">
                                <button
                                    onClick={() => setShowEnquiryForm(true)}
                                    className="px-2  sm:px-3 py-1.5 sm:py-2 bg-[#001697] text-white rounded-lg text-[10px] sm:text-xs font-medium hover:bg-[#001580] transition-colors cursor-pointer touch-manipulation active:scale-95 flex items-center gap-1 shadow-lg z-10"
                                    aria-label="Open enquiry form"
                                >
                                    <span>📋</span>
                                    <span className="hidden sm:inline">Enquiry</span>
                                </button></div>
                        )}
                    </div>

                    {/* Enquiry Form */}
                    {showEnquiryForm && (
                        <div className="px-3 sm:px-4 pb-3 border-t border-gray-200 bg-gray-50">
                            <div className="pt-3 space-y-3">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-[#1f2937]">Enquiry Form</h3>
                                    <button
                                        onClick={handleCloseEnquiryForm}
                                        className="text-[#6b7280] hover:text-[#1f2937] transition-colors p-1"
                                        aria-label="Close form"
                                    >
                                        <IoMdClose className="w-4 h-4" />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    value={enquiryForm.name}
                                    onChange={(e) => handleEnquiryFormChange('name', e.target.value)}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-[#001697] focus:ring-1 focus:ring-[#001697] bg-white"
                                />

                                <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                                    <select
                                        aria-label="Country calling code"
                                        value={enquiryPhoneCountry.code}
                                        onChange={(e) => {
                                            const next = SORTED_CONTACT_COUNTRIES.find(
                                                (c) => c.code === e.target.value,
                                            );
                                            if (next) setEnquiryPhoneCountry(next);
                                        }}
                                        className="w-full sm:w-[min(42%,9.5rem)] sm:flex-shrink-0 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-[#001697] focus:ring-1 focus:ring-[#001697] bg-white cursor-pointer"
                                    >
                                        {SORTED_CONTACT_COUNTRIES.map((c) => (
                                            <option key={c.code} value={c.code}>
                                                {c.flag} {c.dial_code} {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="Mobile (no country code) *"
                                        value={enquiryForm.phone}
                                        inputMode="numeric"
                                        autoComplete="tel-national"
                                        maxLength={15}
                                        onChange={(e) =>
                                            handleEnquiryFormChange(
                                                'phone',
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    '',
                                                ),
                                            )
                                        }
                                        className="w-full min-w-0 flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-[#001697] focus:ring-1 focus:ring-[#001697] bg-white"
                                    />
                                </div>

                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    value={enquiryForm.email}
                                    onChange={(e) => handleEnquiryFormChange('email', e.target.value)}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-[#001697] focus:ring-1 focus:ring-[#001697] bg-white"
                                />

                                {/* Service Select Dropdown */}
                                <select
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-[#001697] focus:ring-1 focus:ring-[#001697] bg-white text-[#1f2937] cursor-pointer"
                                >
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                </select>

                                <textarea
                                    placeholder="Your Message (Optional)"
                                    value={enquiryForm.message}
                                    onChange={(e) => handleEnquiryFormChange('message', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-[#001697] focus:ring-1 focus:ring-[#001697] bg-white resize-none"
                                />

                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={handleSubmitEnquiry}
                                        disabled={isSubmittingEnquiry}
                                        className="flex-1 px-4 py-2 bg-[#001697] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#001580] transition-colors cursor-pointer touch-manipulation active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#001697] flex items-center justify-center gap-2"
                                    >
                                        {isSubmittingEnquiry ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            'Submit Enquiry'
                                        )}
                                    </button>
                                    <button
                                        onClick={handleCloseEnquiryForm}
                                        disabled={isSubmittingEnquiry}
                                        className="px-4 py-2 border border-gray-300 text-[#1f2937] rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Reply Buttons */}
                    {messages.length === 1 && !showEnquiryForm && (
                        <div className="px-3 sm:px-4 pb-2 sm:pb-3">
                            <div className="flex flex-wrap gap-2">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply.id}
                                        onClick={() => handleQuickReply(reply)}
                                        className="px-3 sm:px-4 py-1.5 sm:py-2 border border-[#001697] text-[#001697] rounded-full text-xs font-medium hover:bg-[#001697] hover:text-white transition-colors cursor-pointer touch-manipulation active:scale-95"
                                    >
                                        {reply.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-white sm:rounded-b-xl flex-shrink-0 relative">
                        <div className="px-3 sm:px-4 py-2.5 sm:py-3">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Reply to Ruby..."
                                    className="flex-1 text-xs sm:text-sm text-[#1f2937] placeholder:text-[#6b7280] outline-none bg-transparent py-1.5 sm:py-0"
                                />
                                <button
                                    onClick={handleSpeechToggle}
                                    type="button"
                                    disabled={!isSpeechSupported}
                                    className={`transition-colors p-1.5 sm:p-1 touch-manipulation active:scale-95 ${isListening ? 'text-red-500 hover:text-red-600' : 'text-[#001697] hover:text-[#001697]'} ${!isSpeechSupported ? 'opacity-40 cursor-not-allowed' : ''}`}
                                    aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                                    title={isSpeechSupported ? (isListening ? 'Stop voice input' : 'Start voice input') : 'Speech recognition not supported in this browser'}
                                >
                                    {isListening ? (
                                        <FiMicOff className="w-5 h-5 sm:w-5 sm:h-5" />
                                    ) : (
                                        <FiMic className="w-5 h-5 sm:w-5 sm:h-5" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleSendMessage()}
                                    type="button"
                                    className="text-[#001697] hover:text-[#001697] transition-colors p-1.5 sm:p-1 touch-manipulation active:scale-95"
                                    style={{ cursor: 'pointer' }}
                                    aria-label="Send message"
                                >
                                    <FiSend className="w-5 h-5 sm:w-5 sm:h-5" style={{ cursor: 'pointer' }} />
                                </button>
                            </div>
                        </div>
                        <div className="px-3 sm:px-4 pb-2 sm:pb-2">
                            <p className="text-[9px] sm:text-[10px] text-[#6b7280] text-right">
                                We're ⚡ by Ritz Media World
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default RubyBot;