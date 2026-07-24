/** Structural discriminator on GrammarBlock — maps 1:1 to payload tables. */
export enum GrammarBlockType {
  Text = 'text',
  Pattern = 'pattern',
}

/** Semantic label on GrammarBlockText. */
export enum GrammarTextRole {
  Description = 'description',
  Example = 'example',
}
