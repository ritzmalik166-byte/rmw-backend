# Newspaper Management System

## Overview
A comprehensive, production-ready newspaper management system with full CRUD operations, advanced filtering, sorting, pagination, and a beautiful responsive UI.

## Features

### 📋 View & List
- **Table View**: Display all newspapers in a clean, organized table
- **Pagination**: Navigate through large datasets (10 items per page)
- **Responsive Design**: Works perfectly on all device sizes
- **Real-time Stats**: Shows total newspapers, filtered count, and current page

### 🔍 Search & Filter
- **Real-time Search**: Search by paper name, language, category, city, or state
- **Advanced Filters**: Filter by language, category, frequency, position, and location
- **Sort by Price**: Sort newspapers by price (low to high or high to low)
- **Active Filter Count**: Visual indicator showing number of active filters

### ✏️ Edit
- **Pre-filled Forms**: All existing data loaded automatically
- **Validation**: Comprehensive client-side validation
- **Image Handling**: Option to keep existing logo or upload new one
- **Auto-slug Generation**: Slug automatically generated from paper name

### 🗑️ Delete
- **Confirmation Modal**: Prevents accidental deletions
- **Image Cleanup**: Automatically removes associated image files
- **Instant Updates**: List refreshes immediately after deletion

### 🎨 UI/UX Features
- **Loading States**: Custom loader during operations
- **Success/Error Notifications**: Beautiful popup notifications
- **Empty States**: Helpful messages when no data found
- **Hover Effects**: Interactive elements with smooth transitions
- **Color-coded Badges**: Visual indicators for status and position

## File Structure

```
manage/
├── page.tsx                          # Main management page
├── page.module.css                   # Page styles
├── README.md                         # This file
└── components/
    ├── FilterPanel.tsx               # Search and filter controls
    ├── FilterPanel.module.css        # Filter panel styles
    ├── NewspaperTable.tsx            # Newspaper data table
    ├── NewspaperTable.module.css     # Table styles
    ├── DeleteModal.tsx               # Delete confirmation modal
    ├── DeleteModal.module.css        # Modal styles
    ├── Pagination.tsx                # Pagination controls
    ├── Pagination.module.css         # Pagination styles
    └── index.ts                      # Component exports
```

## Usage

### Accessing the Management Page
Navigate to: `/admin/newspaper/manage`

### Searching for Newspapers
1. Use the search bar at the top
2. Type paper name, language, category, or location
3. Results update in real-time

### Filtering Newspapers
1. Click the "🔧 Filters" button
2. Set your filter criteria:
   - Language (text input)
   - Category (text input)
   - Frequency (dropdown)
   - Position (dropdown)
   - City, State, Country (text inputs)
3. Click "Apply Filters"
4. Active filter count shown on filter button

### Sorting Newspapers
1. Use the "Sort by Price" dropdown
2. Choose:
   - "Price: Low to High" (ascending)
   - "Price: High to Low" (descending)

### Editing a Newspaper
1. Click the ✏️ (edit) button in the Actions column
2. Update the form fields
3. Optionally upload a new logo
4. Click "Update Newspaper"
5. Success notification appears
6. Automatically redirected to management page

### Deleting a Newspaper
1. Click the 🗑️ (delete) button in the Actions column
2. Confirm deletion in the modal
3. Success notification appears
4. List refreshes automatically

### Pagination
- Use "Previous" and "Next" buttons
- Click page numbers to jump to specific page
- Ellipsis (...) indicates skipped pages

## Components

### FilterPanel
**Props:**
- `searchTerm`: Current search text
- `onSearchChange`: Search update handler
- `sorting`: Current sort direction
- `onSortChange`: Sort update handler
- `filterData`: Active filters
- `onApplyFilters`: Filter apply handler
- `onClearFilters`: Clear all filters handler

**Features:**
- Collapsible filter panel
- Real-time search
- Multiple filter criteria
- Active filter badge

### NewspaperTable
**Props:**
- `newspapers`: Array of newspapers to display
- `onDelete`: Delete handler function

**Features:**
- Logo preview
- Paper info with category
- Location display
- Price with spend type
- Frequency and position badges
- Action buttons (edit/delete)

### DeleteModal
**Props:**
- `newspaperName`: Name of newspaper to delete
- `onConfirm`: Confirmation handler
- `onCancel`: Cancel handler

**Features:**
- Warning icon
- Newspaper name highlight
- Confirmation requirement
- Warning message

### Pagination
**Props:**
- `currentPage`: Current active page
- `totalPages`: Total number of pages
- `onPageChange`: Page change handler

**Features:**
- Smart page number display
- Previous/Next navigation
- Ellipsis for skipped pages
- Active page highlighting

## API Integration

### Fetch All Newspapers
```typescript
POST /api/newspaper
Body: {
  filterData: FilterData,
  sorting: "asc" | "desc" | ""
}
```

### Get Single Newspaper
```typescript
GET /api/newspaper/[paperId]
```

### Update Newspaper
```typescript
PATCH /api/newspaper/[paperId]
Body: FormData with newspaper fields
```

### Delete Newspaper
```typescript
DELETE /api/newspaper/[paperId]
```

## Type Safety

All components use strict TypeScript types:

```typescript
interface NewspaperWithId extends INewspaper {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface FilterData {
  language?: string;
  category?: string;
  frequency?: FrequencyEnum;
  position?: PositionEnum;
  "location.city"?: string;
  "location.state"?: string;
  "location.country"?: string;
}
```

## Styling

### Color Scheme
- Primary: `#3b82f6` (Blue)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Warning: `#f59e0b` (Orange)

### Breakpoints
- Mobile: `< 640px`
- Tablet: `< 768px`
- Desktop: `≥ 768px`

## Performance Optimizations

1. **Client-side Search**: Fast, instant results
2. **Pagination**: Only render 10 items at a time
3. **Conditional Rendering**: Components render only when needed
4. **CSS Modules**: Scoped, optimized styles
5. **Lazy Loading**: Components load as needed

## Error Handling

### Network Errors
- Caught and displayed via popup notifications
- User-friendly error messages
- Console logging for debugging

### Validation Errors
- Inline error messages
- Field-specific validation
- Form submission prevention

### API Errors
- Status code handling
- Custom error messages
- Graceful degradation

## Accessibility

- Semantic HTML elements
- Proper ARIA labels
- Keyboard navigation support
- Focus states on interactive elements
- High contrast ratios
- Responsive text sizing

## Future Enhancements

- [ ] Bulk operations (delete multiple)
- [ ] Export to CSV/Excel
- [ ] Advanced search with operators
- [ ] Column sorting
- [ ] Customizable table columns
- [ ] Drag & drop reordering
- [ ] Duplicate newspaper functionality
- [ ] Print preview
- [ ] Activity log/history
- [ ] Undo delete functionality

## Troubleshooting

### Newspapers Not Loading
- Check API endpoint is running
- Verify MongoDB connection
- Check console for errors
- Ensure proper authentication

### Filters Not Working
- Clear browser cache
- Check filter data format
- Verify API supports filtering
- Check MongoDB query syntax

### Images Not Displaying
- Check `SERVER_IMG_PATH` environment variable
- Verify image file permissions
- Check image paths in database
- Ensure images exist on server

### Pagination Issues
- Check `ITEMS_PER_PAGE` constant
- Verify total count calculation
- Check page number boundaries
- Clear filters and retry

## Support

For issues or questions:
1. Check this README
2. Review component source code
3. Check browser console for errors
4. Verify API responses
5. Check MongoDB data structure

---

**Built with ❤️ for production use**


