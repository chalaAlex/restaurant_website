# Restaurant Reservation System - Complete Guide

## Overview

A restaurant reservation system manages table bookings, capacity planning, and customer flow. It connects customers who want to dine at specific times with restaurant capacity management.

---

## How Restaurant Reservations Work

### Core Concepts

**1. Table Management**
- Restaurants have a fixed number of tables
- Each table has a specific capacity (2-person, 4-person, 6-person, etc.)
- Tables can sometimes be combined for larger parties
- Tables need time between seatings (turnover time)

**2. Time Slots**
- Restaurants operate in service periods (lunch, dinner)
- Reservations are typically in 15-30 minute intervals
- Average dining duration: 1.5-2 hours
- Buffer time needed between reservations for table reset

**3. Capacity Management**
- Total capacity = number of seats available
- Utilization rate = how full the restaurant is
- Peak times (Friday/Saturday evenings) vs. slow periods
- Walk-in vs. reservation balance (typically 70% reserved, 30% walk-ins)

**4. Reservation Status Lifecycle**
```
Pending → Confirmed → Seated → Completed
                 ↓
              Cancelled
                 ↓
              No-Show
```

---

## Part 1: Customer Side (Client-Facing)

### Customer Journey Flow


#### Step 1: Initiate Reservation
**Customer Actions:**
- Visit restaurant website or app
- Click "Reserve a Table" or "Book Now"
- Alternative: Call restaurant directly

**What Happens:**
- System loads reservation form
- Shows restaurant's operating hours
- Displays available dates

#### Step 2: Select Date & Time
**Customer Inputs:**
- Desired date (calendar picker)
- Preferred time (dropdown/time slots)
- Number of guests (2-20+)

**System Logic:**
```javascript
// Behind the scenes
- Check if date is valid (not in past, within booking window)
- Query available time slots for that date
- Calculate capacity based on party size
- Filter out fully booked times
- Display only available options
```

**Display to Customer:**
- ✅ Available times (highlighted in green)
- ❌ Unavailable times (grayed out or hidden)
- ⚠️ Limited availability (shown with warning)
- Popular times may show "Only 2 tables left"


#### Step 3: Enter Contact Information
**Customer Provides:**
- First Name *
- Last Name *
- Email Address * (for confirmation)
- Phone Number * (for day-of contact)
- Special Requests (optional)
  - Dietary restrictions
  - Accessibility needs
  - Celebrations (birthday, anniversary)
  - Seating preferences (window, patio, quiet area)

**System Validation:**
- Email format check
- Phone number format validation
- Duplicate reservation check (same person, same time)
- Spam prevention (rate limiting)

#### Step 4: Confirmation
**Immediate Actions:**
1. System creates reservation record in database
2. Generates unique confirmation number
3. Reduces available capacity for that time slot
4. Sends confirmation email to customer

**Confirmation Email Contains:**
- Restaurant name and logo
- Confirmation number (e.g., #BV-2024-1234)
- Date, time, party size
- Restaurant address and phone
- Cancellation/modification link
- Add to calendar option
- Special instructions or COVID policies


#### Step 5: Reminder Notifications
**Automated Communications:**

**24 Hours Before:**
- Email reminder sent
- SMS reminder (if enabled)
- Includes:
  - Reservation details
  - Option to modify or cancel
  - Directions/parking information
  - Contact number

**2 Hours Before:**
- Final SMS reminder
- "We're looking forward to seeing you!"
- Reconfirm or cancel link

**Purpose:**
- Reduce no-shows
- Allow customers to cancel if plans change
- Improve table turnover planning

#### Step 6: Day of Reservation
**Customer Actions:**
- Arrive at restaurant
- Provide name or confirmation number
- Host checks reservation in system
- Customer is seated

**If Late:**
- Most restaurants hold tables for 15 minutes
- After 15 min: Table may be released
- Customer should call if running late


### Customer Self-Service Features

#### Modify Reservation
**Process:**
1. Customer clicks link in confirmation email
2. Enters confirmation number or email
3. System loads existing reservation
4. Customer can:
   - Change date/time (if availability exists)
   - Change party size
   - Update contact info
   - Add special requests
5. System updates reservation
6. Sends new confirmation email

#### Cancel Reservation
**Process:**
1. Customer accesses reservation via link
2. Clicks "Cancel Reservation"
3. System may ask for reason (optional feedback)
4. Confirmation of cancellation
5. Capacity released back to available pool
6. Cancellation email sent

**Cancellation Policies:**
- Free cancellation up to 24 hours before
- Late cancellations (< 24hrs) may incur fees (high-end restaurants)
- No-show policy explained clearly


### Customer Experience Best Practices

**Instant Confirmation:**
- Confirmation should be immediate (no manual approval wait)
- Clear confirmation number
- Immediate email receipt

**Transparency:**
- Show real-time availability
- Explain waitlist process if fully booked
- Clear cancellation policy upfront
- Honest wait time estimates

**Mobile-Friendly:**
- 60%+ of reservations come from mobile
- Easy form filling on small screens
- Touch-friendly date/time pickers
- One-tap phone calling

**Accessibility:**
- Screen reader compatible
- Keyboard navigation
- Clear error messages
- Alternative: phone booking always available

---

## Part 2: Restaurant Owner/Manager Side (Back Office)

### Dashboard Overview

Restaurant staff need a central system to manage all reservations and optimize seating.


### Restaurant Management Dashboard

#### Main Dashboard View

**Today's Overview:**
```
┌─────────────────────────────────────────────────┐
│  TODAY: Friday, June 24, 2026                   │
│                                                  │
│  Reservations: 45    Walk-ins: 12    Capacity: 85%│
│  Confirmed: 40       Seated: 15      No-shows: 2  │
│                                                  │
│  Peak Times:                                     │
│  🔴 7:00 PM - FULL (15 reservations)            │
│  🟡 6:30 PM - 2 spots left                      │
│  🟢 8:30 PM - 8 spots available                 │
└─────────────────────────────────────────────────┘
```

**Key Metrics Displayed:**
- Total reservations for the day
- Current seated parties
- Upcoming arrivals (next 2 hours)
- Capacity utilization %
- No-show rate
- Average party size
- Revenue potential


#### Reservation List View

**Filters:**
- By date/date range
- By status (pending, confirmed, seated, completed, cancelled)
- By time slot
- By party size
- By special requests (VIP, birthday, etc.)
- Search by name, phone, or confirmation number

**Each Reservation Shows:**
```
┌─────────────────────────────────────────────────┐
│ #BV-2024-1234                      [CONFIRMED]   │
│ Sarah Johnson - Party of 4                       │
│ 7:00 PM                     📞 (555) 123-4567   │
│ ✉️ sarah@email.com                              │
│ 🎂 Birthday celebration - Window seating request│
│                                                  │
│ [Call] [Text] [Email] [Seat] [Cancel] [Edit]   │
└─────────────────────────────────────────────────┘
```

**Actions Available:**
- **Seat** - Mark as arrived/seated
- **Confirm** - Send confirmation reminder
- **Call/Text/Email** - Contact customer
- **Edit** - Modify details
- **Cancel** - Cancel reservation
- **No-Show** - Mark as no-show
- **Notes** - Add internal staff notes


#### Floor Plan / Table Management

**Visual Table Layout:**
```
┌─────────────────────────────────────────────────┐
│  Dining Room Floor Plan                          │
│                                                  │
│  [T1]    [T2]    [T3]        WINDOW             │
│   ✅      🔴      🟢                            │
│  2-top   4-top   2-top                          │
│                                                  │
│  [T4]         [T5]           BAR                │
│   🔴           🟡                                │
│  6-top        4-top                             │
│                                                  │
│  [T6] [T7] [T8]              PATIO              │
│   🟢  ✅   🔴                                   │
│  4-top 4-top 8-top                              │
│                                                  │
│  ✅ Available  🟡 Reserved  🔴 Seated           │
└─────────────────────────────────────────────────┘
```

**Table Status:**
- **Available** - Ready for seating
- **Reserved** - Upcoming reservation
- **Seated** - Currently occupied
- **Cleaning** - Being cleaned/reset
- **Blocked** - Unavailable (broken, maintenance)

**Table Assignment:**
- Drag-and-drop reservation to table
- Auto-suggest best table for party size
- Combine tables for large parties
- Track table turnover time
- Estimate when table will be free


### Restaurant Settings & Configuration

#### Operating Hours Setup

**Service Periods:**
```
Lunch Service:
- Days: Monday - Friday
- Hours: 11:00 AM - 2:30 PM
- Last seating: 2:00 PM

Dinner Service:
- Days: Monday - Thursday: 5:00 PM - 10:00 PM
- Days: Friday - Saturday: 5:00 PM - 11:00 PM
- Days: Sunday: 4:00 PM - 9:00 PM
- Last seating: 30 minutes before close

Brunch Service (Weekend):
- Days: Saturday - Sunday
- Hours: 10:00 AM - 3:00 PM
```

**Time Slot Configuration:**
- Interval: 15 or 30 minutes
- Buffer between slots: 0-15 minutes
- Average dining duration: 90 minutes
- Table turnover calculations


#### Capacity Management

**Table Inventory:**
```
Table Configuration:
- 4 x 2-person tables = 8 seats
- 8 x 4-person tables = 32 seats
- 2 x 6-person tables = 12 seats
- 1 x 8-person table = 8 seats
─────────────────────────────
Total: 15 tables, 60 seats
```

**Reservation Limits:**
- Maximum party size online: 8 people
- Large party (9+): Call for availability
- Maximum reservations per time slot: 10-12
- Reserved vs. walk-in ratio: 70/30

**Booking Window:**
- Advance booking: 60 days ahead
- Minimum advance: 2 hours
- Same-day cutoff: 2:00 PM for dinner

**Special Date Overrides:**
- Holiday hours (Christmas, Thanksgiving)
- Private events (block entire restaurant)
- Maintenance days (closed)
- Special pricing/minimums for Valentine's, NYE


### Manager Operations

#### Manual Reservation Creation

**When Used:**
- Phone reservations
- Walk-in requesting future booking
- VIP/special requests
- Group bookings
- Correcting errors

**Process:**
1. Access "New Reservation" form
2. Enter customer details
3. Select date/time (system shows capacity)
4. Override capacity if needed (manager privilege)
5. Add internal notes
6. Choose notification method (email/SMS/none)
7. Save reservation
8. Optionally send confirmation

#### Handling Conflicts

**Overbooking Scenario:**
```
Problem: 7:00 PM has 15 reservations but only 13 tables
Solution Options:
1. Call customers to shift to 6:30 or 7:30
2. Offer bar seating while table prepares
3. Combine small tables for couples
4. Speed up earlier seating turnover
5. Politely decline/suggest alternative date
```

**Walk-in When Full:**
- Check for no-shows (15+ min late)
- Offer waitlist with SMS notification
- Suggest bar dining
- Take contact info for cancellation notification
- Provide realistic wait time estimate


#### Customer Communication

**Proactive Outreach:**

**Confirmation Calls (High-End Restaurants):**
- Day before reservation
- Personal touch
- Verify party size
- Mention special requests acknowledged
- Answer questions

**Handling Special Requests:**
- Birthday: Prepare dessert with candle
- Anniversary: Best table, champagne option
- Proposal: Extra privacy, coordinate timing
- Dietary: Alert kitchen in advance
- Accessibility: Ensure proper seating available

**Issue Resolution:**
- Late cancellations: Try to fill slot
- Customer complaints: Document in profile
- VIP management: Flag important customers
- Feedback collection: Post-dining surveys


### Reporting & Analytics

#### Daily Operations Report
```
Date: June 24, 2026
───────────────────────────────────────
Reservations Taken:     45
Walk-ins:               12
Total Covers:           180
No-shows:               2 (4.4%)
Cancellations:          5 (11%)
Average Party Size:     3.2
Table Turns:            2.1x
Revenue:                $8,500
Average Check:          $47.22
───────────────────────────────────────
Peak Time: 7:00-8:00 PM (85% capacity)
```

#### Performance Metrics

**Utilization:**
- Seats filled vs. available
- Peak vs. slow time analysis
- Day of week patterns
- Seasonal trends

**Customer Behavior:**
- Booking lead time (how far in advance)
- Cancellation rate by day/time
- No-show patterns
- Repeat customer rate
- Party size distribution

**Revenue Optimization:**
- Revenue per available seat hour (RevPASH)
- High-value time slots
- Optimal pricing opportunities
- Promotion effectiveness


#### Customer Database (CRM)

**Profile Information:**
```
Customer: Sarah Johnson
Member Since: 2023
Total Visits: 12
Last Visit: May 15, 2026
Average Spend: $85
Favorite Table: Window seat
Dietary: Vegetarian
Occasions: 2 birthdays, 1 anniversary
Notes: Allergic to peanuts, prefers red wine
Status: VIP
```

**Marketing Uses:**
- Send birthday/anniversary reminders
- Special offers for loyal customers
- Re-engagement campaigns (haven't visited in 6 months)
- Survey requests
- New menu item announcements
- Event invitations

---

## Part 3: Technical Implementation

### Database Schema

**Core Tables:**

**reservations**
- id (primary key)
- customer_id (foreign key)
- confirmation_number (unique)
- date
- time
- party_size
- status (pending/confirmed/seated/completed/cancelled/no-show)
- special_requests
- table_id (assigned table)
- created_at
- updated_at


**customers**
- id (primary key)
- first_name
- last_name
- email
- phone
- dietary_restrictions
- notes
- total_visits
- total_spent
- vip_status
- created_at

**tables**
- id (primary key)
- table_number
- capacity
- location (main dining, patio, bar)
- status (available/reserved/seated/blocked)
- notes

**availability_rules**
- id
- day_of_week
- start_time
- end_time
- max_capacity
- max_reservations_per_slot
- is_active

**blocked_dates**
- id
- date
- reason (holiday, private event, maintenance)
- is_full_day_closure


### Availability Calculation Algorithm

```javascript
function checkAvailability(date, time, partySize) {
  // 1. Check if date is valid
  if (isPastDate(date) || isBlockedDate(date)) {
    return { available: false, reason: 'Date unavailable' }
  }
  
  // 2. Check operating hours
  if (!isDuringOperatingHours(date, time)) {
    return { available: false, reason: 'Outside operating hours' }
  }
  
  // 3. Get existing reservations for that time
  const timeWindow = getTimeWindow(time) // +/- 1 hour
  const existingReservations = getReservations(date, timeWindow)
  
  // 4. Calculate capacity
  const totalSeats = getTotalSeats()
  const reservedSeats = existingReservations.reduce(
    (sum, res) => sum + res.party_size, 0
  )
  const availableSeats = totalSeats - reservedSeats
  
  // 5. Check if party fits
  if (availableSeats >= partySize) {
    // Check max reservations per slot
    if (existingReservations.length < MAX_RESERVATIONS_PER_SLOT) {
      return { 
        available: true, 
        remainingSeats: availableSeats - partySize 
      }
    }
  }
  
  return { available: false, reason: 'Fully booked' }
}
```


### Notification System

**Email Templates:**

**Confirmation Email:**
```
Subject: Reservation Confirmed - Bella Vista

Hi Sarah,

Your reservation at Bella Vista is confirmed!

Confirmation #: BV-2024-1234
Date: Friday, June 24, 2026
Time: 7:00 PM
Party Size: 4 people

Restaurant Address:
123 Main Street, New York, NY 10001

Phone: (123) 456-7890

Special Requests: Birthday celebration, window seating

[Add to Calendar] [Modify] [Cancel]

We look forward to serving you!
```

**Reminder SMS (24 hours before):**
```
Bella Vista: Reminder - Your reservation for 4 
on Fri Jun 24 at 7:00 PM is confirmed. 
Reply C to cancel. Confirmation #BV-2024-1234
```

**Automated Triggers:**
- On booking: Immediate confirmation
- 24 hours before: Reminder email + SMS
- 2 hours before: Final SMS reminder
- On cancellation: Cancellation confirmation
- On modification: Updated confirmation


---

## Part 4: Advanced Features

### Waitlist Management

**When Fully Booked:**
1. Customer can join waitlist
2. Provide contact info (phone/email)
3. Get estimated wait time
4. Receive SMS when table available
5. 10-minute window to claim or decline

**Waitlist Priority:**
- Time of waitlist entry
- Party size (match to available table)
- VIP status
- Special occasions

### Dynamic Pricing

**Premium Time Slots:**
- Friday/Saturday 7-8 PM: Peak pricing
- Lower demand times: Discounts
- Early bird specials (5-6 PM)
- Late seating discounts (9 PM+)

**Implementation:**
- Minimum spend requirements
- Prepaid deposits for no-show prevention
- Cancellation fees for late cancels
- Incentives for off-peak bookings


### Integration Points

**POS System Integration:**
- Link reservation to table check
- Track actual spend vs. party size
- Automatic completion when check closed
- Revenue tracking per reservation

**Google/Yelp Integration:**
- "Reserve a Table" button on listings
- Cross-platform availability sync
- Review request after dining

**Calendar Integration:**
- iCal/Google Calendar export
- Apple Wallet pass
- Outlook integration

**Payment Integration:**
- Prepayment for large parties
- Deposit collection
- Gift certificate redemption
- Loyalty program points

---

## Part 5: Best Practices

### For Restaurants

**Do's:**
✅ Respond to online bookings within 1 minute (automatic)
✅ Send reminder 24 hours before
✅ Keep accurate table status
✅ Honor reservations (don't overbook without plan)
✅ Track no-shows and repeat offenders
✅ Offer flexible modification options
✅ Train staff on system usage
✅ Regular data backup


**Don'ts:**
❌ Manually approve each reservation (auto-confirm)
❌ Ignore no-shows (track for future bookings)
❌ Overbook beyond recovery capacity
❌ Make customers wait without updates
❌ Forget special occasion notes
❌ Charge excessive cancellation fees
❌ Neglect system maintenance

### For Customers

**Making Reservations:**
- Book as far in advance as possible for peak times
- Provide accurate party size
- Arrive on time (or call if late)
- Cancel if plans change (be courteous)
- Mention special occasions
- Specify dietary restrictions in advance

**No-Show Prevention:**
- Add to calendar immediately
- Set personal reminders
- Call if running late
- Cancel early if can't make it

---

## Part 6: Implementation for Your Website

### Current Status
✅ **Built:** Beautiful reservation form UI
❌ **Needed:** Backend functionality


### Implementation Roadmap

#### Phase 1: Basic Backend (Week 1-2)
- [ ] Set up PostgreSQL database
- [ ] Create Prisma schema (see ARCHITECTURE.md)
- [ ] Build API route: POST /api/reservations
- [ ] Form validation with Zod
- [ ] Generate confirmation numbers
- [ ] Send confirmation email (Resend/SendGrid)

#### Phase 2: Availability System (Week 2-3)
- [ ] Create availability calculation logic
- [ ] API: GET /api/availability?date=X&time=Y
- [ ] Implement time slot generation
- [ ] Block fully booked times
- [ ] Handle capacity limits

#### Phase 3: Manager Dashboard (Week 3-4)
- [ ] Build admin authentication (NextAuth)
- [ ] Create /admin/reservations page
- [ ] Display reservation list
- [ ] Status management (confirm, seat, cancel)
- [ ] Search and filter functionality

#### Phase 4: Customer Management (Week 4-5)
- [ ] Reservation lookup by confirmation number
- [ ] Modify reservation feature
- [ ] Cancellation flow
- [ ] Customer profile creation

#### Phase 5: Notifications (Week 5-6)
- [ ] Email service setup
- [ ] SMS service (Twilio)
- [ ] Automated reminders (cron jobs)
- [ ] Webhook handlers


### Quick Start Code Snippets

#### API Route: Create Reservation
```typescript
// app/api/reservations/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { reservationSchema } from '@/lib/validators'
import { sendConfirmationEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const data = reservationSchema.parse(body)
    
    // Check availability
    const isAvailable = await checkAvailability(
      data.date, 
      data.time, 
      data.guests
    )
    
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Time slot not available' },
        { status: 400 }
      )
    }
    
    // Generate confirmation number
    const confirmationNumber = generateConfirmationNumber()
    
    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        ...data,
        confirmationNumber,
        status: 'CONFIRMED'
      }
    })
    
    // Send confirmation email
    await sendConfirmationEmail(reservation)
    
    return NextResponse.json({
      success: true,
      confirmationNumber,
      reservation
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    )
  }
}
```


#### Client-Side Form Handler
```typescript
// components/reservations/reservation-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ReservationForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: Number(formData.get('guests')),
      specialRequest: formData.get('specialRequest')
    }
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error)
      }
      
      // Redirect to confirmation page
      router.push(`/reservations/confirmed?num=${result.confirmationNumber}`)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Complete Reservation'}
      </button>
    </form>
  )
}
```


---

## Part 7: Popular Reservation Platforms

### Third-Party Solutions

If building from scratch is too complex, consider these platforms:

**OpenTable**
- Industry leader
- Built-in customer base
- Charges per cover ($1-2/reservation)
- Full management system
- Marketing tools included

**Resy**
- Modern interface
- Popular with upscale restaurants
- Mobile-first approach
- Subscription + per-cover fees
- Strong brand recognition

**Yelp Reservations**
- Integrated with Yelp reviews
- Good for discovery
- Free tier available
- Limited customization

**Google Reserve**
- Direct booking from Google Search/Maps
- No commission fees
- Requires integration partner
- High visibility

**SevenRooms**
- CRM-focused
- Guest profiles and preferences
- Marketing automation
- Higher price point
- Enterprise features

**Custom Build vs. Platform:**

**Build Custom When:**
- Want full control
- Specific requirements
- No per-reservation fees
- Existing tech infrastructure
- Unique workflows

**Use Platform When:**
- Quick setup needed
- Limited technical resources
- Want built-in customer base
- Need proven solution
- Prefer outsourced support


---

## Summary

### Key Takeaways

**Customer Side:**
1. Simple booking flow (date → time → info → confirm)
2. Instant confirmation with clear details
3. Easy modification and cancellation
4. Automated reminders reduce no-shows
5. Mobile-friendly is essential

**Restaurant Side:**
1. Real-time visibility of all reservations
2. Capacity management prevents overbooking
3. Table assignment optimization
4. Customer relationship tracking
5. Data-driven decision making
6. Staff coordination and communication

**System Requirements:**
- Reliable database
- Real-time availability calculation
- Email/SMS notification service
- Admin dashboard for staff
- Customer self-service portal
- Reporting and analytics

**Success Metrics:**
- Utilization rate (70-85% is healthy)
- No-show rate (< 5% is good)
- Average table turns (2-3x per service)
- Customer satisfaction scores
- Revenue per available seat hour
- Booking conversion rate

---

## Next Steps for Your Website

1. **Review** the Prisma schema in `ARCHITECTURE.md`
2. **Follow** the implementation plan in `IMPLEMENTATION_PLAN.md` Phase 5
3. **Start** with basic reservation creation (no availability checking)
4. **Add** availability logic once basic flow works
5. **Build** manager dashboard after customer side is stable
6. **Implement** notifications last

The UI is already beautiful and ready. Focus on making it functional step by step!

---

**Document Version:** 1.0  
**Last Updated:** June 24, 2026  
**Status:** Complete Guide for Implementation
