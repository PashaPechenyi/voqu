import { Button, Menu, MenuItem, Box, Drawer } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateType } from 'material-ui-popup-state/hooks';
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useState } from 'react';
import WordlistSegmentForm from '@/features/lessons/components/WordlistSegmentForm';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LessonDetails, Segment } from '@/features/lessons/types/lessonDetails.type';
import { useMutation } from '@/shared/api';
import { creaLessonSegmentReq } from '@/features/lessons/helpers/createLessonSegmentReq.helper';
import { Word, WordDTO } from '@/features/lessons/types/word.type';
import { useGetLessonDetails } from '@/features/lessons/hooks/useGetLessonDetails';
import { useUpdateLessonDetails } from '@/features/lessons/hooks/useUpdateLessonDetails';
import { CreateLessonSegmentReqBody } from '@/features/lessons/types/createLessonSegmentReqBody.type';
import { UpdateLessonSegmentReqBody } from '@/features/lessons/types/updateLessonSegmentReqBody.type';
import { deleteLessonDetailsReq } from '@/features/lessons/helpers/deleteLessonDetailsReq';
import { convertWordToReqFormat } from '@/features/lessons/helpers/convertWordToReqFormat.helper';
import { convertToSegment } from '@/features/lessons/helpers/convertToSegment.helper';
import { convertToSegmentForUpdate } from '@/features/lessons/helpers/convertToSegmentForUpdate.helper';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderLessonSegment } from '@/features/lessons/helpers/reorderLessonSegment.helper';
import { convertReorderSegmentToApiFormat } from '@/features/lessons/helpers/convertReorderSegmentToApiFormat.helper';
import WordlistSegmentFormForDrawer from '@/features/lessons/components/WordlistSegmentFormForDrawer';

type LessonSectionsProps = {
  lessonDetails: LessonDetails;
  getLessonDetails: (lessonId: string) => void;
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
  const [isDragging, setIsDragging] = useState(false);

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
  const { mutate: deleteSegment } = useMutation({
    mutationFn: deleteLessonDetailsReq,
    onSuccess: () => {
      getLessonDetails(lessonDetails.id);
    },
  });
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
  const { mutate: reorderSegments } = useMutation({
    mutationFn: reorderLessonSegment,
  });

  return (
    <Box sx={sxStyles.root}>
      <DragDropProvider
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={(event) => {
          const orderList = move(lessonDetails.segments, event);
          reorderSegments(convertReorderSegmentToApiFormat(orderList), lessonDetails.id);
          setIsDragging(false);
        }}
      >
        <ul>
          {lessonDetails.segments.map((segment, index) => {
            return (
              <Fragment key={segment.id}>
                <WordlistSegmentForm
                  segmentDetails={segment}
                  onUpdate={handleEdit}
                  onDelete={() => {
                    deleteSegment(segment.id);
                  }}
                  index={index}
                  id={segment.id}
                  isCollapsable={!isDragging}
                />
              </Fragment>
            );
          })}
        </ul>
      </DragDropProvider>
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
          <WordlistSegmentFormForDrawer
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
