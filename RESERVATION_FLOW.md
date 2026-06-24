# Restaurant Reservation System - Visual Flow Diagram

## Customer Flow (Frontend)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

Step 1: DISCOVER
   │
   ├─ Visit Website
   ├─ Google Search
   ├─ Social Media
   └─ Walk Past Restaurant
        ↓

Step 2: INITIATE BOOKING
   │
   └─ Click "Reserve a Table"
        ↓

Step 3: SELECT DATE & TIME
   │
   ├─ Pick Date (Calendar)
   ├─ Choose Time Slot (Dropdown)
   └─ Select Party Size
        ↓
   [System checks availability in real-time]
        ↓

Step 4: ENTER DETAILS
   │
   ├─ First Name
   ├─ Last Name
   ├─ Email
   ├─ Phone
   └─ Special Requests
        ↓
   [Form validation]
        ↓

Step 5: SUBMIT
   │
   └─ Click "Complete Reservation"
        ↓
   [API POST /api/reservations]
        ↓

Step 6: CONFIRMATION
   │
   ├─ Confirmation Page
   ├─ Confirmation Email (immediate)
   └─ Confirmation Number: #BV-2024-1234
        ↓

Step 7: REMINDERS
   │
   ├─ 24 hours before → Email + SMS
   └─ 2 hours before → SMS
        ↓

Step 8: DAY OF VISIT
   │
   ├─ Arrive at restaurant
   ├─ Give name/confirmation
   └─ Get seated
        ↓

Step 9: POST-DINING
   │
   ├─ Enjoy meal
   ├─ Complete reservation
   └─ Optional: Review request email
```



## Manager Flow (Backend)

```
┌─────────────────────────────────────────────────────────────────┐
│                  RESTAURANT MANAGER VIEW                         │
└─────────────────────────────────────────────────────────────────┘

MORNING ROUTINE (9:00 AM)
   │
   ├─ Login to Dashboard
   ├─ Review Today's Reservations
   ├─ Check Capacity (45 bookings, 85% full)
   └─ Note Special Requests
        ↓

MID-DAY (12:00 PM)
   │
   ├─ Monitor Lunch Service
   ├─ Handle Walk-ins
   ├─ Update Table Status
   └─ Accept Phone Reservations
        ↓

AFTERNOON (3:00 PM)
   │
   ├─ Prepare for Dinner
   ├─ Review Tonight's Reservations
   ├─ Call VIP Customers (if policy)
   └─ Set Up Special Tables
        ↓

DINNER SERVICE (5:00-10:00 PM)
   │
   ├─ Welcome Guests
   │    ↓
   ├─ Check Reservation in System
   │    ↓
   ├─ Assign Table (drag & drop)
   │    ↓
   ├─ Mark as "SEATED"
   │    ↓
   ├─ Monitor Table Turnover
   │    ↓
   └─ Handle No-Shows (after 15 min)
        ↓

END OF NIGHT (11:00 PM)
   │
   ├─ Mark All as "COMPLETED"
   ├─ Review No-Shows
   ├─ Generate Daily Report
   └─ Preview Tomorrow's Schedule
        ↓

WEEKLY TASKS
   │
   ├─ Analyze Utilization Metrics
   ├─ Review No-Show Patterns
   ├─ Update Operating Hours
   ├─ Block Special Event Dates
   └─ Export Reports
```



## System Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     TECHNICAL FLOW                               │
└─────────────────────────────────────────────────────────────────┘

CLIENT SIDE (Browser)
   │
   └─ Reservation Form Component
        ↓
   [User fills form]
        ↓
   [JavaScript validation]
        ↓
   [Submit button clicked]
        ↓
   
FRONTEND → BACKEND
   │
   └─ POST /api/reservations
        ├─ Headers: Content-Type: application/json
        └─ Body: { date, time, guests, customer info }
        ↓
   
API ROUTE (Next.js)
   │
   ├─ Receive request
   ├─ Parse JSON body
   ├─ Validate with Zod schema
   │    ↓
   ├─ Check availability
   │    │
   │    ├─ Query database
   │    ├─ Calculate capacity
   │    ├─ Count existing reservations
   │    └─ Return available: true/false
   │         ↓
   ├─ If NOT available → Return 400 error
   │    ↓
   ├─ If available → Continue
   │    ↓
   ├─ Generate confirmation number
   │    ↓
   └─ Create database record
        ↓

DATABASE (PostgreSQL)
   │
   ├─ INSERT INTO reservations
   ├─ Return reservation ID
   └─ Commit transaction
        ↓

NOTIFICATION SERVICE
   │
   ├─ Send confirmation email
   │    ├─ Subject: "Reservation Confirmed"
   │    ├─ Body: Details + confirmation #
   │    └─ Via: Resend/SendGrid API
   │         ↓
   └─ Schedule reminder jobs
        ├─ 24h reminder (cron job)
        └─ 2h reminder (cron job)
        ↓

RESPONSE → CLIENT
   │
   └─ JSON Response
        ├─ status: 200
        └─ body: { 
               success: true,
               confirmationNumber: "BV-2024-1234",
               reservation: {...}
            }
        ↓

CLIENT RECEIVES
   │
   └─ Redirect to /reservations/confirmed
        ↓
   [Show success page with details]
```



## Availability Check Logic

```
┌─────────────────────────────────────────────────────────────────┐
│              HOW AVAILABILITY IS CALCULATED                      │
└─────────────────────────────────────────────────────────────────┘

INPUT: Date = June 24, Time = 7:00 PM, Party = 4
   ↓

STEP 1: Date Validation
   │
   ├─ Is date in the past? → NO (continue)
   ├─ Is date within booking window (60 days)? → YES
   └─ Is date blocked (holiday/closure)? → NO
        ↓ PASS

STEP 2: Operating Hours Check
   │
   ├─ Day: Friday
   ├─ Dinner hours: 5:00 PM - 11:00 PM
   └─ 7:00 PM is within range? → YES
        ↓ PASS

STEP 3: Get Existing Reservations
   │
   └─ Query: SELECT * FROM reservations 
            WHERE date = '2026-06-24' 
            AND time BETWEEN '6:00 PM' AND '8:00 PM'
            AND status IN ('CONFIRMED', 'SEATED')
        ↓
   Result: 12 reservations found
        ↓

STEP 4: Calculate Capacity
   │
   ├─ Total seats: 60
   ├─ Reserved seats (sum of party_size): 48
   └─ Available seats: 60 - 48 = 12
        ↓

STEP 5: Check Party Fits
   │
   ├─ Party size: 4
   ├─ Available: 12
   └─ 4 <= 12? → YES
        ↓

STEP 6: Check Reservation Limit
   │
   ├─ Max reservations per slot: 15
   ├─ Current reservations: 12
   └─ 12 < 15? → YES
        ↓

RESULT: ✅ AVAILABLE
   │
   └─ Return: {
        available: true,
        remainingSeats: 8,
        message: "Table available"
      }
```



## Status State Machine

```
┌─────────────────────────────────────────────────────────────────┐
│              RESERVATION STATUS TRANSITIONS                      │
└─────────────────────────────────────────────────────────────────┘

                    [NEW RESERVATION]
                           │
                           ↓
                    ┌──────────────┐
                    │   PENDING    │ ← Phone reservation pending confirmation
                    └──────────────┘
                           │
                           ↓ (auto or manual confirm)
                    ┌──────────────┐
              ┌────→│  CONFIRMED   │←────┐
              │     └──────────────┘     │ (customer modifies)
              │            │              │
              │            ↓              │
              │     [Day of visit]        │
              │            │              │
              │            ↓              │
    [Cancel]  │     ┌──────────────┐     │ [Modify]
              │     │    SEATED    │     │
              │     └──────────────┘     │
              │            │              │
              │            ↓              │
              │     [Meal finished]       │
              │            │              │
              │            ↓              │
              │     ┌──────────────┐     │
              │     │  COMPLETED   │     │
              │     └──────────────┘     │
              │                           │
              ↓                           │
       ┌──────────────┐            ┌─────┴──────┐
       │  CANCELLED   │            │  MODIFIED  │
       └──────────────┘            └────────────┘
              
       [No-show after 15 min]
              ↓
       ┌──────────────┐
       │   NO-SHOW    │
       └──────────────┘


STATUS DESCRIPTIONS:

PENDING      - Waiting for confirmation (manual approval restaurants)
CONFIRMED    - Reservation accepted, customer notified
SEATED       - Customer has arrived and been seated
COMPLETED    - Meal finished, table vacated
CANCELLED    - Reservation cancelled by customer or restaurant
NO-SHOW      - Customer didn't show up (15+ min late)
MODIFIED     - Transient state during modification
```



## Communication Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│               AUTOMATED NOTIFICATIONS                            │
└─────────────────────────────────────────────────────────────────┘

T-0 (Booking Moment)
   │
   └─ ✉️ CONFIRMATION EMAIL (Immediate)
        Subject: "Reservation Confirmed"
        Content: Full details + confirmation #
        CTA: Add to calendar, Modify, Cancel
        ↓

T-24h (Day Before)
   │
   └─ ✉️ REMINDER EMAIL + 📱 SMS
        Subject: "Reminder: Your reservation tomorrow"
        SMS: "Bella Vista: Reminder - reservation for 4 
              on Fri Jun 24 at 7:00 PM. Reply C to cancel."
        ↓

T-2h (2 Hours Before)
   │
   └─ 📱 FINAL SMS REMINDER
        "Looking forward to seeing you at 7pm tonight! 
         Bella Vista, 123 Main St"
        ↓

T-0 (Reservation Time)
   │
   ├─ If arrived → Check-in
   └─ If not arrived after 15 min → No-show flag
        ↓

T+1h (After Dining)
   │
   └─ ✉️ THANK YOU EMAIL (Optional)
        Subject: "Thank you for dining with us!"
        Content: Feedback request, review link
        Offer: 10% off next visit
        ↓

T+7d (One Week Later)
   │
   └─ 🎯 MARKETING EMAIL (If opted in)
        Subject: "We miss you! Here's what's new"
        Content: New menu items, upcoming events
```



## Error Handling Scenarios

```
┌─────────────────────────────────────────────────────────────────┐
│                  COMMON ERROR SCENARIOS                          │
└─────────────────────────────────────────────────────────────────┘

SCENARIO 1: Fully Booked
   │
   Customer tries to book 7:00 PM (no capacity)
        ↓
   System response:
   ❌ "Sorry, this time slot is fully booked"
        ↓
   Suggestions shown:
   • Try 6:30 PM (2 tables available)
   • Try 7:30 PM (5 tables available)
   • Join waitlist
        ↓

SCENARIO 2: Past Date
   │
   Customer selects yesterday's date
        ↓
   System blocks selection
   ❌ "Please select a future date"
        ↓

SCENARIO 3: Outside Operating Hours
   │
   Customer selects 3:00 PM (restaurant closed)
        ↓
   Time slot grayed out
   ℹ️ "We open at 5:00 PM for dinner"
        ↓

SCENARIO 4: Invalid Email
   │
   Customer enters "john@email" (no .com)
        ↓
   Form validation:
   ❌ "Please enter a valid email address"
        ↓

SCENARIO 5: Duplicate Reservation
   │
   Same customer books twice for same time
        ↓
   System checks existing reservations
   ❌ "You already have a reservation at this time"
        ↓
   Show existing reservation details
        ↓

SCENARIO 6: Party Too Large
   │
   Customer selects 15 guests (max online: 8)
        ↓
   System message:
   ℹ️ "For parties of 9+, please call us at (123) 456-7890"
        ↓

SCENARIO 7: System Error
   │
   Database connection fails
        ↓
   Graceful error page:
   ❌ "We're experiencing technical difficulties"
   "Please call us to make your reservation: (123) 456-7890"
   [Automatic notification to tech team]
```

---

**Quick Reference Guide**  
See `RESERVATION_SYSTEM.md` for complete implementation details
