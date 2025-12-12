# Phase 1.1.a: Landing Page

> **Parent document:** [Phase 1.1 - Public Pages](./phase-1.1-public-pages.md)
>
> **Status:** Planning
>
> **Route:** `/`

---

## Purpose

Convert visitors into registered users by showcasing the app's value proposition and learning methodology.

---

## Route Configuration

```typescript
// apps/web/src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { LandingPage } from '@/pages/public/LandingPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
    ],
  },
]);
```

---

## File Structure

```
apps/web/src/pages/public/LandingPage/
├── index.tsx                    # Re-export
├── LandingPage.tsx              # Page implementation
└── sections/
    ├── HeroSection.tsx          # Hero with CTA
    ├── FeaturesSection.tsx      # Feature highlights
    ├── LevelsPreviewSection.tsx # CEFR levels visual
    ├── LessonPreviewSection.tsx # Sample lesson mockup
    ├── lessonPreviewData.ts     # Static mockup data
    └── CTASection.tsx           # Final call-to-action
```

---

## Page Sections

### 1. Hero Section

**Component:** `HeroSection.tsx`

**Content (Ukrainian):**
- Headline: "Вивчай англійську крок за кроком"
- Subheadline: "Структуровані уроки від початківця до просунутого рівня для українців"
- CTA Button: "Почати безкоштовно"

**MUI Components:**
- `Container` (maxWidth="lg")
- `Typography` (variant="h1", "h2")
- `Button` (variant="contained", size="large")
- `Box` for layout
- `Stack` for spacing

**Code:**

```tsx
// apps/web/src/pages/public/LandingPage/sections/HeroSection.tsx
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            Вивчай англійську крок за кроком
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 400,
              color: 'text.secondary',
              maxWidth: 600,
            }}
          >
            Структуровані уроки від початківця до просунутого рівня для українців
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth/signup')}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Почати безкоштовно
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
```

**Responsive Breakpoints:**

| Breakpoint | Headline Size | Padding Y | Max Width |
|------------|--------------|-----------|-----------|
| xs (0px+) | 2.5rem | 64px | 100% |
| md (900px+) | 3.5rem | 96px | lg (1200px) |

---

### 2. Features Section

**Component:** `FeaturesSection.tsx`

**Features List (Ukrainian):**

| Icon | Title | Description |
|------|-------|-------------|
| `School` | Структуровані рівні | Від A1 до C2 за стандартом CEFR |
| `MenuBook` | Різноманітні уроки | Словник, граматика, читання, аудіювання |
| `Timeline` | Відстеження прогресу | Бачте свій розвиток у реальному часі |
| `Bookmark` | Особистий словник | Зберігайте та тренуйте нові слова |

**MUI Components:**
- `Grid` (container, item)
- `Card`, `CardContent`
- `Typography`
- MUI Icons (`@mui/icons-material`)

**Code:**

```tsx
// apps/web/src/pages/public/LandingPage/sections/FeaturesSection.tsx
import { Box, Container, Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import { School, MenuBook, Timeline, Bookmark } from '@mui/icons-material';

const features = [
  {
    icon: School,
    title: 'Структуровані рівні',
    description: 'Від A1 до C2 за стандартом CEFR',
  },
  {
    icon: MenuBook,
    title: 'Різноманітні уроки',
    description: 'Словник, граматика, читання, аудіювання',
  },
  {
    icon: Timeline,
    title: 'Відстеження прогресу',
    description: 'Бачте свій розвиток у реальному часі',
  },
  {
    icon: Bookmark,
    title: 'Особистий словник',
    description: 'Зберігайте та тренуйте нові слова',
  },
];

export const FeaturesSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Чому обирають Voqu?
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    <feature.icon
                      sx={{ fontSize: 48, color: 'primary.main' }}
                    />
                    <Typography variant="h6" fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
```

**Responsive Grid:**

| Breakpoint | Columns | Cards per Row |
|------------|---------|---------------|
| xs | 12 | 1 |
| sm | 6 | 2 |
| md | 3 | 4 |

---

### 3. Levels Preview Section

**Component:** `LevelsPreviewSection.tsx`

**Purpose:** Visual representation of the learning journey through CEFR levels.

**Content:**

| Level | Name (EN) | Description (UA) | Color |
|-------|-----------|------------------|-------|
| A1 | Beginner | Базові фрази та вирази | `#4CAF50` (green) |
| A2 | Elementary | Прості повсякденні теми | `#8BC34A` (light green) |
| B1 | Intermediate | Основні робочі ситуації | `#FFC107` (amber) |
| B2 | Upper-Intermediate | Складні тексти та дискусії | `#FF9800` (orange) |
| C1 | Advanced | Вільне спілкування | `#F44336` (red) |
| C2 | Proficiency | Рівень носія мови | `#9C27B0` (purple) |

**MUI Components:**
- `Stepper`, `Step`, `StepLabel` (horizontal on desktop, vertical on mobile)
- `Chip` for level badges
- `Typography`

**Code:**

```tsx
// apps/web/src/pages/public/LandingPage/sections/LevelsPreviewSection.tsx
import { Box, Container, Typography, Stepper, Step, StepLabel, useMediaQuery, useTheme } from '@mui/material';

const levels = [
  { code: 'A1', name: 'Beginner', description: 'Базові фрази та вирази', color: '#4CAF50' },
  { code: 'A2', name: 'Elementary', description: 'Прості повсякденні теми', color: '#8BC34A' },
  { code: 'B1', name: 'Intermediate', description: 'Основні робочі ситуації', color: '#FFC107' },
  { code: 'B2', name: 'Upper-Intermediate', description: 'Складні тексти та дискусії', color: '#FF9800' },
  { code: 'C1', name: 'Advanced', description: 'Вільне спілкування', color: '#F44336' },
  { code: 'C2', name: 'Proficiency', description: 'Рівень носія мови', color: '#9C27B0' },
];

export const LevelsPreviewSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Твій шлях до вільної англійської
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Навчання побудоване за міжнародним стандартом CEFR
        </Typography>

        <Stepper
          orientation={isMobile ? 'vertical' : 'horizontal'}
          alternativeLabel={!isMobile}
          activeStep={-1}
          sx={{ maxWidth: 1000, mx: 'auto' }}
        >
          {levels.map((level) => (
            <Step key={level.code} completed={false}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: level.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                    }}
                  >
                    {level.code}
                  </Box>
                )}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {level.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {level.description}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
};
```

---

### 4. Lesson Preview Section (Static Mockup)

**Component:** `LessonPreviewSection.tsx`

**Purpose:** Show visitors what a vocabulary lesson looks like without requiring backend.

**Static Mockup Data:**

```typescript
// apps/web/src/pages/public/LandingPage/sections/lessonPreviewData.ts
export const sampleVocabulary = [
  {
    word: 'Hello',
    translation: 'Привіт',
    example: 'Hello! How are you today?',
    partOfSpeech: 'interjection',
  },
  {
    word: 'Goodbye',
    translation: 'До побачення',
    example: 'Goodbye! See you tomorrow.',
    partOfSpeech: 'interjection',
  },
  {
    word: 'Thank you',
    translation: 'Дякую',
    example: 'Thank you for your help!',
    partOfSpeech: 'phrase',
  },
];

export const sampleLesson = {
  level: 'A1',
  title: 'Greetings & Basics',
  subtitle: 'Привітання та основи',
  vocabulary: sampleVocabulary,
};
```

**MUI Components:**
- `Card`, `CardContent`, `CardHeader`
- `List`, `ListItem`, `ListItemText`
- `Chip` for part of speech
- `Divider`
- `Typography`

**Code:**

```tsx
// apps/web/src/pages/public/LandingPage/sections/LessonPreviewSection.tsx
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { sampleLesson } from './lessonPreviewData';

export const LessonPreviewSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Як виглядає урок
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Приклад уроку зі словником рівня A1
        </Typography>

        <Card
          elevation={3}
          sx={{
            maxWidth: 500,
            mx: 'auto',
            borderRadius: 3,
          }}
        >
          <CardHeader
            title={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Chip
                  label={sampleLesson.level}
                  size="small"
                  color="success"
                />
                <Typography variant="h6">
                  {sampleLesson.title}
                </Typography>
              </Stack>
            }
            subheader={sampleLesson.subtitle}
            sx={{ bgcolor: 'grey.50' }}
          />
          <CardContent>
            <List disablePadding>
              {sampleLesson.vocabulary.map((item, index) => (
                <Box key={item.word}>
                  {index > 0 && <Divider />}
                  <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                      alignItems="center"
                    >
                      <Typography variant="h6" color="primary">
                        {item.word}
                      </Typography>
                      <Chip
                        label={item.partOfSpeech}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="body1" fontWeight={500}>
                      {item.translation}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, fontStyle: 'italic' }}
                    >
                      "{item.example}"
                    </Typography>
                  </ListItem>
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
```

---

### 5. CTA Section

**Component:** `CTASection.tsx`

**Content (Ukrainian):**
- Headline: "Готовий розпочати?"
- Subtext: "Приєднуйся до тисяч українців, які вивчають англійську з Voqu"
- Primary CTA: "Створити акаунт" → `/auth/signup`
- Secondary CTA: "Дізнатися більше" → `/about`

**Code:**

```tsx
// apps/web/src/pages/public/LandingPage/sections/CTASection.tsx
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography variant="h3" fontWeight={600}>
            Готовий розпочати?
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Приєднуйся до тисяч українців, які вивчають англійську з Voqu
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/auth/signup')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
                px: 4,
              }}
            >
              Створити акаунт
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/about')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
                px: 4,
              }}
            >
              Дізнатися більше
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
```

---

## Main Page Component

```tsx
// apps/web/src/pages/public/LandingPage/LandingPage.tsx
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { LevelsPreviewSection } from './sections/LevelsPreviewSection';
import { LessonPreviewSection } from './sections/LessonPreviewSection';
import { CTASection } from './sections/CTASection';

export const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Voqu - Вивчай англійську крок за кроком</title>
        <meta
          name="description"
          content="Безкоштовна платформа для вивчення англійської мови для українців. Структуровані уроки від A1 до C2."
        />
      </Helmet>
      <Box component="main">
        <HeroSection />
        <FeaturesSection />
        <LevelsPreviewSection />
        <LessonPreviewSection />
        <CTASection />
      </Box>
    </>
  );
};
```

```tsx
// apps/web/src/pages/public/LandingPage/index.tsx
export { LandingPage } from './LandingPage';
```

---

## Implementation Checklist

- [ ] Create `LandingPage` folder structure
- [ ] Implement `HeroSection`
- [ ] Implement `FeaturesSection`
- [ ] Implement `LevelsPreviewSection`
- [ ] Create `lessonPreviewData.ts` with static mockup
- [ ] Implement `LessonPreviewSection`
- [ ] Implement `CTASection`
- [ ] Assemble `LandingPage.tsx` with all sections
- [ ] Add SEO meta tags with react-helmet-async
- [ ] Test responsive design on all breakpoints
- [ ] Verify Ukrainian text content
