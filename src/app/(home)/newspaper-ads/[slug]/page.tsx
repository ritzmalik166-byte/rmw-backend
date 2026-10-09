"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Clock,
  Users,
  BookOpen,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Plus,
} from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import Feedback from "@/allPages/Homepage/Feedback";
import Footer from "@/components/footer/Footer";

interface NewspaperData {
  _id: string;
  paperName: string;
  slug: string;
  language: string;
  logoImg: string;
  price: number;
  spendType: string;
  location: {
    city: string;
    area: string;
    state: string;
    country: string;
  };
  areaCovered: string;
  category: string;
  publications: string;
  frequency: string;
  position: string;
  circulation: string;
  readership: string;
  title: string;
  desc: string;
  metaTitle: string;
  metaDesc: string;
}

interface AdvertisementData {
  _id: string;
  adtype: string;
  slug: string;
  adDesc: string;
  imgs: string[];
  baseRate: number;
  quantity: string;
  adLabel: string;
  adTiming: string;
  details: string;
  category: "Top Choice" | "Other Ad Options";
  parentID: string;
  metaTitle: string;
  metaDesc: string;
}

interface ApiResponse {
  newspaper: NewspaperData;
  advertisements: AdvertisementData[];
}

// Image Slider Component
interface ImageSliderProps {
  images: string[];
  adType: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, adType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className={styles.imageSliderContainer}>
      <div
        className={styles.imageSlider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${
              img.split("/images")[1]
            }`}
            alt={`${adType} example ${index + 1}`}
            width={400}
            height={200}
            className={styles.sliderImage}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className={`${styles.sliderControls} ${styles.sliderPrev}`}
            onClick={prevImage}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={`${styles.sliderControls} ${styles.sliderNext}`}
            onClick={nextImage}
          >
            <ChevronRight size={20} />
          </button>
          <div className={styles.sliderDots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.sliderDot} ${
                  index === currentIndex ? styles.active : ""
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const NewspaperDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<AdvertisementData | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Contact form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/newspaper-ads/${slug}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to fetch newspaper data");
        }
      } catch (err) {
        setError("Failed to fetch newspaper data. Please try again.");
        console.error("Error fetching newspaper data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // Modal handlers
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.phone.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const data = {
        etype: "NewspaperAdEnquiry",
        name: contactForm.name.trim(),
        phone: contactForm.phone.trim(),
        email: contactForm.email.trim(),
        message: `Newspaper: ${newspaper?.paperName || 'Unknown'}\n\nProject Details: ${contactForm.message.trim() || 'No additional details provided'}`,
      };

      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Quote request submitted successfully! We\'ll get back to you within 24 hours.'
        });
        
        // Reset form
        setContactForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Close modal after 3 seconds
        setTimeout(() => {
          setShowContactModal(false);
          setSubmitStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit quote request. Please try again.'
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus({
        type: 'error',
        message: 'Server error. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeeMore = (ad: AdvertisementData) => {
    setSelectedAd(ad);
    setShowCardModal(true);
  };

  const handleAddToBag = () => {
    setShowContactModal(true);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading newspaper details...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error || "Newspaper not found"}</p>
        <Link
          title="Back to Newspapers"
          href="/services/print-advertising/newspaper-ad-rates"
          className={styles.backButton}
        >
          <ArrowLeft size={16} />
          Back to Newspapers
        </Link>
      </div>
    );
  }

  const { newspaper, advertisements } = data;

  // Group advertisements by category
  const topChoiceAds = advertisements.filter(
    (ad) => ad.category === "Top Choice"
  );
  const otherAds = advertisements.filter(
    (ad) => ad.category === "Other Ad Options"
  );

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link
            title="Back to Newspapers"
            href="/services/print-advertising/newspaper-ad-rates"
            className={styles.backButton}
          >
            <ArrowLeft size={20} />
            Back to Newspapers
          </Link>
        </div>

        {/* Newspaper Info Section */}
        <div className={styles.newspaperInfo}>
          <div className={styles.newspaperHeader}>
            <div className={styles.logoContainer}>
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${
                  newspaper.logoImg.split("/images")[1]
                }`}
                alt={`${newspaper.paperName} logo`}
                width={120}
                height={120}
                className={styles.logo}
              />
            </div>
            <div className={styles.newspaperDetails}>
              <h1 className={styles.newspaperName}>{newspaper.paperName}</h1>
              <div className={styles.newspaperMeta}>
                <div className={styles.metaItem}>
                  <MapPin size={16} />
                  <span>
                    {newspaper.location.city}, {newspaper.location.state}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <Globe size={16} />
                  <span>{newspaper.language}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>{newspaper.frequency}</span>
                </div>
                <div className={styles.metaItem}>
                  <Users size={16} />
                  <span>Circulation: {newspaper.circulation}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.newspaperStats}>
            <div className={styles.statCard}>
              <DollarSign size={24} />
              <div>
                <h3>Starting Price</h3>
                <p>₹ {newspaper.price.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <BookOpen size={24} />
              <div>
                <h3>Readership</h3>
                <p>{newspaper.readership}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <MapPin size={24} />
              <div>
                <h3>Area Covered</h3>
                <p>{newspaper.areaCovered}</p>
              </div>
            </div>
          </div>

          {/* Add To Bag Button */}
          <div className={styles.addToBagSection}>
            <button className={styles.addToBagButton} onClick={handleAddToBag}>
              <Plus size={20} />
              Add To Bag
            </button>
          </div>
        </div>

        {/* Advertisements Section */}
        <div className={styles.advertisementsSection}>
          <h2 className={styles.sectionTitle}>
            Available Advertisement Options
          </h2>

          {/* Top Choice Advertisements */}
          {topChoiceAds.length > 0 && (
            <div className={styles.adCategory}>
              <h3 className={styles.categoryTitle}>Top Choice</h3>
              <div className={styles.adGrid}>
                {topChoiceAds.map((ad) => (
                  <div key={ad._id} className={styles.adCard}>
                    <ImageSlider images={ad.imgs} adType={ad.adtype} />
                    <div className={styles.adCardContent}>
                      <div className={styles.adHeader}>
                        <h4 className={styles.adType}>{ad.adtype}</h4>
                        <span className={styles.adPrice}>
                          ₹ {ad.baseRate.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className={styles.adDesc}>{ad.adDesc}</p>
                      <div className={styles.adDetails}>
                        <div className={styles.adDetailItem}>
                          <strong>Quantity:</strong> {ad.quantity}
                        </div>
                        <div className={styles.adDetailItem}>
                          <strong>Timing:</strong> {ad.adTiming}
                        </div>
                        {ad.adLabel && (
                          <div className={styles.adDetailItem}>
                            <strong>Label:</strong> {ad.adLabel}
                          </div>
                        )}
                      </div>
                      <div className={styles.cardActions}>
                        <button
                          className={styles.seeMoreButton}
                          onClick={() => handleSeeMore(ad)}
                        >
                          <Eye size={16} />
                          Read
                        </button>
                        <button
                          className={styles.bookButton}
                          onClick={() => setShowContactModal(true)}
                        >
                          Book This Ad
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Ad Options */}
          {otherAds.length > 0 && (
            <div className={styles.adCategory}>
              <h3 className={styles.categoryTitle}>Other Ad Options</h3>
              <div className={styles.adGrid}>
                {otherAds.map((ad) => (
                  <div key={ad._id} className={styles.adCard}>
                    <ImageSlider images={ad.imgs} adType={ad.adtype} />
                    <div className={styles.adCardContent}>
                      <div className={styles.adHeader}>
                        <h4 className={styles.adType}>{ad.adtype}</h4>
                        <span className={styles.adPrice}>
                          ₹ {ad.baseRate.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className={styles.adDesc}>{ad.adDesc}</p>
                      <div className={styles.adDetails}>
                        <div className={styles.adDetailItem}>
                          <strong>Quantity:</strong> {ad.quantity}
                        </div>
                        <div className={styles.adDetailItem}>
                          <strong>Timing:</strong> {ad.adTiming}
                        </div>
                        {ad.adLabel && (
                          <div className={styles.adDetailItem}>
                            <strong>Label:</strong> {ad.adLabel}
                          </div>
                        )}
                      </div>
                      <div className={styles.cardActions}>
                        <button
                          className={styles.seeMoreButton}
                          onClick={() => handleSeeMore(ad)}
                        >
                          <Eye size={16} />
                          Read
                        </button>
                        <button 
                          className={styles.bookButton}
                          onClick={() => setShowContactModal(true)}
                        >
                          Book This Ad
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Newspaper Details Section */}
          <div className={styles.newspaperDetailsSection}>
            <div className={styles.detailsHeader}>
              <div className={styles.detailsTitleWrapper}>
                <h2 className={styles.detailsTitle}>{newspaper.title}</h2>
                <div className={styles.detailsSubtitle}>
                  <span className={styles.newspaperBadge}>
                    Newspaper Details
                  </span>
                  <div className={styles.detailsDivider}></div>
                </div>
              </div>
            </div>

            <div className={styles.detailsContent}>
              <div className={styles.detailsCard}>
                <div className={styles.detailsIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20V18H4V6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 10H16M8 14H12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.detailsText}>
                  <div
                    className={styles.detailsDescription}
                    dangerouslySetInnerHTML={{ __html: newspaper.desc }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {advertisements.length === 0 && (
            <div className={styles.noAdsContainer}>
              <p>
                No advertisements available for this newspaper at the moment.
              </p>
            </div>
          )}
        </div>
        <Feedback/>
        <Footer></Footer>
      </div>

      {/* Enhanced Contact Modal */}
      {showContactModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleSection}>
                <h3>Get Your Quote</h3>
                <p className={styles.modalSubtitle}>
                  Fill in your details and we'll get back to you within 24 hours
                </p>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setShowContactModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className={styles.contactForm}>
              {/* Status Message */}
              {submitStatus.type && (
                <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                  {submitStatus.message}
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  placeholder="Enter your email address"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Tell us about your project requirements, budget, timeline, or any specific details..."
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowContactModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner}></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Quote Request</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Card Details Modal */}
      {showCardModal && selectedAd && (
        <div className={styles.modalOverlay}>
          <div className={styles.cardModalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleSection}>
                <h3>{selectedAd?.adtype} - Full Details</h3>
                <p className={styles.modalSubtitle}>Complete information about this advertisement</p>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setShowCardModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.cardModalBody}>
              <div className={styles.cardModalImages}>
                <div className={styles.imageSliderWrapper}>
                  <ImageSlider
                    images={selectedAd?.imgs || []}
                    adType={selectedAd?.adtype || ""}
                  />
                </div>
              </div>
              <div className={styles.cardModalDetails}>
                <div className={styles.cardModalHeader}>
                  <div className={styles.adTypeSection}>
                    <h4>{selectedAd?.adtype}</h4>
                    <div className={styles.adTypeBadge}>Advertisement</div>
                  </div>
                  <div className={styles.priceSection}>
                    <span className={styles.priceLabel}>Starting from</span>
                    <span className={styles.cardModalPrice}>
                      ₹ {selectedAd?.baseRate?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                
                <div className={styles.descriptionSection}>
                  <h5 className={styles.sectionTitle}>Description</h5>
                  <p className={styles.cardModalDesc}>{selectedAd?.adDesc}</p>
                </div>

                <div className={styles.detailsSection}>
                  <h5 className={styles.sectionTitle}>Details</h5>
                  <div className={styles.cardModalInfo}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <span className={styles.infoLabel}>Quantity</span>
                        <span className={styles.infoValue}>{selectedAd?.quantity}</span>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <span className={styles.infoLabel}>Timing</span>
                        <span className={styles.infoValue}>{selectedAd?.adTiming}</span>
                      </div>
                    </div>
                    {selectedAd?.adLabel && (
                      <div className={styles.infoItem}>
                        <div className={styles.infoIcon}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Label</span>
                          <span className={styles.infoValue}>{selectedAd?.adLabel}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.cardModalActions}>
               
                  <button 
                    className={styles.bookButton}
                    onClick={() => setShowContactModal(true)}
                  >
                    <span>Book This Ad</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default NewspaperDetailPage;