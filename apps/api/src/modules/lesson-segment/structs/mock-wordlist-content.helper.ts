import { WordlistEntryType } from '../../vocabulary/structs/entry-type.enum';
import { PartOfSpeech } from '../../vocabulary/structs/part-of-speech.enum';
import { IWordlistContentInput } from '../../vocabulary/templates/wordlist/structs/wordlist-content.interface';

/**
 * TESTING ONLY. Builds a fully-populated `wordlist` content payload for the
 * mock segment endpoint — every optional field is filled so downstream
 * read/serialize paths get exercised with real data.
 *
 * @param withTranslations when `true`, each translatable field also carries a
 *   `translation` string (so a `?lang=` request writes Translation rows). When
 *   `false`, translations are omitted — the create service rejects a non-empty
 *   `translation` sent without `?lang=` with a 400, so this keeps the source-only
 *   request valid.
 *
 * `OwnerUserId` stays `null`: a lesson wordlist is not user-owned, and a random
 * UUID would break the FK. That is the intended value, not an empty field.
 */
export function buildMockWordlistContent(withTranslations: boolean): IWordlistContentInput {
  const t = (value: string, translation: string) =>
    withTranslations ? { value, translation } : { value };

  return {
    title: t('Plans & invitations', 'Плани та запрошення'),
    description: t('Core words and phrases for making plans', 'Основні слова для планування'),
    OwnerUserId: null,
    entries: [
      {
        lemma: t('plan', 'план'),
        entryType: WordlistEntryType.Word,
        partOfSpeech: PartOfSpeech.Noun,
        v2: null,
        v3: null,
        transcription: 'plæn',
        audioUrl: 'https://cdn.voqu.app/audio/plan.mp3',
        note: t('Countable noun. Often used with "make".', 'Злічуваний іменник.'),
        order: 0,
        examples: [
          {
            text: t('We made a plan for the weekend.', 'Ми склали план на вихідні.'),
            order: 0,
          },
          {
            text: t('The plan worked perfectly.', 'План спрацював чудово.'),
            order: 1,
          },
        ],
        collocations: [
          {
            expression: 'make a plan',
            explanation: t('Use "make", not "do".', 'Вживайте "make", а не "do".'),
            order: 0,
          },
          {
            expression: 'change of plan',
            explanation: t('A common fixed phrase.', 'Поширений стійкий вираз.'),
            order: 1,
          },
        ],
      },
      {
        lemma: t('get confused about', 'заплутатися (в чомусь)'),
        entryType: WordlistEntryType.Phrase,
        partOfSpeech: PartOfSpeech.Verb,
        v2: 'got confused about',
        v3: 'gotten confused about',
        transcription: 'ɡet kənˈfjuːzd əˈbaʊt',
        audioUrl: 'https://cdn.voqu.app/audio/get-confused-about.mp3',
        note: t('Often followed by a noun phrase.', 'Часто вживається з іменниковою фразою.'),
        order: 1,
        examples: [
          {
            text: t(
              'I always get confused about the timezone.',
              'Я завжди плутаюся в часових поясах.',
            ),
            order: 0,
          },
          {
            text: t("Don't get confused about the dates.", 'Не плутайся в датах.'),
            order: 1,
          },
        ],
        collocations: [
          {
            expression: 'get confused about the details',
            explanation: t('Common with plans and schedules.', 'Часто щодо планів та розкладів.'),
            order: 0,
          },
        ],
      },
    ],
  };
}
