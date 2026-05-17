import { Word } from '../types/word.type';

export const MOCK_WORDS: Word[] = [
  {
    id: 'w1',
    word: 'Serendipity',
    transcription: '/ˌserənˈdɪpəti/',
    partOfSpeech: 'noun',
    audioUrl: '',
    definition: 'The occurrence of events by chance in a happy or beneficial way',
    example: '"A fortunate stroke of serendipity brought us together."',
    synonyms: ['chance', 'fortune', 'luck'],
  },
  {
    id: 'w2',
    word: 'Eloquent',
    transcription: '/ˈeləkwənt/',
    partOfSpeech: 'adjective',
    audioUrl: '',
    definition: 'Fluent or persuasive in speaking or writing',
    example: '"She gave an eloquent speech at the ceremony."',
    synonyms: ['articulate', 'fluent', 'persuasive'],
  },
];
