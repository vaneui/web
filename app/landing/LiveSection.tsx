'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Text,
  Container,
  Col,
  Row,
  Card,
  Title,
  Chip,
  Section,
  Button,
  Stack,
  Divider, 
  Img
} from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { FeatureTitle } from "../components/FeatureTitle";
import { dog } from "./data/dog";
import { AnimationStep } from './utils/typingTypes';
import { getTypingInfo, getCurrentWordInfo, getDisplayCode, getCurrentCodeLines } from './utils/typingLogic';

// Base code template as array of lines - moved outside component since it's static
const BASE_CODE_LINES = [
  '<Card row smCol overflowHidden>',
  '  <Img src="/puppy.png" alt="puppy" width={185} height={185}',
  '       className="shrink-0 max-sm:w-full"/>',
  '  <Stack sm>',
  '    <Row justifyBetween>',
  '      <Title>{dog.name}</Title>',
  '      <Chip sm>{dog.gender}</Chip>',
  '    </Row>',
  '    <Divider/>',
  '    <Text sm>{dog.description}</Text>',
  '    <Row smCol>',
  '      <Button className="max-sm:w-full">Adopt</Button>',
  '      <Button className="max-sm:w-full">Learn more</Button>',
  '    </Row>',
  '  </Stack>',
  '</Card>'
];

// Animation steps - each step modifies a specific line - moved outside component since it's static
const ANIMATION_STEPS: AnimationStep[] = [
  { lineIndex: 1, text: '  <Img src="/puppy.png" alt="puppy" sharp width={185} height={185}' },
  { lineIndex: 0, text: '<Card row smCol noPadding overflowHidden>' },
  { lineIndex: 0, text: '<Card row smCol noPadding noGap overflowHidden>' },
  { lineIndex: 6, text: '      <Chip sm bold>{dog.gender}</Chip>' },
  { lineIndex: 6, text: '      <Chip sm bold primary>{dog.gender}</Chip>' },
  { lineIndex: 6, text: '      <Chip sm bold primary pill>{dog.gender}</Chip>' },
  { lineIndex: 11, text: '      <Button sm className="max-sm:w-full">Adopt</Button>' },
  { lineIndex: 12, text: '      <Button sm className="max-sm:w-full">Learn more</Button>' },
  { lineIndex: 11, text: '      <Button sm success className="max-sm:w-full">Adopt</Button>' },
  { lineIndex: 11, text: '      <Button sm success filled className="max-sm:w-full">Adopt</Button>' },
  { lineIndex: 10, text: '    <Row smCol sm>' },
  { lineIndex: 10, text: '    <Row smCol sm justifyEnd>' },
  { lineIndex: 11, text: '      <Button sm success filled pill className="max-sm:w-full">Adopt</Button>' },
  { lineIndex: 12, text: '      <Button sm pill className="max-sm:w-full">Learn more</Button>' },
];

export function LiveSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [typingProgress, setTypingProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingCompletedForStep, setTypingCompletedForStep] = useState(0);
  
  // Track props for each component based on completed steps
  const [componentProps, setComponentProps] = useState({
    card: {} as Record<string, boolean>,
    img: {} as Record<string, boolean>,
    chip: {} as Record<string, boolean>,
    adoptButton: {} as Record<string, boolean>,
    learnButton: {} as Record<string, boolean>,
    row: {} as Record<string, boolean>
  });


  // Update component props as words finish typing
  useEffect(() => {
    if (isTyping && currentStep > 0 && currentStep <= ANIMATION_STEPS.length) {
      const step = ANIMATION_STEPS[currentStep - 1];
      const typingInfo = getTypingInfo(BASE_CODE_LINES, ANIMATION_STEPS, currentStep);
      const currentWordInfo = getCurrentWordInfo(typingInfo, typingProgress);
      
      if (currentWordInfo?.isComplete) {
        const word = currentWordInfo.word.trim();
        if (!word) return;
        
        setComponentProps(prev => {
          const newProps = { ...prev };
          
          // Apply the prop based on line index
          switch (step.lineIndex) {
            case 0: // Card component
              newProps.card[word] = true;
              break;
            case 1: // Img component  
              newProps.img[word] = true;
              break;
            case 6: // Chip component
              newProps.chip[word] = true;
              break;
            case 10: // Row component
              newProps.row[word] = true;
              break;
            case 11: // Adopt Button
              newProps.adoptButton[word] = true;
              break;
            case 12: // Learn Button
              newProps.learnButton[word] = true;
              break;
          }
          
          return newProps;
        });
      }
    }
  }, [isTyping, currentStep, typingProgress]);



  // Typing animation effect
  useEffect(() => {
    if (currentStep === 0 || currentStep > ANIMATION_STEPS.length) {
      setTypingProgress(0);
      setIsTyping(false);
      return;
    }

    const typingInfo = getTypingInfo(BASE_CODE_LINES, ANIMATION_STEPS, currentStep);
    if (!typingInfo.insertText) {
      // No text to type, skip to next
      setTypingProgress(0);
      setIsTyping(false);
      return;
    }

    // Start typing animation
    setTypingProgress(0);
    setIsTyping(true);
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= typingInfo.insertText.length) {
        setTypingProgress(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTypingCompletedForStep(currentStep);
      }
    }, 150); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentStep]);

  // Auto-advance to next step
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => {
          // Reset to 1 after reaching the end
          if (prev >= ANIMATION_STEPS.length) {
            // Reset props when restarting
            setComponentProps({
              card: {},
              img: {},
              chip: {},
              adoptButton: {},
              learnButton: {},
              row: {}
            });
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Get typing info and current word
  const typingInfo = getTypingInfo(BASE_CODE_LINES, ANIMATION_STEPS, currentStep);
  const currentWordInfo = getCurrentWordInfo(typingInfo, typingProgress);
  
  // Calculate highlight ranges directly
  const highlightRanges = React.useMemo(() => {
    if (!isTyping || !currentWordInfo || currentWordInfo.wordProgress <= 0) return [];
    
    // Get position in full code string
    const previousLines = getCurrentCodeLines(BASE_CODE_LINES, ANIMATION_STEPS, currentStep - 1);
    let lineStartPos = 0;
    for (let i = 0; i < typingInfo.lineIndex; i++) {
      lineStartPos += previousLines[i].length + 1;
    }
    
    const wordStart = lineStartPos + typingInfo.insertPosition + currentWordInfo.wordStart;
    const wordEnd = wordStart + currentWordInfo.wordProgress;
    
    return [{ start: wordStart, end: wordEnd }];
  }, [isTyping, currentWordInfo, typingInfo, currentStep]);
  
  const displayCode = getDisplayCode(BASE_CODE_LINES, ANIMATION_STEPS, currentStep, isTyping, typingProgress, typingCompletedForStep >= currentStep);

  return (
    <Section lg relative>
      <Row absolute
           className="inset-0 bg-[linear-gradient(to_right,var(--color-gray-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-gray-50)_1px,transparent_1px)] bg-[size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"/>
      <Container xl>
        <Col xl className="w-full z-10">
          <FeatureTitle
            icon="Eye"
            title="See it in action"
            description="Watch how changing props instantly transforms components."
          />
          <Row xl lgCol relative className="w-full">
            <CodeBlock
              fileName="CardExample.tsx"
              language="tsx"
              code={displayCode}
              highlightRanges={highlightRanges}
              cursorPosition={isTyping && highlightRanges[0] ? highlightRanges[0].end - 1 : undefined}
              className="w-[800px] max-lg:w-full"
            />
            <Col
                 className="max-w-xl absolute max-lg:relative right-0 max-sm:max-w-80 z-20 border-8 rounded-[calc(8px+var(--radius-xl))] border-gray-400/10 backdrop-blur-sm">
              <Card row smCol overflowHidden {...componentProps.card} className="transition-all duration-500">
                <Img tag={Image} src="/puppy.png" alt="puppy" width={185} height={185}
                     {...componentProps.img} className="shrink-0 max-sm:w-full"/>
                <Stack sm>
                  <Row justifyBetween>
                    <Title>{dog.name}</Title>
                    <Chip sm {...componentProps.chip}>{dog.gender}</Chip>
                  </Row>
                  <Divider/>
                  <Text sm>{dog.description}</Text>
                  <Row smCol {...componentProps.row}>
                    <Button {...componentProps.adoptButton} className="max-sm:w-full">Adopt</Button>
                    <Button secondary {...componentProps.learnButton} className="max-sm:w-full">Learn more</Button>
                  </Row>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}