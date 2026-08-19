import { Button, Menu, MenuItem, Box, Drawer } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateType } from 'material-ui-popup-state/hooks';
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useState } from 'react';
import CreateVocabularySectionDrawer from '@/features/lessons/components/CreateVocabularySectionDrawer';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LessonDetails, Segment } from '@/features/lessons/types/lessonDetails.type';
import { useMutation } from '@/shared/api';
import { creaLessonSegmentReq } from '@/features/lessons/helpers/createLessonSegmentReq.helper';
import { Word, WordDTO } from '@/features/lessons/types/word.type';
import { useGetLessonDetails } from '@/features/lessons/hooks/useGetLessonDetails';
import { useUpdateLessonDetails } from '@/features/lessons/hooks/useUpdateLessonDetails';
import { CreateLessonSegmentReqBody } from '@/features/lessons/types/createLessonSegmentReqBody.type';
import { UpdateLessonSegmentReqBody } from '@/features/lessons/types/updateLessonSegmentReqBody.type';

type LessonSectionsProps = {
  lessonDetails: LessonDetails;
  getLessonDetails: (lessonId: string) => void;
};

// TODO: move functions to their separate files
export const convertWordToReqFormat = (word: Word): WordDTO => {
  return {
    entryType: word.entryType!,
    // TODO: in terms of the fact that example entry possibly could not have order -> lets always use inder for order
    examples: word.examples.map((el) => ({
      order: el.order,
      // TODO: use el.text as a value
      text: { value: el.text.value, translation: el.text.translation },
    })),
    // TODO: use word.definition as a value
    lemma: { value: word.definition.value, translation: word.definition.translation },
    partOfSpeech: word.partOfSpeech,
    transcription: word.transcription,
    v2: word.v2,
    v3: word.v3,
  };
};

export function convertToSegment(lessonDetails: Segment): any {
  return {
    order: 1,
    SegmentKindKey: 'wordlist',
    title: lessonDetails.title.value,
    description: lessonDetails.description.value,
    content: {
      description: {
        value: lessonDetails.wordlist.description.value,
        translation: lessonDetails.wordlist.description.translation,
      },
      entries: lessonDetails.wordlist.entries.map(convertWordToReqFormat),

      title: {
        value: lessonDetails.title.value,
        translation: lessonDetails.wordlist.title.translation,
      },
    },
  };
}
export const convertToSegmentForUpdate = (segment: Segment): UpdateLessonSegmentReqBody => {
  return {
    order: 1,

    title: segment.title.value,
    description: segment.description.value,
    content: {
      description: {
        value: segment.wordlist.description.value,
        translation: segment.wordlist.description.translation,
      },
      entries: segment.wordlist.entries.map(convertWordToReqFormat),

      title: {
        value: segment.title.value,
        translation: segment.wordlist.title.translation,
      },
    },
  };
};
function LessonSections({ lessonDetails, getLessonDetails }: LessonSectionsProps) {
  const [open, setOpen] = useState(false);
  const { updateLessonDetails } = useUpdateLessonDetails({
    onSuccess: () => {
      getLessonDetails(lessonDetails.id);
    },
  });
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
    wordlist: {
      description: { value: '', translation: null },
      entries: [],
      id: '',
      title: { value: '', translation: null },
    },
  });
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const handleEdit = (body: Segment) => {
    updateLessonDetails(
      body.id,
      convertToSegmentForUpdate(body),
      lessonDetails.translationLanguage,
    );
  };

  const { mutate: createLessonSegment } = useMutation({
    mutationFn: creaLessonSegmentReq,
    onSuccess: () => {
      setOpen(false);
      getLessonDetails(lessonDetails.id);
      setDefaultSegment({
        id: '',
        lessonId: '',
        segmentKindId: '',
        segmentContentRowId: '',
        title: { value: '', translation: '' },
        description: { value: '', translation: '' },
        order: 0,
        createdAt: '',
        updatedAt: '',
        wordlist: {
          description: { value: '', translation: null },
          entries: [],
          id: '',
          title: { value: '', translation: null },
        },
      });
    },
  });

  return (
    <Box sx={sxStyles.root}>
      {lessonDetails.segments.map((segment) => {
        return (
          <CreateVocabularySectionDrawer
            segmentDetails={segment}
            lang={lessonDetails.translationLanguage}
            onUpdate={handleEdit}
          />
        );
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
            onUpdate={setDefaultSegment}
          />
          <Button
            sx={{ width: '70%', my: '10px' }}
            onClick={() => {
              createLessonSegment(
                lessonDetails.id,
                convertToSegment(defaultSegment),
                lessonDetails.translationLanguage,
              );
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
