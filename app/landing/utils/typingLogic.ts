import { AnimationStep, TypingInfo, CurrentWordInfo } from './typingTypes';

/**
 * Get the current code lines based on completed steps
 */
export function getCurrentCodeLines(
  baseCodeLines: string[], 
  animationSteps: AnimationStep[], 
  stepIndex: number
): string[] {
  const lines = [...baseCodeLines];
  
  // Apply all changes up to the current step
  for (let i = 0; i < stepIndex && i < animationSteps.length; i++) {
    const step = animationSteps[i];
    lines[step.lineIndex] = step.text;
  }
  
  return lines;
}

/**
 * Get what text needs to be typed for current step
 */
export function getTypingInfo(
  baseCodeLines: string[],
  animationSteps: AnimationStep[],
  stepIndex: number
): TypingInfo {
  if (stepIndex === 0 || stepIndex > animationSteps.length) {
    return { 
      lineIndex: -1, 
      oldText: '', 
      newText: '', 
      insertText: '',
      insertPosition: 0,
      beforeInsert: '',
      afterInsert: '',
      words: [],
      currentWordIndex: 0,
      currentWord: '',
      currentWordStart: 0
    };
  }
  
  const step = animationSteps[stepIndex - 1];
  // Get the line state BEFORE this current step (accounting for all previous modifications)
  const previousLines = getCurrentCodeLines(baseCodeLines, animationSteps, stepIndex - 1);
  const oldText = previousLines[step.lineIndex];
  const newText = step.text;
  
  // Find where text diverges (insertion point)
  let insertPosition = 0;
  for (let i = 0; i < Math.min(oldText.length, newText.length); i++) {
    if (oldText[i] === newText[i]) {
      insertPosition++;
    } else {
      break;
    }
  }
  
  // Find common suffix after the insertion point
  let oldSuffixStart = oldText.length;
  let newSuffixStart = newText.length;
  
  while (oldSuffixStart > insertPosition && 
         newSuffixStart > insertPosition && 
         oldText[oldSuffixStart - 1] === newText[newSuffixStart - 1]) {
    oldSuffixStart--;
    newSuffixStart--;
  }
  
  // Extract the text to be inserted
  const insertText = newText.substring(insertPosition, newSuffixStart);
  const beforeInsert = oldText.substring(0, insertPosition);
  const afterInsert = oldText.substring(oldSuffixStart);
  
  // Split into words and track positions
  const words = insertText.split(/(\s+)/).filter(Boolean);
  
  return {
    lineIndex: step.lineIndex,
    oldText, // This is the line state before this step
    newText,
    insertText,
    insertPosition,
    beforeInsert,
    afterInsert,
    words,
    currentWordIndex: 0,
    currentWord: '',
    currentWordStart: 0
  };
}

/**
 * Get current word info based on typing progress
 */
export function getCurrentWordInfo(typingInfo: TypingInfo, progress: number): CurrentWordInfo | null {
  if (!typingInfo.words.length || progress <= 0) return null;
  
  let currentPos = 0;
  
  // Find which word we're currently typing
  for (let i = 0; i < typingInfo.words.length; i++) {
    const word = typingInfo.words[i];
    const wordEnd = currentPos + word.length;
    
    if (wordEnd >= progress) {
      // We're in this word or just finished it
      const isSpace = /^\s+$/.test(word);
      
      if (!isSpace) {
        const wordProgress = Math.min(progress - currentPos, word.length);
        if (wordProgress > 0) {
          return {
            wordIndex: i,
            word: word,
            wordStart: currentPos, // Position relative to start of inserted text
            wordProgress: wordProgress,
            isComplete: progress >= wordEnd
          };
        }
      }
      
      // If we're in a space or at the exact boundary, continue to next word
    }
    
    currentPos += word.length;
  }
  
  return null;
}

/**
 * Format code for display with typing animation
 */
export function getDisplayCode(
  baseCodeLines: string[],
  animationSteps: AnimationStep[],
  currentStep: number,
  isTyping: boolean,
  typingProgress: number,
  hasTypingCompleted?: boolean
): string {
  if (isTyping && currentStep > 0 && currentStep <= animationSteps.length) {
    const typingInfo = getTypingInfo(baseCodeLines, animationSteps, currentStep);
    // Start with the state BEFORE the current step
    const lines = getCurrentCodeLines(baseCodeLines, animationSteps, currentStep - 1);
    
    if (typingInfo.lineIndex >= 0 && typingInfo.insertText) {
      // Build the line with partial inserted text
      const partialInsert = typingInfo.insertText.substring(0, typingProgress);
      lines[typingInfo.lineIndex] = 
        typingInfo.beforeInsert + 
        partialInsert + 
        typingInfo.afterInsert;
    }
    
    return lines.join('\n');
  }
  
  // When not typing, show completed state only if typing has completed for this step
  // Otherwise show the previous step to prevent blinking
  const displayStep = hasTypingCompleted ? currentStep : Math.max(0, currentStep - 1);
  const lines = getCurrentCodeLines(baseCodeLines, animationSteps, Math.min(displayStep, animationSteps.length));
  return lines.join('\n');
}