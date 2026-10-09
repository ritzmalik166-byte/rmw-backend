# Newspaper Admin System - File Structure

```
src/app/(adminSide)/admin/newspaper/
│
├── page.tsx                          # Main upload page component
├── page.module.css                   # Styles for main page
├── README.md                         # Documentation
├── STRUCTURE.md                      # This file
│
└── components/
    ├── index.ts                      # Component exports
    │
    ├── Loader.tsx                    # Loading overlay component
    ├── Loader.module.css             # Loader styles
    │
    ├── Popup.tsx                     # Notification popup component
    ├── Popup.module.css              # Popup styles
    │
    ├── FormInput.tsx                 # Reusable form input component
    ├── FormInput.module.css          # Form input styles
    │
    ├── FileUpload.tsx                # File upload component with preview
    └── FileUpload.module.css         # File upload styles
```

## Related Files

```
src/
├── types/
│   └── newspaper.ts                  # TypeScript type definitions
│
├── models/
│   └── NewsPaper.ts                  # MongoDB schema (updated)
│
└── app/
    └── api/
        └── newspaper/
            └── upload/
                └── route.ts          # API endpoint (updated)
```

## Component Hierarchy

```
NewspaperUploadPage (page.tsx)
│
├── Loader (conditional)
├── Popup (conditional)
│
└── Form
    ├── Basic Information Section
    │   ├── FormInput (Paper Name)
    │   ├── FormInput (Language)
    │   ├── FormInput (Category)
    │   ├── FormInput (Publications)
    │   └── FileUpload (Logo)
    │
    ├── Pricing Section
    │   ├── FormInput (Price)
    │   └── FormInput (Spend Type)
    │
    ├── Location Section
    │   ├── FormInput (City)
    │   ├── FormInput (Area)
    │   ├── FormInput (State)
    │   ├── FormInput (Country)
    │   └── FormInput (Area Covered)
    │
    ├── Publication Details Section
    │   ├── FormInput (Frequency - Select)
    │   ├── FormInput (Position - Select)
    │   ├── FormInput (Circulation)
    │   └── FormInput (Readership)
    │
    ├── SEO Section
    │   ├── FormInput (Title)
    │   ├── FormInput (Description - Textarea)
    │   ├── FormInput (Meta Title)
    │   └── FormInput (Meta Description - Textarea)
    │
    └── Form Actions
        ├── Button (Reset)
        └── Button (Submit)
```

## Data Flow

```
1. User Input
   ↓
2. Form State (useState)
   ↓
3. Client-side Validation
   ↓
4. FormData Creation
   ↓
5. API Call (POST /api/newspaper/upload)
   ↓
6. Server-side Processing
   ↓
7. MongoDB Storage
   ↓
8. Response to Client
   ↓
9. Popup Notification
   ↓
10. Form Reset (on success)
```

## State Management

### Form State
```typescript
{
  paperName: string
  language: string
  price: string
  spendType: string
  location: {
    city: string
    area: string
    state: string
    country: string
  }
  areaCovered: string
  category: string
  publications: string
  frequency: FrequencyEnum
  position: PositionEnum
  circulation: string
  readership: string
  title: string
  desc: string
  metaTitle: string
  metaDesc: string
  logoImg: File | null
}
```

### UI State
```typescript
{
  errors: { [key: string]: string }
  isLoading: boolean
  popup: {
    show: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  }
}
```

## Key Features Implementation

### 1. Type Safety
- ✅ No `any` types used
- ✅ Strict TypeScript configuration
- ✅ Proper interface definitions
- ✅ Type-safe event handlers

### 2. Custom Loader
- ✅ Full-screen overlay
- ✅ Backdrop blur effect
- ✅ CSS animations
- ✅ Prevents interaction

### 3. Custom Popup
- ✅ 4 notification types
- ✅ Auto-close with progress bar
- ✅ Slide-in animation
- ✅ Mobile responsive

### 4. Form Validation
- ✅ Required field validation
- ✅ Number validation
- ✅ File type validation
- ✅ File size validation
- ✅ Real-time error display

### 5. API Integration
- ✅ FormData handling
- ✅ File upload support
- ✅ JSON location data
- ✅ Error handling
- ✅ Success handling

## CSS Architecture

### Methodology
- CSS Modules for scoping
- BEM-like naming within modules
- Mobile-first responsive design
- Consistent spacing scale

### Color Palette
- Primary: `#3b82f6` (Blue)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Warning: `#f59e0b` (Orange)
- Info: `#3b82f6` (Blue)
- Neutral: Gray scale

### Breakpoints
- Mobile: `< 640px`
- Tablet: `< 768px`
- Desktop: `≥ 768px`


