"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Monitor, Eye, Pencil, Trash2, X, ChevronLeft, ChevronRight, Power, Loader2, AlertCircle } from 'lucide-react'
import Image from 'next/image'

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
  const router = useRouter()
  const [bannerData, setBannerData] = useState<BannerData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [viewPopup, setViewPopup] = useState<{ isOpen: boolean; banner: BannerData | null; currentImageIndex: number }>({
    isOpen: false,
    banner: null,
    currentImageIndex: 0,
  })

  const [deletePopup, setDeletePopup] = useState<{ isOpen: boolean; banner: BannerData | null; deleting: boolean }>({
    isOpen: false,
    banner: null,
    deleting: false,
  })

  const [togglingStatus, setTogglingStatus] = useState<number | null>(null)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/site_banners/get')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch banners')
      }

      // Map the database response to match our interface
      // Handle both desktop_banner and dekstop_banner for compatibility
      const mappedData = (data.rows || []).map((banner: any) => ({
        id: banner.id,
        title: banner.title,
        paragraph: banner.paragraph,
        banner_location: banner.banner_location,
        mobile_banner: banner.mobile_banner,
        desktop_banner: banner.desktop_banner || banner.dekstop_banner || '',
        tab_banner: banner.tab_banner,
        banner_status: banner.banner_status === 1 || banner.banner_status === true,
        created_at: banner.created_at || banner.createdAt || new Date().toISOString(),
      }))

      setBannerData(mappedData)
    } catch (err) {
      console.error('Error fetching banners:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch banners')
    } finally {
      setLoading(false)
    }
  }

  const handleView = (banner: BannerData) => {
    setViewPopup({
      isOpen: true,
      banner,
      currentImageIndex: 0,
    })
  }

  const handleCloseView = () => {
    setViewPopup({
      isOpen: false,
      banner: null,
      currentImageIndex: 0,
    })
  }

  const handleDelete = (banner: BannerData) => {
    setDeletePopup({
      isOpen: true,
      banner,
      deleting: false,
    })
  }

  const handleConfirmDelete = async () => {
    if (!deletePopup.banner) return

    try {
      setDeletePopup((prev) => ({ ...prev, deleting: true }))
      
      const response = await fetch(`/api/site_banners/update/${deletePopup.banner.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete banner')
      }

      // Remove from local state
      setBannerData(bannerData.filter((item) => item.id !== deletePopup.banner!.id))
      
      // Close popup
      setDeletePopup({
        isOpen: false,
        banner: null,
        deleting: false,
      })

      // Optionally refresh the list to ensure consistency
      // fetchBanners()
    } catch (error) {
      console.error('Error deleting banner:', error)
      setDeletePopup((prev) => ({
        ...prev,
        deleting: false,
      }))
      
      // Show error message (you could add a toast/notification here)
      alert(error instanceof Error ? error.message : 'Failed to delete banner. Please try again.')
    }
  }

  const handleToggleStatus = async (id: number) => {
    try {
      setTogglingStatus(id)
      
      const response = await fetch(`/api/site_banners/upload/${id}`, {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to toggle banner status')
      }

      // Update local state
      setBannerData(
        bannerData.map((item) =>
          item.id === id
            ? { ...item, banner_status: !item.banner_status }
            : item
        )
      )
    } catch (error) {
      console.error('Error toggling banner status:', error)
      alert(error instanceof Error ? error.message : 'Failed to toggle banner status. Please try again.')
    } finally {
      setTogglingStatus(null)
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/home/manage-banners/update/${id}`)
  }

  // Helper function to convert image path to API route
  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return ''
    // Extract filename from path (e.g., "/images/filename.jpg" -> "filename.jpg")
    const filename = imagePath.split('/').pop() || imagePath
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    // Use the API route for server images
    return `/api/images/${filename}`
  }

  const handleImageClick = (imageUrl: string) => {
    const fullUrl = getImageUrl(imageUrl)
    window.open(fullUrl, '_blank')
  }

  const getImageArray = (banner: BannerData | null): string[] => {
    if (!banner) return []
    return [banner.mobile_banner, banner.desktop_banner, banner.tab_banner]
  }

  const handleNextImage = () => {
    if (viewPopup.banner) {
      const images = getImageArray(viewPopup.banner)
      setViewPopup({
        ...viewPopup,
        currentImageIndex: (viewPopup.currentImageIndex + 1) % images.length,
      })
    }
  }

  const handlePrevImage = () => {
    if (viewPopup.banner) {
      const images = getImageArray(viewPopup.banner)
      setViewPopup({
        ...viewPopup,
        currentImageIndex: (viewPopup.currentImageIndex - 1 + images.length) % images.length,
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
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
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
        `
      }} />
      <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="flex items-center gap-3 sm:gap-4 text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
          Manage Home Banner
        </h1>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading banners...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
          <button
            onClick={fetchBanners}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden overflow-x-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Title</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Paragraph</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Banner Location</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Mobile Banner</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Desktop Banner</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Tablet Banner</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Created At</th>
                  <th className="p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bannerData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-gray-400 text-base sm:text-lg">
                      No banners found
                    </td>
                  </tr>
                ) : (
                bannerData.map((banner) => (
                  <tr key={banner.id} className="border-b border-gray-200 ">
                    <td className="p-4 sm:p-5 font-semibold text-gray-800 text-sm sm:text-base max-w-[200px] break-words">{banner.title}</td>
                    <td className="p-4 sm:p-5 text-gray-600 text-xs sm:text-sm max-w-[250px] break-words">{banner.paragraph}</td>
                    <td className="p-4 sm:p-5 text-gray-700 text-xs sm:text-sm font-medium max-w-[200px] break-words">{banner.banner_location}</td>
                    <td className="p-3 sm:p-4">
                      <div
                        className="relative inline-block cursor-pointer rounded-lg overflow-hidden transition-all duration-300 border-2 border-transparent hover:scale-110 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-300/50"
                        onClick={() => handleImageClick(banner.mobile_banner)}
                      >
                        <Image
                          src={getImageUrl(banner.mobile_banner)}
                          alt={`${banner.title} - Mobile`}
                          width={80}
                          height={80}
                          className="object-cover rounded-md block"
                          unoptimized
                        />
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-1 px-2 text-[10px] sm:text-xs text-center font-medium uppercase">Mobile</span>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div
                        className="relative inline-block cursor-pointer rounded-lg overflow-hidden transition-all duration-300 border-2 border-transparent hover:scale-110 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-300/50"
                        onClick={() => handleImageClick(banner.desktop_banner)}
                      >
                        <Image
                          src={getImageUrl(banner.desktop_banner)}
                          alt={`${banner.title} - Desktop`}
                          width={80}
                          height={80}
                          className="object-cover rounded-md block"
                          unoptimized
                        />
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-1 px-2 text-[10px] sm:text-xs text-center font-medium uppercase">Desktop</span>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div
                        className="relative inline-block cursor-pointer rounded-lg overflow-hidden transition-all duration-300 border-2 border-transparent hover:scale-110 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-300/50"
                        onClick={() => handleImageClick(banner.tab_banner)}
                      >
                        <Image
                          src={getImageUrl(banner.tab_banner)}
                          alt={`${banner.title} - Tablet`}
                          width={80}
                          height={80}
                          className="object-cover rounded-md block"
                          unoptimized
                        />
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-1 px-2 text-[10px] sm:text-xs text-center font-medium uppercase">Tablet</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <span
                        className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide ${
                          banner.banner_status
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                            : 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                        }`}
                      >
                        {banner.banner_status ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-500 text-xs sm:text-sm whitespace-nowrap">{formatDate(banner.created_at)}</td>
                    <td className="p-4 sm:p-5 text-center">
                      <div className="flex gap-2 justify-center items-center flex-wrap">
                        <button
                          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border-none rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white"
                          onClick={() => handleView(banner)}
                          title="View"
                        >
                          <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <button
                          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border-none rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleToggleStatus(banner.id)}
                          title={banner.banner_status ? 'Deactivate' : 'Activate'}
                          disabled={togglingStatus === banner.id}
                        >
                          {togglingStatus === banner.id ? (
                            <Loader2 size={16} className="sm:w-[18px] sm:h-[18px] animate-spin" />
                          ) : (
                            <Power
                              size={16}
                              className={`sm:w-[18px] sm:h-[18px] ${banner.banner_status ? 'text-green-500' : 'text-red-500'} group-hover:text-white`}
                            />
                          )}
                        </button>
                        <button
                          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border-none rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white"
                          onClick={() => handleEdit(banner.id)}
                          title="Edit"
                        >
                          <Pencil size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <button
                          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border-none rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-gradient-to-br hover:from-red-500 hover:to-rose-600 hover:text-white"
                          onClick={() => handleDelete(banner)}
                          title="Delete"
                        >
                          <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Popup */}
      {viewPopup.isOpen && viewPopup.banner && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[10000] p-4 animate-[fadeIn_0.3s_ease]" onClick={handleCloseView}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-[slideUp_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 w-10 h-10 border-none rounded-full bg-gray-100 text-gray-600 cursor-pointer flex items-center justify-center transition-all duration-300 z-10 hover:bg-red-500 hover:text-white hover:rotate-90"
              onClick={handleCloseView}
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center pr-10 sm:pr-12">{viewPopup.banner.title}</h2>
            <div className="relative flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button
                className="w-10 h-10 sm:w-12 sm:h-12 border-none rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-pointer flex items-center justify-center transition-all duration-300 shadow-lg shadow-indigo-500/30 flex-shrink-0 hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/50"
                onClick={handlePrevImage}
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <div className="flex-1 relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
                {getImageArray(viewPopup.banner).map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === viewPopup.currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={getImageUrl(img)}
                      alt={`${viewPopup.banner!.title} - Image ${index + 1}`}
                      fill
                      className="object-contain bg-gray-50"
                      unoptimized
                    />
                    <span className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/70 text-white py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide">
                      {index === 0 ? 'Mobile' : index === 1 ? 'Desktop' : 'Tablet'}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className="w-10 h-10 sm:w-12 sm:h-12 border-none rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-pointer flex items-center justify-center transition-all duration-300 shadow-lg shadow-indigo-500/30 flex-shrink-0 hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/50"
                onClick={handleNextImage}
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              {getImageArray(viewPopup.banner).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
                    index === viewPopup.currentImageIndex
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 scale-130 shadow-lg shadow-indigo-500/50'
                      : 'bg-gray-300'
                  }`}
                  onClick={() =>
                    setViewPopup({ ...viewPopup, currentImageIndex: index })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Warning Popup */}
      {deletePopup.isOpen && deletePopup.banner && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[10000] p-4 animate-[fadeIn_0.3s_ease]" onClick={() => !deletePopup.deleting && setDeletePopup({ isOpen: false, banner: null, deleting: false })}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 max-w-lg w-full text-center shadow-2xl animate-[slideUp_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-4 sm:mb-6">
              {deletePopup.deleting ? (
                <Loader2 size={48} className="text-red-500 animate-spin" />
              ) : (
                <Trash2 size={48} className="text-red-500 animate-[shake_0.5s_ease]" />
              )}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              {deletePopup.deleting ? 'Deleting Banner...' : 'Delete Banner'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
              {deletePopup.deleting ? (
                'Please wait while we delete the banner and its images...'
              ) : (
                <>
                  Are you sure you want to delete <strong className="text-gray-900 font-semibold">&quot;{deletePopup.banner?.title}&quot;</strong>? This action cannot be undone and the data will be permanently deleted.
                </>
              )}
            </p>
            {!deletePopup.deleting && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  className="px-6 sm:px-8 py-2.5 sm:py-3 border-none rounded-xl text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => setDeletePopup({ isOpen: false, banner: null, deleting: false })}
                >
                  Cancel
                </button>
                <button
                  className="px-6 sm:px-8 py-2.5 sm:py-3 border-none rounded-xl text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleConfirmDelete}
                  disabled={deletePopup.deleting}
                >
                  Delete Permanently
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default Page
