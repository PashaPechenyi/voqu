import {
  Box,
  Button,
  Typography,
  Card,
  Collapse,
  CardContent,
  CardHeader,
  ListItem,
} from '@mui/material';
import WordItem from './WordItem';
import { FC, useRef } from 'react';
import AddWordForm from './AddWordForm';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Word } from '../types/word.type';
import { Segment } from '../types/lessonDetails.type';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal';
import { convertFormWord } from '../helpers/convertFormWord.helper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useSortable } from '@dnd-kit/react/sortable';

type WordlistSegmentFormProps = {
  segmentDetails: Segment;
  onUpdate: (segment: Segment) => void;
  onDelete?: (segmentId: string) => void;
  index: number;
  id: string;
  isCollapsable: boolean;
};
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function WordlistSegmentForm({
  segmentDetails,
  onUpdate,
  onDelete,
  index,
  id,
  isCollapsable,
}: WordlistSegmentFormProps) {
  const handleUpdateLesson = (data: Partial<Segment>) => {
    onUpdate({ ...segmentDetails, ...data });
  };
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    if (isCollapsable) {
      setExpanded(!expanded);
    } else {
      setExpanded(false);
    }
  };
  console.log(expanded, 'expanded');
  const [isOpen, setIsOpen] = useState(false);
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const dragButtonRef = useRef<HTMLButtonElement | null>(null);
  const { isDragging } = useSortable({ id, index, element: listItemRef, handle: dragButtonRef });
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));

  console.log(isCollapsable, 'isCollapsable');

  //useToggle
  return (
    <ListItem ref={listItemRef} data-shadow={isDragging || undefined}>
      <Card sx={sxStyles.root}>
        <CardContent sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <DragIndicatorIcon />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <EditableField
              defaultValue={segmentDetails.title.value}
              onSave={(newValue) => {
                handleUpdateLesson({ title: { value: newValue, translation: '' } });
              }}
              slotProps={{
                typography: {
                  color: 'secondary',
                  variant: 'h6',
                },
                textfield: {
                  placeholder: 'Add title',
                  variant: 'standard',
                },
              }}
            />
            <EditableField
              defaultValue={segmentDetails.description.value}
              onSave={(newValue) => {
                handleUpdateLesson({ description: { value: newValue, translation: '' } });
              }}
              slotProps={{
                typography: {
                  color: 'primary',
                  variant: 'body1',
                },
                textfield: {
                  placeholder: 'Add description',
                  variant: 'standard',
                  multiline: true,
                  fullWidth: true,
                },
              }}
            />
          </Box>
          <ExpandMore
            sx={{ position: 'absolute', right: '20px', top: '18px' }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardContent>

        <Collapse in={isCollapsable ? expanded : false} timeout="auto" unmountOnExit>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {segmentDetails?.wordlist?.entries?.map((word: Word, index: number) => (
              <WordItem
                segment={segmentDetails}
                onUpdate={handleUpdateLesson}
                word={word}
                wordIndex={index}
                key={word.id}
              />
            )) || ''}

            <AddWordForm
              onSubmit={(newWord) => {
                const updatedEntries = [
                  ...segmentDetails.wordlist.entries,
                  convertFormWord(newWord),
                ];
                handleUpdateLesson({
                  wordlist: {
                    ...segmentDetails.wordlist,
                    entries: updatedEntries,
                  },
                });
              }}
            />
            {onDelete ? (
              <Button onClick={() => setIsOpen(true)}>
                <Typography variant="body1">Delete</Typography>
                <DeleteIcon />
              </Button>
            ) : (
              ''
            )}
          </CardContent>
        </Collapse>

        <ConfirmModal
          title="Delete Segment"
          subtitle={`Are you sure you want to delete ${segmentDetails.title}? This action cannot be undone.`}
          buttonText="Delete Segment"
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          onConfirm={() => onDelete?.(segmentDetails.id)}
        />
      </Card>
    </ListItem>
  );
}

const sxStyles = createSxStylesList({
  root: (theme) => ({
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: theme.palette.common.white,
    borderRadius: 7,
    padding: 5,
    position: 'relative',
  }),
  deleteButton: {},
});

export default WordlistSegmentForm;
