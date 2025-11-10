# Bookstore Website Design Guidelines

## Design Approach

**Reference-Based**: Drawing inspiration from premium independent bookstore aesthetics (Strand, McNally Jackson) combined with refined e-commerce patterns (Bookshop.org, Etsy). Focus on creating an intimate, curated browsing experience that honors books as cherished objects.

**Core Philosophy**: Sophisticated minimalism that lets book covers shine while maintaining warmth and approachability. Think "literary journal meets modern gallery."

## Typography

**Primary Font**: Playfair Display (serif) for headings - elegant, literary feel
**Secondary Font**: Inter (sans-serif) for body text and UI elements - clean, highly readable
**Hierarchy**:
- Hero Headlines: 3xl to 5xl, Playfair Display, font weight 600
- Section Titles: 2xl to 3xl, Playfair Display, font weight 600
- Book Titles: xl to 2xl, Playfair Display, font weight 500
- Body Text: base to lg, Inter, font weight 400
- Metadata/Labels: sm, Inter, font weight 500, uppercase tracking

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Grid gaps: gap-6 to gap-8
- Container max-width: max-w-7xl with px-6

**Grid Philosophy**: Asymmetric, editorial layouts over rigid uniformity

## Page-Specific Designs

### Homepage (Brief & Engaging)
**Hero Section** (70vh):
- Large background image: Atmospheric bookstore interior (warm lighting, wooden shelves, books in soft focus)
- Centered overlay content with blurred background panel
- Hero headline: "Where Stories Find Their Readers"
- Subheading and primary CTA button
- NO extensive scrolling - content above fold

**Featured Books Carousel** (below fold):
- Horizontal scrolling showcase (4-5 books visible)
- Large book cover thumbnails with subtle shadows
- Book title and author on hover
- "View All Publications" CTA

**Quick About** (2-column split):
- Left: Short paragraph about bookstore mission (max-w-prose)
- Right: Single compelling image of curated book display

### Publications Page
**Filter Sidebar** (1/4 width, sticky):
- Search bar at top
- Genre filters (checkboxes)
- Author filter
- Publication year range

**Book Grid** (3/4 width, responsive):
- 3-column grid on desktop (lg:grid-cols-3)
- 2-column on tablet (md:grid-cols-2)
- 1-column on mobile
- Book cards: Cover image (3:4 ratio), title, author, publication year
- Hover: Subtle lift effect, no color overlay
- Cover images have subtle drop shadows

### Individual Book Detail Page
**Layout** (2-column):
- Left (40%): Large book cover image with shadow
- Right (60%): 
  - Title (3xl, Playfair)
  - Author (xl, italic)
  - Publication date
  - Synopsis (prose formatting, max-w-prose)
  - "Back to Publications" link

### About Us Page
**Hero** (text-focused, 50vh):
- Large centered headline
- Background: Subtle texture or muted book pattern

**Story Section** (single column):
- max-w-3xl centered
- 2-3 paragraphs in prose formatting
- Interspersed with 1-2 full-width images of bookstore space

**Values/Mission** (3-column cards):
- Icon + heading + brief description
- Minimal, clean presentation

### Contact Page
**2-Column Split**:
- Left (55%): Contact form (name, email, message)
- Right (45%): Bookstore details (address, hours, phone) + map placeholder

### Admin Panel
**Dashboard Layout**:
- Top navigation bar with "Dashboard", "Add Book", "Manage Books", "Logout"
- Clean table view for existing books (thumbnail, title, author, actions)
- Add/Edit forms: Single column, generous spacing between fields
- File upload with drag-and-drop zone for cover images
- Form inputs: Clear labels above fields, ample padding

## Component Library

**Navigation**: Horizontal top nav, full-width, sticky
- Logo left, nav links center, search icon right
- Minimal divider line below

**Buttons**: 
- Primary: Solid background with blurred effect when over images
- Secondary: Outlined style
- Padding: px-8 py-3

**Cards**: Book covers with minimal chrome
- Drop shadow: subtle, soft
- Border radius: rounded-lg
- Hover state: transform scale(1.02)

**Forms**: Clean, spacious
- Input borders: subtle, focus state emphasized
- Labels: above inputs, small caps
- Generous vertical spacing (space-y-6)

**Footer**: 
- 3-column grid: About snippet, Quick Links, Newsletter signup
- Minimal social icons
- Copyright and legal links

## Images

**Required Images**:
1. **Homepage Hero**: Warm, inviting bookstore interior - soft lighting on wooden shelves, books visible but slightly blurred, cozy atmosphere (1920x1080)
2. **About Page**: 2 images - bookstore exterior/entrance, interior reading nook or curated display shelf
3. **Book Covers**: Various placeholder covers for publications (minimum 8-12 books)
4. **Contact Page**: Map placeholder or exterior storefront photo

**Image Treatment**: All images use subtle overlays when text is placed on them, maintaining readability without harsh darkening

## Interactions

**Minimal Animations**:
- Page transitions: Fade in content (300ms)
- Hover states: Subtle scale/lift (200ms ease)
- NO scroll-triggered animations
- NO auto-playing carousels