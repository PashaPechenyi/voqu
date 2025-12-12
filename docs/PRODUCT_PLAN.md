# Voqu - English Learning App: Product Proposal

## 1. Product Vision

### Goal
Create a self-paced English learning platform for Ukrainian speakers that provides structured progression through lessons organized by proficiency levels. The app enables users to learn English independently with a clear curriculum, diverse content types, and progress tracking.

### Target Audience
- **Primary:** Ukrainian speakers learning English at any proficiency level
- **Future expansion:** Other language communities

### Value Proposition
- Structured learning path from beginner to advanced (CEFR-aligned)
- Rich, template-based lesson content (vocabulary, grammar, reading, listening)
- Personal word list with training capabilities
- Progress tracking and exercises to reinforce learning

---

## 2. User Roles

| Role | Description |
|------|-------------|
| **Guest** | Unauthenticated visitor, can view public pages only |
| **User** | Registered learner, can access lessons, track progress, manage word list |
| **Admin** | Content manager, can create/edit levels, lessons, and templates |

---

## 3. Feature Overview with MoSCoW Prioritization

### Legend
- **Must Have (M)** — Critical for MVP launch
- **Should Have (S)** — Important but not blocking launch
- **Could Have (C)** — Desirable if time permits
- **Won't Have (W)** — Out of scope for current phase

---

## 4. Public Pages (Guest Access)

| Feature | Priority | Description |
|---------|----------|-------------|
| Landing Page | **M** | Hero section with value proposition, feature highlights, CTA to sign up |
| About / How It Works | **M** | Learning methodology, CEFR level overview, benefits |
| Pricing / Plans | **S** | Free vs premium comparison (placeholder for future monetization) |
| Blog / Resources | **C** | SEO content, learning tips, grammar guides |
| Contact / Support | **C** | Contact form or FAQ section |

### Landing Page Details (Must Have)
- Clear headline explaining the app's purpose
- Visual representation of learning journey (levels)
- Sample lesson preview (read-only)
- Sign-up CTA button
- Brief feature list

### About Page Details (Must Have)
- Explanation of CEFR levels (A1 → C2)
- How lessons are structured
- What makes this approach effective

---

## 5. Authentication & Authorization

| Feature | Priority | Description |
|---------|----------|-------------|
| User Registration | **M** | Email + password sign-up |
| User Login | **M** | Email + password authentication |
| Password Reset | **M** | Email-based password recovery |
| Role-based Access Control | **M** | Differentiate Admin vs User permissions |
| Social Login (Google) | **S** | OAuth authentication option |
| Email Verification | **S** | Confirm email address on registration |
| Account Settings | **S** | Update profile, change password |

---

## 6. Admin Panel

### 6.1 Level Management

| Feature | Priority | Description |
|---------|----------|-------------|
| Create Level Page | **M** | Form to create new level (name, order, description) |
| Edit Level Page | **M** | Edit level details, view/manage associated lessons |
| Delete Level | **M** | Remove level (with confirmation, handle associated lessons) |
| Reorder Levels | **S** | Drag-and-drop or manual ordering |
| Level List View | **M** | Dashboard showing all levels with lesson counts |

#### Level Entity Fields
- Name (e.g., "A1 - Beginner", or custom name)
- Slug (URL-friendly identifier)
- Description
- Order/Position
- CEFR Mapping (optional: A1, A2, B1, B2, C1, C2, or Custom)
- Status (Draft / Published)

### 6.2 Lesson Management

| Feature | Priority | Description |
|---------|----------|-------------|
| Create Lesson Page | **M** | Form to create lesson with template selection |
| Edit Lesson Page | **M** | Modify lesson content and templates |
| Delete Lesson | **M** | Remove lesson from level |
| Reorder Lessons within Level | **S** | Change lesson sequence |
| Lesson List (within Level) | **M** | View all lessons for a specific level |
| Duplicate Lesson | **C** | Copy existing lesson as starting point |

#### Lesson Entity Fields
- Title
- Subtitle (optional)
- Description (optional)
- Level (parent reference)
- Order/Position within level
- Status (Draft / Published)
- Templates (one or more content blocks)

### 6.3 Template System

Templates define the structure of lesson content. Each template type has its own schema and UI for content entry.

| Feature | Priority | Description |
|---------|----------|-------------|
| Vocabulary Template | **M** | Word list with definitions, translations, examples |
| Grammar Template | **S** | Rule explanations, usage notes, examples |
| Reading Template | **S** | Text passages with highlighted vocabulary |
| Listening Template | **C** | Audio content with transcript |
| Dialogue Template | **C** | Conversation format for contextual learning |
| Video Template | **W** | Video content with subtitles (future phase) |

#### Vocabulary Template Fields (MVP)

| Field | Required | Description |
|-------|----------|-------------|
| Word | Yes | The English word |
| Translation | Yes | Ukrainian translation |
| Example | Yes | Usage example sentence |
| Definition | No | English definition |
| Audio | No | Pronunciation audio file |
| Image | No | Visual representation |
| Synonyms | No | Related words |
| Part of Speech | No | Noun, verb, adjective, etc. |

### 6.4 Template Management (Admin)

| Feature | Priority | Description |
|---------|----------|-------------|
| Add Template to Lesson | **M** | Select template type and fill content |
| Edit Template Content | **M** | Modify existing template data |
| Remove Template from Lesson | **M** | Delete template block |
| Reorder Templates in Lesson | **S** | Change template display order |
| Bulk Word Import (Vocabulary) | **C** | CSV/Excel import for vocabulary |

---

## 7. User-Facing Learning Features

### 7.1 Level & Lesson Browsing

| Feature | Priority | Description |
|---------|----------|-------------|
| Levels Overview Page | **M** | List of all available levels with progress indicators |
| Level Detail Page | **M** | List of lessons within selected level |
| Lesson View Page | **M** | Display lesson content (read templates) |
| Lesson Navigation | **M** | Next/Previous lesson buttons |
| Mark Lesson Complete | **S** | User can manually mark lesson as done |
| Resume Last Lesson | **S** | Quick link to continue where user left off |
| Filter by Lesson Type | **C** | Filter lessons by template type (vocabulary, grammar, etc.) |

### 7.2 Progress Tracking

| Feature | Priority | Description |
|---------|----------|-------------|
| Lesson Completion Status | **M** | Track which lessons are completed |
| Level Progress Percentage | **M** | Visual progress bar per level |
| User Dashboard | **M** | Overview of learning progress |
| Streak Tracking | **C** | Track consecutive days of learning |
| Time Spent Statistics | **W** | Track learning time (future phase) |

---

## 8. Tests & Exercises

| Feature | Priority | Description |
|---------|----------|-------------|
| Add Exercise to Template (Admin) | **S** | Attach exercise/test to any template |
| Display Exercise in Lesson (User) | **S** | Show interactive exercise after content |
| Track Exercise Results | **S** | Store user answers and scores |
| Exercise Types (TBD) | **S** | Multiple choice, fill-in-blank, matching, etc. |
| Exercise Review | **C** | Review past mistakes |

*Note: Specific exercise types will be defined during implementation phase.*

---

## 9. Personal Word List & Training

| Feature | Priority | Description |
|---------|----------|-------------|
| Add Word to Personal List | **S** | Save any word from lessons to personal list |
| View Personal Word List | **S** | Browse all saved words |
| Remove Word from List | **S** | Delete words from personal collection |
| Word Training Page | **S** | Practice words with randomized tests |
| Spaced Repetition | **C** | Smart review scheduling based on performance |
| Word List Categories | **C** | Organize words into custom folders |
| Import Words Manually | **C** | Add custom words not from lessons |

### Word Training Features

| Feature | Priority | Description |
|---------|----------|-------------|
| Random Word Quiz | **S** | Test random words from personal list |
| Show Word → Guess Translation | **S** | Forward translation exercise |
| Show Translation → Guess Word | **S** | Reverse translation exercise |
| Track Correct/Incorrect | **S** | Store training history |
| Difficulty Adjustment | **C** | Focus on frequently missed words |

---

## 10. Implementation Phases

### Phase 1: Foundation (MVP)

**Goal:** Launch basic platform with content management and learning capabilities.

**1.1. Public Pages**
   - a) Landing page
   - b) About page

**1.2. Authentication**
   - a) Registration, login, password reset
   - b) Role-based access (Admin / User)

**1.3. Admin Panel - Levels**
   - a) Create level
   - b) Edit level (with lesson list)
   - c) Delete level
   - d) List all levels

**1.4. Admin Panel - Lessons**
   - a) Create lesson (with template selection)
   - b) Edit lesson
   - c) Delete lesson

**1.5. Admin Panel - Templates**
   - a) Vocabulary template (full implementation)

**1.6. User - Learning**
   - a) View levels list
   - b) View lessons in level
   - c) View lesson content
   - d) Basic progress tracking (lesson completion)

### Phase 2: Content Expansion

**Goal:** Enrich content types and improve admin workflow.

**2.1. Additional Templates**
   - a) Grammar template
   - b) Reading template
   - c) Dialogue template
   - d) Listening template

**2.2. Admin Improvements**
   - a) Bulk import for vocabulary
   - b) Template reordering
   - c) Lesson duplication

**2.3. User Improvements**
   - a) Resume last lesson
   - b) Filter by lesson type

### Phase 3: Exercises & Training

**Goal:** Add interactive learning capabilities.

**3.1. Exercise System**
   - a) Exercise attachment to templates (Admin)
   - b) Exercise display and interaction (User)
   - c) Result tracking

**3.2. Personal Word List**
   - a) Add/remove words
   - b) Word list page
   - c) Word training with quizzes

### Phase 4: Engagement & Polish

**Goal:** Increase user retention and add quality-of-life features.

**4.1. Gamification**
   - a) Streak tracking
   - b) Progress achievements

**4.2. Content**
   - a) Blog / Resources section
   - b) Pricing page (if monetization needed)

**4.3. Advanced Training**
   - a) Spaced repetition
   - b) Mistake review

---

## 11. Success Metrics

| Metric | Description |
|--------|-------------|
| User Registration Rate | % of visitors who sign up |
| Lesson Completion Rate | % of started lessons that are completed |
| Daily Active Users | Users engaging with content daily |
| Level Completion Rate | % of users completing entire levels |
| Word List Usage | Average words saved per user |
| Retention (7-day, 30-day) | Users returning after initial engagement |

---

## 12. Out of Scope (Future Consideration)

- AI conversation partner
- Speech recognition / pronunciation feedback
- Mobile native apps (iOS / Android)
- Offline mode
- Social features (leaderboards, study groups)
- Video content and subtitles
- Real-time notifications
- Payment processing / subscriptions

---

## 13. Open Questions

1. Should lessons be free or should some content be gated behind premium?
2. What is the content creation plan (who creates lessons)?
3. Should we support multiple source languages beyond Ukrainian in future?
4. Do we need content moderation for user-generated content (if any)?

---

*Document Version: 1.0*
*Last Updated: December 2024*
