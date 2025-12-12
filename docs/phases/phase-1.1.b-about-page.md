# Phase 1.1.b: About Page

> **Parent document:** [Phase 1.1 - Public Pages](./phase-1.1-public-pages.md)
>
> **Status:** Planning
>
> **Route:** `/about`

---

## Purpose

Explain the learning methodology, CEFR levels, and how the app helps users progress.

---

## Route Configuration

```typescript
// Add to apps/web/src/routes/index.tsx
{
  path: '/about',
  element: <AboutPage />,
},
```

---

## File Structure

```
apps/web/src/pages/public/AboutPage/
├── index.tsx                    # Re-export
├── AboutPage.tsx                # Page implementation
└── sections/
    ├── IntroSection.tsx         # What is Voqu
    ├── CEFRSection.tsx          # CEFR levels explained
    ├── MethodologySection.tsx   # How lessons work
    └── BenefitsSection.tsx      # Why this approach
```

---

## Page Sections

### 1. Intro Section

**Component:** `IntroSection.tsx`

**Content (Ukrainian):**
- Headline: "Про Voqu"
- Text explaining what the platform is and who it's for

**Code:**

```tsx
// apps/web/src/pages/public/AboutPage/sections/IntroSection.tsx
import { Box, Container, Typography, Stack } from '@mui/material';

export const IntroSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Typography variant="h2" fontWeight={700} textAlign="center">
            Про Voqu
          </Typography>

          <Typography variant="body1" fontSize="1.125rem" color="text.secondary">
            Voqu — це платформа для самостійного вивчення англійської мови,
            створена спеціально для україномовних користувачів. Ми пропонуємо
            структурований підхід до навчання з чіткою програмою, різноманітним
            контентом та відстеженням прогресу.
          </Typography>

          <Typography variant="body1" fontSize="1.125rem" color="text.secondary">
            Незалежно від вашого початкового рівня — від повного нуля до
            просунутого — ви знайдете уроки, що відповідають вашим потребам
            та допоможуть досягти ваших цілей.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
```

---

### 2. CEFR Section

**Component:** `CEFRSection.tsx`

**Purpose:** Detailed explanation of CEFR levels with descriptions.

**Content:**

| Level | Title | Description (UA) | Skills (UA) |
|-------|-------|------------------|-------------|
| A1 | Beginner | Початківець | Базові фрази, представлення себе |
| A2 | Elementary | Елементарний | Повсякденні теми, прості діалоги |
| B1 | Intermediate | Середній | Робочі ситуації, подорожі |
| B2 | Upper-Intermediate | Вище середнього | Складні тексти, дискусії |
| C1 | Advanced | Просунутий | Вільне спілкування, академічна мова |
| C2 | Proficiency | Досконалий | Рівень носія мови |

**MUI Components:**
- `Accordion`, `AccordionSummary`, `AccordionDetails`
- `Typography`
- `Chip`
- `List`, `ListItem`, `ListItemIcon`
- `CheckCircle` icon

**Code:**

```tsx
// apps/web/src/pages/public/AboutPage/sections/CEFRSection.tsx
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import { ExpandMore, CheckCircle } from '@mui/icons-material';

const cefrLevels = [
  {
    code: 'A1',
    name: 'Beginner',
    nameUa: 'Початківець',
    color: '#4CAF50',
    description: 'Ви можете розуміти та використовувати знайомі повсякденні вирази та базові фрази.',
    skills: [
      'Представлятися та представляти інших',
      'Ставити та відповідати на прості запитання',
      'Взаємодіяти простим способом',
    ],
  },
  {
    code: 'A2',
    name: 'Elementary',
    nameUa: 'Елементарний',
    color: '#8BC34A',
    description: 'Ви можете розуміти речення та вирази, пов\'язані з найбільш актуальними сферами.',
    skills: [
      'Описувати простими словами своє оточення',
      'Спілкуватися в простих повсякденних ситуаціях',
      'Розповідати про свій досвід та події',
    ],
  },
  {
    code: 'B1',
    name: 'Intermediate',
    nameUa: 'Середній',
    color: '#FFC107',
    description: 'Ви можете впоратися з більшістю ситуацій під час подорожей.',
    skills: [
      'Описувати досвід, події, мрії та амбіції',
      'Коротко обґрунтовувати свою думку',
      'Розуміти основний зміст чітких текстів',
    ],
  },
  {
    code: 'B2',
    name: 'Upper-Intermediate',
    nameUa: 'Вище середнього',
    color: '#FF9800',
    description: 'Ви можете спілкуватися з носієм мови без напруги для обох сторін.',
    skills: [
      'Розуміти складні тексти на абстрактні теми',
      'Вільно та спонтанно спілкуватися',
      'Створювати детальні тексти з різних тем',
    ],
  },
  {
    code: 'C1',
    name: 'Advanced',
    nameUa: 'Просунутий',
    color: '#F44336',
    description: 'Ви можете вільно спілкуватися в соціальних, академічних та професійних контекстах.',
    skills: [
      'Розуміти широкий спектр складних текстів',
      'Вільно висловлюватися без помітних пауз',
      'Гнучко використовувати мову для різних цілей',
    ],
  },
  {
    code: 'C2',
    name: 'Proficiency',
    nameUa: 'Досконалий',
    color: '#9C27B0',
    description: 'Ви володієте мовою на рівні освіченого носія.',
    skills: [
      'Легко розуміти практично все',
      'Узагальнювати інформацію з різних джерел',
      'Висловлюватися спонтанно та точно',
    ],
  },
];

export const CEFRSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={600} textAlign="center" sx={{ mb: 2 }}>
          Рівні володіння мовою (CEFR)
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Загальноєвропейські рекомендації з мовної освіти — міжнародний стандарт
          для опису рівня володіння мовою
        </Typography>

        <Stack spacing={2}>
          {cefrLevels.map((level) => (
            <Accordion key={level.code} elevation={1}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Chip
                    label={level.code}
                    sx={{
                      bgcolor: level.color,
                      color: 'white',
                      fontWeight: 700,
                    }}
                  />
                  <Typography variant="h6">
                    {level.name} — {level.nameUa}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {level.description}
                </Typography>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                  Що ви зможете:
                </Typography>
                <List dense>
                  {level.skills.map((skill) => (
                    <ListItem key={skill} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={skill} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
```

---

### 3. Methodology Section

**Component:** `MethodologySection.tsx`

**Purpose:** Explain how lessons are structured and the learning approach.

**Content (Ukrainian):**

| Step | Title | Description |
|------|-------|-------------|
| 1 | Вивчення словника | Нові слова з перекладом, прикладами та аудіо |
| 2 | Граматика в контексті | Правила пояснюються на практичних прикладах |
| 3 | Читання та слухання | Тексти та аудіо для закріплення матеріалу |
| 4 | Практичні вправи | Тести для перевірки засвоєного |

**MUI Components:**
- `Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineConnector`, `TimelineContent`, `TimelineDot`
- `Typography`
- `Paper`

**Required Package:**
```bash
npm install @mui/lab
```

**Code:**

```tsx
// apps/web/src/pages/public/AboutPage/sections/MethodologySection.tsx
import {
  Box,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Abc, MenuBook, Headphones, Quiz } from '@mui/icons-material';

const steps = [
  {
    icon: Abc,
    title: 'Вивчення словника',
    description: 'Нові слова з перекладом, прикладами та аудіо вимовою',
  },
  {
    icon: MenuBook,
    title: 'Граматика в контексті',
    description: 'Правила пояснюються на практичних прикладах з реального життя',
  },
  {
    icon: Headphones,
    title: 'Читання та слухання',
    description: 'Тексти та аудіо матеріали для закріплення вивченого',
  },
  {
    icon: Quiz,
    title: 'Практичні вправи',
    description: 'Інтерактивні тести для перевірки засвоєного матеріалу',
  },
];

export const MethodologySection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={600} textAlign="center" sx={{ mb: 2 }}>
          Як побудовані уроки
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Кожен урок складається з кількох компонентів для ефективного засвоєння
        </Typography>

        <Timeline position="alternate">
          {steps.map((step, index) => (
            <TimelineItem key={step.title}>
              <TimelineSeparator>
                <TimelineDot color="primary" sx={{ p: 1 }}>
                  <step.icon />
                </TimelineDot>
                {index < steps.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};
```

---

### 4. Benefits Section

**Component:** `BenefitsSection.tsx`

**Content (Ukrainian):**

| Benefit | Title | Description |
|---------|-------|-------------|
| Self-paced | Власний темп | Навчайтеся коли зручно, без тиску та дедлайнів |
| Structured | Чітка структура | Прогресуйте від простого до складного |
| Progress | Видимий прогрес | Відстежуйте свої досягнення |
| Free | Безкоштовно | Основний функціонал доступний безкоштовно |

**Code:**

```tsx
// apps/web/src/pages/public/AboutPage/sections/BenefitsSection.tsx
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import { Schedule, AccountTree, TrendingUp, CardGiftcard } from '@mui/icons-material';

const benefits = [
  {
    icon: Schedule,
    title: 'Власний темп',
    description: 'Навчайтеся коли зручно, без тиску та дедлайнів',
  },
  {
    icon: AccountTree,
    title: 'Чітка структура',
    description: 'Прогресуйте від простого до складного за перевіреною методикою',
  },
  {
    icon: TrendingUp,
    title: 'Видимий прогрес',
    description: 'Відстежуйте свої досягнення та бачте результати навчання',
  },
  {
    icon: CardGiftcard,
    title: 'Безкоштовно',
    description: 'Основний функціонал доступний безкоштовно для всіх користувачів',
  },
];

export const BenefitsSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={600} textAlign="center" sx={{ mb: 6 }}>
          Переваги навчання з Voqu
        </Typography>

        <Grid container spacing={4}>
          {benefits.map((benefit) => (
            <Grid item xs={12} sm={6} key={benefit.title}>
              <Stack direction="row" spacing={3} alignItems="flex-start">
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    flexShrink: 0,
                  }}
                >
                  <benefit.icon fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
```

---

## Main Page Component

```tsx
// apps/web/src/pages/public/AboutPage/AboutPage.tsx
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { IntroSection } from './sections/IntroSection';
import { CEFRSection } from './sections/CEFRSection';
import { MethodologySection } from './sections/MethodologySection';
import { BenefitsSection } from './sections/BenefitsSection';

export const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Про нас — Voqu</title>
        <meta
          name="description"
          content="Дізнайтеся про методологію Voqu та рівні CEFR. Структурований підхід до вивчення англійської для українців."
        />
      </Helmet>
      <Box component="main">
        <IntroSection />
        <CEFRSection />
        <MethodologySection />
        <BenefitsSection />
      </Box>
    </>
  );
};
```

```tsx
// apps/web/src/pages/public/AboutPage/index.tsx
export { AboutPage } from './AboutPage';
```

---

## Implementation Checklist

- [ ] Create `AboutPage` folder structure
- [ ] Implement `IntroSection`
- [ ] Implement `CEFRSection` with accordion
- [ ] Install `@mui/lab` for Timeline components
- [ ] Implement `MethodologySection` with timeline
- [ ] Implement `BenefitsSection`
- [ ] Assemble `AboutPage.tsx` with all sections
- [ ] Add SEO meta tags with react-helmet-async
- [ ] Test responsive design on all breakpoints
- [ ] Verify Ukrainian text content
