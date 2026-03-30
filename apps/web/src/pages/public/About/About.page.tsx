import IntroSection from './sections/Intro.section';
import LevelsDescription from './sections/LevelsDescription.section';
import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import LessonStructure from './sections/LessonStructure.section';
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
      <SectionDivider />
      <LevelsDescription />
      <SectionDivider />
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
