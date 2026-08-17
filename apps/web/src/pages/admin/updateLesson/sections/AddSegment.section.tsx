import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Drawer, Menu, MenuItem, Typography } from '@mui/material';
import { MouseEvent, useId, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useMutation } from '@/shared/api';
import {
  createLessonSegmentReq,
  LessonSegmentReqBody,
} from '@/features/lesson/helpers/createLessonSegmentReq.helper';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { MutateResult } from '@/shared/api/useMutation';
import { GetLessonDetailsDTO } from '@/features/lesson/helpers/getLessonDetailsReq.helper';
import { CreateWordlistSegment } from './CreateWordlistSegment.section';

type AddSegmentProps = {
  reloadLessonDetails: (lessonId: string) => Promise<MutateResult<GetLessonDetailsDTO, unknown>>;
  lessonId: LessonListItem['id'];
  lang: string;
};
export const AddSegment = ({ lang, lessonId, reloadLessonDetails }: AddSegmentProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const id = useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { isLoading, mutate: createLessonSegment } = useMutation({
    mutationFn: createLessonSegmentReq,
    onSuccess(response) {
      console.log(response, 'create');
      reloadLessonDetails(lessonId);
      setOpenDrawer(false);
    },
  });
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSave = (body: LessonSegmentReqBody) => {
    createLessonSegment(lessonId, body, lang);
  };

  return (
    <Box sx={sxStyles.root}>
      {openDrawer && (
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Typography variant="h3" color={'primary'} textAlign={'center'} m="2">
            Vocabulary segment
          </Typography>
          <CreateWordlistSegment isLoading={isLoading} onSave={onSave} />
        </Drawer>
      )}
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
          Add new Section
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
              setOpenDrawer(true);
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
