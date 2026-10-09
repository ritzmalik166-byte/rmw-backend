import { useState } from 'react';
import axios from 'axios';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
}

export default function AddCategoryModal({ isOpen, onClose, onCategoryAdded }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryMetaTitle: '',
    categoryMetaDescription: '',
    categoryMetaKeywords: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.categoryName.trim()) {
      newErrors.categoryName = 'Category name is required';
    }
    if (!formData.categoryMetaTitle.trim()) {
      newErrors.categoryMetaTitle = 'Meta title is required';
    }
    if (!formData.categoryMetaDescription.trim()) {
      newErrors.categoryMetaDescription = 'Meta description is required';
    }
    if (!formData.categoryMetaKeywords.trim()) {
      newErrors.categoryMetaKeywords = 'Meta keywords are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/ritzCats/addNewCat', formData);
      
      if (response.status === 201) {
        onCategoryAdded();
        setFormData({
          categoryName: '',
          categoryMetaTitle: '',
          categoryMetaDescription: '',
          categoryMetaKeywords: ''
        });
        onClose();
      } else {
        setError(response.data.message || 'Failed to create category');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          setError('A category with this name already exists');
        } else {
          setError(err.response.data?.message || 'An error occurred');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                id="categoryName"
                name="categoryName"
                type="text"
                value={formData.categoryName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.categoryName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.categoryName && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryName}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="categoryMetaTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title *
              </label>
              <input
                id="categoryMetaTitle"
                name="categoryMetaTitle"
                type="text"
                value={formData.categoryMetaTitle}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.categoryMetaTitle ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.categoryMetaTitle && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryMetaTitle}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="categoryMetaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description *
              </label>
              <textarea
                id="categoryMetaDescription"
                name="categoryMetaDescription"
                rows={3}
                value={formData.categoryMetaDescription}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.categoryMetaDescription ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.categoryMetaDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryMetaDescription}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="categoryMetaKeywords" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Keywords *
              </label>
              <input
                id="categoryMetaKeywords"
                name="categoryMetaKeywords"
                type="text"
                value={formData.categoryMetaKeywords}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.categoryMetaKeywords ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.categoryMetaKeywords && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryMetaKeywords}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Comma-separated keywords for SEO</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    categoryName: '',
                    categoryMetaTitle: '',
                    categoryMetaDescription: '',
                    categoryMetaKeywords: ''
                  });
                  setErrors({});
                  onClose();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}