// TODO: DELETE THIS ENTIRE FILE. It is a stale duplicate of `pages/public/aboutUs/AboutUs.page.tsx` (which is the one actually wired to the router in `routes/index.tsx`). All imports here (`@/components/publicLayout/*`) point to a folder that does not exist — the file does not compile.
// TODO: File name `AboutPage.tsx` violates the page convention `<Name>.page.tsx`. The valid sibling is `AboutUs.page.tsx`.
// TODO: Exports a `Word` type and a `words` mock array from a page file — wrong location, also commented-out usage. Remove.
// TODO: `import { TabClassKey, TableCell } from '@mui/material'` — both unused. Same for `Cancel`, `KeyOff` from `@mui/icons-material`.
// TODO: The huge commented-out `<Table1<Word> ...>` block must be deleted; dead code makes the file unreadable.
// TODO: `import SectionDevider` — misspelled `Devider` (should be `Divider`). Also the import path `@/components/publicLayout/SectionDevider` doesn't exist.
// TODO: `import Table1 from '@/components/publicLayout/Table'` — `Table1` is not a meaningful name. Use `Table`/`TableSection`. Path also broken.
// TODO: `React` is imported but unused with the new JSX transform.
import React from 'react';
import IntroSection from './sections/IntroSection';
import LevelsDescription from './sections/LevelsDescription';
import SectionDevider from '@/components/publicLayout/SectionDevider';
import LessonStructure from './sections/LessonStructure';
import Table1 from '@/components/publicLayout/Table';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Box, TabClassKey, TableCell } from '@mui/material';
import { Cancel, KeyOff } from '@mui/icons-material';

export type Word = {
  id: string;
  word: string;
  translation: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: 'verbs' | 'nouns' | 'adjectives' | 'phrases';
  learned: boolean;
  addedAt: string;
};

export const words: Word[] = [
  {
    id: 'w1',
    word: 'achieve',
    translation: 'achieve',
    level: 'B2',
    category: 'verbs',
    learned: true,
    addedAt: '2026-02-15',
  },
  {
    id: 'w2',
    word: 'improve',
    translation: 'покращувати',
    level: 'B1',
    category: 'verbs',
    learned: false,
    addedAt: '2026-02-20',
  },
  {
    id: 'w3',
    word: 'challenge',
    translation: 'виклик',
    level: 'B2',
    category: 'nouns',
    learned: true,
    addedAt: '2026-02-10',
  },
  {
    id: 'w4',
    word: 'confident',
    translation: 'впевнений',
    level: 'B1',
    category: 'adjectives',
    learned: false,
    addedAt: '2026-02-18',
  },
  {
    id: 'w5',
    word: 'on time',
    translation: 'вчасно',
    level: 'A2',
    category: 'phrases',
    learned: true,
    addedAt: '2026-01-30',
  },
  {
    id: 'w6',
    word: 'although',
    translation: 'хоча',
    level: 'B2',
    category: 'phrases',
    learned: false,
    addedAt: '2026-02-22',
  },
  {
    id: 'w7',
    word: 'environment',
    translation: 'довкілля',
    level: 'B1',
    category: 'nouns',
    learned: false,
    addedAt: '2026-02-05',
  },
  {
    id: 'w8',
    word: 'require',
    translation: 'вимагати',
    level: 'B2',
    category: 'verbs',
    learned: true,
    addedAt: '2026-02-12',
  },
];

function AboutPage() {
  return (
    <>
      <IntroSection />
      <SectionDevider />
      <LevelsDescription />
      <SectionDevider />
      <LessonStructure />

      {/* <Table1<Word>
        columns={[
          {
            key: 'learned',
            name: 'Learned',
            valueGetter: (row) => {
              return row.learned ? 'yes' : 'no';
            },
            renderCell: (row, value) => {
              return row.learned ? (
                <Box>
                  {value}
                  <DoneIcon />
                </Box>
              ) : (
                <Box>
                  {value}
                  <CloseIcon />
                </Box>
              );
            },
          },
          {
            key: 'word',
            name: 'Word',
          },
          {
            key: 'translation',
            name: 'Tr',
          },

          // {
          //   key: 'translation',
          //   name: 'Translation',
          //   valueGetter: ( row) => {
          //     return  row.translation;
          //   },
          // },
          // {
          //   key: 'translation',
          //   name: 'Translation',
          //   valueGetter: ( row) => {
          //     return  row.level === "B2" ? "wysokyj" : "inshyj" ;
          //   },
          // },
        ]}
        rows={words}
        rowsId={(row) => {
          return row.id + row.translation;
        }}
      /> */}
    </>
  );
}

export default AboutPage;
