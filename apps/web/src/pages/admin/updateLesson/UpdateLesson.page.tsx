import { convertSegmentsListToApiFormat } from '@/features/lesson/helpers/convertLessonsListToApiFormat.helper';
import { reorderSegmentReq } from '@/features/lesson/helpers/reorderSegmentReq.helper';
import { useLessonDetails } from '@/features/lesson/hooks/useLessonDetails';
import { useMutation } from '@/shared/api';
import GoBackSection from '@/shared/components/goBackSection/GoBack.section';
import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import { ADMIN_COURSES_UPDATE_URL } from '@/shared/constants/urls.const';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddSegment } from './sections/AddSegment.section';
import { UpdateLessonHeaderSection } from './sections/UpdateLessonHeader.section';
import { WordlistSegmentItem } from '../../../features/lesson/components/wordlistSegmentItem/WordlistSegmentItem';

export const UpdateLessonPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { lessonId } = useParams();
  const { lessonDetails, getLessonDetails, setLessonDetails, isLoading } = useLessonDetails();
  const { mutate: reorderSegments } = useMutation({
    mutationFn: reorderSegmentReq,
  });
  useEffect(() => {
    if (!lessonId) return;
    getLessonDetails(lessonId);
  }, [lessonId, getLessonDetails]);
  if (isLoading) return <>Loading...</>;
  if (!lessonDetails) return <>no data</>;
  return (
    <Box>
      <GoBackSection url={ADMIN_COURSES_UPDATE_URL(lessonDetails.CourseId)} />
      <UpdateLessonHeaderSection lessonDetails={lessonDetails} />
      <SectionDivider />
      <DragDropProvider
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={(event) => {
          if (!lessonId) return;
          const orderedList = move(lessonDetails?.segments, event);
          setLessonDetails((prev) => ({ ...prev, segments: orderedList }));
          reorderSegments(lessonId, convertSegmentsListToApiFormat(orderedList));
          setIsDragging(false);
        }}
      >
        {lessonDetails?.segments.map((segment, index) => (
          <WordlistSegmentItem
            key={segment.id}
            lessonId={lessonDetails.id}
            reloadLessonDetails={getLessonDetails}
            segmentIndex={index}
            segment={segment}
            isCollapseble={!isDragging}
          />
        ))}
      </DragDropProvider>

      <AddSegment
        lang={lessonDetails.translationLanguage}
        lessonId={lessonDetails.id}
        reloadLessonDetails={getLessonDetails}
      />
    </Box>
  );
};
