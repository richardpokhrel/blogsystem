import React, { useState } from 'react';
import { Save, Eye, X, Image, ArrowLeft } from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", onClick, className = "", disabled = false }) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const FormField = ({ label, value, onChange, placeholder, error, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

const TextArea = ({ label, value, onChange, placeholder, rows = 4, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 resize-vertical"
    />
  </div>
);

const ImageUpload = ({ images, setImages, maxImages = 5 }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    fileArray.forEach(file => {
      if (file.type.startsWith('image/') && images.length < maxImages) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Images ({images.length}/{maxImages})
      </label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : images.length >= maxImages
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="image-upload"
          disabled={images.length >= maxImages}
        />
        
        <div className="space-y-2">
          <Image className={`mx-auto h-8 w-8 ${
            images.length >= maxImages ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <div>
            <label
              htmlFor="image-upload"
              className={`font-medium ${
                images.length >= maxImages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:text-blue-500 cursor-pointer'
              }`}
            >
              Click to upload
            </label>
            <span className="text-gray-500"> or drag and drop</span>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <button
                onClick={() => removeImage(image.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PostPreview = ({ title, content, images }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {title || 'Untitled Post'}
        </h1>
      </div>

      {images && images.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image) => (
              <div key={image.id} className="rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={image.name || 'Post image'}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap text-gray-700">
          {content || 'No content yet...'}
        </div>
      </div>
    </div>
  );
};

const NewPost = ({ onBack, onSave, initialData }) => {
  const [postData, setPostData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || ''
  });
  const [images, setImages] = useState(initialData?.images || []);
  const [activeTab, setActiveTab] = useState('edit');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!postData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!postData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      setActiveTab('edit');
      return;
    }

    setIsLoading(true);

    const postWithImages = {
      ...postData,
      images,
    };

    if (onSave) {
      onSave(postWithImages);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onBack} className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {initialData ? 'Edit Post' : 'New Post'}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}>
                <Eye className="h-4 w-4 mr-2" />
                {activeTab === 'edit' ? 'Preview' : 'Edit'}
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          {activeTab === 'edit' ? (
            <div className="space-y-6">
              <FormField
                label="Post Title"
                value={postData.title}
                onChange={handleInputChange('title')}
                placeholder="Enter your post title..."
                error={errors.title}
              />
              <TextArea
                label="Content"
                value={postData.content}
                onChange={handleInputChange('content')}
                placeholder="Write your post content here..."
                rows={12}
              />
              <ImageUpload images={images} setImages={setImages} maxImages={5} />
            </div>
          ) : (
            <PostPreview title={postData.title} content={postData.content} images={images} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default NewPost;
