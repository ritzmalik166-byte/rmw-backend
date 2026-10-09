"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Feedback from "../Homepage/Feedback";
import Footer from "@/components/footer/Footer";

// Custom Select Component with Lucide Icon
interface CustomSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  className,
  children,
}) => {
  return (
    <div
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      <select value={value} onChange={onChange} className={className}>
        {children}
      </select>
      <ChevronDown
        size={16}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "#718096",
        }}
      />
    </div>
  );
};

// Newspaper Card Component
interface NewspaperCardProps {
  name: string;
  location: string;
  language: string;
  price: string;
  minSpend: string;
  image: string;
  slug: string;
  circulation: string;
  onCardClick: (slug: string) => void;
}

// API Response Interface
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

const NewspaperCard: React.FC<NewspaperCardProps> = ({
  name,
  location,
  language,
  price,
  minSpend,
  image,
  slug,
  circulation,
  onCardClick,
}) => {
  return (
    <div
      className={styles.newspaperCard}
      onClick={() => onCardClick(slug)}
      style={{ cursor: "pointer" }}
    >
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logoContainer}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${
              image.split("/images")[1]
            }`}
            alt={`${name} logo`}
            fill
            className={styles.newspaperLogo}
            priority={false}
          />
        </div>
      </div>

      {/* Details Section */}
      <div className={styles.detailsSection}>
        <div className={styles.newspaperName}>
          {name}, {location}, {language}
        </div>

        <div className={styles.languageText}>{language}</div>

        <div className={styles.priceText}>
          ₹ {price} {minSpend}
        </div>

        <div className={styles.circulationText}>Circulation: {circulation}</div>
      </div>
    </div>
  );
};

function ServiceThirdMainPage2() {
  const router = useRouter();

  // State for filter dropdowns
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPublication, setSelectedPublication] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedSupplement, setSelectedSupplement] = useState("");
  const [selectedSort, setSelectedSort] = useState("top-searched");
  const [selectedSortSection3, setSelectedSortSection3] =
    useState("top-searched");

  // State for API data
  const [newspapers, setNewspapers] = useState<NewspaperData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPriceSorting, setIsPriceSorting] = useState(false);

  // State for filter options
  const [filterOptions, setFilterOptions] = useState({
    locations: [] as string[],
    states: [] as string[],
    languages: [] as string[],
    categories: [] as string[],
    publications: [] as string[],
    frequencies: [] as string[],
    positions: [] as string[],
  });

  // State for newspaper names list
  const [newspaperNames, setNewspaperNames] = useState<
    Array<{
      paperName: string;
      slug: string;
      language: string;
    }>
  >([]);

  // State for filter section expansion
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    language: true,
    category: true,
    publication: true,
    frequency: true,
    supplement: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // API call function
  const fetchNewspapers = async (
    filters: any = {},
    sorting: string = "top-searched"
  ) => {
    setLoading(true);
    setError(null);

    try {
      const filterData: any = {};

      // Apply filters
      if (selectedLocation) {
        // Convert back to proper case for matching
        const locationValue =
          selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1);
        filterData["areaCovered"] = { $regex: locationValue, $options: "i" };
        // console.log(locationValue);
      }
      if (selectedLanguage) {
        // Convert back to proper case for matching
        const languageValue =
          selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1);
        filterData.language = { $regex: languageValue, $options: "i" };
      }
      if (selectedCategory) {
        // Convert back to proper case for matching
        const categoryValue =
          selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
        filterData.category = { $regex: categoryValue, $options: "i" };
      }
      if (selectedPublication) {
        // Convert back to proper case for matching (replace hyphens with spaces)
        const publicationValue = selectedPublication
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        filterData.publications = { $regex: publicationValue, $options: "i" };
      }
      if (selectedFrequency) {
        // Convert back to proper case for matching
        const frequencyValue =
          selectedFrequency.charAt(0).toUpperCase() +
          selectedFrequency.slice(1);
        filterData.frequency = { $regex: frequencyValue, $options: "i" };
      }
      if (selectedSupplement) {
        // Convert back to proper case for matching
        const positionValue =
          selectedSupplement.charAt(0).toUpperCase() +
          selectedSupplement.slice(1);
        filterData.position = { $regex: positionValue, $options: "i" };
      }

      // Determine sorting - pass the actual sorting value to API
      let sortType = sorting;

      console.log("Frontend - Filter Data:", filterData);
      console.log("Frontend - Sort Type:", sortType);

      // Enhanced logging for price sorting
      if (sortType === "price-low-high" || sortType === "price-high-low") {
        console.log(`🔄 Applying price sorting: ${sortType}`);
      }

      const response = await fetch("/api/newspaper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterData,
          sorting: sortType,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNewspapers(result.data);
        // Reset price sorting indicator after data is loaded
        if (isPriceSorting) {
          setTimeout(() => setIsPriceSorting(false), 1000);
        }
      } else {
        setError(result.message || "Failed to fetch newspapers");
      }
    } catch (err) {
      setError("Failed to fetch newspapers. Please try again.");
      console.error("Error fetching newspapers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const response = await fetch("/api/newspaper/filters");
      const result = await response.json();
      console.log("These are filter options ", result);

      if (result.success) {
        setFilterOptions(result.data);
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  // Fetch newspaper names for the list
  const fetchNewspaperNames = async () => {
    try {
      const response = await fetch("/api/newspaper/names");
      const result = await response.json();

      if (result.success) {
        setNewspaperNames(result.data);
      }
    } catch (err) {
      console.error("Error fetching newspaper names:", err);
    }
  };

  // Load newspapers and filter options on component mount
  useEffect(() => {
    fetchNewspapers();
    fetchFilterOptions();
    fetchNewspaperNames();
  }, []);

  // Apply filters when any filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchNewspapers();
    }, 500); // Debounce filter changes

    return () => clearTimeout(timeoutId);
  }, [
    selectedLocation,
    selectedLanguage,
    selectedCategory,
    selectedPublication,
    selectedFrequency,
    selectedSupplement,
  ]);

  // Handle sort changes
  const handleSortChange = (newSort: string) => {
    setSelectedSort(newSort);

    // Add visual feedback for price sorting
    if (newSort === "price-low-high" || newSort === "price-high-low") {
      console.log(
        `📊 Sorting newspapers by price: ${
          newSort === "price-low-high" ? "Low to High" : "High to Low"
        }`
      );
      setIsPriceSorting(true);
    } else {
      setIsPriceSorting(false);
    }

    fetchNewspapers({}, newSort);
  };

  // Handle newspaper card click
  const handleNewspaperClick = (slug: string) => {
    router.push(`/newspaper-ads/${slug}`);
  };

  // Distribute newspapers into 5 columns
  const distributeNewspapersIntoColumns = (
    newspapers: Array<{ paperName: string; slug: string; language: string }>
  ) => {
    const columns = [[], [], [], [], []] as Array<
      Array<{ paperName: string; slug: string; language: string }>
    >;

    newspapers.forEach((newspaper, index) => {
      const columnIndex = index % 5;
      columns[columnIndex].push(newspaper);
    });

    return columns;
  };

  const row1 = [
    "/rmw-pad/rmw-s1-i1.png",
    "/rmw-pad/rmw-s1-i2.png",
    "/rmw-pad/rmw-s1-i3.png",
    "/rmw-pad/rmw-s1-i4.png",
    "/rmw-pad/rmw-s1-i5.png",
    "/rmw-pad/rmw-s1-i6.png",
  ];
  const row2 = [
    "/rmw-pad/rmw-s1-i7.png",
    "/rmw-pad/rmw-s1-i8.png",
    "/rmw-pad/rmw-s1-i9.png",
    "/rmw-pad/rmw-s1-i10.png",
    "/rmw-pad/rmw-s1-i11.png",
    "/rmw-pad/rmw-s1-i12.png",
  ];

  // Convert API data to display format
  const displayNewspapers = newspapers.map((newspaper) => ({
    name: newspaper.paperName,
    location: newspaper.areaCovered,
    language: newspaper.language,
    price: newspaper.price.toLocaleString("en-IN"),
    minSpend: newspaper.spendType,
    image: newspaper.logoImg,
    slug: newspaper.slug,
    circulation: newspaper.circulation,
  }));

  return (
    <section className={styles.mainContainer}>
      {/* Center Align Main Container  */}
      <div className={styles.contentWrapper}>
        {/* Section 1 Is Starting From Here  */}
        <div className={styles.section1}>
          {/* Top Header Div  */}
          <div className={styles.headerDiv}>
            <h1 className={styles.mainTitle}>
              Book Newspaper Ads Online at Lowest Rates
            </h1>
          </div>

          {/* Main Content Div  */}
          <div className={styles.mainContent}>
            <div className={styles.imageRow}>
              {row1.map((url, idx) => {
                return (
                  <Image
                    src={url}
                    key={idx}
                    alt="Ritz Media World"
                    height={120}
                    width={189}
                    style={{ objectFit: "cover" }}
                  />
                );
              })}
            </div>
            <div className={styles.imageRow}>
              {row2.map((url, idx) => {
                return (
                  <Image
                    src={url}
                    key={idx}
                    alt="Ritz Media World"
                    height={120}
                    width={189}
                  />
                );
              })}
            </div>
            {/* <div className={styles.seeMoreButton}>
              <button className={styles.seeMoreBtn}>See More</button>
            </div> */}
          </div>
        </div>

        {/* Section 2: Newspaper Cards Grid */}
        <div className={styles.section2}>
          {/* Header */}
          <div className={styles.section2Header}>
            <h2 className={styles.section2Title}>
              Select Your Newspaper Ad Category Below <br /> To Start Booking
            </h2>

            {/* Sort Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CustomSelect
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className={styles.customSelectSection2}
              >
                <option value="top-searched">Sort By: Top Searched</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
                <option value="location">Sort By: Location</option>
                <option value="circulation">Sort By: Circulation</option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </CustomSelect>

              {/* Price Sorting Indicator */}
              {isPriceSorting && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#4CAF50",
                    fontWeight: "bold",
                    padding: "4px 8px",
                    backgroundColor: "#E8F5E8",
                    borderRadius: "4px",
                    border: "1px solid #4CAF50",
                  }}
                >
                  💰 Price Sorted
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area with Sidebar and Grid */}
          <div className={styles.mainContentArea}>
            {/* Left Sidebar - Filters */}
            <div className={styles.filterSidebar}>
              {/* Filter Header */}
              <div className={styles.filterHeader}>
                <h3 className={styles.filterHeaderTitle}>Filters</h3>
              </div>

              {/* Location Filter */}
              <div className={styles.filterSection}>
                <div
                  className={styles.filterTitle}
                  onClick={() => toggleSection("location")}
                >
                  <span>Location</span>
                  <ChevronDown
                    className={`${styles.filterChevron} ${
                      expandedSections.location ? styles.expanded : ""
                    }`}
                  />
                </div>
                <div
                  style={{ width: "100%" }}
                  className={`${styles.filterContent} ${
                    expandedSections.location ? styles.expanded : ""
                  }`}
                >
                  <CustomSelect
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className={styles.customSelect}
                  >
                    <option value="">Select Location</option>
                    {filterOptions.locations.map((location) => (
                      <option key={location} value={location.toLowerCase()}>
                        {location}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
              </div>

              {/* Language Filter */}
              <div className={styles.filterSection}>
                <div
                  className={styles.filterTitle}
                  onClick={() => toggleSection("language")}
                >
                  <span>Language</span>
                  <ChevronDown
                    className={`${styles.filterChevron} ${
                      expandedSections.language ? styles.expanded : ""
                    }`}
                  />
                </div>
                <div
                  className={`${styles.filterContent} ${
                    expandedSections.language ? styles.expanded : ""
                  }`}
                >
                  <CustomSelect
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className={styles.customSelect}
                  >
                    <option value="">Select Language</option>
                    {filterOptions.languages.map((language) => (
                      <option key={language} value={language.toLowerCase()}>
                        {language}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
              </div>

              {/* Category Filter */}
              <div className={styles.filterSection}>
                <div
                  className={styles.filterTitle}
                  onClick={() => toggleSection("category")}
                >
                  <span>Category</span>
                  <ChevronDown
                    className={`${styles.filterChevron} ${
                      expandedSections.category ? styles.expanded : ""
                    }`}
                  />
                </div>
                <div
                  className={`${styles.filterContent} ${
                    expandedSections.category ? styles.expanded : ""
                  }`}
                >
                  <CustomSelect
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.customSelect}
                  >
                    <option value="">Select Category</option>
                    {filterOptions.categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
              </div>

              {/* Publication Filter */}
              <div className={styles.filterSection}>
                <div
                  className={styles.filterTitle}
                  onClick={() => toggleSection("publication")}
                >
                  <span>Publication</span>
                  <ChevronDown
                    className={`${styles.filterChevron} ${
                      expandedSections.publication ? styles.expanded : ""
                    }`}
                  />
                </div>
                <div
                  className={`${styles.filterContent} ${
                    expandedSections.publication ? styles.expanded : ""
                  }`}
                >
                  <CustomSelect
                    value={selectedPublication}
                    onChange={(e) => setSelectedPublication(e.target.value)}
                    className={styles.customSelect}
                  >
                    <option value="">Select Publication</option>
                    {filterOptions.publications.map((publication) => (
                      <option
                        key={publication}
                        value={publication.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {publication}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
              </div>

              {/* Frequency Filter */}
              <div className={styles.filterSection}>
                <div
                  className={styles.filterTitle}
                  onClick={() => toggleSection("frequency")}
                >
                  <span>Frequency</span>
                  <ChevronDown
                    className={`${styles.filterChevron} ${
                      expandedSections.frequency ? styles.expanded : ""
                    }`}
                  />
                </div>
                <div
                  className={`${styles.filterContent} ${
                    expandedSections.frequency ? styles.expanded : ""
                  }`}
                >
                  <CustomSelect
                    value={selectedFrequency}
                    onChange={(e) => setSelectedFrequency(e.target.value)}
                    className={styles.customSelect}
                  >
                    <option value="">Select Frequency</option>
                    {filterOptions.frequencies.map((frequency) => (
                      <option key={frequency} value={frequency.toLowerCase()}>
                        {frequency}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
              </div>

              {/* Position Filter */}
              <div className={styles.filterSection}>
                <div
                  className={styles.filterTitle}
                  onClick={() => toggleSection("supplement")}
                >
                  <span>Position</span>
                  <ChevronDown
                    className={`${styles.filterChevron} ${
                      expandedSections.supplement ? styles.expanded : ""
                    }`}
                  />
                </div>
                <div
                  className={`${styles.filterContent} ${
                    expandedSections.supplement ? styles.expanded : ""
                  }`}
                >
                  <CustomSelect
                    value={selectedSupplement}
                    onChange={(e) => setSelectedSupplement(e.target.value)}
                    className={styles.customSelect}
                  >
                    <option value="">Select Position</option>
                    {filterOptions.positions.map((position) => (
                      <option key={position} value={position.toLowerCase()}>
                        {position}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
              </div>
            </div>

            {/* Right Content Area - Newspaper Cards Grid */}
            <div className={styles.contentGrid}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Loading newspapers...</p>
                </div>
              ) : error ? (
                <div className={styles.errorContainer}>
                  <p>Error: {error}</p>
                  <button
                    onClick={() => fetchNewspapers()}
                    className={styles.retryButton}
                  >
                    Retry
                  </button>
                </div>
              ) : displayNewspapers.length === 0 ? (
                <div className={styles.noResultsContainer}>
                  <p>No newspapers found matching your filters.</p>
                </div>
              ) : (
                <div className={styles.newspaperGrid}>
                  {displayNewspapers.map((newspaper, index) => (
                    <NewspaperCard
                      key={index}
                      name={newspaper.name}
                      location={newspaper.location}
                      language={newspaper.language}
                      price={newspaper.price}
                      minSpend={newspaper.minSpend}
                      image={newspaper.image}
                      slug={newspaper.slug}
                      circulation={newspaper.circulation}
                      onCardClick={handleNewspaperClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Select Your Newspapers */}
        <div className={styles.section3}>
          {/* Header */}
          <div className={styles.section3Header}>
            <h2 className={styles.section3Title}>Select Your Newspapers</h2>
          </div>

          {/* Newspaper List Box with Dotted Border */}
          <div className={styles.newspaperListBox}>
            {/* Simple Grid Layout */}
            <div className={styles.newspaperGrid5Col}>
              {newspaperNames.map((newspaper, index) => (
                <div
                  key={index}
                  className={styles.newspaperItem}
                  onClick={() => handleNewspaperClick(newspaper.slug)}
                >
                  <p className={styles.newspaperNameItem}>
                    <span className={styles.bulletPoint}>•</span>{" "}
                    {newspaper.paperName}
                  </p>
                  <p className={styles.languageTag}>({newspaper.language})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Feedback />
      </div>
      <Footer></Footer>
    </section>
  );
}

export default ServiceThirdMainPage2;
