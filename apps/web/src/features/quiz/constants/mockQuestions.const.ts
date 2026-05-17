import { Question } from '../types/question.type';

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'What does the word "ode" mean?',
    variants: [
      { id: 'q1-a', text: 'A type of ancient poetry' },
      { id: 'q1-b', text: 'A modern music genre' },
      { id: 'q1-c', text: 'A scientific experiment' },
      { id: 'q1-d', text: 'A historical event' },
    ],
    answerId: 'q1-a',
  },
  {
    id: 'q2',
    question: 'What does the verb "decline" mean?',
    variants: [
      { id: 'q2-a', text: 'To refuse or reject something' },
      { id: 'q2-b', text: 'To accept gladly' },
      { id: 'q2-c', text: 'To carefully examine' },
      { id: 'q2-d', text: 'To delay an action' },
    ],
    answerId: 'q2-a',
  },
  {
    id: 'q3',
    question: 'Who is an "astronomer"?',
    variants: [
      { id: 'q3-a', text: 'A person who studies stars' },
      { id: 'q3-b', text: 'A type of musical instrument' },
      { id: 'q3-c', text: 'A famous painting' },
      { id: 'q3-d', text: 'A natural disaster' },
    ],
    answerId: 'q3-a',
  },
  {
    id: 'q4',
    question: 'What does "elated" mean?',
    variants: [
      { id: 'q4-a', text: 'Extremely happy or joyful' },
      { id: 'q4-b', text: 'Very tired' },
      { id: 'q4-c', text: 'Slightly angry' },
      { id: 'q4-d', text: 'Completely confused' },
    ],
    answerId: 'q4-a',
  },
  {
    id: 'q5',
    question: 'What is an "excursion"?',
    variants: [
      { id: 'q5-a', text: 'A short journey made for pleasure' },
      { id: 'q5-b', text: 'A dangerous adventure' },
      { id: 'q5-c', text: 'A long business trip' },
      { id: 'q5-d', text: 'A daily routine activity' },
    ],
    answerId: 'q5-a',
  },
];
