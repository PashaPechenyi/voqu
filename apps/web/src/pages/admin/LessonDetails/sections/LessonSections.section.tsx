import { FC, Fragment } from 'react';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateType } from 'material-ui-popup-state/hooks';
import AddIcon from '@mui/icons-material/Add';
import CreateVocabularySectionModal from '@/features/lessons/components/CreateVocabularySectionModal';
import { LessonDetailsStructure, Segment } from '@/features/lessons/types/lessonDetails.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

// RENAME: setLesonDetails -> setLessonDetails - fix typo
type LessonSectionsProps = {
  lessonDetails: LessonDetailsStructure;
  setLessonDetails: React.Dispatch<React.SetStateAction<LessonDetailsStructure>>;
  handleSegment: (segment: Segment) => void;
};

const LessonSections: FC<LessonSectionsProps> = ({ lessonDetails, handleSegment }) => {
  return (
    <Box sx={sxStyles.root}>
      {lessonDetails.segments.map((segment) => (
        <CreateVocabularySectionModal key={segment.id} segmentDetails={segment} />
      ))}
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState: PopupStateType) => (
          <Fragment>
            <Button
              variant="contained"
              {...bindTrigger(popupState)}
              color="tertiary"
              sx={sxStyles.addButton}
            >
              <AddIcon />
              Add section
            </Button>
            <Menu
              {...bindMenu(popupState)}
              slotProps={{
                paper: {
                  sx: sxStyles.menuPaper,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  popupState.close();
                  // TODO: segment is created with a hardcoded id 'segment' and title 'Title' — generate a unique id and use real input.
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
                  popupState.close();
                }}
              >
                Grammar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  popupState.close();
                }}
              >
                Listening
              </MenuItem>
            </Menu>
          </Fragment>
        )}
      </PopupState>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    width: '100%',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  addButton: { margin: '0 auto', width: 600 },
  menuPaper: { width: '600px' },
});

export default LessonSections;
