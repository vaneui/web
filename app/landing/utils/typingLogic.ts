import { AnimationStep, TypingInfo, CurrentWordInfo } from './typingTypes';

export function getCurrentCodeLines(
  baseCodeLines: string[],
  animationSteps: AnimationStep[],
  stepIndex: number
): string[] {
  const lines = [...baseCodeLines];
  for (let i = 0; i < stepIndex && i < animationSteps.length; i++) {
    const step = animationSteps[i];
    lines[step.lineIndex] = step.text;
  }
  return lines;
}

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
      words: []
    };
  }

  const step = animationSteps[stepIndex - 1];
  const previousLines = getCurrentCodeLines(baseCodeLines, animationSteps, stepIndex - 1);
  const oldText = previousLines[step.lineIndex];
  const newText = step.text;

  let insertPosition = 0;
  for (let i = 0; i < Math.min(oldText.length, newText.length); i++) {
    if (oldText[i] === newText[i]) {
      insertPosition++;
    } else {
      break;
    }
  }

  let oldSuffixStart = oldText.length;
  let newSuffixStart = newText.length;

  while (oldSuffixStart > insertPosition &&
  newSuffixStart > insertPosition &&
  oldText[oldSuffixStart - 1] === newText[newSuffixStart - 1]) {
    oldSuffixStart--;
    newSuffixStart--;
  }

  const insertText = newText.substring(insertPosition, newSuffixStart);
  const beforeInsert = oldText.substring(0, insertPosition);
  const afterInsert = oldText.substring(oldSuffixStart);
  const words = insertText.split(/(\s+)/).filter(Boolean);

  return {
    lineIndex: step.lineIndex,
    oldText,
    newText,
    insertText,
    insertPosition,
    beforeInsert,
    afterInsert,
    words
  };
}

export function getCurrentWordInfo(typingInfo: TypingInfo, progress: number): CurrentWordInfo | null {
  if (!typingInfo.words.length || progress <= 0) return null;

  let currentPos = 0;
  for (let i = 0; i < typingInfo.words.length; i++) {
    const word = typingInfo.words[i];
    const wordEnd = currentPos + word.length;

    if (wordEnd >= progress && !/^\s+$/.test(word)) {
      const wordProgress = Math.min(progress - currentPos, word.length);
      if (wordProgress > 0) {
        return {
          word,
          wordStart: currentPos,
          wordProgress,
          isComplete: progress >= wordEnd
        };
      }
    }
    currentPos += word.length;
  }

  return null;
}

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
    const lines = getCurrentCodeLines(baseCodeLines, animationSteps, currentStep - 1);

    if (typingInfo.lineIndex >= 0 && typingInfo.insertText) {
      const partialInsert = typingInfo.insertText.substring(0, typingProgress);
      lines[typingInfo.lineIndex] =
        typingInfo.beforeInsert + partialInsert + typingInfo.afterInsert;
    }

    return lines.join('\n');
  }

  const displayStep = hasTypingCompleted ? currentStep : Math.max(0, currentStep - 1);
  const lines = getCurrentCodeLines(baseCodeLines, animationSteps, Math.min(displayStep, animationSteps.length));
  return lines.join('\n');
}