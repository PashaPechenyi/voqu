/**
 * Inputs for the standalone grammar authoring endpoints. Adding/updating a
 * block carries the payload for exactly one blockType; the orchestrator picks
 * the right payload table.
 */
export interface IAddTextBlockParams {
  blockType: 'text';
  textRole: string;
  text: string;
  order?: number;
}

export interface IAddPatternBlockParams {
  blockType: 'pattern';
  form: string;
  markup: string;
  order?: number;
}

export type IAddBlockParams = IAddTextBlockParams | IAddPatternBlockParams;

/**
 * Update payload for a block. The orchestrator dispatches on the existing
 * block's blockType — the caller only sends the fields it wants changed.
 */
export interface IUpdateBlockParams {
  // text payload
  textRole?: string;
  text?: string;
  // pattern payload
  form?: string;
  markup?: string;
}

export interface IUpdateTopicParams {
  title?: string | null;
  tense?: string | null;
}

export interface IReorderBlockItem {
  BlockId: string;
  order: number;
}

export interface IReorderBlocksParams {
  GrammarTopicId: string;
  items: IReorderBlockItem[];
}
