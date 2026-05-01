import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Level } from '@/features/levels/types/level.type';
import { COURSE_STATUSES_LIST, CourseStatusKey } from '../constants/courseStatus';
import { capitalizeFirstLetter } from '@/shared/helpers/string.helpers';
import { Course } from '@/pages/admin/Courses/sections/CoursesSection';
import { ERROR_MESSAGE } from '../constants/errorMessage';

type FormValues = {
  title: string;
  description: string;
  level: Level | null;
  status: CourseStatusKey | null;
  link: string;
};

type CourseModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mainWord?: string;
  course?: Course;
};

// TODO: 1) rename to getLevelsListReg
// 2) create a custom hook and move all logic related to getting levels list to it
async function getLevelValue() {
  const response = await fetch('http://localhost:5173/api/level', {
    method: 'GET',
  });
  const result = await response.json();
  return result;
}

export default function CourseModal({ isOpen, setIsOpen, mainWord, course }: CourseModalProps) {
  // TODO: rename to levelsList
  const [data, setData] = useState<Level[]>([]);
  const { handleSubmit, control } = useForm<FormValues>({
    // TODO: create a new function above the component getDefaultValues
    defaultValues: {
      // TODO: remove 'e.g., AdvancedGrammar Mastery'
      title: course?.title ? course.title : 'e.g., AdvancedGrammar Mastery',
      description: course?.description || '',
      level: null,
      status: null,
      link: course?.link || '',
    },
  });

  useEffect(() => {
    getLevelValue().then((response) => {
      setData(response.items);
      console.log(response, 'response');
    });
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  // TODO: move it to parent component and pass it as a prop
  const addNewCourse = (inputsValues: FormValues) => {
    const body = {
      name: inputsValues.title,
      description: inputsValues.description,
      status: inputsValues.status?.toLowerCase(),
      LevelId: String(inputsValues.level?.id),
    };
    fetch('/api/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      // TODO: deprecated -> update it use slotsProps
      PaperProps={{
        sx: {
          p: '20px',
          borderRadius: '20px',
          border: '3px solid grey',
          width: 1,
        },
      }}
    >
      <DialogTitle>
        {' '}
        <Typography variant="h4">{mainWord} Course</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {mainWord == 'Edit'
            ? 'Update course information and settings'
            : ' Create a new course. You can add lessons after creating the course.'}
        </DialogContentText>
        {/*
        TODO:  
        1) move form into separate component 
        2) there should be 2 components for modals 1 - to add 2- to update*/}
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              control={control}
              name="title"
              rules={{ required: { value: true, message: ERROR_MESSAGE } }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  label="Course title"
                  size="small"
                  variant="outlined"
                  sx={{ width: 1, borderRadius: '30px' }}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  {...field}
                ></TextField>
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              control={control}
              name="description"
              rules={{ required: { value: true, message: ERROR_MESSAGE } }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  label="Description"
                  variant="outlined"
                  rows={4}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  sx={{ width: 1, borderRadius: '30px' }}
                  {...field}
                ></TextField>
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              control={control}
              name="level"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={data}
                  getOptionLabel={(option) => `${option.cefrLevel} - ${option.name}`}
                  sx={{ width: 1 }}
                  size="small"
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  value={value}
                  renderInput={(params) => <TextField {...params} label="Level" />}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={COURSE_STATUSES_LIST}
                  sx={{ width: 1 }}
                  size="small"
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  value={value}
                  getOptionLabel={(option) => capitalizeFirstLetter(option)}
                  renderInput={(params) => <TextField {...params} label="Status" />}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="link"
              render={({ field }) => (
                <TextField
                  label="Image URL (optional)"
                  size="small"
                  variant="outlined"
                  placeholder="https://..."
                  rows={4}
                  sx={{ width: 1, borderRadius: '30px' }}
                  {...field}
                ></TextField>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(addNewCourse)}
          sx={{ backgroundColor: '#71677D', color: 'white', p: '10px' }}
        >
          {mainWord == 'Edit' ? 'Save changes' : ' Add course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
