# English Learning Web App - Product Proposal

## Overview

A self-paced English learning platform with structured progression through levels and lessons. The app enables users to learn English independently with a clear curriculum and progress tracking.

---

## Public Pages (No Login Required)

### Landing Page
- Value proposition and app benefits
- Sample lesson preview
- Testimonials/success stories
- Call-to-action to sign up

### About / How It Works
- Learning methodology explanation
- Level overview (A1 → A2 → B1 → B2 → C1 → C2)
- What makes this approach effective

### Pricing / Plans
- Free tier vs premium features
- Comparison table

### Blog / Resources
- English learning tips
- Grammar guides
- SEO content to drive organic traffic

---

## Phase 1: Core Functionality (MVP)

### 1. Structured Curriculum
- **Levels:** A1 (Beginner), A2 (Elementary), B1 (Intermediate), B2 (Upper-Intermediate), C1 (Advanced), C2 (Proficient)
- Each level contains multiple lessons
- Progress tracking with completion percentages

### 2. Lesson Templates System

Each lesson is an instance of a predefined template. Templates define the structure and content type of a lesson.

#### Lesson Types & Templates

| Type | Template | Description |
|------|----------|-------------|
| **Vocabulary** | Word List | List of words with definitions, examples, translations |
| **Vocabulary** | Thematic Vocabulary | Words grouped by theme (e.g., "At the Airport", "Food & Dining") |
| **Grammar** | Rule Explanation | Grammar rule with examples and usage notes |
| **Grammar** | Tense Overview | Verb tense explanation with conjugation tables |
| **Grammar** | Comparison | Comparing similar grammar structures (e.g., "much vs many") |
| **Reading** | Short Text | Brief passage with key vocabulary highlighted |
| **Reading** | Article | Longer text adapted to level |
| **Reading** | Dialogue | Conversation format for contextual learning |
| **Listening** | Audio Lesson | Audio content with transcript |
| **Listening** | Video Lesson | Video content with transcript and subtitles |

#### Template Structure
Each template includes:
- **Type identifier** (Vocabulary, Grammar, Reading, Listening)
- **Template name** (e.g., "Word List", "Rule Explanation")
- **Content schema** (what fields/sections the template contains)
- **Display format** (how the lesson renders in the UI)

#### Lesson Instance
A lesson is created by:
1. Selecting a template
2. Filling in the content according to template schema
3. Assigning to a level (A1-C2)
4. Setting order within the level

### 3. Lesson Features
- Lessons organized by level and topic
- Mark lessons as complete
- Resume where you left off
- Filter/browse by lesson type

### 4. User Features
- User authentication (sign up, login, password reset)
- Personal dashboard with progress overview
- Lesson history

**Note:** The architecture should support adding tests, exercises, and interactive content in future phases.

---

## Phase 2: Future Enhancements

### Tests & Exercises (to be added later)
| Type | Description |
|------|-------------|
| **Vocabulary** | Flashcards with spaced repetition (SRS) |
| **Grammar** | Interactive exercises |
| **Reading** | Comprehension questions |
| **Listening** | Audio/video with transcripts |
| **Speaking** | Record yourself, compare with native pronunciation |
| **Writing** | Prompts with AI feedback |

### Practice Modes
- **Daily Review** - Spaced repetition for retention
- **Quick Quiz** - 5-minute knowledge checks
- **Mistake Review** - Focus on errors you've made

### AI Conversation Partner
- Chat with AI to practice dialogues
- Scenario-based conversations (ordering food, job interview, small talk)
- Grammar correction in real-time

### Personalized Learning Path
- Placement test to determine starting level
- Adaptive difficulty based on performance
- Weak area identification and targeted practice

### Gamification
- XP points and streaks
- Leaderboards (weekly/monthly)
- Achievements and badges
- Daily goals

### Real-World Content
- News articles adapted by level
- Song lyrics with fill-in-the-blanks
- Movie/TV show clips with exercises

### Pronunciation Feedback
- Speech recognition for pronunciation scoring
- Word-by-word breakdown
- Native speaker comparison

### Offline Mode
- Download lessons for offline study
- Sync progress when back online

### Progress Analytics
- Time spent learning
- Words learned over time
- Accuracy trends
- Predicted fluency timeline

### Social Features
- Study groups with challenges
- Community forum
- Language exchange partner matching

---

## Monetization Strategy

| Free Tier | Premium |
|-----------|---------|
| Limited lessons | Unlimited lessons |
| Basic content | All content types |
| Ads | Ad-free |
| — | AI conversation partner |
| — | Offline mode |
| — | Detailed analytics |

---

## MVP Summary

**Phase 1 delivers:**
1. Public pages (Landing, About)
2. User authentication
3. Level and lesson structure (A1-C2)
4. Text-based lesson content
5. Progress tracking
6. Personal dashboard

**Architecture considerations:**
- Template-based lesson system (lessons are instances of templates)
- Design data models to support future exercises/tests per template type
- Build lesson component system that renders based on template type
- Plan API endpoints for quiz/exercise submissions

---

## Next Steps

- [ ] Validate feature priorities with target users
- [ ] Define technical architecture
- [ ] Create detailed user stories for Phase 1
- [ ] Design wireframes and user flows
- [ ] Plan development sprints
