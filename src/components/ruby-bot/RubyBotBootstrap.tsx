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
import styles from './page.module.css';
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

function RubyBotBootstrap() {
    const context = useContext(RubyContext);
    if (!context) {
        throw new Error('RubyBotBootstrap must be used within RubyProvider');
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
    const [isTyping, setIsTyping] = useState(false);
    const [showEnquiryButton, setShowEnquiryButton] = useState(false);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
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
    console.log(uniqueId);

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

        const newMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
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

            // Call API to get bot response
            axios.post('https://api.ritzmediaworld.in/api/v1/chat', {
                message: messageText,
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

        // Prepare enquiry data
        const enquiryData = {
            etype: "ContactUs",
            name: enquiryForm.name.trim(),
            phone: phoneResult.e164,
            email: enquiryForm.email.trim(),
            message: enquiryForm.message.trim() || "Enquiry from Ruby Chatbot",
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

    return (
        isRubyOpen && (
            <div className={styles.chatContainer}>
                <div className={styles.chatWindow}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            <div className={styles.avatarContainer}>
                                <div className={styles.avatar}>
                                    <img src="/ruby-logo3.jpg" alt="RubyBot" className={styles.avatarImage} />
                                </div>
                                <div className={styles.statusIndicator}></div>
                            </div>
                            <div className={styles.headerInfo}>
                                <h2 className={styles.headerTitle}>Ruby</h2>
                                <div className={styles.statusContainer}>
                                    <span className={styles.statusText}>Online Now</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.headerRight}>
                            <button
                                onClick={() => setIsRubyOpen(false)}
                                className={styles.closeButton}
                                aria-label="Close chat"
                            >
                                <IoMdClose className={styles.closeIcon} />
                            </button>
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className={styles.messageArea}>
                        {messages.map((message, index) => {
                            const isFirstInSequence =
                                index === 0 ||
                                messages[index - 1].sender !== message.sender ||
                                message.isFirstInSequence;

                            if (message.sender === 'bot') {
                                return (
                                    <div key={message.id} className={styles.messageRow}>
                                        {isFirstInSequence && (
                                            <div className={styles.botAvatar}>
                                                <img src="/ruby-logo3.jpg" alt="Ruby" className={styles.botAvatarImage} />
                                            </div>
                                        )}
                                        {!isFirstInSequence && <div className={styles.avatarSpacer}></div>}
                                        <div className={styles.messageContent}>
                                            <div className={styles.botMessage}>
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={message.id} className={styles.userMessageRow}>
                                        <div className={styles.messageContent}>
                                            <div className={styles.userMessage}>
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className={styles.messageRow}>
                                <div className={styles.botAvatar}>
                                    <img src="/ruby-logo3.jpg" alt="Ruby" className={styles.botAvatarImage} />
                                </div>
                                <div className={styles.messageContent}>
                                    <div className={styles.botMessage}>
                                        <div className={styles.typingDots}>
                                            <span className={styles.typingDot} style={{ animationDelay: '0ms' }}></span>
                                            <span className={styles.typingDot} style={{ animationDelay: '150ms' }}></span>
                                            <span className={styles.typingDot} style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Enquiry Button - Aligned with bot messages */}
                        {showEnquiryButton && !showEnquiryForm && (
                            <div className={styles.messageRow}>
                                <div className={styles.avatarSpacer}></div>
                                <div className={styles.messageContent}>
                                    <button
                                        onClick={() => setShowEnquiryForm(true)}
                                        className={styles.enquiryButton}
                                    >
                                        📋 Fill Enquiry Form
                                    </button>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Enquiry Form */}
                    {showEnquiryForm && (
                        <div className={styles.enquiryFormContainer}>
                            <div className={styles.enquiryFormContent}>
                                <div className={styles.enquiryFormHeader}>
                                    <h3 className={styles.enquiryFormTitle}>Enquiry Form</h3>
                                    <button
                                        onClick={handleCloseEnquiryForm}
                                        className={styles.enquiryFormCloseButton}
                                        aria-label="Close form"
                                    >
                                        <IoMdClose className={styles.enquiryFormCloseIcon} />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    value={enquiryForm.name}
                                    onChange={(e) => handleEnquiryFormChange('name', e.target.value)}
                                    className={styles.formInput}
                                />

                                <div className={styles.phoneRow}>
                                    <select
                                        aria-label="Country calling code"
                                        value={enquiryPhoneCountry.code}
                                        onChange={(e) => {
                                            const next = SORTED_CONTACT_COUNTRIES.find(
                                                (c) => c.code === e.target.value,
                                            );
                                            if (next) setEnquiryPhoneCountry(next);
                                        }}
                                        className={styles.formSelect}
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
                                        className={styles.formInput}
                                    />
                                </div>

                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    value={enquiryForm.email}
                                    onChange={(e) => handleEnquiryFormChange('email', e.target.value)}
                                    className={styles.formInput}
                                />

                                <textarea
                                    placeholder="Your Message (Optional)"
                                    value={enquiryForm.message}
                                    onChange={(e) => handleEnquiryFormChange('message', e.target.value)}
                                    rows={3}
                                    className={styles.formTextarea}
                                />

                                <div className={styles.formButtons}>
                                    <button
                                        onClick={handleSubmitEnquiry}
                                        disabled={isSubmittingEnquiry}
                                        className={styles.submitButton}
                                    >
                                        {isSubmittingEnquiry ? (
                                            <>
                                                <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                                        className={styles.cancelButton}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Reply Buttons */}
                    {messages.length === 1 && !showEnquiryForm && (
                        <div className={styles.quickRepliesContainer}>
                            <div className={styles.quickReplies}>
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply.id}
                                        onClick={() => handleQuickReply(reply)}
                                        className={styles.quickReplyButton}
                                    >
                                        {reply.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className={styles.footer}>
                        <div className={styles.footerInputContainer}>
                            <div className={styles.inputWrapper}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Reply to Ruby..."
                                    className={styles.messageInput}
                                />
                                <button
                                    onClick={handleSpeechToggle}
                                    type="button"
                                    disabled={!isSpeechSupported}
                                    className={styles.sendButton}
                                    aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                                    title={isSpeechSupported ? (isListening ? 'Stop voice input' : 'Start voice input') : 'Speech recognition not supported in this browser'}
                                    style={{
                                        color: isListening ? '#ef4444' : '#001697',
                                        opacity: isSpeechSupported ? 1 : 0.4,
                                        cursor: isSpeechSupported ? 'pointer' : 'not-allowed',
                                    }}
                                >
                                    {isListening ? (
                                        <FiMicOff className={styles.sendIcon} />
                                    ) : (
                                        <FiMic className={styles.sendIcon} />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleSendMessage()}
                                    type="button"
                                    className={styles.sendButton}
                                    aria-label="Send message"
                                >
                                    <FiSend className={styles.sendIcon} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.footerText}>
                            <p className={styles.footerCredits}>
                                We're ⚡ by Ritz Media World
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default RubyBotBootstrap;
