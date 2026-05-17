// TODO: This whole `models/` directory is not part of the project frontend architecture.
// TODO: Types must live either in `features/<entity>/types/` (entity-bound), `shared/types/` (business-agnostic), or co-located in a page.
// TODO: Each type should be in its own file named `<typeName>.type.ts` — not all dumped together.
// TODO: The `Card` type uses `icon: any` — `any` is forbidden; use `FC<SvgIconProps>` like other places do.
// TODO: The `Word`/`Question`/`Level`/`Card` shapes duplicate types defined in features (vocabulary, levels). Delete this file and use the feature types.
export type Word = {
  word: string;
  transcription: string;
  partOfSpeech: string;
  audio: string;
  definition: string;
  example: string;
  synonyms: string[];
};
export type Question = {
  question: string;
  variants: string[];
  answer: string;
};
export type Level={
    level:string,
    description:string,
    skills:string[]
}
export type Card={
    icon:any,
    title:string,
    description:string
}