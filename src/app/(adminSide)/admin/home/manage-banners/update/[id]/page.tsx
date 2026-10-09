"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { Upload, X, CheckCircle, AlertCircle, Loader2, Monitor, Smartphone, Tablet } from "lucide-react"
import Image from "next/image"

interface FormDataState {
  title: string
  paragraph: string
  banner_location: string
  mobile_banner: File | null
  tab_banner: File | null
  dekstop_banner: File | null
}

interface PopupState {
  isOpen: boolean
  type: 'success' | 'error' | null
  message: string
}

interface BannerData {
  id: number
  title: string
  paragraph: string
  banner_location: string
  mobile_banner: string
  desktop_banner: string
  tab_banner: string
  banner_status: boolean
  created_at: string
}

function Page() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    paragraph: '',
    banner_location: 'Home',
    mobile_banner: null,
    tab_banner: null,
    dekstop_banner: null,
  })

  const [existingImages, setExistingImages] = useState<{
    mobile: string | null
    tablet: string | null
    desktop: string | null
  }>({
    mobile: null,
    tablet: null,
    desktop: null,
  })

  const [previews, setPreviews] = useState<{
    mobile: string | null
    tablet: string | null
    desktop: string | null
  }>({
    mobile: null,
    tablet: null,
    desktop: null,
  })

  const [errors, setErrors] = useState<{
    title?: string
    paragraph?: string
    banner_location?: string
    mobile_banner?: string
    tab_banner?: string
    dekstop_banner?: string
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    type: null,
    message: '',
  })

  const mobileInputRef = useRef<HTMLInputElement>(null)
  const tabletInputRef = useRef<HTMLInputElement>(null)
  const desktopInputRef = useRef<HTMLInputElement>(null)

  // Helper function to convert image path to API route
  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return ''
    const filename = imagePath.split('/').pop() || imagePath
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    return `/api/images/${filename}`
  }

  useEffect(() => {
    if (id) {
      fetchBanner()
    }
  }, [id])

  const fetchBanner = async () => {
    try {
      setFetching(true)
      const response = await fetch(`/api/site_banners/update/${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch banner')
      }

      const banner = data.existingBanner as BannerData

      // Populate form with existing data
      setFormData({
        title: banner.title || '',
        paragraph: banner.paragraph || '',
        banner_location: banner.banner_location || 'Home',
        mobile_banner: null,
        tab_banner: null,
        dekstop_banner: null,
      })

      // Set existing images
      setExistingImages({
        mobile: banner.mobile_banner || null,
        tablet: banner.tab_banner || null,
        desktop: banner.desktop_banner || (banner as any).dekstop_banner || null,
      })
    } catch (err) {
      console.error('Error fetching banner:', err)
      setPopup({
        isOpen: true,
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to fetch banner',
      })
      setTimeout(() => setPopup({ isOpen: false, type: null, message: '' }), 3000)
    } finally {
      setFetching(false)
    }
  }

  const handleInputChange = (field: keyof FormDataState, value: string) => {
    if (field === 'title' && value.length > 45) {
      setErrors((prev) => ({ ...prev, title: 'Title cannot exceed 45 characters' }))
      return
    }
    if (field === 'paragraph' && value.length > 100) {
      setErrors((prev) => ({ ...prev, paragraph: 'Paragraph cannot exceed 100 characters' }))
      return
    }

    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateImageDimensions = (file: File, type: 'mobile' | 'tablet' | 'desktop'): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      const img = document.createElement('img')
      const url = URL.createObjectURL(file)
      
      img.onload = () => {
        URL.revokeObjectURL(url)
        let isValid = false
        
        if (type === 'mobile') {
          isValid = img.width === 412 && img.height === 915
        } else if (type === 'tablet') {
          isValid = img.width === 810 && img.height === 1080
        } else if (type === 'desktop') {
          isValid = img.width === 1366 && img.height === 768
        }
        
        resolve(isValid)
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve(false)
      }
      
      img.src = url
    })
  }

  const getFormDataKey = (type: 'mobile' | 'tablet' | 'desktop'): keyof FormDataState => {
    if (type === 'mobile') return 'mobile_banner'
    if (type === 'tablet') return 'tab_banner'
    if (type === 'desktop') return 'dekstop_banner'
    return 'mobile_banner'
  }

  const getErrorKey = (type: 'mobile' | 'tablet' | 'desktop'): keyof typeof errors => {
    if (type === 'mobile') return 'mobile_banner'
    if (type === 'tablet') return 'tab_banner'
    if (type === 'desktop') return 'dekstop_banner'
    return 'mobile_banner'
  }

  const handleImageChange = async (type: 'mobile' | 'tablet' | 'desktop', file: File | null) => {
    const formDataKey = getFormDataKey(type)
    const errorKey = getErrorKey(type)

    if (!file) {
      setPreviews((prev) => ({ ...prev, [type]: null }))
      setFormData((prev) => ({ ...prev, [formDataKey]: null }))
      return
    }

    // Validate image type
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, [errorKey]: 'Please select a valid image file' }))
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setErrors((prev) => ({ ...prev, [errorKey]: 'Image size must be less than 5MB' }))
      return
    }

    // Validate dimensions
    const isValidDimensions = await validateImageDimensions(file, type)
    if (!isValidDimensions) {
      let expectedDimensions = ''
      if (type === 'mobile') {
        expectedDimensions = '412×915'
      } else if (type === 'tablet') {
        expectedDimensions = '810×1080'
      } else if (type === 'desktop') {
        expectedDimensions = '1366×768'
      }
      setErrors((prev) => ({ ...prev, [errorKey]: `Image dimensions must be exactly ${expectedDimensions} pixels` }))
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviews((prev) => ({ ...prev, [type]: reader.result as string }))
    }
    reader.readAsDataURL(file)

    setFormData((prev) => ({ ...prev, [formDataKey]: file }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[errorKey]
      return newErrors
    })
  }

  const removeImage = (type: 'mobile' | 'tablet' | 'desktop') => {
    const formDataKey = getFormDataKey(type)
    setPreviews((prev) => ({ ...prev, [type]: null }))
    setFormData((prev) => ({ ...prev, [formDataKey]: null }))
    if (type === 'mobile' && mobileInputRef.current) mobileInputRef.current.value = ''
    if (type === 'tablet' && tabletInputRef.current) tabletInputRef.current.value = ''
    if (type === 'desktop' && desktopInputRef.current) desktopInputRef.current.value = ''
  }

  const validateForm = (): { isValid: boolean; errors: typeof errors } => {
    const newErrors: {
      title?: string
      paragraph?: string
      banner_location?: string
      mobile_banner?: string
      tab_banner?: string
      dekstop_banner?: string
      general?: string
    } = {}

    // Check for existing errors first (from image validation)
    if (errors.mobile_banner) {
      newErrors.mobile_banner = errors.mobile_banner
    }
    if (errors.tab_banner) {
      newErrors.tab_banner = errors.tab_banner
    }
    if (errors.dekstop_banner) {
      newErrors.dekstop_banner = errors.dekstop_banner
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 45) {
      newErrors.title = 'Title cannot exceed 45 characters'
    }

    if (!formData.paragraph.trim()) {
      newErrors.paragraph = 'Paragraph is required'
    } else if (formData.paragraph.length > 100) {
      newErrors.paragraph = 'Paragraph cannot exceed 100 characters'
    }

    if (!formData.banner_location) {
      newErrors.banner_location = 'Banner location is required'
    }

    // For update, images are optional (can keep existing ones)
    // Only validate if a new image is being uploaded
    if (formData.mobile_banner && errors.mobile_banner) {
      newErrors.mobile_banner = errors.mobile_banner
    }
    if (formData.tab_banner && errors.tab_banner) {
      newErrors.tab_banner = errors.tab_banner
    }
    if (formData.dekstop_banner && errors.dekstop_banner) {
      newErrors.dekstop_banner = errors.dekstop_banner
    }

    setErrors(newErrors)
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors }
  }

  const createFormData = (): FormData => {
    const data = new FormData()
    data.append('title', formData.title)
    data.append('paragraph', formData.paragraph)
    data.append('banner_location', formData.banner_location)
    if (formData.mobile_banner) {
      data.append('mobile_banner', formData.mobile_banner)
    }
    if (formData.tab_banner) {
      data.append('tab_banner', formData.tab_banner)
    }
    if (formData.dekstop_banner) {
      data.append('dekstop_banner', formData.dekstop_banner)
    }
    return data
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await new Promise(resolve => setTimeout(resolve, 100))

    const validation = validateForm()
    
    if (!validation.isValid) {
      const errorMessages = Object.values(validation.errors).filter(Boolean) as string[]
      const firstError = errorMessages[0] || 'Please fill all required fields correctly'
      
      setPopup({
        isOpen: true,
        type: 'error',
        message: firstError,
      })
      setTimeout(() => setPopup({ isOpen: false, type: null, message: '' }), 3000)
      return
    }

    setLoading(true)

    try {
      const formDataToSend = createFormData()
      
      const response = await fetch(`/api/site_banners/update/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update banner')
      }

      setPopup({
        isOpen: true,
        type: 'success',
        message: data.message || 'Banner updated successfully!',
      })

      setTimeout(() => {
        setPopup({ isOpen: false, type: null, message: '' })
        router.push('/admin/home/manage-banners')
      }, 2000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update banner. Please try again.'
      setPopup({
        isOpen: true,
        type: 'error',
        message: errorMessage,
      })
      setTimeout(() => setPopup({ isOpen: false, type: null, message: '' }), 3000)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading banner data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Update Banner
        </h1>
        <Breadcrumb
          currentPage="Update Banner"
          middleLinks={[
            { name: "Manage Banners", href: "/admin/home/manage-banners" },
          ]}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 md:p-10 max-w-6xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100/30 via-purple-100/20 to-pink-100/30 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 via-cyan-100/20 to-indigo-100/30 rounded-full blur-3xl -z-0"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
          {/* Title Field */}
          <div className="relative">
            <label className="block text-sm sm:text-base font-bold text-gray-800 mb-3 tracking-wide">
              Title <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                maxLength={45}
                className={`w-full px-5 py-4 text-gray-800 bg-gradient-to-br from-white to-gray-50 border-b-2 focus:outline-none ${
                  errors.title
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                    : 'border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200'
                } placeholder:text-gray-400 placeholder:font-medium`}
                placeholder="Enter banner title (max 45 characters)"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              {errors.title && (
                <span className="text-red-500 text-xs sm:text-sm font-medium flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.title}
                </span>
              )}
              <span className={`text-xs sm:text-sm ml-auto font-semibold transition-colors ${
                formData.title.length > 40 ? 'text-orange-500' : formData.title.length > 35 ? 'text-yellow-500' : 'text-gray-400'
              }`}>
                {formData.title.length}/45
              </span>
            </div>
          </div>

          {/* Paragraph Field */}
          <div className="relative">
            <label className="block text-sm sm:text-base font-bold text-gray-800 mb-3 tracking-wide">
              Paragraph <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <textarea
                value={formData.paragraph}
                onChange={(e) => handleInputChange('paragraph', e.target.value)}
                maxLength={100}
                rows={4}
                className={`w-full px-5 py-4 text-gray-800 bg-gradient-to-br from-white to-gray-50 border-b-2 focus:outline-none resize-none ${
                  errors.paragraph
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                    : 'border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200'
                } placeholder:text-gray-400 placeholder:font-medium`}
                placeholder="Enter banner paragraph (max 100 characters)"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              {errors.paragraph && (
                <span className="text-red-500 text-xs sm:text-sm font-medium flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.paragraph}
                </span>
              )}
              <span className={`text-xs sm:text-sm ml-auto font-semibold transition-colors ${
                formData.paragraph.length > 90 ? 'text-orange-500' : formData.paragraph.length > 80 ? 'text-yellow-500' : 'text-gray-400'
              }`}>
                {formData.paragraph.length}/100
              </span>
            </div>
          </div>

          {/* Banner Location Dropdown */}
          <div className="relative">
            <label className="block text-sm sm:text-base font-bold text-gray-800 mb-3 tracking-wide">
              Banner Location <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.banner_location}
                onChange={(e) => handleInputChange('banner_location', e.target.value)}
                className={`w-full px-5 py-4 text-gray-800 bg-gradient-to-br from-white to-gray-50 border-b-2 focus:outline-none appearance-none cursor-pointer font-medium ${
                  errors.banner_location
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                    : 'border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200'
                }`}
              >
                <option value="Home" className="bg-white text-gray-800">Home</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.banner_location && (
              <span className="text-red-500 text-xs sm:text-sm mt-2 block font-medium flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.banner_location}
              </span>
            )}
          </div>

          {/* Image Uploads Section */}
          <div className="space-y-6 sm:space-y-8 pt-4 border-t-2 border-gradient-to-r from-indigo-100 to-purple-100">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Banner Images
              </h3>
            </div>

            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:justify-between">
              {/* Mobile Banner */}
              <div className="space-y-3">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Mobile Banner {!existingImages.mobile && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    ref={mobileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange('mobile', e.target.files?.[0] || null)}
                    className="hidden"
                    id="mobile-banner"
                  />
                  {previews.mobile ? (
                    <div className="relative border-2 border-indigo-300 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '9/16', maxWidth: '200px' }}>
                      <Image
                        src={previews.mobile}
                        alt="Mobile banner preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('mobile')}
                        className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full p-2 hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent text-white text-xs py-2 px-3 text-center font-semibold">
                        <Smartphone size={14} className="inline mr-1" />
                        Mobile (New)
                      </div>
                    </div>
                  ) : existingImages.mobile ? (
                    <div className="relative border-2 border-indigo-300 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl" style={{ aspectRatio: '9/16', maxWidth: '200px' }}>
                      <Image
                        src={getImageUrl(existingImages.mobile)}
                        alt="Mobile banner"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <label
                        htmlFor="mobile-banner"
                        className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-white font-semibold text-sm">Click to Replace</span>
                      </label>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent text-white text-xs py-2 px-3 text-center font-semibold">
                        <Smartphone size={14} className="inline mr-1" />
                        Mobile (Current)
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="mobile-banner"
                      className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 ${
                        errors.mobile_banner 
                          ? 'border-red-400 bg-red-50/50 hover:bg-red-50 hover:border-red-500' 
                          : 'border-indigo-300 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 hover:border-indigo-500 hover:from-indigo-100/70 hover:to-purple-100/70'
                      }`}
                      style={{ aspectRatio: '9/16', maxWidth: '200px', minHeight: '300px' }}
                    >
                      <Smartphone className={`w-14 h-14 mb-4 transition-all duration-300 group-hover:scale-110 ${
                        errors.mobile_banner ? 'text-red-500' : 'text-indigo-500 group-hover:text-indigo-600'
                      }`} />
                      <span className={`text-sm font-bold mb-1 transition-colors ${
                        errors.mobile_banner ? 'text-red-600' : 'text-gray-700 group-hover:text-indigo-600'
                      }`}>Upload Mobile Banner</span>
                      <span className="text-xs font-medium text-gray-500">9:16 Ratio</span>
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2 text-center">
                  Recommended dimensions: <span className="font-bold text-indigo-600">412×915 pixels</span>
                </p>
                {errors.mobile_banner && (
                  <span className="text-red-500 text-xs sm:text-sm block mt-1">{errors.mobile_banner}</span>
                )}
              </div>

              {/* Tablet Banner */}
              <div className="space-y-3">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Tablet Banner {!existingImages.tablet && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    ref={tabletInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange('tablet', e.target.files?.[0] || null)}
                    className="hidden"
                    id="tablet-banner"
                  />
                  {previews.tablet ? (
                    <div className="relative border-2 border-indigo-300 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '4/3', maxWidth: '300px' }}>
                      <Image
                        src={previews.tablet}
                        alt="Tablet banner preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('tablet')}
                        className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full p-2 hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent text-white text-xs py-2 px-3 text-center font-semibold">
                        <Tablet size={14} className="inline mr-1" />
                        Tablet (New)
                      </div>
                    </div>
                  ) : existingImages.tablet ? (
                    <div className="relative border-2 border-indigo-300 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl" style={{ aspectRatio: '4/3', maxWidth: '300px' }}>
                      <Image
                        src={getImageUrl(existingImages.tablet)}
                        alt="Tablet banner"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <label
                        htmlFor="tablet-banner"
                        className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-white font-semibold text-sm">Click to Replace</span>
                      </label>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent text-white text-xs py-2 px-3 text-center font-semibold">
                        <Tablet size={14} className="inline mr-1" />
                        Tablet (Current)
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="tablet-banner"
                      className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 ${
                        errors.tab_banner 
                          ? 'border-red-400 bg-red-50/50 hover:bg-red-50 hover:border-red-500' 
                          : 'border-indigo-300 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 hover:border-indigo-500 hover:from-indigo-100/70 hover:to-purple-100/70'
                      }`}
                      style={{ aspectRatio: '4/3', maxWidth: '300px', minHeight: '225px' }}
                    >
                      <Tablet className={`w-14 h-14 mb-4 transition-all duration-300 group-hover:scale-110 ${
                        errors.tab_banner ? 'text-red-500' : 'text-indigo-500 group-hover:text-indigo-600'
                      }`} />
                      <span className={`text-sm font-bold mb-1 transition-colors ${
                        errors.tab_banner ? 'text-red-600' : 'text-gray-700 group-hover:text-indigo-600'
                      }`}>Upload Tablet Banner</span>
                      <span className="text-xs font-medium text-gray-500">4:3 Ratio</span>
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2 text-center">
                  Recommended dimensions: <span className="font-bold text-indigo-600">810×1080 pixels</span>
                </p>
                {errors.tab_banner && (
                  <span className="text-red-500 text-xs sm:text-sm block mt-1">{errors.tab_banner}</span>
                )}
              </div>

              {/* Desktop Banner */}
              <div className="space-y-3">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Desktop Banner {!existingImages.desktop && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    ref={desktopInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange('desktop', e.target.files?.[0] || null)}
                    className="hidden"
                    id="desktop-banner"
                  />
                  {previews.desktop ? (
                    <div className="relative border-2 border-indigo-300 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '16/9', maxWidth: '400px' }}>
                      <Image
                        src={previews.desktop}
                        alt="Desktop banner preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('desktop')}
                        className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full p-2 hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent text-white text-xs py-2 px-3 text-center font-semibold">
                        <Monitor size={14} className="inline mr-1" />
                        Desktop (New)
                      </div>
                    </div>
                  ) : existingImages.desktop ? (
                    <div className="relative border-2 border-indigo-300 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl" style={{ aspectRatio: '16/9', maxWidth: '400px' }}>
                      <Image
                        src={getImageUrl(existingImages.desktop)}
                        alt="Desktop banner"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <label
                        htmlFor="desktop-banner"
                        className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-white font-semibold text-sm">Click to Replace</span>
                      </label>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent text-white text-xs py-2 px-3 text-center font-semibold">
                        <Monitor size={14} className="inline mr-1" />
                        Desktop (Current)
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="desktop-banner"
                      className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 ${
                        errors.dekstop_banner 
                          ? 'border-red-400 bg-red-50/50 hover:bg-red-50 hover:border-red-500' 
                          : 'border-indigo-300 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 hover:border-indigo-500 hover:from-indigo-100/70 hover:to-purple-100/70'
                      }`}
                      style={{ aspectRatio: '16/9', maxWidth: '400px', minHeight: '225px' }}
                    >
                      <Monitor className={`w-14 h-14 mb-4 transition-all duration-300 group-hover:scale-110 ${
                        errors.dekstop_banner ? 'text-red-500' : 'text-indigo-500 group-hover:text-indigo-600'
                      }`} />
                      <span className={`text-sm font-bold mb-1 transition-colors ${
                        errors.dekstop_banner ? 'text-red-600' : 'text-gray-700 group-hover:text-indigo-600'
                      }`}>Upload Desktop Banner</span>
                      <span className="text-xs font-medium text-gray-500">16:9 Ratio</span>
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2 text-center">
                  Recommended dimensions: <span className="font-bold text-indigo-600">1366×768 pixels</span>
                </p>
                {errors.dekstop_banner && (
                  <span className="text-red-500 text-xs sm:text-sm block mt-1">{errors.dekstop_banner}</span>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base sm:text-lg relative overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Update Banner</span>
                  </>
                )}
              </span>
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/home/manage-banners')}
              className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-bold rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 border-gray-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Success/Error Popup */}
      {popup.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease]">
          <div className={`bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-[slideUp_0.3s_ease] ${
            popup.type === 'success' ? 'border-2 border-green-500' : 'border-2 border-red-500'
          }`}>
            <div className="flex items-center gap-4">
              {popup.type === 'success' ? (
                <CheckCircle className="w-12 h-12 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${
                  popup.type === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {popup.type === 'success' ? 'Success!' : 'Error!'}
                </h3>
                <p className="text-gray-700">{popup.message}</p>
              </div>
              <button
                onClick={() => setPopup({ isOpen: false, type: null, message: '' })}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `
      }} />
    </div>
  )
}

export default Page
