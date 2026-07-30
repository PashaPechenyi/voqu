import { Button, Menu, MenuItem, Box, Drawer } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateType } from 'material-ui-popup-state/hooks';
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useState } from 'react';
import CreateVocabularySectionModal from '@/features/lessons/components/CreateVocabularySectionDrawer';
import { LessonDetailsStructure } from '../LessonDetails.page';
import { WordType } from '@/features/lessons/enums/lessonWordType.enum';
import CreateVocabularySectionDrawer from '@/features/lessons/components/CreateVocabularySectionDrawer';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LessonDetails, Segment } from '@/features/lessons/types/lessonDetails.type';

// RENAME: setLesonDetails -> setLessonDetails - fix typo
type LessonSectionsProps = {
  lessonDetails: LessonDetails;

  handleSegment: (segment: Segment) => void;
};

function LessonSections({ lessonDetails, handleSegment }: LessonSectionsProps) {
  const [option, setOption] = useState<'vocabulary' | 'grammar' | 'listening' | null>(null);
  const [open, setOpen] = useState(false);
  const [defaultSegment, setDefaultSegment] = useState<Segment>({
    id: '',
    lessonId: '',
    segmentKindId: '',
    segmentContentRowId: '',
    title: { value: '', translation: '' },
    description: { value: '', translation: '' },
    order: 0,
    createdAt: '',
    updatedAt: '',
    wordsList: [],
  });
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={sxStyles.root}>
      {lessonDetails.segments.map((segment) => {
        console.log(segment, 'segment');
        return <CreateVocabularySectionDrawer segmentDetails={segment} />;
      })}

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
                  setOpen(true);
                  // handleSegment();
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
      {open ? (
        <Drawer
          sx={{
            '& .MuiDrawer-paper': {
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: '10px',
            },
          }}
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
        >
          <CreateVocabularySectionDrawer
            segmentDetails={defaultSegment}
            setSegmentDetails={setDefaultSegment}
          />
          <Button
            sx={{ width: '70%', my: '10px' }}
            onClick={() => {
              setOpen(false);
              handleSegment(defaultSegment);
            }}
          >
            Save
          </Button>
        </Drawer>
      ) : (
        ''
      )}
    </Box>
  );
}

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
