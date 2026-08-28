import { Word } from '../types/wordListItem.type';
type SegmentData = {
  title: string;
  description: string;
};
export const convertLessonSegmentDetailsToUpdateApiFormat = (
  wordlistEntries: Word[],
  segmentData: SegmentData,
) => {
  return {
    title: { value: segmentData?.title, translation: segmentData.title },
    description: {
      value: segmentData.description,
      translation: segmentData.description,
    },
    order: 0,
    content: {
      title: { value: segmentData.title, translation: segmentData.title },
      description: {
        value: segmentData.description,
        translation: segmentData.description,
      },
      entries: wordlistEntries.map((word, index) => {
        const isVerb = word.partOfSpeech === 'verb';
        return {
          lemma: { value: word.lemma, translation: word.definition.translation },

          entryType: word.entryType,
          partOfSpeech: word.partOfSpeech.toLowerCase(),
          transcription: word.transcription,
          audioUrl: word.audioUrl,
          note: word.note,
          order: index,
          examples: word.examples.map((ex, exIndex) => ({
            text: ex.text,
            order: exIndex,
          })),
          v2: isVerb ? word.v2 : null,
          v3: isVerb ? word.v3 : null,
          collocations: [],
        };
      }),
    },
  };
};
