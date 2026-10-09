# Newspaper Upload Admin Panel

## Overview
This is a production-level newspaper upload system with full type safety, custom loaders, and popup notifications. The system allows administrators to upload newspaper details including metadata, pricing, location, and publication information.

## Features
- ✅ **Full Type Safety**: Strict TypeScript typing without any `any` types
- ✅ **Custom Loader**: Beautiful loading overlay during form submission
- ✅ **Custom Popup System**: Success/Error/Warning/Info notifications with auto-close
- ✅ **Form Validation**: Comprehensive client-side validation
- ✅ **File Upload**: Image upload with preview functionality
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Error Handling**: Proper error handling and user feedback

## Components

### 1. **Loader Component**
- Full-screen overlay with blur effect
- Animated spinner
- Customizable message
- Prevents user interaction during loading

### 2. **Popup Component**
- 4 types: Success, Error, Warning, Info
- Auto-close functionality with progress bar
- Manual close option
- Slide-in animation
- Mobile responsive

### 3. **FormInput Component**
- Supports text, number, select, and textarea inputs
- Built-in error display
- Required field indicator
- Consistent styling

### 4. **FileUpload Component**
- Drag and drop support (visual)
- Image preview
- File validation (type and size)
- Remove file functionality

## Form Fields

### Basic Information
- **Paper Name** (required): Name of the newspaper
- **Language** (required): Publication language
- **Category** (required): Newspaper category
- **Publications** (required): Publication details
- **Logo Image** (required): Newspaper logo (JPG, PNG, max 5MB)

### Pricing Information
- **Price** (required): Advertising price
- **Spend Type** (required): Pricing unit (e.g., Per Column Cm)

### Location Details
- **City** (required): Publication city
- **Area** (required): Specific area
- **State** (required): State/Province
- **Country** (required): Country
- **Area Covered** (required): Coverage area description

### Publication Details
- **Frequency** (required): Publication frequency (Daily, Weekly, etc.)
- **Position** (required): Main or Supplement
- **Circulation** (required): Circulation numbers
- **Readership** (required): Readership numbers

### SEO & Description
- **Title** (required): Display title
- **Description** (required): Detailed description
- **Meta Title** (required): SEO meta title
- **Meta Description** (required): SEO meta description

## API Integration

### Endpoint
`POST /api/newspaper/upload`

### Request Format
- Content-Type: `multipart/form-data`
- All fields are sent as FormData
- Location is sent as JSON string
- Logo is uploaded as File

### Response Format
```typescript
{
  success: boolean;
  message: string;
  preview?: object; // On success
  error?: string;   // On error
}
```

## Usage

1. Navigate to `/admin/newspaper`
2. Fill in all required fields
3. Upload newspaper logo
4. Click "Upload Newspaper"
5. Wait for confirmation popup
6. Form resets automatically on success

## Validation Rules

- All fields marked with * are required
- Price must be a positive number
- Logo must be JPG, PNG, or JPEG
- Logo size must be less than 5MB
- All location fields must be filled
- Meta descriptions should be descriptive

## Type Safety

All types are defined in `src/types/newspaper.ts`:
- `INewspaper`: Main newspaper interface
- `LocationType`: Location object structure
- `FrequencyEnum`: Valid frequency values
- `PositionEnum`: Valid position values

## Styling

- Uses CSS Modules for scoped styling
- Responsive design with mobile breakpoints
- Modern UI with smooth animations
- Consistent color scheme
- Accessible button states

## Error Handling

1. **Validation Errors**: Shown inline below each field
2. **API Errors**: Shown via popup notification
3. **Network Errors**: Handled with user-friendly messages
4. **File Errors**: Validated before submission

## Future Enhancements

- [ ] Add drag-and-drop file upload
- [ ] Add bulk upload functionality
- [ ] Add newspaper listing/editing pages
- [ ] Add image compression before upload
- [ ] Add rich text editor for descriptions
- [ ] Add image cropping functionality


