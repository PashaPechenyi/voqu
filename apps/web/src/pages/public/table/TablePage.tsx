import { Word } from '@/models/models';
import { Box } from '@mui/material';
import TableSection from './TableSection';

export const words: Word[] = [
  {
    id: 'w1',
    word: 'achieve',
    translation: 'досягати',
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
function TablePage() {
  return (
    <Box>
      <TableSection
        data={words}
        getRowId={(row) => row.addedAt + row.id}
        settings={[
          {
            key: 'word',
            columnName: 'Word',
            columnSize: 'small',
            valueGetter: (row) => {
              return row.word;
            },
            renderCell: (value: string) => {
              return <> {value} </>;
            },
          },
          {
            key: 'translation',
            columnName: 'Translation',
            columnSize: 'medium',
            valueGetter: (row) => {
              return row.translation + '---';
            },
          },
        ]}
      />
    </Box>
  );
}

export default TablePage;
