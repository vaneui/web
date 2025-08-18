export interface AnimationStep {
  lineIndex: number;
  text: string;
}

export interface TypingInfo {
  lineIndex: number;
  oldText: string;
  newText: string;
  insertText: string;
  insertPosition: number;
  beforeInsert: string;
  afterInsert: string;
  words: string[];
}

export interface CurrentWordInfo {
  word: string;
  wordStart: number;
  wordProgress: number;
  isComplete: boolean;
}
