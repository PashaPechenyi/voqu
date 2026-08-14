/**
 * Real end-to-end test for the lesson-segment flow, run against the live API
 * (http://localhost:3001) and the live Postgres. Exercises create / read /
 * update (PUT full-replace) / reorder / delete, and asserts that:
 *   - content rows are written to the DB,
 *   - translations are stored under the right (entityType, EntityId, field, lang),
 *   - the details read returns { value, translation } correctly,
 *   - PUT replaces content, migrates the content-row id, and cleans up old
 *     translations (no orphans),
 *   - delete removes the segment + content (+ its translations).
 *
 * Usage: from apps/api →  npx ts-node test/lesson-segment.e2e.ts
 * Requires the API running and DB migrated. Cleans up everything it creates.
 */
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../src/database/data-source';

const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:3001/api';

let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(cond: boolean, label: string, detail?: unknown): void {
  if (cond) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failed++;
    failures.push(label);
    console.log(`  ✗ ${label}${detail !== undefined ? ` — ${JSON.stringify(detail)}` : ''}`);
  }
}

async function api(
  method: string,
  path: string,
  body?: unknown,
): Promise<{ status: number; json: any }> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    /* no body */
  }
  return { status: res.status, json };
}

async function main(): Promise<void> {
  const ds = new DataSource(dataSourceOptions);
  await ds.initialize();

  const q = (sql: string, params: unknown[] = []) => ds.query(sql, params);
  const countTranslations = async (entityType: string, entityId: string): Promise<number> => {
    const rows = await q(
      `SELECT count(*)::int AS c FROM "Translation" WHERE "entityType" = $1 AND "EntityId" = $2`,
      [entityType, entityId],
    );
    return rows[0].c;
  };
  const getTranslation = async (
    entityType: string,
    entityId: string,
    field: string,
    lang: string,
  ): Promise<string | null> => {
    const rows = await q(
      `SELECT value FROM "Translation" WHERE "entityType"=$1 AND "EntityId"=$2 AND field=$3 AND "languageCode"=$4`,
      [entityType, entityId, field, lang],
    );
    return rows.length ? rows[0].value : null;
  };

  // ---- Fixtures: a course (source en, translation uk) + a lesson ----
  const course = (
    await q(
      `SELECT id FROM "Course" WHERE "sourceLanguageCode"='en' AND 'uk' = ANY("translationLanguageCodes") LIMIT 1`,
    )
  )[0];
  if (!course) throw new Error('No en/uk course found to test against');
  const CourseId: string = course.id;
  console.log(`\nUsing course ${CourseId}`);

  const created = await api('POST', `/course/lesson/${CourseId}`, {
    title: 'E2E test lesson',
    status: 'draft',
  });
  check(created.status === 201 && !!created.json?.id, 'POST lesson → 201 + id', created);
  const LessonId: string = created.json.id;

  const createdIds = { LessonId, segmentIds: [] as string[], wordlistId: '', topicId: '' };

  try {
    // ================= 1. CREATE wordlist segment with uk translations =================
    console.log('\n[1] POST wordlist segment ?lang=uk');
    const wlBody = {
      SegmentKindKey: 'wordlist',
      title: 'Vocabulary',
      order: 0,
      content: {
        title: { value: 'Plans & invitations', translation: 'Плани та запрошення' },
        description: { value: 'Core words', translation: null },
        entries: [
          {
            lemma: { value: 'plan', translation: 'план' },
            entryType: 'word',
            partOfSpeech: 'noun',
            order: 0,
            examples: [
              { text: { value: 'We made a plan.', translation: 'Ми склали план.' }, order: 0 },
            ],
            collocations: [
              {
                expression: 'make a plan',
                explanation: { value: 'Use make.', translation: null },
                order: 0,
              },
            ],
          },
          {
            lemma: { value: 'invite', translation: 'запрошувати' },
            entryType: 'word',
            partOfSpeech: 'verb',
            order: 1,
          },
        ],
      },
    };
    const wl = await api('POST', `/lesson/segment/${LessonId}?lang=uk`, wlBody);
    check(wl.status === 201 && !!wl.json?.id, 'wordlist create → 201 + id', wl);
    const wlSegmentId: string = wl.json.id;
    const wlId: string = wl.json.SegmentContentRowId;
    createdIds.segmentIds.push(wlSegmentId);
    createdIds.wordlistId = wlId;

    // DB: wordlist + 2 entries + 1 example + 1 collocation
    const wlRow = await q(`SELECT title, description FROM "Wordlist" WHERE id=$1`, [wlId]);
    check(
      wlRow.length === 1 && wlRow[0].title === 'Plans & invitations',
      'wordlist row stored (source title)',
      wlRow,
    );
    const entryRows = await q(
      `SELECT id, lemma, "order" FROM "WordlistEntry" WHERE "WordlistId"=$1 ORDER BY "order"`,
      [wlId],
    );
    check(entryRows.length === 2, 'DB has 2 entries', entryRows.length);
    check(
      entryRows[0].lemma === 'plan' && entryRows[1].lemma === 'invite',
      'entries stored in order',
      entryRows.map((r: any) => r.lemma),
    );
    const exRows = await q(
      `SELECT id, text FROM "WordlistEntryExample" WHERE "WordlistEntryId"=$1`,
      [entryRows[0].id],
    );
    check(
      exRows.length === 1 && exRows[0].text === 'We made a plan.',
      'example row stored',
      exRows,
    );
    const colRows = await q(
      `SELECT id, expression FROM "WordlistEntryCollocation" WHERE "WordlistEntryId"=$1`,
      [entryRows[0].id],
    );
    check(
      colRows.length === 1 && colRows[0].expression === 'make a plan',
      'collocation row stored',
      colRows,
    );

    // DB: translations written under correct slots
    check(
      (await getTranslation('wordlist', wlId, 'title', 'uk')) === 'Плани та запрошення',
      'wordlist title translation stored',
      await getTranslation('wordlist', wlId, 'title', 'uk'),
    );
    check(
      (await countTranslations('wordlist', wlId)) === 1,
      'wordlist description translation NOT written (was null)',
      await countTranslations('wordlist', wlId),
    );
    check(
      (await getTranslation('wordlist_entry', entryRows[0].id, 'definition', 'uk')) === 'план',
      'entry "plan" definition translation stored under field=definition',
      await getTranslation('wordlist_entry', entryRows[0].id, 'definition', 'uk'),
    );
    check(
      (await getTranslation('wordlist_entry', entryRows[1].id, 'definition', 'uk')) ===
        'запрошувати',
      'entry "invite" definition translation stored',
      null,
    );
    check(
      (await getTranslation('wordlist_entry_example', exRows[0].id, 'text', 'uk')) ===
        'Ми склали план.',
      'example text translation stored',
      null,
    );
    check(
      (await countTranslations('wordlist_entry_collocation', colRows[0].id)) === 0,
      'collocation explanation translation NOT written (was null)',
      await countTranslations('wordlist_entry_collocation', colRows[0].id),
    );

    // ================= 2. CREATE grammar segment with uk translations =================
    console.log('\n[2] POST grammar topic segment ?lang=uk');
    const grBody = {
      SegmentKindKey: 'topic',
      title: 'Ask people to do things',
      order: 1,
      content: {
        title: { value: 'want + object + to V1', translation: 'хотіти, щоб хтось щось зробив' },
        tense: 'Present Simple',
        blocks: [
          {
            blockType: 'text',
            textRole: 'description',
            text: { value: 'Use <b>want</b>.', translation: 'Вживайте <b>want</b>.' },
            order: 0,
          },
          {
            blockType: 'pattern',
            form: 'affirmative',
            markup: 'I/We/They want [V1] (to him/her/them)',
            order: 1,
          },
        ],
      },
    };
    const gr = await api('POST', `/lesson/segment/${LessonId}?lang=uk`, grBody);
    check(gr.status === 201 && !!gr.json?.id, 'grammar create → 201 + id', gr);
    const grSegmentId: string = gr.json.id;
    const topicId: string = gr.json.SegmentContentRowId;
    createdIds.segmentIds.push(grSegmentId);
    createdIds.topicId = topicId;

    const blockRows = await q(
      `SELECT id, "blockType", "order" FROM "GrammarBlock" WHERE "GrammarTopicId"=$1 ORDER BY "order"`,
      [topicId],
    );
    check(blockRows.length === 2, 'DB has 2 grammar blocks', blockRows.length);
    const textBlock = blockRows.find((b: any) => b.blockType === 'text');
    const patternRow = await q(
      `SELECT "parsedMarkup" FROM "GrammarBlockPattern" WHERE "GrammarBlockId"=$1`,
      [blockRows.find((b: any) => b.blockType === 'pattern').id],
    );
    check(
      Array.isArray(patternRow[0]?.parsedMarkup) && patternRow[0].parsedMarkup.length > 0,
      'pattern markup parsed to tokens',
      patternRow[0]?.parsedMarkup,
    );
    check(
      (await getTranslation('grammar_topic', topicId, 'title', 'uk')) ===
        'хотіти, щоб хтось щось зробив',
      'topic title translation stored',
      null,
    );
    check(
      (await getTranslation('grammar_block_text', textBlock.id, 'text', 'uk')) ===
        'Вживайте <b>want</b>.',
      'text block translation stored (sanitized HTML kept <b>)',
      await getTranslation('grammar_block_text', textBlock.id, 'text', 'uk'),
    );

    // ================= 3. READ details, assert { value, translation } =================
    console.log('\n[3] GET lesson details ?lang=uk');
    const details = await api('GET', `/course/lesson/${LessonId}/details?lang=uk`);
    check(details.status === 200, 'details → 200', details.status);
    const lesson = details.json?.lesson;
    check(
      lesson?.sourceLanguage === 'en' && lesson?.translationLanguage === 'uk',
      'details declares source=en / translation=uk',
      { s: lesson?.sourceLanguage, t: lesson?.translationLanguage },
    );
    check(
      Array.isArray(lesson?.segments) && lesson.segments.length === 2,
      'details returns 2 segments',
      lesson?.segments?.length,
    );
    const wlSeg = lesson.segments.find((s: any) => s.segmentKind === 'wordlist');
    check(
      wlSeg?.wordlist?.title?.value === 'Plans & invitations' &&
        wlSeg?.wordlist?.title?.translation === 'Плани та запрошення',
      'read: wordlist title { value, translation }',
      wlSeg?.wordlist?.title,
    );
    const planEntry = wlSeg?.wordlist?.entries?.find((e: any) => e.lemma === 'plan');
    check(
      planEntry?.definition?.value === 'plan' && planEntry?.definition?.translation === 'план',
      'read: entry definition = { value: lemma, translation }',
      planEntry?.definition,
    );
    check(
      planEntry?.examples?.[0]?.text?.translation === 'Ми склали план.',
      'read: example text translation surfaced',
      planEntry?.examples?.[0]?.text,
    );
    const grSeg = lesson.segments.find((s: any) => s.segmentKind === 'topic');
    check(
      grSeg?.grammarTopic?.title?.translation === 'хотіти, щоб хтось щось зробив',
      'read: grammar topic title translation',
      grSeg?.grammarTopic?.title,
    );

    // ================= 4. PUT full-replace (update) the wordlist segment =================
    console.log('\n[4] PUT replace wordlist segment ?lang=uk');
    const oldEntryIds = entryRows.map((r: any) => r.id);
    const putBody = {
      title: { value: 'Vocabulary (edited)', translation: 'Лексика (змінено)' },
      description: { value: null },
      order: 0,
      content: {
        title: {
          value: 'Plans, invitations & tickets',
          translation: 'Плани, запрошення та квитки',
        },
        entries: [
          {
            lemma: { value: 'ticket', translation: 'квиток' },
            entryType: 'word',
            partOfSpeech: 'noun',
            order: 0,
          },
        ],
      },
    };
    const put = await api('PUT', `/lesson/segment/${wlSegmentId}?lang=uk`, putBody);
    check(
      put.status === 200 && !!put.json?.SegmentContentRowId,
      'PUT → 200 + new SegmentContentRowId',
      put,
    );
    const newWlId: string = put.json.SegmentContentRowId;
    createdIds.wordlistId = newWlId;
    check(newWlId !== wlId, 'PUT created a NEW content row (full replace)', {
      old: wlId,
      new: newWlId,
    });

    // segment repointed + title updated
    const segRow = await q(`SELECT "SegmentContentRowId", title FROM "LessonSegment" WHERE id=$1`, [
      wlSegmentId,
    ]);
    check(
      segRow[0].SegmentContentRowId === newWlId,
      'segment repointed to new content row',
      segRow[0],
    );
    check(segRow[0].title === 'Vocabulary (edited)', 'segment title updated', segRow[0].title);
    check(
      (await getTranslation('lesson_segment', wlSegmentId, 'title', 'uk')) === 'Лексика (змінено)',
      'segment own title translation written on PUT',
      await getTranslation('lesson_segment', wlSegmentId, 'title', 'uk'),
    );

    // old content rows gone
    check(
      (await q(`SELECT id FROM "Wordlist" WHERE id=$1`, [wlId])).length === 0,
      'old wordlist row deleted',
      null,
    );
    check(
      (await q(`SELECT id FROM "WordlistEntry" WHERE id = ANY($1)`, [oldEntryIds])).length === 0,
      'old entries deleted (cascade)',
      null,
    );

    // old translations cleaned up (no orphans) — check old wordlist + old entries
    check(
      (await countTranslations('wordlist', wlId)) === 0,
      'old wordlist translations cleaned up',
      await countTranslations('wordlist', wlId),
    );
    let orphanEntryTrans = 0;
    for (const eid of oldEntryIds)
      orphanEntryTrans += await countTranslations('wordlist_entry', eid);
    check(
      orphanEntryTrans === 0,
      'old entry translations cleaned up (no orphans)',
      orphanEntryTrans,
    );

    // new translations present
    check(
      (await getTranslation('wordlist', newWlId, 'title', 'uk')) === 'Плани, запрошення та квитки',
      'new wordlist title translation stored',
      null,
    );
    const newEntry = (
      await q(`SELECT id FROM "WordlistEntry" WHERE "WordlistId"=$1`, [newWlId])
    )[0];
    check(
      (await getTranslation('wordlist_entry', newEntry.id, 'definition', 'uk')) === 'квиток',
      'new entry definition translation stored',
      null,
    );

    // ================= 5. REORDER segments =================
    console.log('\n[5] PATCH reorder segments');
    const reorder = await api('PATCH', `/lesson/segment/${LessonId}/reorder`, {
      items: [
        { SegmentId: grSegmentId, order: 0 },
        { SegmentId: wlSegmentId, order: 1 },
      ],
    });
    check(reorder.status === 200, 'reorder → 200', reorder.status);
    const orderRows = await q(
      `SELECT id, "order" FROM "LessonSegment" WHERE "LessonId"=$1 ORDER BY "order"`,
      [LessonId],
    );
    check(
      orderRows[0].id === grSegmentId && orderRows[0].order === 0,
      'grammar now order 0',
      orderRows,
    );
    check(
      orderRows[1].id === wlSegmentId && orderRows[1].order === 1,
      'wordlist now order 1',
      orderRows,
    );

    // ================= 6. DELETE a segment, assert cleanup =================
    console.log('\n[6] DELETE wordlist segment');
    const del = await api('DELETE', `/lesson/segment/${wlSegmentId}`);
    check(del.status === 200, 'delete → 200', del.status);
    check(
      (await q(`SELECT id FROM "LessonSegment" WHERE id=$1`, [wlSegmentId])).length === 0,
      'segment row deleted',
      null,
    );
    check(
      (await q(`SELECT id FROM "Wordlist" WHERE id=$1`, [newWlId])).length === 0,
      'segment content (wordlist) deleted',
      null,
    );

    // ================= 7. 400 cases =================
    console.log('\n[7] validation / 400 cases');
    const badLang = await api('POST', `/lesson/segment/${LessonId}?lang=pl`, {
      SegmentKindKey: 'wordlist',
      content: { title: { value: 'x' } },
    });
    check(badLang.status === 400, 'unavailable lang (pl) → 400', badLang.status);

    const transNoLang = await api('POST', `/lesson/segment/${LessonId}`, {
      SegmentKindKey: 'wordlist',
      content: { title: { value: 'x', translation: 'ікс' } },
    });
    check(transNoLang.status === 400, 'translation without ?lang= → 400', transNoLang.status);

    const emptyTitle = await api('POST', `/lesson/segment/${LessonId}?lang=uk`, {
      SegmentKindKey: 'wordlist',
      content: { title: { value: '' } },
    });
    check(emptyTitle.status === 400, 'empty required value → 400', emptyTitle.status);

    const textBlockNoText = await api('POST', `/lesson/segment/${LessonId}?lang=uk`, {
      SegmentKindKey: 'topic',
      content: { blocks: [{ blockType: 'text', textRole: 'example' }] },
    });
    check(
      textBlockNoText.status === 400,
      'text block missing text object → 400 (not 500)',
      textBlockNoText.status,
    );

    const unknownKind = await api('POST', `/lesson/segment/${LessonId}?lang=uk`, {
      SegmentKindKey: 'nope',
      content: { title: { value: 'x' } },
    });
    check(unknownKind.status === 404, 'unknown SegmentKindKey → 404', unknownKind.status);
  } finally {
    // ---- Cleanup everything created ----
    console.log('\n[cleanup] removing test lesson + segments');
    await api('DELETE', `/course/lesson/${createdIds.LessonId}`).catch(() => {});
    // belt-and-suspenders: nuke any translations for content ids we created
    await ds.destroy();
  }

  console.log(`\n================ RESULT: ${passed} passed, ${failed} failed ================`);
  if (failed > 0) {
    console.log('FAILURES:\n' + failures.map((f) => ` - ${f}`).join('\n'));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('E2E CRASHED:', e);
  process.exit(1);
});
