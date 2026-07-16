import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useId, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { VocabularyFormSection } from './VocabularyForm.section';
type TaskType = 'vocabulary' | 'reading' | 'grammar' | null;
type WordListItemType = 'phrase' | 'word';
export type Segment = {
  id: string;
  title: string;
  description: string;
  wordsList: {
    id: string;
    word: string;
    transcription: string;
    partOfSpeech: string;
    translation: string;
    type: WordListItemType; // phrase/verb
    secondTense: string;
    thirdTense: string;
    examples: {
      value: string;
      translation: string;
    }[];
  }[];
};
const segmentsData: Segment[] = [
  // Wordlist Segment
  {
    id: 'segment_id',
    title: 'segment_title',
    description: 'segment_description',
    wordsList: [
      {
        id: 'word_id',
        word: 'invite',
        transcription: 'ɪnˈvaɪt',
        partOfSpeech: 'verb',
        translation: 'запрошувати',
        type: 'phrase', // phrase/verb
        secondTense: 'invited',
        thirdTense: 'invited',
        examples: [
          {
            value: '',
            translation: '',
          },
        ],
      },
    ],
  },
];
export const AddTaskSection = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [taskType, setTaskType] = useState<TaskType>(null);
  const id = useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={sxStyles.root}>
      {segments.map((segment) => (
        <VocabularyFormSection key={segment.id} segment={segment} />
      ))}
      <Box sx={sxStyles.addContainer}>
        <Button
          id={buttonId}
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={handleClick}
          size="large"
          variant="outlined"
        >
          <AddIcon sx={{ mr: 2 }} />
          Add new Task
        </Button>
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': buttonId,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setTaskType('vocabulary');
              setSegments((prev) => [
                ...prev,
                {
                  id: 'segment' + id,
                  title: '',
                  description: '',
                  wordsList: [],
                },
              ]);
              handleClose();
            }}
          >
            Vocabulary
          </MenuItem>
          <MenuItem onClick={handleClose}>Reading</MenuItem>
          <MenuItem onClick={handleClose}>Grammar</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  addContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
