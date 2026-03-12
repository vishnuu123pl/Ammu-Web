# Specification

## Summary
**Goal:** Pre-populate the FLUxera Borrow page with at least 20 realistic sample/demo items across multiple categories so the prototype can be presented without manual data entry.

**Planned changes:**
- Seed the backend with at least 20 sample items spanning 6 categories: Textbooks (Engineering Drawing, DBMS, Circuit Theory, Data Structures, C Programming), Calculators (Casio FX-991ES Plus, TI-84, Classwiz FX-570), Sports Utilities (Cricket Bat, Football, Badminton Racket, Shuttle Cocks, Volleyball), Lab Coats (Size M, Size L), Electronics/DSLRs (Nikon D3500, Tripod Stand, USB Hub), and Hostel Essentials (Study Lamp, Extension Board, Electric Kettle)
- Each sample item includes: realistic name, short description, category, per-day price in ₹ (₹5–₹50 range), optional per-month price, hostel-based location string (e.g., "Hostel B, Room 204"), and a plausible owner display name
- Sample data is accessible on the Borrow page without requiring authentication
- Items are searchable and filterable by category using the existing Borrow page UI

**User-visible outcome:** The Borrow page immediately displays a rich set of sample items across all categories upon loading, allowing prototype demos without any manual data entry or login.
