export interface AnimationStep {
  lineIndex: number;  // 0-based line index
  text: string;       // The final text for this line
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
  currentWordIndex: number;
  currentWord: string;
  currentWordStart: number;
}

export interface CurrentWordInfo {
  wordIndex: number;
  word: string;
  wordStart: number; // Position relative to start of inserted text
  wordProgress: number;
  isComplete: boolean;
}

export interface HighlightRange {
  start: number;
  end: number;
  className?: string;
}