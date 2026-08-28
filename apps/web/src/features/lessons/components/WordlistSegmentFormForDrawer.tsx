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

type WordlistSegmentFormForDrawerProps = {
  segmentDetails: Segment;
  onUpdate: (segment: Segment) => void;
  onDelete?: (segmentId: string) => void;
};

function WordlistSegmentFormForDrawer({
  segmentDetails,
  onUpdate,
  onDelete,
}: WordlistSegmentFormForDrawerProps) {
  const handleUpdateLesson = (data: Partial<Segment>) => {
    onUpdate({ ...segmentDetails, ...data });
  };

  const [isOpen, setIsOpen] = useState(false);

  //useToggle
  return (
    <Card sx={sxStyles.root}>
      <CardContent sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
      </CardContent>

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
            const updatedEntries = [...segmentDetails.wordlist.entries, convertFormWord(newWord)];
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

export default WordlistSegmentFormForDrawer;
