import { Button, Menu, MenuItem, Box } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import CreateVocabularySectionModal, {
  Word,
} from '@/features/lessons/components/CreateVocabularySectionModal';
import { LessonDetailsStructure, Segment } from '../LessonDetails.page';
import { WordType } from '@/features/lessons/enums/lessonWordType.enum';

type LessonSectionsProps = {
  lessonDetails: LessonDetailsStructure;
  setLesonDetails: React.Dispatch<React.SetStateAction<LessonDetailsStructure>>;
  handleSegment: (segment: Segment) => void;
};

function LessonSections({ lessonDetails, setLesonDetails, handleSegment }: LessonSectionsProps) {
  const [option, setOption] = useState<'vocabulary' | 'grammar' | 'listening' | null>(null);
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {lessonDetails.segments.map((segment) => (
        <CreateVocabularySectionModal segmentDetails={segment} />
      ))}
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState: any) => (
          <React.Fragment>
            <Button
              variant="contained"
              {...bindTrigger(popupState)}
              color="tertiary"
              sx={{ margin: '0 auto ', width: 600 }}
            >
              <AddIcon />
              Add section
            </Button>
            <Menu
              {...bindMenu(popupState)}
              slotProps={{
                paper: {
                  sx: {
                    width: '600px',
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setOption('vocabulary');
                  popupState.close();
                  handleSegment({
                    id: 'segment',
                    title: 'Title',
                    description: 'Description',
                    wordsList: [],
                  });
                }}
              >
                Vocabulary
              </MenuItem>
              <MenuItem
                onClick={() => {
                  (setOption('grammar'), popupState.close());
                }}
              >
                Grammar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  (setOption('listening'), popupState.close());
                }}
              >
                Listening
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </Box>
  );
}

export default LessonSections;
