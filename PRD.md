# Profile & Search Pages - Product Requirements Document

## Overview
This document provides comprehensive technical specifications to replicate the Profile and Search pages from the Swing dating website on another Next.js application.

## Table of Contents
1. [Technical Stack](#technical-stack)
2. [Project Structure](#project-structure) 
3. [Data Models & Interfaces](#data-models--interfaces)
4. [Profile Page Specifications](#profile-page-specifications)
5. [Search Page Specifications](#search-page-specifications)
6. [Shared Components](#shared-components)
7. [Styling System](#styling-system)
8. [Dependencies](#dependencies)
9. [Implementation Checklist](#implementation-checklist)

## Technical Stack

### Framework & Core
- **Next.js**: 15.4.5 with App Router
- **React**: 19 
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with CSS variables and OKLCH color space

### UI Components
- **shadcn/ui**: New York style with Radix UI primitives
- **Icons**: Lucide React
- **Carousel**: Embla Carousel (for photo gallery)
- **Utilities**: class-variance-authority, clsx, tailwind-merge

## Project Structure

```
/app
  /profile
    page.tsx                 # Profile page component
  /search  
    page.tsx                 # Search page component
  globals.css                # Global styles and utilities

/components
  /ui
    UserCard.tsx            # User profile card component
    FilterPill.tsx          # Filter button component  
    AdvancedFilters.tsx     # Advanced search filters
    photo-gallery-modal.tsx # Photo gallery modal
    Footer.tsx              # Site footer
  /layout
    Sidebar.tsx             # Navigation sidebar

/lib
  mock-data.ts             # Data structures and mock data
  utils.ts                 # Utility functions (cn helper)
  theme-context.tsx        # Theme management context
```

## Data Models & Interfaces

### Core User Interface
```typescript
export interface User {
  id: string;
  username: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline?: boolean;
  distance?: string;
  photosCount?: number;
  viewedTime?: string;
  isLiked?: boolean;
  bio?: string;
  interests?: string[];
}
```

### Profile-Specific Interfaces
```typescript
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  age: number;
  location: string;
  imageUrl: string;
  bio: string;
  joinDate: string;
  lastSeen: string;
  verified: boolean;
  stats: ProfileStats;
  interests: ProfileInterest[];
  lifestylePreferences: LifestylePreferences;
  recentActivity: Activity[];
  additionalImages: string[];
  preferences: {
    ageRange: [number, number];
    distanceRadius: number;
    lookingFor: string[];
  };
  hotDate?: HotDateProfile;
  profileDescription?: ProfileDescription;
  fantasies: Fantasy[];
  additionalComments: AdditionalComment[];
}

export interface ProfileStats {
  profileViews: number;
  matches: number;
  eventsAttended: number;
  profileCompleteness: number;
}

export interface LifestylePreferences {
  watch: number; // 0-100 percentage
  soft: number;
  full: number;
  couples: number;
  females: number;
  males: number;
  smoke: "Definitely" | "Maybe" | "Don't care" | "No Way";
  drink: "Definitely" | "Maybe" | "Don't care" | "No Way";
  age: string; // Age range like "30 - 45"
}

export interface Activity {
  id: string;
  type: 'match' | 'event' | 'profile_view' | 'message';
  title: string;
  description: string;
  timestamp: string;
  imageUrl?: string;
  user?: string;
}

export interface Fantasy {
  id: string;
  title: string;
  description: string;
  category: "romantic" | "adventure" | "lifestyle" | "travel" | "other";
  private: boolean;
}

export interface AdditionalComment {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  category: "personal" | "preferences" | "boundaries" | "other";
}

export interface HotDateProfile {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  isAttending: boolean;
  imageUrl?: string;
}

export interface ProfileDescription {
  title: string;
  content: string;
  lastUpdated: string;
}
```

## Profile Page Specifications

### Route
- Path: `/profile/page.tsx`

### Key Features

#### 1. Profile Header Section
- **Layout**: Responsive header with different mobile/desktop layouts
- **Mobile**: Stacked layout with image on left, info on right
- **Desktop**: Side-by-side with larger profile image (224x224px)
- **Components**:
  - Profile image with hover scale effect
  - Display name + age
  - Location with MapPin icon
  - Member since date with Calendar icon
  - Premium member badge (if verified)
  - Edit Profile and Settings buttons

#### 2. Tab Navigation System
- **Tabs**: About, Activity, Photos
- **Sliding Indicator**: Animated golden indicator that slides between tabs
- **State Management**: Uses `activeTab` state with refs for indicator positioning

#### 3. About Tab Content

**Lifestyle Preferences Section**:
- Progress bars for: Watch, Soft, Full, Couples, Females, Males
- Color-coded gradients (green, blue, purple, pink, orange)
- Legend with meaning of percentages
- Additional preferences: Smoke, Drink, Age Range

**Looking For Section**:
- Pills showing relationship preferences
- Age range and distance radius display

**Hot Date Section** (if available):
- Event image, title, description
- Date and location with icons
- Attending status indicator

**Profile Description Section**:
- Custom title and content
- Last updated timestamp

**Dreams & Fantasies Section**:
- Expandable fantasy cards
- Category badges
- Private indicator dots

**Additional Notes Section**:
- Timestamped comments
- Category classification

#### 4. Activity Tab
- Recent activity feed
- Activity icons and descriptions
- Timestamps formatted as "time ago"

#### 5. Photos Tab
- Grid layout (2-6 columns responsive)
- Click to open gallery modal
- Add Photo button
- Hover effects with overlay

#### 6. Sidebar Content
- **Stats Cards**: Profile views, matches, events, profile completion
- **Quick Actions**: Message, matches, events buttons
- **Profile Completion**: Progress bar and checklist
- **Online Status**: Live status indicator

### Responsive Breakpoints
- **Mobile**: Stack elements vertically, smaller images
- **Tablet**: 2-column layouts where appropriate
- **Desktop**: Full 3-column layout with sidebar
- **2xl**: Fixed sidebar with margin adjustments

## Search Page Specifications

### Route
- Path: `/search/page.tsx`

### Key Features

#### 1. Search Header Section
- **Background**: Glass morphism effect matching theme
- **Search Input**: 
  - Full-width with search icon
  - Clear button when text entered
  - Placeholder: "Search by username, location..."

#### 2. Quick Filters
- **Filters Available**:
  - Online Now
  - Nearby
  - New Members
  - Age: 18-35
  - Verified
- **FilterPill Component**: Toggle-based active/inactive states
- **Clear All**: Shows count of active filters with clear option

#### 3. Advanced Filters (Collapsible)
- **Toggle Button**: Shows/hides advanced options
- **Filter Groups**:
  - Age Range: 18-25, 26-35, 36-45, 46+
  - Distance: 5km, 10km, 25km, 50km+
  - Online Status: Online Now, Recently Active, All
  - Interests: Travel, Music, Sports, Food, Art, Movies, Books, Gaming
  - Photo Verified toggle
- **Responsive Grid**: 1-4 columns based on screen size

#### 4. Results Section
- **Results Header**: Count of members found
- **Sort Dropdown**: Distance, Recently Active, New
  - Fixed positioning dropdown to escape stacking contexts
  - Custom dropdown with absolute positioning

#### 5. User Grid
- **Layout**: Responsive grid (2-6 columns)
- **UserCard Component**: Compact variant for search
- **Animations**: Staggered entrance animations with delays
- **Load More**: Button for pagination

#### 6. No Results State
- Search icon, message, clear filters option

### State Management
```typescript
const [query, setQuery] = useState('');
const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
const [sortBy, setSortBy] = useState('distance');
const [showSortDropdown, setShowSortDropdown] = useState(false);
```

### Filtering Logic
```typescript
const filteredUsers = useMemo(() => {
  return users.filter(user => {
    const matchesQuery = !query || 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.location.toLowerCase().includes(query.toLowerCase());
    
    const matchesFilters = activeQuickFilters.length === 0 || 
      activeQuickFilters.some(filter => {
        // Filter logic implementation
      });
    
    return matchesQuery && matchesFilters;
  });
}, [query, activeQuickFilters]);
```

## Shared Components

### Sidebar Component
```typescript
interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}
```

**Features**:
- Mobile hamburger menu
- Desktop fixed sidebar
- Logo switching based on theme
- Active route highlighting
- Notification badges
- Theme toggle integration

### UserCard Component
```typescript
interface UserCardProps {
  username: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline?: boolean;
  photosCount?: number;
  isLiked?: boolean;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}
```

**Features**:
- Multiple variants (default, compact, featured)
- Responsive aspect ratios
- Glass morphism overlays
- Status indicators
- Action buttons (like, message)
- Hover effects

### FilterPill Component
```typescript
interface FilterPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}
```

**Styling**:
- Active: Golden gradient background
- Inactive: White/glass background
- Hover effects and scaling
- Dark mode variants

### PhotoGalleryModal Component
**Features**:
- Full-screen modal overlay
- Carousel navigation
- Thumbnail strip
- Keyboard controls (arrow keys, escape)
- Glass morphism styling
- Image counter

### Footer Component
**Sections**:
- Company info with logo
- Contact information
- Social media links
- Navigation links (4 columns)
- Copyright and legal links

## Styling System

### CSS Variables (globals.css)
```css
:root {
  --primary: oklch(0.75 0.23 85);
  --background: oklch(1 0 0);
  --foreground: oklch(0.2 0 0);
  --card: oklch(0.98 0 0);
  --muted: oklch(0.96 0 0);
  --border: oklch(0.92 0 0);
  /* ... additional variables */
}

.dark {
  --background: oklch(0.2077 0.0398 265.7549);
  --foreground: oklch(0.8717 0.0093 258.3382);
  --primary: oklch(0.7086 0.1306 71.6849);
  /* ... dark theme variables */
}
```

### Custom Utility Classes
```css
.glass {
  backdrop-filter: blur(12px);
  background-color: oklch(1 0 0 / 10%);
  border: 1px solid oklch(1 0 0 / 20%);
}

.glass-dark {
  backdrop-filter: blur(12px);
  background-color: oklch(0 0 0 / 30%);
  border: 1px solid oklch(1 0 0 / 10%);
}

.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px oklch(0 0 0 / 15%);
}

.section-glass {
  backdrop-filter: blur(8px);
  background-color: oklch(0.97 0 0 / 90%);
  border: 1px solid oklch(0.90 0 0 / 60%);
}
```

### Theme System
- Multiple theme variants: default, dark, bubble-gum, cyberpunk
- Context-based theme management
- Persistent theme storage
- Logo switching based on theme

## Dependencies

### Core Dependencies
```json
{
  "next": "15.4.5",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "lucide-react": "latest"
}
```

### UI & Animation
```json
{
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-slot": "latest",
  "embla-carousel-react": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest",
  "tw-animate-css": "latest"
}
```

### Development
```json
{
  "eslint": "latest",
  "eslint-config-next": "latest",
  "@types/node": "latest",
  "@types/react": "latest",
  "@types/react-dom": "latest"
}
```

## Implementation Checklist

### Phase 1: Setup & Foundation
- [ ] Install Next.js 15.4.5 with TypeScript
- [ ] Configure Tailwind CSS v4 with OKLCH colors
- [ ] Set up path aliases (`@/*` mapping)
- [ ] Install required dependencies
- [ ] Create folder structure

### Phase 2: Data Layer
- [ ] Create `lib/mock-data.ts` with all interfaces
- [ ] Implement helper functions (formatActivityTime, getActivityIcon)
- [ ] Set up theme context and management
- [ ] Create utility functions (cn helper)

### Phase 3: Shared Components
- [ ] Build Sidebar component with responsive navigation
- [ ] Create UserCard component with all variants
- [ ] Implement FilterPill component with styling
- [ ] Build PhotoGalleryModal with carousel
- [ ] Create Footer component with all sections

### Phase 4: Profile Page
- [ ] Build profile header with responsive layouts
- [ ] Implement tab navigation with sliding indicator
- [ ] Create lifestyle preferences section with progress bars
- [ ] Build activity feed and photos grid
- [ ] Add sidebar stats and quick actions
- [ ] Test all responsive breakpoints

### Phase 5: Search Page  
- [ ] Implement search input with clear functionality
- [ ] Build quick filters with state management
- [ ] Create advanced filters with collapsible section
- [ ] Add user grid with filtering logic
- [ ] Implement sort dropdown with proper positioning
- [ ] Add loading states and animations

### Phase 6: Styling & Polish
- [ ] Implement glass morphism effects
- [ ] Add hover animations and transitions
- [ ] Configure theme switching
- [ ] Test dark mode and alternate themes
- [ ] Optimize images and performance
- [ ] Add accessibility features

### Phase 7: Testing & Validation
- [ ] Test responsive design on all breakpoints
- [ ] Verify theme switching functionality
- [ ] Test search and filtering logic
- [ ] Validate photo gallery modal
- [ ] Check keyboard navigation
- [ ] Performance optimization

## Additional Implementation Notes

### Image Optimization
- Use Next.js Image component with proper sizing
- Configure image domains in `next.config.js`
- Implement lazy loading for photo grids
- Add placeholder images for loading states

### Performance Considerations
- Implement virtual scrolling for large user lists
- Use React.memo for expensive components
- Optimize re-renders with proper dependency arrays
- Consider image preloading for gallery

### Accessibility
- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatible
- Focus management in modals
- Color contrast compliance

### Mobile Optimization
- Touch-friendly interactive elements
- Smooth scrolling and transitions
- Proper viewport handling
- iOS/Android specific considerations

This PRD provides all necessary specifications to recreate both pages with pixel-perfect accuracy and full functionality.